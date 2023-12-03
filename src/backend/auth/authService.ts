import { instance, Database } from '@/backend/database/database'
import { SignJWT, jwtVerify, type JWTPayload } from 'jose'

import { AuthResult, AuthUser, AuthToken } from './authModels'

const secretKey: string = process.env.JWT_SECRET ?? ''
const secretKeyStream = new TextEncoder().encode(secretKey)

async function sign(payload: AuthUser, secret: string): Promise<string> {
  const iat = Math.floor(Date.now() / 1000)
  const exp = iat + 60 * 60 // one hour

  return new SignJWT({ payload })
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setExpirationTime(exp)
    .setIssuedAt(iat)
    .setNotBefore(iat)
    .sign(secretKeyStream)
}

export async function verify(
  token: string,
  secret: string
): Promise<JWTPayload> {
  const { payload } = await jwtVerify(token, secretKeyStream)
  // run some checks on the returned payload, perhaps you expect some specific values

  // if its all good, return it, or perhaps just return a boolean
  return payload
}

export class AuthService {
  constructor(private database: Database) {}
  async login(
    username: string,
    password: string
  ): Promise<AuthResult | undefined> {
    const rows = await this.database.query<AuthUser>(
      'SELECT * FROM users WHERE username=$1 and password=$2',
      [username, password]
    )

    if (rows.length == 0) {
      return undefined
    }

    if (rows.length > 1) {
      //catastrophic error!
      throw new Error('catastrophic error')
    }

    const user: AuthUser = rows[0]

    const token = await sign(user, secretKey)

    const auth: AuthToken = {
      token: token,
    }

    const result: AuthResult = {
      user: user,
      auth: auth,
    }

    return result
  }

  async getUser(token: string): Promise<AuthUser | undefined> {
    await verify(token, secretKey)
    return undefined
  }
}

export const authService = new AuthService(instance)
