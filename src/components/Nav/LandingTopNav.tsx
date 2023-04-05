import { useSession } from 'next-auth/react'
import Link from 'next/link'
// @ts-ignore
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

import { useRouter } from 'next/router'

interface Props {
  isLoggedIn: boolean
}

const LandingTopNav: React.FC<Props> = ({ isLoggedIn }) => {
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
            Pricing
          </CustomButton>
        </CustomButtonWrapper>

        {isLoggedIn ? (
          <CustomButtonWrapper>
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
          </CustomButtonWrapper>
        ) : (
          <>
            <CustomButtonWrapper>
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
            </CustomButtonWrapper>
            <CustomButtonWrapper>
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
            </CustomButtonWrapper>
          </>
        )}
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

export default LandingTopNav
