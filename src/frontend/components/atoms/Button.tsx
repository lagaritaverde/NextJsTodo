import { colors } from '@/frontend/styles/colors'
import { ButtonHTMLAttributes, FC } from 'react'
import styled from 'styled-components'

type TButton = ButtonHTMLAttributes<HTMLButtonElement>

const StyledButton = styled.button<TButton>`
  display: flex;
  border-radius: 1rem;
  padding: 1rem 2.5rem;
  border: 1px solid ${colors.primaryLight};
  color: ${colors.secondary};

  &:hover {
    background-color: ${colors.primary};
  }
`

const Button: FC<TButton> = ({ children }) => {
  return <StyledButton>{children}</StyledButton>
}

export default styled(Button)``
