import { Button, Center, Image, Stack, Text } from '@chakra-ui/react'
import { Session } from 'next-auth'
import { signIn } from 'next-auth/react'
import Login from './Login'

interface IAuthProps {
  session: Session | null
  reloadSession: () => void
}
//session, and reloadSession are passed in index.tsx
const Auth: React.FC<IAuthProps> = ({ session, reloadSession }) => {
  return (
    //center is a Chakra element that centers the content
    <Center height='100vh' border='1px solid red'>
      <Stack align='center' spacing={8}>
        <Login></Login>
      </Stack>
    </Center>
  )
}

export default Auth
