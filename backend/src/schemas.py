from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
from enum import Enum

class MovementType(str, Enum):
    IN = "in"
    OUT = "out"

class ProductBase(BaseModel):
    name: str
    description: Optional[str] = None
    sku: str
    price: float = Field(ge=0)
    minimum_stock: int = Field(ge=0, default=5)

class ProductCreate(ProductBase):
    pass

class ProductUpdate(ProductBase):
    name: Optional[str] = None
    sku: Optional[str] = None
    price: Optional[float] = None

class Product(ProductBase):
    id: int
    current_stock: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

class MovementBase(BaseModel):
    product_id: int
    quantity: int
    type: MovementType
    notes: Optional[str] = None

class MovementCreate(MovementBase):
    pass

class Movement(MovementBase):
    id: int
    timestamp: datetime
    product: Product

    class Config:
        from_attributes = True

class ProductWithMovements(Product):
    movements: List[Movement]
