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

interface Props {
  isLoggedIn: boolean
}

const LandingTopNav: React.FC<Props> = ({ isLoggedIn }) => {
  return (
    <Container>
      <LogoContainer>
        <Link href='/splash'>
          <LogoImage source={'/images/logo.png'} alt='Logo' />
        </Link>
      </LogoContainer>
      <RowContainer>
        <Link href='/pricing'>
          <CustomButtonWrapper>
            <TouchableOpacity
              textColor={Colors.white}
              backgroundColor={Colors.black}
              borderColor={Colors.mediumGrey}
              hoverColor={Colors.darkGrey}
            >
              <NavButtonText>Pricing</NavButtonText>
            </TouchableOpacity>
          </CustomButtonWrapper>
        </Link>

        {isLoggedIn ? (
          <Link href='/'>
            <CustomButtonWrapper>
              <TouchableOpacity
                textColor={Colors.white}
                backgroundColor={Colors.brandPrimary}
                hoverColor={Colors.brandSecondary}
              >
                <NavButtonText>Go to App</NavButtonText>
              </TouchableOpacity>
            </CustomButtonWrapper>
          </Link>
        ) : (
          <>
            <Link href='/auth/login'>
              <CustomButtonWrapper>
                <TouchableOpacity
                  textColor={Colors.white}
                  backgroundColor={Colors.black}
                  borderColor={Colors.white}
                  hoverColor={Colors.darkGrey}
                >
                  <NavButtonText>Log in</NavButtonText>
                </TouchableOpacity>
              </CustomButtonWrapper>
            </Link>
            <Link href='/auth/signup'>
              <CustomButtonWrapper>
                <TouchableOpacity
                  textColor={Colors.white}
                  backgroundColor={Colors.brandPrimary}
                  hoverColor={Colors.brandSecondary}
                >
                  <NavButtonText>Get Started Free!</NavButtonText>
                </TouchableOpacity>
              </CustomButtonWrapper>
            </Link>
          </>
        )}
      </RowContainer>
    </Container>
  )
}

const styled = createStyled(StyleSheet)

const Container = styled(View)`
  background-color: #1a202c;
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
  width: 60px;
  height: 60px;
`

const NavButtonText = styled(Text)`
  color: #fff;
  font-size: 16px;
`

export default LandingTopNav
