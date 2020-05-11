import styled from '@emotion/styled'
import { motion } from 'framer-motion'

export const Profile = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const HeroText = styled.h2`
  color: var(--color);
  min-height: 23vw;
  max-height: 35rem;
  font-size: 7vw;
  margin-bottom: 2rem;
  transition: color 2s ease-in-out;
`
