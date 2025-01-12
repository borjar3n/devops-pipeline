import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Typography,
  Stack,
  CircularProgress,
  Alert
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import DashboardLayout from './layouts/DashboardLayout';
import StatsCards from './components/StatsCards';
import ProductsTable from './components/ProductsTable';
import api from './services/api';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalProducts: 0,
    lowStockItems: 0,
    totalValue: 0,
    monthlyMovements: 0
  });

  const fetchProducts = async () => {
    try {
      const response = await api.getProducts();
      const productsData = response.data;
      setProducts(productsData);
      
      // Calcular estadísticas
      const statsData = {
        totalProducts: productsData.length,
        lowStockItems: productsData.filter(p => p.current_stock <= p.minimum_stock).length,
        totalValue: productsData.reduce((sum, p) => sum + (p.price * p.current_stock), 0),
        monthlyMovements: 0 // Esto se podría obtener de una API separada
      };
      setStats(statsData);
      setLoading(false);
    } catch (err) {
      setError('Error loading products. Please try again later.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEdit = (product) => {
    console.log('Edit product:', product);
  };

  const handleAddStock = (product) => {
    console.log('Add stock to:', product);
  };

  const handleRemoveStock = (product) => {
    console.log('Remove stock from:', product);
  };

  if (loading) {
    return (
      <DashboardLayout>
        <Box 
          display="flex" 
          justifyContent="center" 
          alignItems="center" 
          minHeight="80vh"
        >
          <CircularProgress />
        </Box>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <Stack spacing={3}>
        {error && (
          <Alert severity="error" onClose={() => setError(null)}>
            {error}
          </Alert>
        )}

        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h4" gutterBottom>
            Dashboard
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => console.log('Add new product')}
          >
            Add Product
          </Button>
        </Box>

        <StatsCards stats={stats} />

        <Box>
          <Typography variant="h5" gutterBottom>
            Products
          </Typography>
          <ProductsTable
            products={products}
            onEdit={handleEdit}
            onAddStock={handleAddStock}
            onRemoveStock={handleRemoveStock}
          />
        </Box>
      </Stack>
    </DashboardLayout>
  );
}

export default App;
