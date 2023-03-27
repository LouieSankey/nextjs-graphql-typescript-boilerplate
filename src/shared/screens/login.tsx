import React, { useState } from 'react'
import { Colors } from '../ui/constants'
import {
  ForgotPasswordContainer,
  SignupText,
  ForgotPasswordText,
  Form,
  GoogleButtonContainer,
  GoogleButtonIcon,
  GoogleButtonText,
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

  return (
    <Container style={mobile ? mobileStyles.container : webStyles.container}>
      <Header>
        <HeaderText>Sign in to your account</HeaderText>
      </Header>

      <Form>
        <InputLabelText>Email</InputLabelText>
        <InputContainer>
          <Input
            value={email}
            onChangeText={(text: React.SetStateAction<string>) => {
              setEmail(text)
            }}
          />
        </InputContainer>
        <InputLabelText>Password</InputLabelText>
        <InputContainer>
          <Input
            secureTextEntry={!showPassword}
            value={password}
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
        {authError !== '' && <FormErrorMessage>{authError}</FormErrorMessage>}

        <CustomButton
          backgroundColor={Colors.blue}
          textColor={Colors.white}
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
      <GoogleButtonContainer
        onPress={
          mobile
            ? () => {
                signInGoogle({ useProxy: true, showInRecents: true })
              }
            : () => {
                signInGoogle('google')
              }
        }
      >
        <GoogleButtonIcon source={mobile ? imgSrc : '/images/google.png'} />
        <GoogleButtonText>Continue with Google</GoogleButtonText>
      </GoogleButtonContainer>

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
