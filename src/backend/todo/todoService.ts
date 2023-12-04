import { instance, Database } from '@/backend/database/database'
import { Todo } from './todoModels'

export class TodoService {
  constructor(private database: Database) { }
  async List(
    userId: string
  ): Promise<Todo[]> {
    const rows = await this.database.query<Todo>(
      'SELECT * FROM todo WHERE ownerId=$1',
      [userId]
    )
    return rows;
  }
}

export const todoService = new TodoService(instance)
