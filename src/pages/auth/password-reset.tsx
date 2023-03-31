import { IAuthProps } from '@/src/shared/sharedUtils/types'
import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  Stack,
  Text
} from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import LandingTopNav from '../../components/Nav/LandingTopNav'

const PasswordReset: React.FC<IAuthProps> = ({ session }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const isError =
    session?.user?.error && email.length !== 0 && password.length !== 0

  useEffect(() => {
    if (session?.user?.error) {
      delete session?.user?.error
    }
  }, [session])

  const router = useRouter()

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    //send the reset email and redirect to the confirmation page
    router.replace('/auth/password-reset-confirmation')
  }

  return (
    <>
      <LandingTopNav isLoggedIn={false}></LandingTopNav>
      <Center height='100vh'>
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
                      Reset your password
                    </Text>
                    <Text color='black' width='400px'>
                      Please enter the email address associated with your
                      account.
                    </Text>
                    <FormControl>
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
                      <Button
                        marginTop='5'
                        type='submit'
                        variant='solid'
                        colorScheme='brandPallet'
                        width='full'
                        color='white'
                      >
                        Send Email
                      </Button>
                    </FormControl>

                    <Flex align='center'>
                      <Divider borderColor='gray.500' />
                      <Text padding='2' color='gray.500' fontSize='sm'>
                        OR
                      </Text>
                      <Divider borderColor='gray.500' />
                    </Flex>
                  </Stack>
                </form>
              </Box>
              <Box paddingBottom='4'>
                <Text color='black' fontSize='sm'>
                  Need an account?
                  <Link color='brand.primary' href='signup'>
                    {' '}
                    SIGN UP
                  </Link>
                </Text>
              </Box>
            </Stack>
          </Stack>
        </Flex>
      </Center>
    </>
  )
}

export default PasswordReset
