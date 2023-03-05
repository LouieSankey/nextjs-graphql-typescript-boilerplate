import { Button, ButtonProps } from '@chakra-ui/react'
import Link from 'next/link'

export const ActionButton = (props: ButtonProps) => (
  <Link href='/checkout'>
    <Button
      colorScheme='blue'
      size='lg'
      w='full'
      fontWeight='extrabold'
      py={{ md: '8' }}
      {...props}
    />
  </Link>
)
