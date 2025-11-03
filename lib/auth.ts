import jwt from "jsonwebtoken"

const SECRET = process.env.NEXT_PUBLIC_JWT_SECRET || "supersecret"

export function generateToken(user: any) {
	return jwt.sign(
		{
			userId: user.id,
			email: user.email
		},
		SECRET,
		{expiresIn: "1d"}
	)
}

export function verifyToken(token: string) {
	try {
		return jwt.verify(token, SECRET)
	} catch (err) {
		return null
	}
}
