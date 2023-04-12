import { CustomButton } from '@/src/shared/ui/buttons'
import { Colors } from '@/src/shared/ui/constants'
import { Box, Flex, HStack, Image } from 'native-base'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const AccountTopNav: React.FC = () => {
  const router = useRouter()

  return (
    <Flex
      direction='row'
      alignItems='center'
      height={16}
      backgroundColor='black'
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
    </Flex>
  )
}

export default AccountTopNav
