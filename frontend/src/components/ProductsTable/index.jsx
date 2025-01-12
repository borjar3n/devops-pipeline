import React from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
  Chip
} from '@mui/material';
import {
  Edit as EditIcon,
  Add as AddIcon,
  Remove as RemoveIcon
} from '@mui/icons-material';

const ProductsTable = ({ products, onEdit, onAddStock, onRemoveStock }) => {
  const getStockStatus = (currentStock, minimumStock) => {
    if (currentStock <= 0) {
      return <Chip label="Out of Stock" color="error" size="small" />;
    }
    if (currentStock <= minimumStock) {
      return <Chip label="Low Stock" color="warning" size="small" />;
    }
    return <Chip label="In Stock" color="success" size="small" />;
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>SKU</TableCell>
            <TableCell>Name</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Current Stock</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.sku}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell align="right">
                ${product.price.toFixed(2)}
              </TableCell>
              <TableCell align="right">
                {product.current_stock}
              </TableCell>
              <TableCell>
                {getStockStatus(product.current_stock, product.minimum_stock)}
              </TableCell>
              <TableCell align="center">
                <Tooltip title="Edit">
                  <IconButton 
                    size="small"
                    onClick={() => onEdit(product)}
                  >
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Add Stock">
                  <IconButton 
                    size="small" 
                    color="success"
                    onClick={() => onAddStock(product)}
                  >
                    <AddIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Remove Stock">
                  <IconButton 
                    size="small" 
                    color="error"
                    onClick={() => onRemoveStock(product)}
                  >
                    <RemoveIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductsTable;
