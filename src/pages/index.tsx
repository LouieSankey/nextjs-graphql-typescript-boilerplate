import { Box } from '@chakra-ui/react'
import { NextPage, NextPageContext } from 'next'
import { getSession, signOut, useSession } from 'next-auth/react'
import Auth from '../components/Auth/AuthWrapper'

const Home: NextPage = () => {
  //when we destructure we can include an alias of our choosing if we wish
  const { data: session } = useSession()

  console.log('the users session: ', session)

  //after we update our username, this is how we let the client know
  const reloadSession = () => {
    const event = new Event('visibilityChange')
    document.dispatchEvent(event)
  }

  return (
    <Box>
      {session?.user?.email ? (
        <button className='signout' onClick={() => signOut()}>
          Sign Out
        </button>
      ) : (
        <Auth session={session} reloadSession={reloadSession} />
      )}
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

  //whatever is returned here gets passed as props to the client
  return {
    props: {
      session
    }
  }
}

export default Home
