import { getSession, GetSessionParams, signIn as signUp } from 'next-auth/react'
import { useState } from 'react'
import LandingTopNav from '../../components/Nav/LandingTopNav'

import { useRouter } from 'next/router'
import SharedSignUp from '../../shared/screens/signUp'

type ValidatorOptionType = number | boolean

interface IValidatorOption {
  min: number
  max: number
  digits: ValidatorOptionType
  letters: ValidatorOptionType
  lowercase: ValidatorOptionType
  uppercase: ValidatorOptionType
  symbols: ValidatorOptionType
  spaces: ValidatorOptionType
}

const SignUp: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const router = useRouter()
  const [error, setError] = useState('')

  const onSubmit = async (
    event: React.FormEvent,
    email: string,
    password: string
  ) => {
    event.preventDefault()

    //signUp here comes from next-auth as an alias for signIn, not from graphql
    const response = await signUp('sign-up-provider', {
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

      <SharedSignUp
        imgSrc={require('../../shared/images/google.png')}
        mobile={false}
        navigation={router}
        onSubmit={onSubmit}
        signUpGoogle={signUp}
        authError={error}
      ></SharedSignUp>
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

export default SignUp
