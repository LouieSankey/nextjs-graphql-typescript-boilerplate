//by naming the file the same as the next-auth package we can overwrite it's type definitions
import 'next-auth'
//declare module allows us to add custom types and interfaces to the next auth library
//and modify the ones that exist
declare module 'next-auth' {
  //these will merge with the default interfaces so we can add properties
  interface Session {
    user: User
  }
  interface User {
    id: string
    username: string
    error?: Error
  }
}
