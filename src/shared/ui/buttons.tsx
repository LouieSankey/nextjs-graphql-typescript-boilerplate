import React, { useState } from 'react'
import { BaseButton, BaseButtonText } from '../screens/styles'

interface ButtonProps {
  textColor: string
  backgroundColor: string
  disabled: boolean
  onPress: (event: React.MouseEvent<HTMLButtonElement>) => Promise<void>
  children: React.ReactNode
}

//! to position the CustomButton you should use a wrapper element
export const CustomButton = ({
  textColor,
  backgroundColor,
  disabled,
  onPress,
  children
}: ButtonProps) => {
  return (
    <BaseButton backgroundColor={backgroundColor} onPress={onPress}>
      <BaseButtonText textColor={textColor}>{children}</BaseButtonText>
    </BaseButton>
  )
}
