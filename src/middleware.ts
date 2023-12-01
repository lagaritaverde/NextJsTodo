import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { publicRoutes} from "../src/app/routes";

export function middleware(request: NextRequest) {
  
  if(publicRoutes.includes(request.nextUrl.pathname) ){
    return;
  }

  const currentUser = request.headers;
  console.log(currentUser);
  //https://levelup.gitconnected.com/how-to-add-jwt-authentication-to-nextjs-apps-a0dc83bd257d
  /*
  const currentUser = request.cookies.get("currentUser")?.value;

  if (
    protectedRoutes.includes(request.nextUrl.pathname) &&
    (!currentUser || Date.now() > JSON.parse(currentUser).expiredAt)
  ) {
    request.cookies.delete("currentUser");
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("currentUser");

    return response;
  }

  if (authRoutes.includes(request.nextUrl.pathname) && currentUser) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }
  */
}