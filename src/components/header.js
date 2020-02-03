import React, { useState } from 'react'
import { Link } from 'gatsby'

import Container from './container'
import NavButton from './nav/nav-button'
import Nav from './nav/nav'
import styled from '@emotion/styled'

const StyledHeader = styled.header`
  margin-top: 8rem;
  position: relative;
`

const HeaderContainer = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const StyledLogo = styled(Link)`
  font-size: 2rem;
  font-weight: 300;
  z-index: 200;
`

const Header = props => {
  const [isNavOpen, setIsNavOpen] = useState(false)

  return (
    <StyledHeader>
      <HeaderContainer>
        <StyledLogo to="/">Alexander Melo</StyledLogo>
        <NavButton
          isNavOpen={isNavOpen}
          setIsNavOpen={() => setIsNavOpen(!isNavOpen)}
        />
        <Nav isNavOpen={isNavOpen} />
      </HeaderContainer>
    </StyledHeader>
  )
}

export default Header
