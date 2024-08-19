import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getAccessToken } from '@/../utils/tokenStorage';

export function middleware(request: NextRequest) {
  const accessToken = getAccessToken();
  console.log("MIDDLEWARE!!!")
  if (!accessToken) {
    return NextResponse.redirect(new URL('/signin', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'], // Protect specific routes
};
