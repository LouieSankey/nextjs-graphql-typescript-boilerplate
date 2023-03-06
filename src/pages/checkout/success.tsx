import { Button } from '@chakra-ui/react'
import { NextPage } from 'next'
import Link from 'next/link'

const Success: NextPage = () => {
  return (
    <>
      <div>Success, subscription completed!!</div>
      <Link href='/'>
        <Button>Return to App</Button>
      </Link>
    </>
  )
}

export default Success
