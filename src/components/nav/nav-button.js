import React from 'react'
import styled from '@emotion/styled'

const Bar = styled.span`
  position: absolute;
  width: 100%;
  border-radius: 2px;
  height: 2px;
  background-color: #fff;
  left: 0;
  transition: all 200ms;
`

const TopBar = styled(Bar)`
  top: 0;
  transform-origin: left;
  ${props => props.isNavOpen && 'transform: rotate(45deg)'}
`
const BottomBar = styled(Bar)`
  bottom: 0;
  transform-origin: right;
  ${props => props.isNavOpen && 'transform: rotate(45deg);'}
`

const Button = styled.button`
  outline: none;
  border: none;
  width: 2.4rem;
  height: 1.2rem;
  position: relative;
  background-color: transparent;
  cursor: pointer;
  z-index: 200;

  :focus {
    outline: none;
  }
`

const NavButton = ({ setIsNavOpen, isNavOpen }) => {
  return (
    <Button onClick={setIsNavOpen}>
      <TopBar isNavOpen={isNavOpen} />
      <BottomBar isNavOpen={isNavOpen} />
    </Button>
  )
}

export default NavButton
