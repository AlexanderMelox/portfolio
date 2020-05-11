import React from 'react'
import Typed from 'react-typed'
import Layout from '../components/layout'
import Container from '../components/common/container'
import { HeroText, Profile } from '../components/profile'
import {
  LandingHero,
  Name,
  SocialList,
  SocialListItem,
} from '../components/landing-hero'
import Projects from '../components/projects'
import { changeColor } from '../utils/keyframes'
import { css } from '@emotion/core'

import { useSiteMetadata, useHeaderHeight } from '../hooks'

const IndexPage = () => {
  const { socialLinks } = useSiteMetadata()
  const headerBarHeight = useHeaderHeight()

  return (
    <Layout>
      <ColorChanger>
        <Container isLandingPage>
          <LandingHero headerBarHeight={headerBarHeight}>
            <h1>
              <Name to="/">
                alexander<span>melo.</span>
              </Name>
            </h1>
            <Profile>
              <HeroText>
                <Typed
                  strings={[
                    'User Experience Engineer working for IBM in Austin.🌵',
                    "Solving user's needs. One prototype at a time. 💪🏼",
                  ]}
                  typeSpeed={40}
                  backSpeed={20}
                  backDelay={1000}
                />
              </HeroText>

              <SocialList>
                {socialLinks.map(link => {
                  return (
                    <SocialListItem>
                      <a
                        rel="noopener noreferrer"
                        href={link.to}
                        target="_blank"
                      >
                        {link.name}
                      </a>
                    </SocialListItem>
                  )
                })}
              </SocialList>
            </Profile>
          </LandingHero>
        </Container>
        <Projects />
      </ColorChanger>
    </Layout>
  )
}

const ColorChanger = ({ children }) => (
  <div
    css={css`
      animation: ${changeColor} 25s infinite alternate;
    `}
  >
    {children}
  </div>
)

export default IndexPage
