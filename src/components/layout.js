import React from 'react'
import { Global, css } from '@emotion/core'
import styled from '@emotion/styled'
import Helmet from 'react-helmet'

import Header from './header'
import Container from './common/container'

import useSiteMetadata from '../hooks/useSiteMetadata'

const globalStyles = css`
  @import url('https://fonts.googleapis.com/css?family=Montserrat:300,400,400i,700,900&display=swap');
  @font-face {
    font-family: 'Dank Mono';
    src: url('../fonts/DankMono-Regular.otf');
  }

  :root {
    /* Typography */
    --default-font-size: 1.6rem;
    --code-font-family: 'Dank Mono', monospace;
    --body-font-family: -apple-system, BlinkMacSystemFont, 'Montserrat',
      'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
      'Helvetica Neue', sans-serif;
    --primary-font-family: 'Montserrat', -apple-system, BlinkMacSystemFont,
      'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
      'Helvetica Neue', sans-serif;

    /* Colors */
    --licorice: #131217;
    --gainsboro: #d9d7e0;
    --rebecca-purple: #663399;
    --just-white: rgba(255, 255, 255, 0.8);

    --page-background-color: var(--licorice);
    /* UI colors */
    --text-color-lighter: var(--just-white);
    --text-color-darker: var(--gainsboro);

    --primary-color: var(--rebecca-purple);
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 62.5%;
  }

  body,
  html {
    margin: 0;
    color: var(--text-color-lighter);
    font-family: var(--body-font-family);
  }

  body {
    font-size: 1.8rem;
    line-height: 1.6;
    font-weight: 300;
    background: var(--page-background-color);
  }

  a {
    color: var(--text-color-lighter);
    text-decoration: none;
    transition: all 0.2s ease;
    padding-bottom: 3px;

    background-image: linear-gradient(currentColor, currentColor);
    background-repeat: no-repeat;
    background-size: 50% 1px;
    background-position: bottom;

    &:hover {
      color: #fff;
      background-size: 100% 1px;
    }
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: var(--primary-font-family);
    font-weight: 700;
    line-height: 1.1;
  }
`

const Main = styled(Container)``

const Layout = ({ children }) => {
  const { title, author, description } = useSiteMetadata()

  return (
    <>
      <Global styles={globalStyles} />
      <Helmet>
        <html lang="en"></html>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="author" content={author} />
      </Helmet>
      <Header />
      <Main>{children}</Main>
    </>
  )
}

export default Layout
