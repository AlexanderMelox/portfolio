import styled from '@emotion/styled'

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 80vw 1fr;
  grid-auto-rows: auto;
  width: 100%;

  ${({ isLandingPage }) =>
    isLandingPage &&
    `
    position: fixed;
    left: 0;
  `}

  & > * {
    grid-column: 2 / 3;
  }
`

export default Container
