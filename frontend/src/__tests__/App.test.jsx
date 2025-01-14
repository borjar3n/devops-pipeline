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

  it('renders application title', () => {
    const title = screen.getByText('Inventory Management');
    expect(title).toBeDefined();
  });

  it('renders navigation menu items', () => {
    // Usando getAllByRole para obtener todos los botones
    const dashboardButton = screen.getAllByRole('button').find(
      button => button.textContent === 'Dashboard'
    );
    const productsButton = screen.getAllByRole('button').find(
      button => button.textContent === 'Products'
    );

    expect(dashboardButton).toBeDefined();
    expect(productsButton).toBeDefined();
  });
});
