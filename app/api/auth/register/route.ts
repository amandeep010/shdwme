import {prisma} from "@/lib/prisma"
import {NextResponse} from "next/server"
import bcrypt from "bcrypt"

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

		// ✅ Check if user already exists
		const existingUser = await prisma.users.findUnique({where: {email}})
		if (existingUser) {
			return NextResponse.json({error: "User already exists"}, {status: 400})
		}

		// ✅ Hash password
		const hashedPassword = await bcrypt.hash(password, Number(process.env.NEXT_PUBLIC_SALT))

		// ✅ Save user to DB with hashed password
		const newUser = await prisma.users.create({
			data: {
				email,
				password: hashedPassword,
				roleId: 2
			},
		})

		return NextResponse.json(
			{
				message: "User created successfully!",
				data: newUser
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
