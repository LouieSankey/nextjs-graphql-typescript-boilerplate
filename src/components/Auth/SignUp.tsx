import { IAuthProps } from '@/src/util/types'
import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Image,
  Input,
  InputGroup,
  Stack,
  Text
} from '@chakra-ui/react'
import { signIn as signUp } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { emailValidator, passwordValidator } from '../../util/validator'

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

const SignUp: React.FC<IAuthProps> = ({ session, reloadSession }) => {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  useEffect(() => {
    console.log(emailError, passwordError)
  }, [emailError, passwordError])

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    //signUp here comes from next-auth as an alias for signIn, not from graphql
    await signUp('sign-up-provider', {
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
          <Stack spacing={4} p='1rem' backgroundColor='whiteAlpha.900'>
            <Text color='teal.400' fontSize='x-large'>
              SIGN UP
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
                  onBlur={(e) => setEmailError(emailValidator(email))}
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
                  onBlur={(e) => setPasswordError(passwordValidator(password))}
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
                  Password must be 8 or more characters and contain at least 1
                  number and 1 special character (@$!%*?&).
                </FormHelperText>
              )}
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
