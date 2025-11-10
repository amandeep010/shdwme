import ProtectedRoute from "@/components/ProtectedRoute"

function Dashboard() {
	const dashboard = (data: string) => {
		return (
			<div className="p-4 m-1 bg-[var(--light-color)] rounded font-bold capitalize text-center transform transition-transform duration-500 hover:scale-105 hover:bg-[var(--dark-color)]-200 shadow-white box-shadow: var(--shadow-2xs)">
				{data}
			</div>
		)
	}
	return (
		<div>
			<ProtectedRoute>
				<div className="text-[20px] grid gap-2 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
					{dashboard("aman")}
					{dashboard("aman")}
					{dashboard("aman")}
					{dashboard("aman")}
					{dashboard("aman")}
					{dashboard("aman")}
					{dashboard("aman")}
					{dashboard("aman")}
				</div>
				<div></div>
			</ProtectedRoute>
		</div>
	)
}

export default Dashboard
