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
  Image,
  Divider,
  Text,
  FormLabel
} from '@chakra-ui/react'

const CFaUserAlt = chakra(FaUserAlt)
const CFaLock = chakra(FaLock)

const SignUp = () => {
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
    <>
      <Heading color='teal.400'>Sign Up</Heading>
      <Box minW={{ base: '90%', md: '468px' }}>
        <form onSubmit={onSubmit}>
          <Stack spacing={4} p='1rem' backgroundColor='whiteAlpha.900'>
            <FormControl>
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
                />
              </InputGroup>
            </FormControl>
            <FormControl>
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
                />
              </InputGroup>
            </FormControl>

            <Button
              borderRadius={0}
              type='submit'
              variant='solid'
              colorScheme='teal'
              width='full'
              color='white'
            >
              Sign Up
            </Button>
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
              borderColor='black'
              className='signin-button'
              leftIcon={
                <Image height='20px' src='/google.png' alt='google logo' />
              }
            >
              Continue with Google
            </Button>
          </Stack>
        </form>
      </Box>
    </>
  )
}

export default SignUp
