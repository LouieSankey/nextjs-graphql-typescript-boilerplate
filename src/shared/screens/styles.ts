import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image
  // @ts-ignore
} from 'react-native-alias'
// @ts-ignore
import { BorderRadii, Colors, FontSizes } from '../ui/constants'
// @ts-ignore
import { createStyled } from '@emotion/primitives-core'
import {
  withTouchableText,
  withHoverOpacity
} from '../ui/styled-component-wrappers'

const styled = createStyled(StyleSheet)

export const Container = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding-horizontal: 20px;
  background-color: ${Colors.white};
`

export const Header = styled(View)`
  align-items: center;
  margin-bottom: 20px;
`

export const HeaderText = styled(Text)`
  font-size: ${FontSizes.xlarge};
  font-weight: bold;
`

export const Form = styled(View)`
  width: 100%;
  margin-bottom: 20px;
`

export const FormErrorMessage = styled(Text)`
  margin-top: -6px;
  margin-bottom: 10px;
  color: ${Colors.red};
`

export const InputContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  border-width: 1px;
  border-color: ${Colors.lightGrey};
  border-radius: ${BorderRadii.small};
  margin-bottom: 10px;
  width: 100%;
`

export const InputHelperText = styled(Text)`
  color: grey;
  margin-bottom: 20px;
  font-size: ${FontSizes.small};
`

export const InputLabelText = styled(Text)`
  padding-bottom: 5px;
  margin-bottom: 10px;
`

export const Input = styled(TextInput)`
  flex: 1;
  padding: 10px;
  color: black;
`

export const ShowPasswordButton = styled(TouchableOpacity)`
  padding: 5px;
`

export const ShowPasswordIcon = styled(Image)`
  width: 20px;
  height: 20px;
`

// export const GoogleButtonContainer = styled(TouchableOpacity)`
//   flex-direction: row;
//   align-items: center;
//   justify-content: center;
//   background-color: ${Colors.mediumGrey};
//   padding: 10px;
//   border-radius: ${BorderRadii.small};
//   border-color: ${Colors.lightGrey};
//   border-width: 1px;
//   margin-bottom: 10px;
//   width: 100%;
// `

// export const GoogleButtonText = styled(Text)`
//   font-size: ${FontSizes.medium};
//   font-weight: bold;
//   color: ${Colors.darkGrey};
//   margin-left: 10px;
// `

export const GoogleButtonIcon = styled(Image)`
  width: 20px;
  height: 20px;
  margin-right: 6px;
  margin-left: -6px;
  margin-bottom: -4px;
`

export const ForgotPasswordContainer = styled(View)`
  align-items: flex-end;
`

export const ForgotPasswordText = styled(withTouchableText)`
  color: ${Colors.brandPrimary};
  font-size: ${FontSizes.medium};
  margin-top: 10px;
`

export const OrDividerContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
`

export const OrDivider = styled(View)`
  flex: 1;
  height: 1px;
  background-color: ${Colors.lightGrey};
`

export const OrDividerText = styled(Text)`
  padding-horizontal: 10px;
  font-size: ${FontSizes.medium};
  color: ${Colors.mediumGrey};
`

export const SignupContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
`

export const SignupText = styled(Text)`
  margin-right: 5px;
  font-size: ${FontSizes.medium};
`

export const SignupLink = styled(withTouchableText)`
  color: #007aff;
  font-size: 16px;
`
