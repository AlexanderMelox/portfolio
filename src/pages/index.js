import React from 'react'
import Layout from '../components/layout'
import { HeroText, Profile } from '../components/profile'
import {
  LandingHero,
  Name,
  SocialList,
  SocialListItem,
} from '../components/landing-hero'

import { useSiteMetadata } from '../hooks'

const IndexPage = () => {
  const { socialLinks } = useSiteMetadata()

  return (
    <Layout navFixed>
      <LandingHero>
        <h1>
          <Name to="/">
            alexander<span>melo.</span>
          </Name>
        </h1>
        <Profile>
          <HeroText>
            User Experience Engineer working for IBM in Austin, Texas.
          </HeroText>
          <SocialList>
            {socialLinks.map(link => (
              <SocialListItem>
                <a rel="noopener noreferrer" href={link.to} target="_blank">
                  {link.name}
                </a>
              </SocialListItem>
            ))}
          </SocialList>
        </Profile>
      </LandingHero>
    </Layout>
  )
}

export default IndexPage
