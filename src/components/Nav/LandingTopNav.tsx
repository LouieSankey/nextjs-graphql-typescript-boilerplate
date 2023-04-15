import Link from 'next/link'
import {
  Box,
  Flex,
  HStack,
  Image,
  useColorMode,
  Button,
  useTheme
} from 'native-base'
import { CustomButton } from '@/src/shared/ui/buttons'
import { useRouter } from 'next/router'
import ColorModeSwitch from '@/src/shared/components/colorModeSwitch'
import { NavBar } from './NavBar'

interface Props {
  isLoggedIn: boolean
}

const LandingTopNav: React.FC<Props> = ({ isLoggedIn }) => {
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
          <Box>
            <ColorModeSwitch />
          </Box>
          <CustomButton
            buttonStyle={colors.brandSecondary}
            onPress={async () => {
              await router.push('/pricing')
            }}
          >
            Pricing
          </CustomButton>

          {isLoggedIn ? (
            <CustomButton
              buttonStyle={colors.brandPrimary}
              onPress={async () => {
                await router.push('/')
              }}
            >
              Go to App
            </CustomButton>
          ) : (
            <>
              <CustomButton
                buttonStyle={colors.brandSecondary}
                onPress={async () => {
                  await router.push('/auth/login')
                }}
              >
                Log in
              </CustomButton>

              <CustomButton
                buttonStyle={colors.brandPrimary}
                onPress={async () => {
                  await router.push('/auth/signup')
                }}
              >
                Get Started Free!
              </CustomButton>
            </>
          )}
        </HStack>
      </Box>
    </NavBar>
  )
}

export default LandingTopNav
