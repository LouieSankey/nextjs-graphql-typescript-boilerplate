import { Button, Text } from '@chakra-ui/react'
import { NextPage } from 'next'
import Link from 'next/link'

const Cancel: NextPage = () => {
  return (
    <>
      <Text>Payment canceled, you have not been charged!</Text>
      <Link href='/'>
        <Button>Return to App</Button>
      </Link>
    </>
  )
}

export default Cancel
