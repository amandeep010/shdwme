import {prisma} from "@/lib/prisma"
import {NextResponse} from "next/server"
import bcrypt from "bcrypt"

export async function POST(request: Request) {
	try {
		const body = await request.json()
		const {email, oldPassword, password} = body

		if (!email || !oldPassword || !password) {
			return NextResponse.json(
				{error: "Missing required fields"},
				{status: 400}
			)
		}

		const existingUser = await prisma.users.findUnique({where: {email}})

		if (!existingUser) {
			return NextResponse.json({error: "User doesn't exists"}, {status: 404})
		}

		const isPasswordCorrect = await bcrypt.compare(
			password,
			existingUser?.password! || ""
		)

		if (!isPasswordCorrect) {
			return NextResponse.json({error: "Wrong credentials"}, {status: 404})
		}

		const newPassword = await bcrypt.hash(
			password,
			Number(process.env.NEXT_PUBLIC_SALT)
		)

		await prisma.users.update({
			data: {
				password: newPassword
			},
			where: {
				email: email
			}
		})

		return NextResponse.json(
			{
				message: "Password changed successfully"
			},
			{status: 201}
		)
	} catch (error) {
		console.error("Error creating user:", error)
		return NextResponse.json({error: "Internal server error"}, {status: 500})
	}
}
