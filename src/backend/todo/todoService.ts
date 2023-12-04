import { instance, Database } from '@/backend/database/database'
import { Todo, TodoItem } from './todoModels'
import { v4 as uuid } from 'uuid'
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

  async ListItems(userId: string, todoId: string): Promise<TodoItem[]> {
    const rows = await this.database.query<TodoItem>(
      'SELECT * FROM todoItem where id = (select id from todo where ownerId=$1 and id= $2)',
      [userId, todoId]
    )
    return rows;
  }

  async Crate(userId: string, title: string, description: string): Promise<string> {
    const newId = uuid()

    await this.database.query(
      'INSERT INTO public.todo(id, ownerid,title, description) values($1,$2,$3,$4)'
      , [newId, userId, title, description])

    return newId;
  }
}

export const todoService = new TodoService(instance)
