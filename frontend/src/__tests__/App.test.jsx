import React from 'react';
import { render, screen, act } from '@testing-library/react';
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
  beforeEach(async () => {
    await act(async () => {
      render(<App />);
    });
  });

  it('renders header title', () => {
    const title = screen.getByRole('heading', {
      name: /inventory management/i,
    });
    expect(title).toBeDefined();
  });

  it('renders navigation menu items', () => {
    // Buscar por el rol y el nombre del botón
    const dashboardButton = screen.getByRole('button', {
      name: /dashboard/i,
    });
    const productsButton = screen.getByRole('button', {
      name: /products/i,
    });

    expect(dashboardButton).toBeDefined();
    expect(productsButton).toBeDefined();
  });
});
