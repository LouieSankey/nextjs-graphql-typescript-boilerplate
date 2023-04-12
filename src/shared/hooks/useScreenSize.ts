import { useState, useEffect } from 'react'
// @ts-ignore
import { useWindowDimensions } from 'react-native'

export const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState('mobile')
  const { width } = useWindowDimensions()
  useEffect(() => {
    const handleResize = () => {
      console.log(width)
      if (width < 768) {
        setScreenSize('mobile')
      } else if (width < 1024) {
        setScreenSize('tablet')
      } else {
        setScreenSize('desktop')
      }
    }
    handleResize()
  }, [width])

  return screenSize
}
