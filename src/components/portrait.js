import React from 'react'
import styled from '@emotion/styled'
import me from '../images/me.png'

const StyledImg = styled.img`
  width: 17.6rem;
  height: 17.6rem;
  border-radius: 50%;
`

const Portrait = () => {
  return (
    // <Img
    //   fixed={data.file.childImageSharp.fixed}
    //   alt="Animoji of Alexander Melo"
    // />
    <StyledImg src={me} />
  )
}

export default Portrait
