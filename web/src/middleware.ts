import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { decrypt } from './lib/auth';

export async function middleware(request: NextRequest) {
    // 1. Check if route is protected
    const protectedRoutes = ['/dashboard'];
    const currentPath = request.nextUrl.pathname;
    const isProtected = protectedRoutes.some((route) => currentPath.startsWith(route));

    if (!isProtected) {
        return NextResponse.next();
    }

    // 2. Check for valid session
    const cookie = request.cookies.get('session')?.value;
    if (!cookie) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
        const session = await decrypt(cookie);

        // 3. Role-based Access Control (Simple check)
        if (currentPath.startsWith('/dashboard/admin') && session.user.role !== 'ADMIN') {
            return NextResponse.redirect(new URL('/dashboard/client', request.url));
        }

        return NextResponse.next();
    } catch (err) {
        return NextResponse.redirect(new URL('/login', request.url));
    }
}

export const config = {
    matcher: ['/dashboard/:path*'],
};
