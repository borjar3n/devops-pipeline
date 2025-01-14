from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import Base
from database import SQLALCHEMY_DATABASE_URL
import time

def init_db():
    # Esperar a que la base de datos esté lista
    max_retries = 5
    for i in range(max_retries):
        try:
            engine = create_engine(SQLALCHEMY_DATABASE_URL)
            Base.metadata.create_all(bind=engine)
            print("Database initialized successfully!")
            return
        except Exception as e:
            if i < max_retries - 1:
                print(f"Failed to connect to database, retrying in 5 seconds... ({str(e)})")
                time.sleep(5)
            else:
                print(f"Failed to initialize database after {max_retries} attempts")
                raise

if __name__ == "__main__":
    init_db()
