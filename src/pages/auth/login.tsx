import { IAuthProps } from '@/src/shared/util/types'
import { useTheme } from '@emotion/react'
import {
  getSession,
  GetSessionParams,
  signIn,
  useSession
} from 'next-auth/react'
import { useEffect, useState } from 'react'
import LandingTopNav from '../../components/Nav/LandingTopNav'

import { useRouter } from 'next/router'
import SharedLogin from '../../shared/screens/login'

const Login: React.FC<IAuthProps> = () => {
  // const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const theme = useTheme()
  const router = useRouter()
  const session = useSession().data
  const [error, setError] = useState('')

  // useEffect(() => {
  //   if (session?.user?.error) {
  //     delete session?.user?.error
  //   }
  // }, [session])

  const onSubmit = async (
    event: React.FormEvent,
    email: string,
    password: string
  ) => {
    event.preventDefault()

    // signIn here comes from next-auth, not graphql
    const response = await signIn('sign-in-provider', {
      redirect: false,
      email,
      password,
      callbackUrl: `${window.location.origin}/`
    })

    if (response?.ok) {
      router.push('/')
    }
    if (response?.error) {
      setError(response.error)
    }
  }

  return (
    <>
      <LandingTopNav isLoggedIn={false}></LandingTopNav>

      <SharedLogin
        imgSrc={require('../../../public/images/google.png')}
        mobile={false}
        navigation={router}
        onSubmit={onSubmit}
        signInGoogle={signIn}
        authError={error}
      ></SharedLogin>
    </>
  )
}

export const getServerSideProps = async (context: GetSessionParams) => {
  const session = await getSession(context)

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }
  return {
    props: {}
  }
}

export default Login
