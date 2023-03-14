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
import SharedLogin from '../../shared/auth/login'

const Login: React.FC<IAuthProps> = () => {
  // const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const theme = useTheme()
  const router = useRouter()
  const session = useSession().data
  const [error, setError] = useState('')

  // const isError =
  //   session?.user?.error && email.length !== 0 && password.length !== 0

  useEffect(() => {
    if (session?.user?.error) {
      delete session?.user?.error
    }
    console.log('client side session ', session)
  }, [session])

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

      {/* <Center height='100vh'>
        <Flex
          flexDirection='column'
          height='50vh'
          justifyContent='center'
          alignItems='center'
        >
          <Stack align='center' spacing={8}>
            <Stack
              flexDir='column'
              mb='2'
              backgroundColor='white'
              justifyContent='center'
              alignItems='center'
            >
              <Box minW='400px'>
                <form onSubmit={onSubmit}>
                  <Stack
                    spacing={4}
                    p='1rem'
                    // backgroundColor='whiteAlpha.900'
                  >
                    <Text color='brand.primary' fontSize='x-large'>
                      Sign in
                    </Text>
                    <FormControl isInvalid={isError}>
                      <FormLabel color='black'>Email</FormLabel>
                      <InputGroup>
                        <Input
                          type='email'
                          color='blackAlpha.800'
                          border='1px'
                          borderColor='gray.200'
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </InputGroup>
                    </FormControl>

                    <FormControl isInvalid={isError}>
                      <FormLabel color='black'>Password</FormLabel>

                      <InputGroup>
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          color='blackAlpha.800'
                          _placeholder={{ color: 'gray.300' }}
                          border='1px'
                          borderColor='gray.200'
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </InputGroup>
                      <FormErrorMessage>Invalid Credentials.</FormErrorMessage>

                      <Checkbox
                        marginTop='3'
                        marginLeft='1'
                        borderColor='gray.200'
                        color='black'
                      >
                        Remember me?
                      </Checkbox>
                      <Button
                        marginTop='5'
                        type='submit'
                        variant='solid'
                        colorScheme='brandPallet'
                        width='full'
                        color='white'
                      >
                        Sign in
                      </Button>

                      <FormHelperText textAlign='right'>
                        <ChakraLink color='black' href='password-reset'>
                          Forgot Password?
                        </ChakraLink>
                      </FormHelperText>
                    </FormControl>

                    <Flex align='center'>
                      <Divider borderColor='gray.500' />
                      <Text padding='2' color='gray.500' fontSize='sm'>
                        OR
                      </Text>
                      <Divider borderColor='gray.500' />
                    </Flex>
                    <Button
                      onClick={() => signIn('google')}
                      border='1px'
                      color='black'
                      borderColor='gray.300'
                      className='signin-button'
                      leftIcon={
                        <Image
                          height='20px'
                          src='/images/google.png'
                          alt='google logo'
                        />
                      }
                    >
                      Continue with Google
                    </Button>
                  </Stack>
                </form>
              </Box>
              <Box paddingBottom='4'>
                <Text color='black' fontSize='sm'>
                  Need an account?
                  <Link color='teal.500' href='signup'>
                    {' '}
                    SIGN UP
                  </Link>
                </Text>
              </Box>
            </Stack>
          </Stack>
        </Flex>
      </Center> */}
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
