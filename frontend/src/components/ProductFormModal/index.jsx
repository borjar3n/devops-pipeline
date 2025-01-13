import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
  Alert
} from '@mui/material';
import api from '../../services/api';

const ProductFormModal = ({ open, onClose, product, onSuccess }) => {
  const isEdit = Boolean(product);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    sku: '',
    price: '',
    minimum_stock: '5'
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description || '',
        sku: product.sku,
        price: product.price.toString(),
        minimum_stock: product.minimum_stock.toString()
      });
    }
  }, [product]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const data = {
        ...formData,
        price: parseFloat(formData.price),
        minimum_stock: parseInt(formData.minimum_stock)
      };

      if (isEdit) {
        await api.updateProduct(product.id, data);
      } else {
        await api.createProduct(data);
      }

      onSuccess();
      onClose();
    } catch (err) {
      setError(err.response?.data?.detail || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {isEdit ? 'Edit Product' : 'Add New Product'}
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Stack spacing={2}>
            {error && (
              <Alert severity="error" onClose={() => setError(null)}>
                {error}
              </Alert>
            )}
            <TextField
              name="name"
              label="Product Name"
              value={formData.name}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              name="description"
              label="Description"
              value={formData.description}
              onChange={handleChange}
              multiline
              rows={3}
              fullWidth
            />
            <TextField
              name="sku"
              label="SKU"
              value={formData.sku}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              name="price"
              label="Price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              required
              fullWidth
              inputProps={{ min: 0, step: 0.01 }}
            />
            <TextField
              name="minimum_stock"
              label="Minimum Stock"
              type="number"
              value={formData.minimum_stock}
              onChange={handleChange}
              required
              fullWidth
              inputProps={{ min: 0 }}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button 
            type="submit" 
            variant="contained" 
            disabled={loading}
          >
            {isEdit ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ProductFormModal;
