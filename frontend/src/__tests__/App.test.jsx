import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import App from '../App';

// Mock de las respuestas de la API
vi.mock('../services/api', () => ({
  default: {
    getProducts: vi.fn().mockResolvedValue({ 
      data: [] 
    }),
    getMonthlyMovements: vi.fn().mockResolvedValue({ 
      data: { count: 0 } 
    })
  }
}));

describe('App', () => {
  beforeEach(() => {
    render(<App />);
  });

  it('renders dashboard title', () => {
    const title = screen.getByText('Inventory Management');
    expect(title).toBeDefined();
  });

  it('renders main navigation items', () => {
    const dashboard = screen.getByText('Dashboard');
    const products = screen.getByText('Products');
    expect(dashboard).toBeDefined();
    expect(products).toBeDefined();
  });
});
