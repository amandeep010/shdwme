export async function baseService(
	url: string,
	method: string,
	data: any,
	params: any
) {
	try {
		const token = localStorage.getItem("token") || ""
		const res = await fetch(url, {
			method: method,
			headers: data.file
				? {
						"Content-Type": "application/json",
						"Authorization": `Bearer ${token}`
					}
				: {
						Authorization: `Bearer ${token}`
					},
			body: data
		})

		return res
	} catch (error) {
		console.log("error", error)
	}
}
