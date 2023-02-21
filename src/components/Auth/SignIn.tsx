import { IAuthProps } from '@/src/util/types'
import {
  Box,
  Button,
  Checkbox,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Image,
  Input,
  InputGroup,
  Link,
  Stack,
  Text
} from '@chakra-ui/react'
import { signIn } from 'next-auth/react'
import { useEffect, useState } from 'react'

const SignIn: React.FC<IAuthProps> = ({ session, reloadSession }) => {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const isError =
    session?.user?.error && email.length !== 0 && password.length !== 0

  useEffect(() => {
    if (session?.user?.error) {
      delete session?.user?.error
    }
  }, [session])

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    //signIn here comes from next-auth, not graphql
    await signIn('sign-in-provider', {
      redirect: false,
      email,
      password,
      callbackUrl: `${window.location.origin}`
    })
  }

  return (
    <>
      <Box minW='400px'>
        <form onSubmit={onSubmit}>
          <Stack
            spacing={4}
            p='1rem'
            // backgroundColor='whiteAlpha.900'
          >
            <Text color='teal.400' fontSize='x-large'>
              LOGIN
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
                colorScheme='teal'
                width='full'
                color='white'
              >
                LOGIN
              </Button>
              {/* <Text color='black'> Forgot Password?</Text> */}

              <FormHelperText textAlign='right'>
                <Link color='black'>Forgot Password?</Link>
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

export default SignIn
