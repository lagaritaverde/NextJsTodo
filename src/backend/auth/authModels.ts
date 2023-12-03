export type AuthUser = {
  id: string
  name: string
  username: string
  email: string
  surname: string
}

export type AuthToken = {
  token: string
}

export type AuthResult = {
  user: AuthUser
  auth: AuthToken
}
