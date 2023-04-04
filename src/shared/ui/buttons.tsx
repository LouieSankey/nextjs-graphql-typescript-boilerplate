import React, { useState } from 'react'
import { BaseButton, BaseButtonText } from '../screens/styles'

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
  textColor,
  backgroundColor,
  hoverColor,
  borderColor,
  disabled,
  onPress,
  children
}: ButtonProps) => {
  const [color, setColor] = useState(backgroundColor)

  const handleMouseEnter = () => {
    setColor(hoverColor)
  }

  const handleMouseLeave = () => {
    setColor(backgroundColor)
  }

  return (
    <BaseButton
      backgroundColor={color}
      borderColor={borderColor}
      onPress={onPress}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <BaseButtonText textColor={textColor}>{children}</BaseButtonText>
    </BaseButton>
  )
}
