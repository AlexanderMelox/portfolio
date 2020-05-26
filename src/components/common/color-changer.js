import React from 'react'
import { css } from '@emotion/core'
import { changeColor } from '../../utils/keyframes'

const ColorChanger = ({ children }) => (
  <div
    css={css`
      animation: ${changeColor} 15s infinite alternate;
    `}
  >
    {children}
  </div>
)

export default ColorChanger
