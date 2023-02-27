import { Box, Text } from '@chakra-ui/react'
import { NextPage, NextPageContext } from 'next'
import { getSession, signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const Home: NextPage = () => {
  //when we destructure we can include an alias of our choosing if we wish
  const { data: session } = useSession()

  const router = useRouter()

  return (
    <Box>
      <button className='signout' onClick={() => signOut()}>
        Sign Out
      </button>
    </Box>
  )
}

//passing our context to server side
export async function getServerSideProps(context: NextPageContext) {
  const cookie = context.req?.headers.cookie
  if (cookie) {
    const sessionCookie = cookie
      .split(';')
      .find((c) => c.trim().startsWith('session='))
    const sigCookie = cookie
      .split(';')
      .find((c) => c.trim().startsWith('session.sig='))

    if (sessionCookie) {
      const sessionString = sessionCookie.split('=')[1]

      const session = JSON.parse(
        Buffer.from(sessionString, 'base64').toString()
      )
      // use the session here
    }
  }
  // ...

  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: '/splash',
        permanent: false
      }
    }
  }

  //whatever is returned here gets passed as props to the client
  return {
    props: {
      session
    }
  }
}

export default Home
