import ColorModeSwitch from '@/src/shared/components/colorModeSwitch'
import { CustomButton } from '@/src/shared/ui/buttons'
import { Box, Flex, HStack, Image, useColorMode, useTheme } from 'native-base'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { NavBar } from './NavBar'

const AccountTopNav: React.FC = () => {
  const router = useRouter()
  const { colorMode } = useColorMode()
  const { colors } = useTheme()

  return (
    <NavBar
      bg={
        colorMode === 'dark' ? 'darkBackgroundAccent' : 'lightBackgroundAccent'
      }
    >
      <Box paddingLeft={4}>
        <Link href='/splash'>
          <Image
            source={{ uri: '/images/logo.png' }}
            alt='Logo'
            w={140}
            h={60}
          />
        </Link>
      </Box>
      <Box flex={1} alignItems='flex-end'>
        <HStack space={4} paddingRight={4}>
          <CustomButton
            buttonStyle={colors.brandSecondary}
            onPress={async () => {
              await router.push('/pricing')
            }}
          >
            Pricing
          </CustomButton>
          <ColorModeSwitch />
          <CustomButton
            buttonStyle={colors.brandPrimary}
            onPress={async () => {
              await signOut()
              router.replace('splash')
            }}
          >
            Sign Out
          </CustomButton>
        </HStack>
      </Box>
    </NavBar>
  )
}

export default AccountTopNav
