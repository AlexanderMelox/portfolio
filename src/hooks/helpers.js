import { useEffect, useState } from 'react'

export const useHeaderHeight = () => {
  const [height, setHeight] = useState(null)
  const headerClass = `header[class*="StyledHeader"]`

  useEffect(() => {
    const headerHeight = document.querySelector(headerClass).clientHeight
    setHeight(headerHeight)
  }, [])

  return height
}
