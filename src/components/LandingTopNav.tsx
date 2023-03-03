import { Box, Button, Flex, Image } from '@chakra-ui/react'
import Link from 'next/link'

const LandingTopNav: React.FC = () => {
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
        <Link href='/upgrade'>
          <Button variant='outline' mr={4}>
            Pricing
          </Button>
        </Link>
        <Link href='/login'>
          <Button variant='outline' mr={4}>
            Log in
          </Button>
        </Link>
        <Link href='/signup'>
          <Button colorScheme={'brandPallet'}>Get Started Free!</Button>
        </Link>
      </Box>
    </Flex>
  )
}

export default LandingTopNav
