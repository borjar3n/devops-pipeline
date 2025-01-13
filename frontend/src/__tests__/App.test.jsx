import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from '../App';

// Mock axios
vi.mock('axios', () => ({
  default: {
    create: () => ({
      get: vi.fn(() => Promise.resolve({ 
        data: {
          message: 'Welcome to the Inventory API',
          count: 0
        }
      }))
    })
  }
}));

describe('App', () => {
  beforeEach(() => {
    render(<App />);
  });

  it('renders loading state initially', () => {
    const loading = screen.getByText(/loading/i);
    expect(loading).toBeDefined();
  });
});
