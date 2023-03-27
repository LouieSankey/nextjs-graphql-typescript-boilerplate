// @ts-ignore
import { View, Text, TouchableOpacity } from 'react-native-alias'
import React, { useState } from 'react'

const Counter = () => {
  const [count, setCount] = useState(10)

  const incrementCount = () => {
    setCount(count + 1)
  }

  const decrementCount = () => {
    setCount(count - 1)
  }

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <TouchableOpacity onPress={decrementCount} style={{ padding: 10 }}>
        <Text style={{ fontSize: 20 }}>-</Text>
      </TouchableOpacity>
      <Text style={{ fontSize: 20, marginHorizontal: 10 }}>{count}</Text>
      <TouchableOpacity onPress={incrementCount} style={{ padding: 10 }}>
        <Text style={{ fontSize: 20 }}>+</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Counter
