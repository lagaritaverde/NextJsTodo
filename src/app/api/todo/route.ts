import { todoService } from '@/backend/todo/todoService';
import { GetUser } from '@/backend/auth/authHttp'

export async function GET(request: Request) {
  const user = await GetUser(request)
  const todo = await todoService.List(user.id);
  return Response.json(todo)
}

export async function POST(request: Request) {
  await request.json()

  return Response.json({ data: request.headers.get('authorization') })
}
