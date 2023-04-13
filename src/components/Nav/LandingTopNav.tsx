import Link from 'next/link'
import { Box, Flex, HStack, Image, useColorMode, Button } from 'native-base'
import { CustomButton } from '@/src/shared/ui/buttons'
import { Colors } from '@/src/shared/ui/constants'
import { useRouter } from 'next/router'
import ColorModeSwitch from '@/src/shared/components/colorModeSwitch'
import { NavBar } from './nav-styles'

interface Props {
  isLoggedIn: boolean
}

const LandingTopNav: React.FC<Props> = ({ isLoggedIn }) => {
  const router = useRouter()
  const { colorMode } = useColorMode()

  return (
    <NavBar bg={colorMode === 'dark' ? 'darkBackground' : 'lightBackground'}>
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

          {isLoggedIn ? (
            <CustomButton
              textColor={Colors.white}
              backgroundColor={Colors.brandPrimary}
              hoverColor={Colors.brandSecondary}
              onPress={async () => {
                await router.push('/')
              }}
            >
              Go to App
            </CustomButton>
          ) : (
            <>
              <CustomButton
                textColor={Colors.white}
                backgroundColor={Colors.black}
                borderColor={Colors.white}
                hoverColor={Colors.darkGrey}
                onPress={async () => {
                  await router.push('/auth/login')
                }}
              >
                Log in
              </CustomButton>

              <CustomButton
                textColor={Colors.white}
                backgroundColor={Colors.brandPrimary}
                hoverColor={Colors.brandSecondary}
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
