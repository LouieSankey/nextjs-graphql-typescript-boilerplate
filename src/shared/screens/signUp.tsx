import React, { useState } from 'react'
import { FormControl, Text, useColorMode, useTheme } from 'native-base'
import { CustomButton } from '../ui/buttons'
import { emailValidator, passwordValidator } from '../sharedUtils/validator'
import {
  AuthContainer,
  FormErrorMessage,
  GoogleButtonIcon,
  Header,
  HeaderText,
  CustomInput,
  InputHelperText,
  InputLabelText,
  OrDivider,
  OrDividerContainer,
  OrDividerText,
  ShowPasswordButton,
  SignupContainer,
  SignupLink,
  SignupText,
  VerticalSpacer,
  mobileAuthStyles,
  webAuthStyles
} from './auth-styles'

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
  const { colors } = useTheme()
  console.log('theme obj', colors)

  return (
    <AuthContainer
      style={mobile ? mobileAuthStyles.container : webAuthStyles.container}
    >
      <Header>
        <HeaderText>Create your free account</HeaderText>
      </Header>
      <FormControl>
        <InputLabelText>Email</InputLabelText>
        <CustomInput
          nativeID='signup-email'
          value={email}
          onChangeText={(text: React.SetStateAction<string>) => setEmail(text)}
          onBlur={(e: any) => setEmailError(emailValidator(email) || '')}
        />
        {emailError !== '' && <FormErrorMessage>{emailError}</FormErrorMessage>}
        <InputLabelText>Password</InputLabelText>
        <CustomInput
          nativeID='signup-password'
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={(text: React.SetStateAction<string>) =>
            setPassword(text)
          }
          onBlur={(e: any) =>
            setPasswordError(passwordValidator(password) || '')
          }
        />
        <ShowPasswordButton
          onPress={() => setShowPassword(!showPassword)}
        ></ShowPasswordButton>
        {authError !== '' && <FormErrorMessage>{authError}</FormErrorMessage>}
        {passwordError !== '' && (
          <FormErrorMessage>{passwordError}</FormErrorMessage>
        )}
        <InputHelperText>
          Password must be 8 or more characters and contain at least 1 number
          and 1 special character (@$!%*?&).
        </InputHelperText>
        <CustomButton
          buttonStyle={colors.buttonPrimary}
          disabled={false}
          onPress={(e) => {
            return onSubmit(e, email, password)
          }}
        >
          Sign up
        </CustomButton>
        <VerticalSpacer />
        <OrDividerContainer>
          <OrDivider />
          <OrDividerText>OR</OrDividerText>
          <OrDivider />
        </OrDividerContainer>
        <CustomButton
          buttonStyle={colors.buttonGoogle}
          onPress={
            mobile
              ? async () => {
                  await signUpGoogle({ useProxy: true, showInRecents: true })
                }
              : async () => {
                  await signUpGoogle('google')
                }
          }
        >
          <GoogleButtonIcon source={mobile ? imgSrc : '/images/google.png'} />
          <Text fontSize='lg'> Continue with Google </Text>
        </CustomButton>
      </FormControl>
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
    </AuthContainer>
  )
}

export default SignUp
