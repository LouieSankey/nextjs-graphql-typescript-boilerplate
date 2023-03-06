import { Box, Button, Center, Flex, Text } from '@chakra-ui/react'
import Link from 'next/link'
import LandingTopNav from '../../components/Nav/LandingTopNav'

const PasswordResetConfirmation: React.FC = () => {
  return (
    <>
      <LandingTopNav isLoggedIn={false}></LandingTopNav>
      <Flex
        height='100vh'
        alignItems='center'
        justifyContent='center'
        flexDirection='column'
      >
        <Text mb={4}>A link to reset your password has been sent.</Text>
        <Link href='/splash'>
          <Button>Return Home</Button>
        </Link>
      </Flex>
    </>
  )
}

export default PasswordResetConfirmation
