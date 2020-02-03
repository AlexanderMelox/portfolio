import React from 'react'
import styled from '@emotion/styled'

const StyledNav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: red;
  z-index: 100;
`

const Nav = ({ isNavOpen }) => {
  return isNavOpen ? <StyledNav>nav</StyledNav> : null
}

export default Nav
