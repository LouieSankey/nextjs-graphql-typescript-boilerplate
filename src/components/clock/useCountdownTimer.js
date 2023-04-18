import { useEffect, useRef, useState } from 'react'

const useCountdownTimer = (initialTime) => {
  const [time, setTime] = useState(initialTime)
  const workerRef = useRef(null)
  const isRunningRef = useRef(false)
  const [renderTimestamp, setRenderTimestamp] = useState(Date.now())

  useEffect(() => {
    workerRef.current = new Worker(new URL('./clock.worker', import.meta.url))
    workerRef.current.addEventListener('message', onWorkerMessage)
    return () => {
      workerRef.current.terminate()
    }
  }, [])

  const start = () => {
    isRunningRef.current = true
    workerRef.current.postMessage({ message: 'start', time })
  }

  const pause = () => {
    isRunningRef.current = false
    //have to use setRenderTimestamp because 'time' will still be the same, but we need a rerender
    setRenderTimestamp(Date.now())
    workerRef.current.postMessage({ message: 'pause', time })
  }

  const reset = () => {
    isRunningRef.current = false
    setTime(initialTime)
    workerRef.current.postMessage({ message: 'pause', time: initialTime })
  }

  const skip = () => {
    isRunningRef.current = false
    setTime(0)
    workerRef.current.postMessage({ message: 'pause', time: 0 })
  }

  const onWorkerMessage = (event) => {
    const newTime = event.data
    setTime(event.data)

    console.log(event.data)

    if (newTime <= 0 && isRunningRef.current) {
      isRunningRef.current = false
      workerRef.current.postMessage({ message: 'pause', time: 0 })
    }
  }

  return { time, start, pause, reset, skip, isRunning: isRunningRef.current }
}

export default useCountdownTimer
