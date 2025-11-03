import jwt from "jsonwebtoken"

const SECRET = process.env.JWT_SECRET || "supersecret"

export function generateToken(user: any) {
	return jwt.sign(
		{
			id: user.id,
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
