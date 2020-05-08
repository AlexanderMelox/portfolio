import styled from '@emotion/styled'
import { Link } from 'gatsby'

export const LandingHero = styled.section`
  width: 100%;
  height: 98vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  color: var(--text-01);
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

export const SocialList = styled.ul`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

export const SocialListItem = styled.li`
  margin-right: 1rem;
  font-weight: 400;
  font-size: calc(1rem + 1vw);

  a:link,
  a:visited {
    color: var(--text-inverted);
  }
`
