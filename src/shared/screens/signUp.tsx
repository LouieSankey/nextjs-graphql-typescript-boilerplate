import React, { useState } from 'react'
import { Colors } from '../ui/constants'
import {
  Container,
  Form,
  FormErrorMessage,
  GoogleButtonContainer,
  GoogleButtonIcon,
  GoogleButtonText,
  Header,
  HeaderText,
  Input,
  InputContainer,
  InputHelperText,
  InputLabelText,
  OrDivider,
  OrDividerContainer,
  OrDividerText,
  ShowPasswordButton,
  SignupContainer,
  SignupLink,
  SignupText
} from './styles'

import {
  StyleSheet
  // @ts-ignore
} from 'react-native-alias'
import { CustomButton } from '../ui/buttons'
import { emailValidator, passwordValidator } from '../util/validator'

const SignUp = ({
  imgSrc,
  mobile,
  navigation,
  signUpGoogle,
  onSubmit,
  authError
}: any) => {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const isError = false // TODO: add error handling

  return (
    <Container style={mobile ? mobileStyles.container : webStyles.container}>
      <Header>
        <HeaderText>Create your free account</HeaderText>
      </Header>

      <Form>
        <InputLabelText>Email</InputLabelText>
        <InputContainer>
          <Input
            value={email}
            onChangeText={(text: React.SetStateAction<string>) =>
              setEmail(text)
            }
            onBlur={(e: any) => setEmailError(emailValidator(email) || '')}
          />
        </InputContainer>
        {emailError !== '' && <FormErrorMessage>{emailError}</FormErrorMessage>}
        <InputLabelText>Password</InputLabelText>
        <InputContainer>
          <Input
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={(text: React.SetStateAction<string>) =>
              setPassword(text)
            }
            onBlur={(e: any) =>
              setPasswordError(passwordValidator(password) || '')
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
        {passwordError !== '' && (
          <FormErrorMessage>{passwordError}</FormErrorMessage>
        )}
        <InputHelperText>
          Password must be 8 or more characters and contain at least 1 number
          and 1 special character (@$!%*?&).
        </InputHelperText>
        <CustomButton
          disabled={false}
          backgroundColor={Colors.blue}
          textColor={Colors.white}
          onPress={(e) => {
            return onSubmit(e, email, password)
          }}
        >
          Sign up
        </CustomButton>
      </Form>
      <OrDividerContainer>
        <OrDivider />
        <OrDividerText>OR</OrDividerText>
        <OrDivider />
      </OrDividerContainer>
      <GoogleButtonContainer
        onPress={
          mobile
            ? () => {
                signUpGoogle({ useProxy: true, showInRecents: true })
              }
            : () => {
                signUpGoogle('google')
              }
        }
      >
        <GoogleButtonIcon source={mobile ? imgSrc : '/images/google.png'} />
        <GoogleButtonText>Continue with Google</GoogleButtonText>
      </GoogleButtonContainer>

      <SignupContainer>
        <SignupText>Already have an account?</SignupText>
        <SignupLink
          onPress={
            mobile
              ? () => navigation.navigate('SignIn', { name: 'SignIn' })
              : () => {
                  navigation.push('/auth/login')
                }
          }
        >
          LOGIN
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

export default SignUp
