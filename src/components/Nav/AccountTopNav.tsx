import ColorModeSwitch from '@/src/shared/components/colorModeSwitch'
import { CustomButton } from '@/src/shared/ui/buttons'
import { Colors } from '@/src/shared/ui/constants'
import { Box, Flex, HStack, Image, useColorMode } from 'native-base'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { NavBar } from './nav-styles'

const AccountTopNav: React.FC = () => {
  const router = useRouter()
  const { colorMode } = useColorMode()

  return (
    <NavBar
      bg={colorMode === 'dark' ? 'darkNavBackground' : 'lightNavBackground'}
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
            textColor={Colors.white}
            backgroundColor={Colors.black}
            borderColor={Colors.mediumGrey}
            hoverColor={Colors.darkGrey}
            onPress={async () => {
              await router.push('/pricing')
            }}
          >
            Pricing
          </CustomButton>
          <ColorModeSwitch />
          <CustomButton
            textColor={Colors.white}
            backgroundColor={Colors.brandPrimary}
            hoverColor={Colors.brandSecondary}
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
