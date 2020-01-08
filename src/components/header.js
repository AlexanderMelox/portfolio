import React from 'react'
import { Link } from 'gatsby'

import Container from './container'
import NavButton from './nav/nav-button'
import Nav from './nav/nav'
import { css } from '@emotion/core'

const Header = props => {
  return (
    <header>
      <Container>
        <div
          css={css`
            display: flex;
            align-items: center;
            justify-content: space-between;
          `}
        >
          <Link to="/">Alexander Melo</Link>
          <NavButton />
        </div>
      </Container>
    </header>
  )
}

export default Header
