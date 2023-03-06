import { Box, Button, Flex, Image } from '@chakra-ui/react'
import { GetServerSidePropsContext } from 'next'
import { getSession } from 'next-auth/react'
import LandingTopNav from '../components/Nav/LandingTopNav'

interface Props {
  isLoggedIn: boolean
}

const Splash: React.FC<Props> = ({ isLoggedIn }) => {
  return (
    <>
      <LandingTopNav isLoggedIn={isLoggedIn} />
      <Box>Splash Page</Box>
    </>
  )
}

export const getServerSideProps = async (
  ctx: GetServerSidePropsContext
): Promise<{ props: Props }> => {
  const session = await getSession(ctx)

  return {
    props: {
      isLoggedIn: !!session
    }
  }
}

export default Splash
