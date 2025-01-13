import axios from 'axios';

const baseURL = 'http://localhost:8000';

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default {
  // Productos
  getProducts: () => api.get('/products/'),
  getProduct: (id) => api.get(`/products/${id}`),
  createProduct: (data) => api.post('/products/', data),
  updateProduct: (id, data) => api.put(`/products/${id}`, data),
  
  // Movimientos
  createMovement: (data) => api.post('/movements/', data),
  
  // Métricas
  getLowStock: () => api.get('/metrics/low-stock'),
  getMonthlyMovements: () => api.get('/metrics/monthly-movements'),
};
