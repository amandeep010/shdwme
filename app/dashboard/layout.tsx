"use client"

import React, {useEffect, useState} from "react"
import {Menu, X} from "lucide-react"
import Link from "next/link"
import {Power} from "lucide-react"
import {useRouter} from "next/navigation"
import {emptyDataFromLocalstorage} from "@/helper/helper"
import {toast} from "sonner"
import dynamic from "next/dynamic"

const SideBarItem = (path: string, element: string) => {
	return (
		<Link
			href={path}
			className="bg-transparent text-black p-2 m-2 text-center font-bold rounded-sm transition duration-500 hover:scale-130"
		>
			{element}
		</Link>
	)
}

const CommonConfirmation = dynamic(
	() => import("@/components/common-confirmation"),
	{
		ssr: false
	}
)

export default function DashboardLayout({
	children
}: {
	children: React.ReactNode
}) {
	const router = useRouter()
	const [isOpen, setIsOpen] = useState(false)

	useEffect(() => {
		const token = localStorage.getItem("token")
		const user = localStorage.getItem("user")
		if (!token || !user) {
			router.push("/auth/login")
		}
	}, [router])

	const logout = () => {
		emptyDataFromLocalstorage()
		router.push("/auth/login")
		toast.success("Logged out successfully")
	}

	return (
		<div className="flex h-screen overflow-hidden bg-[var(--dark-color)]">
			{/* Sidebar */}
			<div
				className={`fixed top-0 left-0 h-full bg-[var(--light-color)] round-xl text-black transition-all duration-300 ease-in-out z-50 backdrop-blur-lg bg-opacity-95
        		${isOpen ? "w-[30vw]" : "w-[0vw] overflow-hidden"}`}
			>
				<div className="flex justify-between items-center p-6 border-b border-gray-800">
					<h2
						className={`text-xl font-semibold tracking-wide transition duration-500 ${!isOpen && "hidden sm:block"}`}
					>
						Explore
					</h2>
					<button
						onClick={() => setIsOpen(!isOpen)}
						className="hover:bg-black p-2 hover:text-[var(--light-color)] rounded-lg transition duration-200"
					>
						<X size={24} />
					</button>
				</div>

				{/* Sidebar content */}
				<div
					className={`p-6 flex flex-col space-y-2 `}
					onClick={() => setIsOpen(false)}
				>
					{SideBarItem("/dashboard", "Dashboard")}
					{SideBarItem("/dashboard/product", "Add product")}
					{SideBarItem("/dashboard/profile", "Profile")}
					{SideBarItem("/dashboard/settings", "Settings")}
				</div>
			</div>

			{/* Main Content */}
			<div
				className={`flex-1 transition-all duration-300 ease-in-out ${
					isOpen ? "w-[20px]" : "w-[100vw]"
				}`}
			>
				<div className="flex items-center p-4 bg-gray-100 border-b">
					<button onClick={() => setIsOpen(!isOpen)} className="text-gray-800">
						<Menu size={24} />
					</button>
					<h1 className="ml-4 text-xl font-semibold">Dashboard</h1>
					<div className="absolute right-3 h-[40px] p-2 rounded-md cursor-pointer bg-gray-200 text-black hover:bg-black hover:text-[var(--light-color)] transition-colors duration-300 ease-in-out">
						<CommonConfirmation
							title="Logout"
							desc="Are you sure you want to log out"
							trigger={<Power />}
							onConfirm={() => logout()}
						/>
					</div>
				</div>

				{/* Content Area */}
				<div className="p-6 overflow-y-auto h-full">{children}</div>
			</div>
		</div>
	)
}
