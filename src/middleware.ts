import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { publicRoutes } from "../src/app/routes";
import { verify } from '@/backend/auth/authUtility'


export async function middleware(request: NextRequest) {
  if (publicRoutes.includes(request.nextUrl.pathname)) {
    console.log("public:" + request.nextUrl.pathname)
    return;
  }

  const token = request.headers.get("authorization") || '';

  try {
    const data = await verify(token);
  } catch (error) {
    return new NextResponse('401 Unauthorized', { status: 401 });
  }
}