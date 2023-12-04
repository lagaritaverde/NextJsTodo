import { todoService } from '@/backend/todo/todoService';
import { GetUser } from '@/backend/auth/authHttp'

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const user = await GetUser(request)

  const list = await todoService.ListItems(user.id, params.id);

  return Response.json(list)
}

