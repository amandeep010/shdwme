import {prisma} from "@/lib/prisma"
import {NextResponse} from "next/server"

export async function GET() {
	try {
		const products = await prisma.products.findMany({
			where: {deletedAt: null},
			orderBy: {createdAt: "desc"}
		})

		return NextResponse.json({success: true, products})
	} catch (error) {
		console.error("❌ Error fetching products:", error)
		return NextResponse.json(
			{success: false, error: "Failed to fetch products"},
			{status: 500}
		)
	}
}
