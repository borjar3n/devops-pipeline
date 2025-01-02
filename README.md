# Pipeline DevOps - Proyecto Final

Este proyecto implementa un pipeline completo de CI/CD utilizando modernas prácticas DevOps. El proyecto consiste en una aplicación web con backend en FastAPI y frontend en React, desplegada utilizando contenedores Docker y orquestada con Kubernetes.

## Arquitectura

- **Backend**: FastAPI (Python)
- **Frontend**: React + Vite
- **Base de Datos**: PostgreSQL
- **Cache**: Redis
- **Contenedores**: Docker + Docker Compose
- **Orquestación**: Kubernetes
- **CI/CD**: GitHub Actions
- **Monitorización**: Prometheus + Grafana
- **Seguridad**: HashiCorp Vault
- **Calidad**: SonarQube
- **Testing**: Pytest, Jest, k6

## Requisitos

- Docker & Docker Compose
- Python 3.11+
- Node.js 18+
- Make
- kubectl (para despliegue en K8s)

## Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/usuario/devops-pipeline
cd devops-pipeline
```

2. Instalar dependencias:
```bash
make install
```

3. Configurar variables de entorno:
```bash
cp .env.example .env
# Editar .env con tus valores
```

4. Iniciar el entorno de desarrollo:
```bash
make dev
```

## Comandos Disponibles

- `make install`: Instala todas las dependencias
- `make dev`: Inicia el entorno de desarrollo
- `make test`: Ejecuta todos los tests
- `make lint`: Ejecuta los linters
- `make build`: Construye las imágenes Docker
- `make deploy`: Despliega en producción

## Pipeline CI/CD

El pipeline incluye las siguientes etapas:

1. **Verificación de Código**
   - Linting (flake8, eslint)
   - Formateo (black, prettier)
   - Tests unitarios
   - Análisis de seguridad

2. **Build y Tests**
   - Construcción de imágenes Docker
   - Tests de integración
   - Tests de carga
   - Análisis de calidad (SonarQube)

3. **Despliegue**
   - Automático a staging
   - Manual a producción
   - Monitorización post-despliegue

## Monitorización

- Métricas: http://grafana.localhost
- Logs: http://kibana.localhost
- APM: http://apm.localhost

## Seguridad

- Análisis automático de dependencias
- Escaneo de contenedores
- Gestión segura de secretos con Vault
- SAST y DAST integrados

## Contribuir

1. Fork el repositorio
2. Crear una rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit de cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## Licencia

Distribuido bajo la licencia MIT. Ver `LICENSE` para más información.
