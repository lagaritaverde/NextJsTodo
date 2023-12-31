import { GetUser } from '@/backend/auth/authHttp'

export async function GET(request: Request) {
  const user = await GetUser(request)

  return Response.json(user)
}

export async function POST(request: Request) {
  await request.json()

  return Response.json({ data: request.headers.get('authorization') })
}
