import styled from '@emotion/styled'

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 80vw 1fr;
  grid-template-areas: 'left-gutter content right-gutter';
  grid-auto-rows: auto;

  & > * {
    grid-area: content;
  }
`

export default Container
