import { IAuthProps } from '@/src/util/types'
import { Box, Center, Flex, Stack, Text } from '@chakra-ui/react'
import Link from 'next/link'
import { useState } from 'react'
import SignIn from './SignIn'
import SignUp from './SignUp'

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
            {showSignIn ? (
              <SignIn session={session}></SignIn>
            ) : (
              <SignUp session={session}></SignUp>
            )}
            <Box paddingBottom='4'>
              <Link
                color='teal.500'
                href='#'
                onClick={() => setShowSignIn(!showSignIn)}
              >
                {showSignIn ? (
                  <Text color='black' fontSize='sm'>
                    {' '}
                    Need an account?{' '}
                    <Text as='span' color='blue'>
                      {' '}
                      SIGN UP{' '}
                    </Text>
                  </Text>
                ) : (
                  <Text color='black' fontSize='sm'>
                    Already a user?{' '}
                    <Text as='span' color='blue'>
                      {' '}
                      LOGIN{' '}
                    </Text>
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
