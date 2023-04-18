import React, { useEffect } from 'react'
import useCountdownTimer from './useCountdownTimer'
import { Box, Button, Container } from 'native-base'
import { Header } from 'react-native/Libraries/NewAppScreen'
import { Text } from 'react-native'

const CountdownTimer = () => {
  const { time, start, pause, reset, skip, isRunning } = useCountdownTimer(40)
  useEffect(() => {
    console.log('isRunning', isRunning)
  }, [isRunning])

  return (
    <Container>
      {/* <Header>
        <Text>Countdown Timer: {time}</Text>
      </Header>
      <Box>
        <Button onPress={start} disabled={isRunning}>
          <Text>Start Timer</Text>
        </Button>
        <Button onPress={pause} disabled={!isRunning}>
          <Text>Pause Timer</Text>
        </Button>
        <Button onPress={skip}>
          <Text>Finish Timer</Text>
        </Button>
        <Button onPress={reset}>
          <Text>Reset Timer</Text>
        </Button>
      </Box> */}
    </Container>
  )
}

export default CountdownTimer
