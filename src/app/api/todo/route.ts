import { todoService } from '@/backend/todo/todoService';
import { GetUser } from '@/backend/auth/authHttp'
import { Todo } from '@/backend/todo/todoModels'

export async function GET(request: Request) {
  const user = await GetUser(request)
  const todo = await todoService.List(user.id);
  return Response.json(todo)
}

export async function POST(request: Request) {
  const user = await GetUser(request)

  const todo: Todo = await request.json()

  const newId = await todoService.Crate(user.id, todo.title, todo.description)

  return Response.json({ id: newId, title: todo.title, description: todo.description });
}
