.PHONY: install test lint run-backend build-backend

install:
	cd backend && pip install -r requirements.txt

test:
	cd backend && pytest

lint:
	cd backend && flake8 src
	cd backend && black src --check

format:
	cd backend && black src

run-backend:
	cd backend && uvicorn src.main:app --reload

build-backend:
	docker build -t devops-demo-backend ./backend
