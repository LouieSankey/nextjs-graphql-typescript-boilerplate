import { NextPage, NextPageContext } from 'next'
import { getSession, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import AccountTopNav from '../components/AccountTopNav'

const Home: NextPage = () => {
  //when we destructure we can include an alias of our choosing if we wish
  const { data: session } = useSession()

  console.log('session ', session)

  const router = useRouter()

  return (
    <>
      <AccountTopNav></AccountTopNav>
    </>
  )
}

//passing our context to server side (this is a replacement for getInitialProps which is older)
export async function getServerSideProps(context: NextPageContext) {
  //not sure why I originally wrote this, check back on the next.js graphql tutorial to see whats up.
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
