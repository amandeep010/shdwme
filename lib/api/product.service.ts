import {endPoints} from "./endUrl"

export const createProduct = async (form: FormData) => {
	const token = localStorage.getItem("token") || ""

	const res = await fetch(endPoints.createProduct, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${token}`
		},
		body: form
	})

	if (!res.ok) throw new Error("Error creating product")

	const response = await res.json()

	return response
}
