import { getSession, GetSessionParams, signIn as signUp } from 'next-auth/react'
import { useState } from 'react'
import LandingTopNav from '../../components/Nav/LandingTopNav'

import { useRouter } from 'next/router'
import SharedSignUp from '../../shared/auth/signup'

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
                  <Stack spacing={4} p='1rem' backgroundColor='whiteAlpha.900'>
                    <Text color='brand.primary' fontSize='x-large'>
                      Sign up
                    </Text>
                    <FormControl
                      isRequired
                      isInvalid={emailError !== '' && emailError !== null}
                    >
                      <FormLabel color='black'>Email</FormLabel>
                      <InputGroup>
                        <Input
                          type='email'
                          color='blackAlpha.800'
                          _placeholder={{ color: 'gray.300' }}
                          border='1px'
                          borderColor='gray.200'
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          onBlur={(e) =>
                            setEmailError(emailValidator(email) || '')
                          }
                        />
                      </InputGroup>
                      {emailError !== '' && (
                        <FormErrorMessage>{emailError}</FormErrorMessage>
                      )}
                    </FormControl>
                    <FormControl
                      isRequired
                      isInvalid={passwordError !== '' && passwordError !== null}
                    >
                      <FormLabel color='black'>Password</FormLabel>
                      <InputGroup>
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          placeholder=''
                          color='blackAlpha.800'
                          _placeholder={{ color: 'gray.300' }}
                          border='1px'
                          borderColor='gray.200'
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          onBlur={(e) =>
                            setPasswordError(passwordValidator(password) || '')
                          }
                        />
                      </InputGroup>
                      {passwordError !== '' && passwordError !== null ? (
                        <FormErrorMessage textAlign='left' width='350px'>
                          {passwordError}
                        </FormErrorMessage>
                      ) : (
                        <FormHelperText
                          textAlign='left'
                          fontSize='xs'
                          color='grey'
                          width='350px'
                        >
                          Password must be 8 or more characters and contain at
                          least 1 number and 1 special character (@$!%*?&).
                        </FormHelperText>
                      )}
                    </FormControl>

                    <Button
                      borderRadius={0}
                      type='submit'
                      variant='solid'
                      colorScheme='brandPallet'
                      width='full'
                      color='white'
                    >
                      Sign up
                    </Button>
                    <Flex align='center'>
                      <Divider borderColor='gray.500' />
                      <Text padding='2' color='gray.500' fontSize='sm'>
                        OR
                      </Text>
                      <Divider borderColor='gray.500' />
                    </Flex>
                    <Button
                      onClick={() => signUp('google')}
                      border='1px'
                      color='black'
                      borderColor='black'
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
                  Already a user?
                  <Link color='teal.500' href='login'>
                    {' '}
                    SIGN IN
                  </Link>
                </Text>

                {/* <Link color='teal.500' href='login'>
                  <Text color='black' fontSize='sm'>
                    {' '}
                    Already a user?{' '}
                    <Text as='span' color='blue'>
                      {' '}
                      LOGIN{' '}
                    </Text>
                  </Text>
                </Link> */}
      {/* </Box>
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

export default SignUp
