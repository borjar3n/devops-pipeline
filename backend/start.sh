#!/bin/bash

# Inicializar la base de datos
echo "Initializing database..."
python src/init_db.py

# Iniciar la aplicación
echo "Starting application..."
uvicorn src.main:app --host 0.0.0.0 --port 8000 --reload
