import React from 'react'
import styled from '@emotion/styled'
import { motion } from 'framer-motion'

const Button = styled.button`
  outline: none;
  border: none;
  width: 2.4rem;
  height: 1.2rem;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
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
    <Button onClick={() => setIsNavOpen(prevState => !prevState)}>
      <motion.div
        style={{ width: '24px', height: '2px', background: 'white' }}
        variants={{
          closed: {
            rotate: 0,
            y: 0,
          },
          open: {
            y: 5,
            rotate: 45,
          },
        }}
        initial={false}
        animate={isNavOpen ? 'open' : 'closed'}
      />
      <motion.div
        style={{ width: '24px', height: '2px', background: 'white' }}
        initial={false}
        variants={{
          closed: {
            rotate: 0,
            y: 0,
          },
          open: {
            y: -5,
            rotate: -45,
          },
        }}
        animate={isNavOpen ? 'open' : 'closed'}
      />
    </Button>
  )
}

export default NavButton
