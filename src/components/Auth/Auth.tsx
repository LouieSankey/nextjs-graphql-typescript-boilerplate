import UserOperations from '@/src/shared/graphql/operations/user'
import {
  CreateUsernameData,
  CreateUsernameVariables
} from '@/src/shared/util/types'
import { useMutation } from '@apollo/client'
import { Button, Center, Stack, Text, Image, Input } from '@chakra-ui/react'
import { Session } from 'next-auth'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { toast } from 'react-hot-toast'

interface IAuthProps {
  session: Session | null
  reloadSession: () => void
}
//session, and reloadSession are passed in index.tsx
const Auth: React.FC<IAuthProps> = ({ session, reloadSession }) => {
  const [username, setUsername] = useState('')
  //we could name this createUsername whatever we want, but keep it the same for consistency
  //note - 'data' is mapped to the first interface we pass to useMutation 'CreateUsernameName'
  //this helps TS know what to expect
  const [createUsername, { loading, error }] = useMutation<
    //add typing for data and to the userMutation hook so TS knows
    CreateUsernameData,
    CreateUsernameVariables
  >(UserOperations.Mutations.createUsername)

  const onSubmit = async () => {
    if (!username) return
    try {
      //create username mutation to send our username to the graphql api
      //username here must match the variable declared in your schema with the $ before it
      //note - 'variables' will map to the second interface we pass to useMutation as a generic
      const { data } = await createUsername({ variables: { username } })
      //error handling
      if (!data?.createUsername) {
        throw new Error()
      }
      if (data.createUsername.error) {
        const {
          createUsername: { error }
        } = data

        throw new Error(error)
      }
      //if we make it here, this is a successful response
      toast.success('Username successfully created')
      reloadSession()
    } catch (error: any) {
      toast.error(error?.message)
      console.log('onSubmit error ', error)
    }
  }
  return (
    //center is a Chakra element that centers the content
    <Center height='100vh' border='1px solid red'>
      <Stack align='center' spacing={8}>
        {session ? (
          <>
            <Text fontSize={'3xl'}>Create Username</Text>
            <Input
              placeholder='Enter a username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Button width='100%' onClick={onSubmit} isLoading={loading}>
              Save
            </Button>
          </>
        ) : (
          <>
            <Text fontSize='3xl'>MessengerQL</Text>
            <Button
              onClick={() => signIn('google')}
              leftIcon={
                <Image
                  height='20px'
                  src='/images/googlelogo.png'
                  alt='google logo'
                />
              }
            >
              Continue with Google
            </Button>
          </>
        )}
      </Stack>
    </Center>
  )
}

export default Auth
