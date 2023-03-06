import { Box, Button, Flex, Image } from '@chakra-ui/react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
interface Props {
  isLoggedIn: boolean
}

const LandingTopNav: React.FC<Props> = ({ isLoggedIn }) => {
  const { data: session } = useSession()

  return (
    <Flex
      bg='blackAlpha.700'
      w='100%'
      p={1}
      align='center'
      justify='space-between'
    >
      <Box>
        <Link href='/splash'>
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

        {isLoggedIn ? (
          <Link href='/'>
            <Button colorScheme={'brandPallet'}>Go to App</Button>
          </Link>
        ) : (
          <>
            <Link href='/auth/login'>
              <Button variant='outline' mr={4}>
                Log in
              </Button>
            </Link>
            <Link href='/auth/signup'>
              <Button colorScheme={'brandPallet'}>Get Started Free!</Button>
            </Link>
          </>
        )}
      </Box>
    </Flex>
  )
}

export default LandingTopNav
