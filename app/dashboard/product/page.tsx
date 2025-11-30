"use client"
import CreateProduct from "@/components/create-product"
import {DataTable} from "@/components/listProduct"
import {endPoints} from "@/lib/api/endUrl"
import useAuthedFetcher from "@/lib/fetcher"

function ProductPage() {
	const {data, mutate} = useAuthedFetcher(endPoints.listProduct)
	const payload = data?.products.map((product: any) => ({
		name: product.title,
		description: product.description,
		price: product.price,
		category: product.categories,
		size: product.size,
		detail: product.detail,
		quantity: product.quantity
	}))

	return (
		<div>
			<div className="relative mb-10">
				<h1 className="text-[var(--light-color)] font-bold text-2xl bg-[var(--dark-color)] text-center">
					Product Table
				</h1>
				<div className="text-end p-2 absolute top-0 right-0">
					<CreateProduct mutate={mutate} />
				</div>
			</div>
			<DataTable modifiedData={payload} mutate={mutate} />
		</div>
	)
}

export default ProductPage
