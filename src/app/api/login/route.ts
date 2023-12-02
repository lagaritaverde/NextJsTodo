import { authService } from '@/backend/auth/authService'

export async function POST(request: Request) {

  const data = await request.json();

  try {
    const result = await authService.login(data.user, data.password)

    if (result === undefined) {
      return new Response("401 Unauthorized", { status: 401 });
    }

    return Response.json(result)

  } catch (error) {
    return new Response("500 Internal Server Error", { status: 500 });
  }
}