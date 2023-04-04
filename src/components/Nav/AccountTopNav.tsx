import Link from 'next/link'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/router'

import { createStyled } from '@emotion/primitives-core'

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
  // @ts-ignore
} from 'react-native-alias'

import { CustomButton } from '@/src/shared/ui/buttons'
import { Colors } from '@/src/shared/ui/constants'

const AccountTopNav: React.FC = () => {
  const router = useRouter()

  return (
    <Container>
      <LogoContainer>
        <Link href='/splash'>
          <LogoImage source={'/images/logo.png'} alt='Logo' />
        </Link>
      </LogoContainer>
      <RowContainer>
        <CustomButtonWrapper>
          <CustomButton
            textColor={Colors.white}
            backgroundColor={Colors.black}
            borderColor={Colors.mediumGrey}
            hoverColor={Colors.darkGrey}
            onPress={async () => {
              await router.push('/pricing')
            }}
          >
            <NavButtonText>Pricing</NavButtonText>
          </CustomButton>
        </CustomButtonWrapper>
        <CustomButtonWrapper>
          <CustomButton
            textColor={Colors.white}
            backgroundColor={Colors.brandPrimary}
            hoverColor={Colors.brandSecondary}
            onPress={async () => {
              await signOut()
              router.replace('splash')
            }}
          >
            <NavButtonText>Sign Out</NavButtonText>
          </CustomButton>
        </CustomButtonWrapper>
      </RowContainer>
    </Container>
  )
}

const styled = createStyled(StyleSheet)

const Container = styled(View)`
  background-color: ${Colors.bodyPrimary};
  width: 100%;
  padding: 12px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

const RowContainer = styled(View)`
  flex-direction: row;
  align-items: center;
`

const CustomButtonWrapper = styled(View)`
  margin: 8px;
`

const LogoContainer = styled(View)``

const LogoImage = styled(Image)`
  width: 140px;
  height: 60px;
`

const NavButtonText = styled(Text)`
  color: #fff;
  font-size: 16px;
`

export default AccountTopNav
