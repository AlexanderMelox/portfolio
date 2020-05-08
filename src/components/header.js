import React, { useState } from 'react'
import { Link } from 'gatsby'

import Container from './common/container'
import NavButton from './nav/nav-button'
import Nav from './nav/nav'
import styled from '@emotion/styled'

const StyledHeader = styled.header`
  padding: 3rem 0;
  width: 100%;
  position: ${({ navFixed }) => (navFixed ? 'fixed' : 'relative')};
`

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const StyledLogo = styled(Link)`
  font-size: 2rem;
  font-weight: 700;
  font-family: var(--primary-font-family);
  background: none;

  :link,
  :visited {
    color: #fff;
  }
`

const Header = ({ navFixed }) => {
  const [isNavOpen, setIsNavOpen] = useState(false)

  return (
    <StyledHeader navFixed={navFixed}>
      <Container>
        <HeaderContainer>
          <StyledLogo to="/">melo.</StyledLogo>
          <NavButton
            isNavOpen={isNavOpen}
            setIsNavOpen={() => setIsNavOpen(!isNavOpen)}
          />
          <Nav isNavOpen={isNavOpen} />
        </HeaderContainer>
      </Container>
    </StyledHeader>
  )
}

export default Header
