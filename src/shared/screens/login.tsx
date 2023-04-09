import React, { useState } from 'react'
import { Colors } from '../ui/constants'
import {
  ForgotPasswordContainer,
  SignupText,
  ForgotPasswordText,
  Form,
  GoogleButtonIcon,
  Header,
  HeaderText,
  Input,
  InputContainer,
  InputLabelText,
  OrDivider,
  OrDividerContainer,
  OrDividerText,
  ShowPasswordButton,
  SignupContainer,
  Container,
  SignupLink,
  FormErrorMessage
} from './styles'

import {
  StyleSheet
  // @ts-ignore
} from 'react-native-alias'
import { CustomButton } from '../ui/buttons'

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
    <Container style={mobile ? mobileStyles.container : webStyles.container}>
      <Header>
        <HeaderText>Sign in to your account</HeaderText>
      </Header>

      <Form>
        <InputLabelText>Email</InputLabelText>
        <InputContainer>
          <Input
            nativeID='login-email'
            value={email}
            onKeyPress={handleKeyPress}
            onChangeText={(text: React.SetStateAction<string>) => {
              setEmail(text)
            }}
          />
        </InputContainer>
        <InputLabelText>Password</InputLabelText>
        <InputContainer>
          <Input
            nativeID='login-password'
            secureTextEntry={!showPassword}
            value={password}
            onKeyPress={handleKeyPress}
            onChangeText={(text: React.SetStateAction<string>) =>
              setPassword(text)
            }
          />
          <ShowPasswordButton onPress={() => setShowPassword(!showPassword)}>
            {/* <ShowPasswordIcon
              source={
                showPassword
                  ? require('../images/eye-open.svg')
                  : require('../images/eye-close.svg')
              }
            /> */}
          </ShowPasswordButton>
        </InputContainer>
        {authError !== '' && (
          <FormErrorMessage nativeID='form-error'>{authError}</FormErrorMessage>
        )}

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
        <ForgotPasswordContainer>
          <ForgotPasswordText>Forgot Password?</ForgotPasswordText>
        </ForgotPasswordContainer>
      </Form>
      <OrDividerContainer>
        <OrDivider />
        <OrDividerText>OR</OrDividerText>
        <OrDivider />
      </OrDividerContainer>
      {/* onPress will allow you to click */}
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
        <GoogleButtonIcon source={mobile ? imgSrc : '/images/google.png'} />
        Continue with Google
      </CustomButton>

      <SignupContainer>
        <SignupText>Need an account?</SignupText>
        <SignupLink
          onPress={
            mobile
              ? () => navigation.navigate('SignUp', { name: 'Sign up' })
              : () => {
                  navigation.push('/auth/signup')
                }
          }
        >
          SIGN UP
        </SignupLink>
      </SignupContainer>
    </Container>
  )
}

const mobileStyles = StyleSheet.create({
  container: {
    width: '100%'
  }
})

const webStyles = StyleSheet.create({
  container: {
    width: '300pt',

    paddingTop: 20,
    paddingBottom: 20
  }
})

export default Login
