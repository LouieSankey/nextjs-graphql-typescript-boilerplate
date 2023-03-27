import { ScreenOptions, ScreenSize } from '../util/types'

export const getMedia = (size: ScreenSize, screen: ScreenOptions) => {
  switch (size.screenSize) {
    case 'mobile':
      console.log('mobile')
      return screen.mobile
    case 'tablet':
      console.log('tablet')
      return screen.tablet
    case 'desktop':
      console.log('desktop')
      return screen.desktop
    default:
      break
  }
}
