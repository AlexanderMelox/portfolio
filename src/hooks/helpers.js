import { useEffect, useState } from 'react'

export const useHeaderHeight = () => {
  const [height, setHeight] = useState(92)
  const headerClass = `header[class*="StyledHeader"]`

  useEffect(() => {
    if (window) {
      const headerHeight = document.querySelector(headerClass).clientHeight
      setHeight(headerHeight)
    }
  }, [])

  return height
}
