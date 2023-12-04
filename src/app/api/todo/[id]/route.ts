import { todoService } from '@/backend/todo/todoService';
import { TodoItem } from '@/backend/todo/todoModels';
import { GetUser } from '@/backend/auth/authHttp'

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const user = await GetUser(request)

  const list = await todoService.ListItems(user.id, params.id);

  return Response.json(list)
}

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const user = await GetUser(request)
  const responseItem = <TodoItem>(await request.json());

  const item = await todoService.AddItem(user.id, params.id, responseItem.title);

  if (item == undefined) {
    return new Response('401 Unauthorized', { status: 401 });
  }

  return Response.json(item)
}

