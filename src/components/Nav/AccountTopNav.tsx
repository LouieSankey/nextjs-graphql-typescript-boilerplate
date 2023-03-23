import { Box, Button, Flex, Image } from '@chakra-ui/react'
import Link from 'next/link'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/router'

const AccountTopNav: React.FC = () => {
  const router = useRouter()

  return (
    <Flex
      bg='blackAlpha.400'
      w='100%'
      p={1}
      align='center'
      justify='space-between'
    >
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
        <Link href='/pricing'>
          <Button variant='outline' mr={4}>
            Pricing
          </Button>
        </Link>

        <Button
          className='signout'
          onClick={async () => {
            await signOut()
            router.replace('splash')
          }}
        >
          Sign Out
        </Button>
      </Box>
    </Flex>
  )
}

export default AccountTopNav
