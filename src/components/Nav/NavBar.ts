import { createStyled } from '@emotion/primitives-core'
import { Flex } from 'native-base'
import { StyleSheet } from 'react-native'

const styled = createStyled(StyleSheet)

export const NavBar = styled(Flex)`
  flex-direction: row;
  align-items: center;
  height: 60px;
`
