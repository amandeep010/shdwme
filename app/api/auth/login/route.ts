import {generateToken} from "@/lib/auth"
import {prisma} from "@/lib/prisma"
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
	try {
		const body = await request.json()
		const {email, password} = body

		if (!email || !password) {
			return NextResponse.json(
				{error: "Missing required fields"},
				{status: 400}
			)
		}

		const existingUser = await prisma.users.findUnique({where: {email}})

		if (!existingUser) {
			return NextResponse.json({error: "User doesn't exists"}, {status: 404})
		}

		const token = generateToken({
			userId: existingUser.userId,
			email: existingUser.email
		})

		await prisma.userSession.create({
			data: {
				token: token,
				userId: existingUser.userId
			}
		})

		return NextResponse.json(
			{
				message: "Login success!",
				data: {
					token,
					user: existingUser
				}
			},
			{status: 201}
		)
	} catch (error) {
		console.error("Error creating user:", error)
		return NextResponse.json({error: "Internal server error"}, {status: 500})
	}
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
