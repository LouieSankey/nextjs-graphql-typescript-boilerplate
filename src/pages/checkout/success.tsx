import { Button } from '@chakra-ui/react'
import { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

const Success: NextPage = () => {
  const session = useSession()

  return (
    <>
      <div>
        Success!! you've been upgraded to <b>{session.data?.user.tier}</b>
      </div>
      <Link href='/'>
        <Button>Return to App</Button>
      </Link>
    </>
  )
}

export default Success
