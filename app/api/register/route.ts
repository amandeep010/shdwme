import {NextResponse} from "next/server"

export async function GET() {
	const users = [
		{id: 1, name: "Aman"},
		{id: 2, name: "Deep"}
	]

	return NextResponse.json({
		message: "Fetched users successfully!",
		data: users,
		env: process.env.DATABASE_URL
	})
}

export async function POST(request: Request) {
	const body = await request.json()
	const {name, email, password} = body

	if (!name || !email) {
		return NextResponse.json({error: "Missing name or email"}, {status: 400})
	}

	if (!password) {
		return NextResponse.json({error: "Missing password"}, {status: 400})
	}

	return NextResponse.json({
		message: "User created successfully!",
		data: {name, email}
	})
}

export async function PUT(request: Request) {
	const body = await request.json()
	const {id, name} = body

	if (!id || !name) {
		return NextResponse.json({error: "Missing id or name"}, {status: 400})
	}

	return NextResponse.json({
		message: `User with ID ${id} updated successfully!`,
		data: {id, name}
	})
}

export async function DELETE(request: Request) {
	const body = await request.json()
	const {id} = body

	if (!id) {
		return NextResponse.json({error: "Missing user ID"}, {status: 400})
	}

	return NextResponse.json({
		message: `User with ID ${id} deleted successfully!`
	})
}
