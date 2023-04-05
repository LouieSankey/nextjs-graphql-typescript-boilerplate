import { createStyled } from '@emotion/primitives-core'
import React, { useEffect, useRef, useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
  // @ts-ignore
} from 'react-native-alias'
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
  useEffect(() => {
    if (buttonRef.current) {
      buttonRef.current.style.transition = 'background-color 0.2s ease-in-out'
    }
  }, [])
  return (
    <BaseButton
      style={{ '--bg-color': color }}
      ref={buttonRef}
      backgroundColor={color}
      borderColor={borderColor}
      onPress={onPress}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <BaseButtonChildrenWrapper>
        <BaseButtonText textColor={textColor} fontSize={FontSizes.medium}>
          {children}
        </BaseButtonText>
      </BaseButtonChildrenWrapper>
    </BaseButton>
  )
}

const styled = createStyled(StyleSheet)

const BaseButton = styled(TouchableOpacity)`
  width: 100%;
  align-items: center;
  border-radius: ${BorderRadii.small};
  opacity: 0.9;
  background-color: var(--bg-color);
  border: 1px solid ${(props: { borderColor: string }) =>
    props.borderColor || 'transparent'};
  padding: 10px 18px;
  margin 0px;
`

const BaseButtonText = styled(Text)`
  color: ${(props: { textColor: string }) => props.textColor};
  font-size: ${(props: { fontSize: string }) => props.fontSize};
`

const BaseButtonChildrenWrapper = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`
