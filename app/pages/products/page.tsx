"use client"

import {Button} from "@/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardTitle
} from "@/components/ui/card"
import {endPoints} from "@/lib/api/endUrl"
import useAuthedFetcher from "@/lib/fetcher"
import {StarIcon} from "lucide-react"
import {useEffect, useState} from "react"

function Products() {
	const {data, mutate} = useAuthedFetcher(endPoints.listProduct)
	const product = data?.products

	useEffect(() => {
		console.log("data", data)
	}, [data])

	return (
		<div>
			{product ? (
				product.map((productData: any, i: number) => (
					<div key={i} className="p-3 flex">
						<Card className="w-[30%] m-2">
							<CardContent className="p-3">
								<div className="aspect-square rounded-md bg-gray-100 mb-2">
									<div className="flex items-center justify-center h-full text-muted-foreground text-xs">
										<img src={JSON.parse(productData.image)[0]} alt="" />
									</div>
								</div>

								<CardTitle className="text-sm mb-1">
									{productData.title}
								</CardTitle>
								<CardDescription className="text-xs line-clamp-2">
									{productData.description}
								</CardDescription>
							</CardContent>
							<div className="flex items-center space-x-1">
								<div className="flex p-4">
									{[1, 2, 3, 4].map((star) => (
										<StarIcon
											key={star}
											className="h-3 w-3 fill-yellow-400 text-yellow-400"
										/>
									))}
									<StarIcon className="h-3 w-3 text-gray-300" />
								</div>
								<span className="text-xs text-muted-foreground">(4.0)</span>
							</div>
							<div className="flex items-center justify-between px-4 mb-2">
								<span className="text-sm font-bold">$ {productData.price}</span>
								<Button size="sm" className="text-xs px-2 py-1 h-7">
									Add
								</Button>
							</div>
						</Card>
					</div>
				))
			) : (
				<></>
			)}
		</div>
	)
}

export default Products
