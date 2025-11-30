// proxy.ts
import {NextResponse} from "next/server"
import type {NextRequest} from "next/server"
import {verifyToken} from "./lib/auth"

export async function proxy(req: NextRequest) {
	console.log("testing proxy")
	const token = req.headers.get("authorization")?.split(" ")[1]

	console.log("token", token)

	console.log(
		`req.headers.get("content-type")`,
		req.headers.get("content-type")
	)

	console.log("req.nextUrl.pathname", req.nextUrl.pathname)

	console.log(
		`include form data?`,
		req.headers.get("content-type")?.includes("multipart/form-data")
	)

	const publicPaths = [
		"/api/auth/login",
		"/api/auth/register",
		"/api/auth/forgot-password"
	]

	if (
		publicPaths.some((path) => req.nextUrl.pathname.startsWith(path)) ||
		req.headers.get("content-type")?.includes("multipart/form-data")
	) {
		return NextResponse.next()
	}

	if (!token) {
		return NextResponse.json({error: "Unauthorized"}, {status: 401})
	}

	const decoded = verifyToken(token)
	if (!decoded) {
		return NextResponse.json({error: "Invalid token"}, {status: 403})
	}

	console.log("before next")

	return NextResponse.next()
}

// Optional matcher (still supported)
export const config = {
	matcher: ["/api/:path*"] // Protect API routes
}
