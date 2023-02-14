import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { FaUserAlt, FaLock } from 'react-icons/fa'
import UserOperations from '@/src/graphql/operations/user'
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Link,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement,
  Image
} from '@chakra-ui/react'
import { useMutation } from '@apollo/client'
import { CreateUserData, CreateUserInput } from '@/src/util/types'

const CFaUserAlt = chakra(FaUserAlt)
const CFaLock = chakra(FaLock)

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleShowClick = () => setShowPassword(!showPassword)

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    //signIn here comes from next-auth, not graphql
    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
      callbackUrl: `${window.location.origin}`
    })
  }

  return (
    <Flex
      flexDirection='column'
      width='100wh'
      height='50vh'
      justifyContent='center'
      alignItems='center'
    >
      <Stack
        flexDir='column'
        mb='2'
        backgroundColor='whiteAlpha.900'
        justifyContent='center'
        alignItems='center'
      >
        <Avatar bg='teal.500' />
        <Heading color='teal.400'>Welcome</Heading>
        <Box minW={{ base: '90%', md: '468px' }}>
          <form onSubmit={onSubmit}>
            <Stack
              spacing={4}
              p='1rem'
              backgroundColor='whiteAlpha.900'
              boxShadow='md'
            >
              <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents='none'>
                    <CFaUserAlt color='gray.300' />
                  </InputLeftElement>

                  <Input
                    type='email'
                    placeholder='Email Address'
                    color='blackAlpha.800'
                    _placeholder={{ color: 'gray.300' }}
                    border='1px'
                    borderColor='gray.200'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents='none' color='gray.300'>
                    <CFaLock color='gray.300' />
                  </InputLeftElement>

                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Password'
                    color='blackAlpha.800'
                    _placeholder={{ color: 'gray.300' }}
                    border='1px'
                    borderColor='gray.200'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={handleShowClick}>
                      {showPassword ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormHelperText textAlign='right'>
                  <Link>forgot password?</Link>
                </FormHelperText>
              </FormControl>
              <Button
                borderRadius={0}
                type='submit'
                variant='solid'
                colorScheme='teal'
                width='full'
              >
                Login
              </Button>
              <Button
                onClick={() => signIn('google')}
                border='1px'
                color='black'
                borderColor='black'
                className='signin-button'
                leftIcon={
                  <Image height='20px' src='/google.png' alt='google logo' />
                }
              >
                Sign in with Google
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box>
        New to us?{' '}
        <Link color='teal.500' href='#'>
          Sign Up
        </Link>
      </Box>
    </Flex>
  )
}

export default Login
