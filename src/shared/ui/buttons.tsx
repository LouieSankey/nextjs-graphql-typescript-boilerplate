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
import { BorderRadii, Colors, FontSizes } from '../ui/constants'

interface ButtonProps {
  textColor: string
  backgroundColor: string
  hoverColor?: string
  borderColor?: string
  disabled?: boolean
  onPress?: (event: React.MouseEvent<HTMLButtonElement>) => Promise<void>
  children: React.ReactNode
}

//! to position the CustomButton you should use a wrapper element
export const CustomButton = ({
  textColor = Colors.white,
  backgroundColor = Colors.brandPrimary,
  hoverColor = Colors.brandSecondary,
  borderColor,
  disabled,
  onPress,
  children
}: ButtonProps) => {
  //the component code here is what adds the hover effect to the button
  const [color, setColor] = useState(backgroundColor)
  const buttonRef = useRef(null)
  const handleMouseEnter = () => {
    setColor(hoverColor)
  }
  const handleMouseLeave = () => {
    setColor(backgroundColor)
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
    <View>
      <BaseButton
        ref={buttonRef}
        backgroundColor={color}
        borderColor={borderColor}
        onPress={onPress}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <BaseButtonText textColor={textColor} fontSize={FontSizes.xlarge}>
          {children}
        </BaseButtonText>
      </BaseButton>
    </View>
  )
}

const styled = createStyled(StyleSheet)

const BaseButton = styled(TouchableOpacity)`
  width: 100%;
  align-items: center;
  border-radius: ${BorderRadii.small};
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
