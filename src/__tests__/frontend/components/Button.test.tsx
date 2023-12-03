import Button from '@/frontend/components/atoms/Button'
import { render, screen } from '@testing-library/react'

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Login</Button>)
    const button = screen.getByText(/login/i)

    expect(button).toBeInTheDocument()
  })
})
