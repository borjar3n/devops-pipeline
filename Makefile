.PHONY: install test lint run-backend build-backend install-frontend test-frontend build-frontend

# Backend commands
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

# Frontend commands
install-frontend:
	cd frontend && npm install

test-frontend:
	cd frontend && npm test

build-frontend:
	cd frontend && npm run build

run-frontend:
	cd frontend && npm run dev

# Combined commands
install-all: install install-frontend

test-all: test test-frontend

build-all: build-backend build-frontend
