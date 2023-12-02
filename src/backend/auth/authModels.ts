export interface AuthUser {
    id: string,
    name: string,
    username: string,
    email: string,
    surname: string
}

export interface AuthToken {
    token: string
}

export interface AuthResult {
    user: AuthUser,
    auth: AuthToken
}