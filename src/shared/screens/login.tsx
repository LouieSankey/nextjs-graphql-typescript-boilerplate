import { FormControl, Text } from 'native-base'
import React, { useState } from 'react'
import { CustomButton } from '../ui/buttons'
import { Colors } from '../ui/constants'
import {
  AuthContainer,
  CustomInput,
  FormErrorMessage,
  GoogleButtonIcon,
  Header,
  HeaderText,
  InputLabelText,
  mobileAuthStyles,
  OrDivider,
  OrDividerContainer,
  OrDividerText,
  SignupContainer,
  SignupLink,
  SignupText,
  VerticalSpacer,
  webAuthStyles
} from './auth-styles'

const Login = ({
  imgSrc,
  mobile,
  navigation,
  onSubmit,
  signInGoogle,
  authError
}: any) => {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.nativeEvent.key === 'Enter') {
      onSubmit(e, email, password)
    }
  }

  return (
    <AuthContainer
      style={mobile ? mobileAuthStyles.container : webAuthStyles.container}
    >
      <Header>
        <HeaderText>Sign in to your account</HeaderText>
      </Header>
      <FormControl>
        <InputLabelText>Email</InputLabelText>
        <CustomInput
          nativeID='login-email'
          value={email}
          onChangeText={(text: React.SetStateAction<string>) => {
            setEmail(text)
          }}
          onKeyPress={handleKeyPress}
        />
        <InputLabelText>Password</InputLabelText>
        <CustomInput
          nativeID='login-password'
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChangeText={(text: React.SetStateAction<string>) => {
            setPassword(text)
          }}
          onKeyPress={handleKeyPress}
        />
        {authError !== '' && <FormErrorMessage>{authError}</FormErrorMessage>}
        <VerticalSpacer />
        <CustomButton
          backgroundColor={Colors.brandPrimary}
          textColor={Colors.white}
          hoverColor={Colors.brandSecondary}
          disabled={false}
          onPress={(e) => {
            return onSubmit(e, email, password)
          }}
        >
          Sign in
        </CustomButton>
        <VerticalSpacer />
        <OrDividerContainer>
          <OrDivider />
          <OrDividerText>OR</OrDividerText>
          <OrDivider />
        </OrDividerContainer>
        <CustomButton
          textColor={Colors.black}
          backgroundColor={Colors.white}
          borderColor={Colors.mediumGrey}
          hoverColor={Colors.lightGrey}
          onPress={
            mobile
              ? async () => {
                  await signInGoogle({ useProxy: true, showInRecents: true })
                }
              : async () => {
                  await signInGoogle('google')
                }
          }
        >
          <GoogleButtonIcon
            source={mobile ? imgSrc : { uri: '/images/google.png' }}
          />
          <Text fontSize='lg'> Continue with Google</Text>
        </CustomButton>
      </FormControl>
      <SignupContainer>
        <SignupText>Don't have an account?</SignupText>
        <SignupLink
          onPress={
            mobile
              ? () => navigation.navigate('SignUp', { name: 'Sign up' })
              : () => {
                  navigation.push('/auth/signup')
                }
          }
        >
          LOGIN
        </SignupLink>
      </SignupContainer>
    </AuthContainer>
  )
}

export default Login
