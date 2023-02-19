import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Image,
  Stack,
  Text
} from '@chakra-ui/react'
import { Session } from 'next-auth'
import Link from 'next/link'
import { useState } from 'react'
import SignIn from './SignIn'
import SignUp from './SignUp'

interface IAuthProps {
  session: Session | null
  reloadSession: () => void
}
//session, and reloadSession are passed in index.tsx
const Auth: React.FC<IAuthProps> = ({ session, reloadSession }) => {
  const [showSignIn, setShowSignIn] = useState(true)

  return (
    //center is a Chakra element that centers the content
    <Center height='100vh' border='1px solid red'>
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
            {showSignIn ? <SignIn></SignIn> : <SignUp></SignUp>}
            <Box paddingBottom='4'>
              <Link
                color='teal.500'
                href='#'
                onClick={() => setShowSignIn(!showSignIn)}
              >
                {showSignIn ? (
                  <Text color='black' fontSize='sm'>
                    {' '}
                    Need an account? SIGN UP
                  </Text>
                ) : (
                  <Text color='black' fontSize='sm'>
                    Already a user? LOGIN
                  </Text>
                )}
              </Link>
            </Box>
          </Stack>
        </Stack>
      </Flex>
    </Center>
  )
}

export default Auth
