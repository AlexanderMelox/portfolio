import styled from '@emotion/styled'
import { Link } from 'gatsby'

export const Button = styled(Link)`
  font: inherit;
  border-radius: 4px;
  padding: 0.5rem 2rem;
  color: var(--text-color-lighter);
  font-weight: 300;
  margin-bottom: 1.25rem;
  box-shadow: 12px 12px 16px 0 rgba(0, 0, 0, 0.25),
    -8px -8px 12px 0 rgba(255, 255, 255, 0.3);
`

export const PrimaryButton = styled(Button)`
  background-color: var(--onyx);
`
