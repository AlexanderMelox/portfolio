import styled from '@emotion/styled'
import { Link } from 'gatsby'
import { motion } from 'framer-motion'

export const LandingHero = styled.section`
  height: calc(
    99vh -
      ${({ headerBarHeight }) =>
        headerBarHeight ? headerBarHeight + 'px' : '0'}
  );
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  color: var(--text-01);

  h1 {
    margin-bottom: 1rem;
  }
`

export const Name = styled(Link)`
  font-size: 4vw;
  font-weight: 100;
  font-family: var(--body-heading-family);

  span {
    font-weight: 600;
  }
`

export const LandingHeroContainer = styled.div`
  margin: 0 auto;
`

export const SocialList = styled(motion.ul)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

export const SocialListItem = styled(motion.li)`
  margin-right: calc(1.2rem + 1vw);
  font-weight: 400;
  font-size: calc(1rem + 1vw);

  a:link,
  a:visited {
    color: var(--text-inverted);
  }
`
