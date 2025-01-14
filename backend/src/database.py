from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

# Nota: Internamente seguimos usando el puerto 5432 porque es el puerto dentro del contenedor
SQLALCHEMY_DATABASE_URL = "postgresql://postgres:postgres@db:5432/inventory"

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
