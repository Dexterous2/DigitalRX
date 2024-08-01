import { NextResponse } from 'next/server'

export function middleware(request) {
    const { pathname } = request.nextUrl

    const auth = ['/login', '/sign-up', '/forgot-password', '/verify-otp', '/reset-password']

    const mainScreens = ["/dashboard"]
    const subscribedRoutes = ["/all-patients", "/orders-list", "/paid-orders", "/completed-orders", "/all-patients", "/request", "/patients-profile", "/patients-profile/:path*", "/wallet"]

    const cookieValue = request.cookies.get('digitalrx')?.value

    const userDetail = cookieValue ? JSON.parse(cookieValue) : undefined

    const userType = userDetail?.findUser?.usertype

    const isSubscribed = userDetail?.subscription_id ? true : false

    let url = request.nextUrl.clone()

    if (!cookieValue) {

        if (mainScreens.includes(pathname)) {
            return NextResponse.redirect(new URL('/login', request.url))
        }

    } else if (cookieValue) {
        if (auth.includes(pathname)) {
            return NextResponse.redirect(new URL('/dashboard', request.url))
        }
        if (!isSubscribed && subscribedRoutes.includes(pathname)) {
            return NextResponse.redirect(new URL('/dashboard', request.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/', '/login', '/sign-up', '/forgot-password', '/verify-otp', '/dashboard', '/reset-password', "/all-patients", "/orders-list", "/paid-orders", "/completed-orders", "/all-patients", "/request", "/patients-profile", "/patients-profile/:path*", "/wallet"],
}
