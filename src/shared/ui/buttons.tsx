import { createStyled } from '@emotion/primitives-core'
import React, { useEffect, useRef, useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
  // @ts-ignore
} from 'react-native'
// @ts-ignore
import { Box, useColorMode, useTheme } from 'native-base'

interface ButtonProps {
  buttonStyle: ButtonStyle
  disabled?: boolean
  onPress?: (event: React.MouseEvent<HTMLButtonElement>) => Promise<void>
  children: React.ReactNode
}

interface ButtonStyle {
  background: string
  hover: string
  border: string
  text: string
}

//! to position the CustomButton you should use a wrapper element
export const CustomButton = ({
  buttonStyle,
  disabled,
  onPress,
  children
}: ButtonProps) => {
  const { colors } = useTheme()

  console.log('styles ', buttonStyle)

  //the component code here is what adds the hover effect to the button
  const [color, setColor] = useState(buttonStyle.background)
  const buttonRef = useRef(null)
  const handleMouseEnter = () => {
    setColor(buttonStyle.hover)
  }
  const handleMouseLeave = () => {
    setColor(buttonStyle.background)
  }

  //on web to make it so that the background color can change on hover
  useEffect(() => {
    if (buttonRef.current) {
      try {
        buttonRef.current.style.transition = 'background-color 0.2s ease-in-out'
        buttonRef.current.style.backgroundColor = color
      } catch (error) {}
    }
  }, [color])
  return (
    <Box>
      <BaseButton
        ref={buttonRef}
        backgroundColor={color}
        borderColor={buttonStyle.border}
        onPress={onPress}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <BaseButtonText textColor={buttonStyle.text} fontSize={'20px'}>
          {children}
        </BaseButtonText>
      </BaseButton>
    </Box>
  )
}

const styled = createStyled(StyleSheet)

const BaseButton = styled(TouchableOpacity)`
  width: 100%;
  align-items: center;
  border-radius: 5px;
  opacity: 0.9;
  background-color: ${(props: { backgroundColor: string }) =>
    props.backgroundColor || 'transparent'};
  border: 1px solid ${(props: { borderColor: string }) =>
    props.borderColor || 'transparent'};
  padding: 10px 18px;
  margin 0px;
`

const BaseButtonText = styled(Text)`
  color: ${(props: { textColor: string }) => props.textColor};
  font-size: ${(props: { fontSize: string }) => props.fontSize};
`
