import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock axios
vi.mock('axios', () => ({
  default: {
    get: vi.fn(() => Promise.resolve({ data: { message: 'Hello DevOps!' } }))
  }
}))
