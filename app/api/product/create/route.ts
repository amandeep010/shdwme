import {NextResponse} from "next/server"
import {writeFile, mkdir} from "fs/promises"
import path from "path"
import {prisma} from "@/lib/prisma"
import {SIZE} from "@prisma/client"

export async function POST(req: Request) {
	try {
		// ✅ Read form data once only
		const formData = await req.formData()

		console.log("formData", formData)

		const title = formData.get("title")?.toString().trim() ?? ""
		const description = formData.get("description")?.toString() ?? ""
		const price = formData.get("price")?.toString() ?? ""
		const category = formData.get("category")?.toString() ?? ""
		const size = formData.get("size") as SIZE
		const detail = formData.get("detail")?.toString() ?? ""

		const images = formData.getAll("images") as File[]
		const videos = formData.getAll("videos") as File[]

		const uploadDir = path.join(process.cwd(), "public", "uploads", "products")
		await mkdir(uploadDir, {recursive: true})

		// ✅ handle multiple images
		const imagePaths: string[] = []
		for (const file of images) {
			const arrayBuffer = await file.arrayBuffer()
			const buffer = Buffer.from(arrayBuffer)
			const filename = `${Date.now()}-${file.name.replace(/\s+/g, "_")}`
			const filepath = path.join(uploadDir, filename)
			await writeFile(filepath, buffer)
			imagePaths.push(`/uploads/products/${filename}`)
		}

		// ✅ handle multiple videos
		const videoPaths: string[] = []
		for (const file of videos) {
			const arrayBuffer = await file.arrayBuffer()
			const buffer = Buffer.from(arrayBuffer)
			const filename = `${Date.now()}-${file.name.replace(/\s+/g, "_")}`
			const filepath = path.join(uploadDir, filename)
			await writeFile(filepath, buffer)
			videoPaths.push(`/uploads/products/${filename}`)
		}

		const product = await prisma.products.create({
			data: {
				title,
				description,
				image: JSON.stringify(imagePaths),
				video: JSON.stringify(videoPaths),
				price,
				categories: category as any,
				size: size as any,
				quantity: 1,
				detail
			}
		})

		// ✅ Send clean JSON response
		return NextResponse.json({success: true, product})
	} catch (error) {
		console.error("❌ Product creation error:", error)
		return NextResponse.json(
			{success: false, error: "Failed to create or update product"},
			{status: 500}
		)
	}
}
