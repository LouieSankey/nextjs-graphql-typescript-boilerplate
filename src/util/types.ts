//user in the useMutation hook for creating a user
export interface CreateUsernameData {
  createUsername: {
    success: boolean
    error: string
  }
}
export interface CreateUsernameVariables {
  username: string
}
