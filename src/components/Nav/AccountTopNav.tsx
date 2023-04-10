import Link from 'next/link'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/router'
import { createStyled } from '@emotion/primitives-core'
import {
  StyleSheet,
  View,
  Image
  // @ts-ignore
} from 'react-native-alias'
import { CustomButton } from '@/src/shared/ui/buttons'
import { Colors } from '@/src/shared/ui/constants'
import { useTheme } from '@emotion/react'

const AccountTopNav: React.FC = () => {
  const router = useRouter()
  const theme = useTheme()

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
            Pricing
          </CustomButton>
        </CustomButtonWrapper>
        <CustomButtonWrapper>
          <CustomButton
            textColor={Colors.white}
            backgroundColor={theme.colors.primary}
            hoverColor={Colors.brandSecondary}
            onPress={async () => {
              await signOut()
              router.replace('splash')
            }}
          >
            Sign Out
          </CustomButton>
        </CustomButtonWrapper>
      </RowContainer>
    </Container>
  )
}

const styled = createStyled(StyleSheet)

const Container = styled(View)`
  background-color: ${(props) => props.theme.colors.backgroundPrimary};
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

export default AccountTopNav
