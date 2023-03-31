import { Session } from '@/globalTypes/types'
import { useQuery } from '@apollo/client'
import { Button } from '@chakra-ui/react'
import { NextPage } from 'next'
import {
  getSession,
  GetSessionParams,
  signIn,
  useSession
} from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Operations from './../../shared/graphql/operations'

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

export const getServerSideProps = async (context: GetSessionParams) => {
  const session = await getSession(context)

  return {
    props: {}
  }
}

export default Success
