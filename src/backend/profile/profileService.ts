import { instance, Database } from '@/backend/database/database'
import { UserProfile } from './profileModels'

export class ProfileService {
  constructor(private database: Database) { }
  async Get(
    userId: string
  ): Promise<UserProfile | undefined> {
    const rows = await this.database.query<UserProfile>(
      'SELECT * FROM users WHERE id=$1',
      [userId]
    )

    if (rows.length == 0) {
      return undefined
    }

    return rows[0];
  }
}

export const profileService = new ProfileService(instance)
