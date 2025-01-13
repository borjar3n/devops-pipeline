import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
  Alert,
  Typography
} from '@mui/material';
import api from '../../services/api';

const StockMovementModal = ({ open, onClose, product, type, onSuccess }) => {
  const [quantity, setQuantity] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await api.createMovement({
        product_id: product.id,
        quantity: parseInt(quantity),
        type: type,
        notes: notes.trim() || undefined
      });

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
        {type === 'in' ? 'Add Stock' : 'Remove Stock'}
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Stack spacing={2}>
            {error && (
              <Alert severity="error" onClose={() => setError(null)}>
                {error}
              </Alert>
            )}
            
            <Typography variant="subtitle1">
              Product: {product?.name}
              <br />
              Current Stock: {product?.current_stock}
            </Typography>

            <TextField
              label="Quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
              fullWidth
              inputProps={{ min: 1 }}
            />
            
            <TextField
              label="Notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              multiline
              rows={3}
              fullWidth
              placeholder="Optional notes about this movement"
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button 
            type="submit" 
            variant="contained" 
            color={type === 'in' ? 'primary' : 'error'}
            disabled={loading}
          >
            {type === 'in' ? 'Add Stock' : 'Remove Stock'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default StockMovementModal;
