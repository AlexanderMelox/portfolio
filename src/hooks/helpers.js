import { useEffect, useState } from 'react'

export const useHeaderHeight = () => {
  const [height, setHeight] = useState('320px')
  const headerClass = `header[class*="StyledHeader"]`

  useEffect(() => {
    const headerHeight = document.querySelector(headerClass).clientHeight
    setHeight(headerHeight)
  }, [])

  return height
}
