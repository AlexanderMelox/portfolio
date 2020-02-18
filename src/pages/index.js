import React from 'react'
import styled from '@emotion/styled'
import { Link } from 'gatsby'
import Layout from '../components/layout'
import Portrait from '../components/portrait'

const Intro = styled.div`
  padding: 10rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
`

const H1 = styled.h1`
  margin-top: 10rem;
`

const Lead = styled.p`
  margin-top: 2.5rem;
  font-size: 2rem;
`

const LearnMoreButton = styled(Link)`
  overflow: hidden;
  position: relative;
  cursor: pointer;
  margin-top: 1rem;
`

const IndexPage = () => {
  return (
    <Layout>
      <Intro>
        <Portrait />
        <H1>Hi, I'm Alex 👋🏼</H1>
        <Lead>
          I'm a UX Engineer at{' '}
          <a target="_blank" href="https://ibm.com">
            IBM
          </a>
          . I write code and I make shit happen.
        </Lead>
        <LearnMoreButton to="/about">Learn more about me</LearnMoreButton>
      </Intro>
    </Layout>
  )
}

export default IndexPage
