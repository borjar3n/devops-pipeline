#!/bin/bash

# Esperar a que la base de datos esté lista
echo "Waiting for database..."
sleep 10

# Inicializar la base de datos
python src/init_db.py

# Iniciar la aplicación
uvicorn src.main:app --host 0.0.0.0 --port 8000
