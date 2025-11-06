// proxy.ts
import {NextResponse} from "next/server"
import type {NextRequest} from "next/server"
import {verifyToken} from "./lib/auth"

export async function proxy(req: NextRequest) {
	const token = req.headers.get("authorization")?.split(" ")[1]

	// Define public routes that don’t need authentication
	const publicPaths = [
		"/api/auth/login",
		"/api/auth/register",
		"/api/auth/forgot-password"
	]

	if (publicPaths.some((path) => req.nextUrl.pathname.startsWith(path))) {
		return NextResponse.next()
	}

	if (!token) {
		return NextResponse.json({error: "Unauthorized"}, {status: 401})
	}

	const decoded = verifyToken(token)
	if (!decoded) {
		return NextResponse.json({error: "Invalid token"}, {status: 403})
	}

	return NextResponse.next()
}

// Optional matcher (still supported)
export const config = {
	matcher: ["/api/:path*"] // Protect API routes
}
