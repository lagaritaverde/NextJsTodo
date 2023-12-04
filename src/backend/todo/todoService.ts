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
      'SELECT * FROM todoItem where todoId = (select id from todo where ownerId=$1 and id= $2)',
      [userId, todoId]
    )
    return rows;
  }

  async Crate(userId: string, title: string, description: string): Promise<string> {
    const newId = uuid()

    await this.database.query(
      'INSERT INTO todo(id, ownerid,title, description) values($1,$2,$3,$4)'
      , [newId, userId, title, description])

    return newId;
  }

  private async BelongToMe(userId: string, todoId: string): Promise<boolean> {
    return await this.database.queryScalar<boolean>(
      'select exists(select 1 from todo where ownerId=$1 and id=$2 limit 1)',
      [userId, todoId]
    )
  }

  async AddItem(userId: string, todoId: string, title: string): Promise<TodoItem | undefined> {

    const belongToMe = await this.BelongToMe(userId, todoId);

    if (!belongToMe) {
      return undefined;
    }

    const newId = uuid()

    await this.database.query(
      'INSERT INTO todoitem(id, todoId, title, done) VALUES ($1, $2, $3, $4)',
      [userId, todoId, title, false]
    )

    return <TodoItem>{ id: newId, toodId: todoId, title: title, done: false }
  };
}

export const todoService = new TodoService(instance)
