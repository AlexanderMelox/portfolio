import React from 'react'
import styled from '@emotion/styled'
import { AnimatePresence, motion } from 'framer-motion'

const StyledNav = styled(motion.nav)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #000;
  z-index: 100;
  color: white;
`

const variants = {
  start: {
    opacity: 0,
  },
  enter: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
}

const Nav = ({ isNavOpen }) => {
  return (
    <AnimatePresence>
      {isNavOpen && (
        <StyledNav
          variants={variants}
          initial="start"
          animate="enter"
          exit="exit"
        >
          nav
        </StyledNav>
      )}
    </AnimatePresence>
  )
}

export default Nav
