import { render, screen } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import App from '../App'

describe('App', () => {
  beforeEach(() => {
    render(<App />)
  })

  it('renders headline', () => {
    const heading = screen.getByText(/DevOps Pipeline Demo/i)
    expect(heading).toBeDefined()
  })

  it('shows loading state initially', () => {
    const loading = screen.getByText(/Loading.../i)
    expect(loading).toBeDefined()
  })
})
