import { Box, Button, Flex, Image } from '@chakra-ui/react'
import Link from 'next/link'
import { signOut } from 'next-auth/react'

const AccountTopNav: React.FC = () => {
  return (
    <Flex
      bg='blackAlpha.400'
      w='100%'
      p={1}
      align='center'
      justify='space-between'
    >
      {/* <Flex flexDirection='row' bg='blackAlpha.400' p={1} justifyContent='right'> */}
      <Box>
        <Link href='/'>
          <Image
            src='/images/logo.png'
            width='140px'
            alt='Logo'
            borderRadius='50%'
          />
        </Link>
      </Box>
      <Box>
        <Link href='/account'>
          <Button variant='outline' mr={4}>
            Account
          </Button>
        </Link>

        <Button className='signout' onClick={() => signOut()}>
          Sign Out
        </Button>
      </Box>
    </Flex>
  )
}

export default AccountTopNav
