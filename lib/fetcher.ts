"use client"

import useSWR, {SWRConfiguration} from "swr"

export default function useAuthedFetcher<T = any>(
	url: string,
	options?: SWRConfiguration
) {
	const token =
		typeof window !== "undefined" ? localStorage.getItem("token") : null

	const fetcher = async (url: string) => {
		const res = await fetch(url, {
			headers: token ? {Authorization: `Bearer ${token}`} : {}
		})
		if (!res.ok) throw new Error("Error fetching data")
		return res.json()
	}

	return useSWR<T>(token ? url : null, fetcher, options)
}
