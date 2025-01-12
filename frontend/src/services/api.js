import axios from 'axios';

const baseURL = process.env.NODE_ENV === 'production' 
  ? '/api' 
  : 'http://localhost:8000';

const axiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const api = {
  // Productos
  getProducts: () => axiosInstance.get('/products/'),
  getProduct: (id) => axiosInstance.get(`/products/${id}`),
  createProduct: (data) => axiosInstance.post('/products/', data),
  updateProduct: (id, data) => axiosInstance.put(`/products/${id}`, data),
  
  // Movimientos
  createMovement: (data) => axiosInstance.post('/movements/', data),
  
  // Métricas
  getLowStock: () => axiosInstance.get('/metrics/low-stock'),
};

export default api;
