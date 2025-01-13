from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from prometheus_fastapi_instrumentator import Instrumentator
from typing import List
from datetime import datetime
from .models import Product, Movement, MovementType
from .schemas import ProductCreate, Product as ProductSchema, Movement as MovementSchema, MovementCreate, ProductWithMovements
from .database import get_db, SessionLocal

app = FastAPI(
    title="Inventory API",
    description="API for managing inventory",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configurar Prometheus metrics
Instrumentator().instrument(app).expose(app)

@app.get("/")
async def read_root():
    return {"message": "Welcome to the Inventory API"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

@app.post("/products/", response_model=ProductSchema)
def create_product(product: ProductCreate, db: Session = Depends(get_db)):
    db_product = Product(**product.model_dump())
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product

@app.get("/products/", response_model=List[ProductSchema])
def read_products(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    products = db.query(Product).offset(skip).limit(limit).all()
    return products

@app.get("/products/{product_id}", response_model=ProductWithMovements)
def read_product(product_id: int, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == product_id).first()
    if product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

@app.post("/movements/", response_model=MovementSchema)
def create_movement(movement: MovementCreate, db: Session = Depends(get_db)):
    # Buscar el producto
    product = db.query(Product).filter(Product.id == movement.product_id).first()
    if product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    
    # Crear el movimiento
    db_movement = Movement(**movement.model_dump())
    
    # Actualizar el stock del producto
    if movement.type == MovementType.IN:
        product.current_stock += movement.quantity
    else:  # MovementType.OUT
        if product.current_stock < movement.quantity:
            raise HTTPException(status_code=400, detail="Not enough stock")
        product.current_stock -= movement.quantity
    
    # Guardar los cambios
    db.add(db_movement)
    db.commit()
    db.refresh(db_movement)
    
    return db_movement

@app.get("/metrics/low-stock")
def get_low_stock_products(db: Session = Depends(get_db)):
    products = db.query(Product)\
        .filter(Product.current_stock <= Product.minimum_stock)\
        .all()
    return products

@app.get("/metrics/monthly-movements")
def get_monthly_movements(db: Session = Depends(get_db)):
    # Get movements from current month
    current_month = datetime.now().replace(day=1, hour=0, minute=0, second=0, microsecond=0)
    
    movements_count = db.query(Movement)\
        .filter(Movement.timestamp >= current_month)\
        .count()
    
    return {"count": movements_count}

# Inicializar la base de datos
def init_db():
    db = SessionLocal()
    try:
        # Aquí podrías añadir datos iniciales si lo necesitas
        pass
    finally:
        db.close()
