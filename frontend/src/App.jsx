import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Typography,
  Stack,
  CircularProgress,
  Alert,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import DashboardLayout from './layouts/DashboardLayout';
import StatsCards from './components/StatsCards';
import ProductsTable from './components/ProductsTable';
import ProductFormModal from './components/ProductFormModal';
import StockMovementModal from './components/StockMovementModal';
import api from './services/api';

function App() {
  // Estados
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalProducts: 0,
    lowStockItems: 0,
    totalValue: 0,
    monthlyMovements: 0
  });

  // Estados de los modales
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [stockModalOpen, setStockModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [stockModalType, setStockModalType] = useState('in');

  // Cargar datos
  const fetchData = async () => {
    try {
      const [productsResponse, monthlyMovementsResponse] = await Promise.all([
        api.getProducts(),
        api.getMonthlyMovements()
      ]);
      
      const productsData = productsResponse.data;
      setProducts(productsData);
      
      // Calcular estadísticas
      const statsData = {
        totalProducts: productsData.length,
        lowStockItems: productsData.filter(p => p.current_stock <= p.minimum_stock).length,
        totalValue: productsData.reduce((sum, p) => sum + (p.price * p.current_stock), 0),
        monthlyMovements: monthlyMovementsResponse.data.count
      };
      setStats(statsData);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Error loading data. Please try again later.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Manejadores para los modales
  const handleAddProduct = () => {
    setSelectedProduct(null);
    setProductModalOpen(true);
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setProductModalOpen(true);
  };

  const handleAddStock = (product) => {
    setSelectedProduct(product);
    setStockModalType('in');
    setStockModalOpen(true);
  };

  const handleRemoveStock = (product) => {
    setSelectedProduct(product);
    setStockModalType('out');
    setStockModalOpen(true);
  };

  const handleProductModalClose = () => {
    setProductModalOpen(false);
    setSelectedProduct(null);
  };

  const handleStockModalClose = () => {
    setStockModalOpen(false);
    setSelectedProduct(null);
  };

  const handleProductSaved = () => {
    fetchData();
    handleProductModalClose();
  };

  const handleStockUpdated = () => {
    fetchData();
    handleStockModalClose();
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
            onClick={handleAddProduct}
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
            onEdit={handleEditProduct}
            onAddStock={handleAddStock}
            onRemoveStock={handleRemoveStock}
          />
        </Box>

        <ProductFormModal
          open={productModalOpen}
          onClose={handleProductModalClose}
          product={selectedProduct}
          onSuccess={handleProductSaved}
        />

        {selectedProduct && (
          <StockMovementModal
            open={stockModalOpen}
            onClose={handleStockModalClose}
            product={selectedProduct}
            type={stockModalType}
            onSuccess={handleStockUpdated}
          />
        )}
      </Stack>
    </DashboardLayout>
  );
}

export default App;
