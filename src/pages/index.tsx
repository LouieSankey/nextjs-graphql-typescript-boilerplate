import { Inter } from '@next/font/google'
import { signIn, signOut, useSession } from 'next-auth/react'

export default function Home() {
  const { data } = useSession()

  console.log('data ', data)

  return (
    <div>
      {data?.user ? (
        <button onClick={() => signOut()}>Sign Out</button>
      ) : (
        <button onClick={() => signIn('google')}>SignIn</button>
      )}
    </div>
  )
}
