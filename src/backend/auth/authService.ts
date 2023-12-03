import { instance, Database } from '@/backend/database/database'
import { sign, verify } from './authUtility'
import { AuthResult, AuthUser, AuthToken } from './authModels'

export class AuthService {
  constructor(private database: Database) { }
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

    const token = await sign(user)

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
    try {
      const result = await verify(token);

      return <AuthUser>result.payload;
    } catch (error) {
      return undefined;
    }

  }
}

export const authService = new AuthService(instance)
