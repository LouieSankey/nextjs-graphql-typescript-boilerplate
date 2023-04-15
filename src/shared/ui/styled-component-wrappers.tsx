import { Text } from 'native-base'
import React, { useState } from 'react'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'

const withTouchable = <P extends TouchableOpacityProps>(
  WrappedComponent: React.ComponentType<P>
) => {
  return class extends React.Component<P> {
    render() {
      const { onPress, ...rest } = this.props

      return (
        <TouchableOpacity onPress={onPress}>
          <WrappedComponent {...(rest as P)} />
        </TouchableOpacity>
      )
    }
  }
}

export const withTouchableText = withTouchable(Text)

export const withHover = (WrappedComponent: any) => {
  return (props: any) => {
    const [opacity, setOpacity] = useState(1)

    const handleMouseEnter = () => {
      setOpacity(0.9)
    }

    const handleMouseLeave = () => {
      setOpacity(1)
    }

    return (
      <TouchableOpacity
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ opacity }}
      >
        <WrappedComponent {...props} />
      </TouchableOpacity>
    )
  }
}

export const withHoverOpacity = withHover(TouchableOpacity)
