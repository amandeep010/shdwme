"use client"
import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"
import {Card, CardContent} from "@/components/ui/card"
import {
	Field,
	FieldDescription,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field"
import {Input} from "@/components/ui/input"
import {useState} from "react"
import {useRouter} from "next/navigation"
import {register} from "@/lib/api/auth.service"
import {toast} from "sonner"
import {Spinner} from "./ui/shadcn-io/spinner"

type registerForm = {
	email: string
	password: string
	confirmPassword: string
}

const initialValue: registerForm = {
	email: "",
	password: "",
	confirmPassword: ""
}

export function RegisterForm({
	className,
	...props
}: React.ComponentProps<"div">) {
	const [formData, setFormData] = useState<registerForm>(initialValue)
	const [loading, setLoading] = useState<boolean>(false)
	const router = useRouter()
	const [passwordChecks, setPasswordChecks] = useState({
		length: false,
		alphanumeric: false,
		capital: false,
		special: false
	})
	const onChangeValue = (key: string, value: string) => {
		setFormData((prev) => ({
			...prev,
			[key]: value
		}))
	}

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		onChangeValue("password", value)

		setPasswordChecks({
			length: value.length >= 8,
			alphanumeric: /[A-Za-z]/.test(value) && /[0-9]/.test(value),
			capital: /[A-Z]/.test(value),
			special: /[!@#$%^&*(),.?":{}|<>]/.test(value)
		})
	}

	const getColor = (condition: boolean) =>
		condition ? "text-green-500" : "text-red-500"

	const onSubmit = async () => {
        setLoading(true)
        const passCheck = Object.values(passwordChecks)
        if(passCheck.includes(false)) {
            toast.error("Fill password criteria")
            setLoading(false)
            return
        }

		if (formData.password === formData.confirmPassword) {
			await register({
				email: formData.email,
				password: formData.password
			})
				.then((res) => {
					toast.success("Your account has been created")
				})
				.catch((error) => {
					toast.error(error.message)
				})
				.finally(() => {
					setLoading(false)
				})
		} else {
			setLoading(false)
			toast.error("Password does not match")
			setFormData(initialValue)
		}
	}

	return (
		<div
			className={cn(
				"flex flex-col gap-6 min-w-[70vw] md:max-h-[70vw] overflow-auto",
				className
			)}
			{...props}
		>
			<Card className="overflow-auto p-0">
				<CardContent className="grid p-0 md:grid-cols-2">
					<form className="p-6 md:p-8">
						<FieldGroup>
							<div className="flex flex-col items-center gap-2 text-center">
								<h1 className="text-2xl font-bold">Hello there</h1>
								<p className="text-muted-foreground text-balance">
									Create your <strong>SHDWME</strong> account!
								</p>
							</div>
							<Field>
								<FieldLabel htmlFor="email">Email</FieldLabel>
								<Input
									id="email"
									type="email"
									placeholder="m@example.com"
									value={formData.email}
									onChange={(e) => onChangeValue("email", e.target.value)}
									required
								/>
							</Field>
							<Field>
								<div className="flex items-center">
									<FieldLabel htmlFor="password">Password</FieldLabel>
								</div>
								<Input
									id="password"
									type="password"
									value={formData.password}
									onChange={handlePasswordChange}
									required
								/>
								{
								// 	formData.password !== "" ?
								// 	(
								// 		<div>
								// <div className="h-2 mt-2 bg-gray-200 rounded-full overflow-hidden">
								// 	<div
								// 		className={`h-2 rounded-full transition-all duration-500 ease-in-out 
                                // ${
					            // Object.values(passwordChecks).filter(Boolean).length === 4
					            // 	? "bg-green-500 w-full"
					            // 	: Object.values(passwordChecks).filter(Boolean).length === 3
					            // 		? "bg-yellow-400 w-3/4"
					            // 		: Object.values(passwordChecks).filter(Boolean).length === 2
					            // 			? "bg-orange-400 w-1/2"
					            // 			: Object.values(passwordChecks).filter(Boolean).length === 1
					            // 				? "bg-red-500 w-1/4"
					            // 				: "bg-gray-200 w-0"
				                // }`}
								// 	></div>
								// </div>

								// {/* Password condition messages */}
								// <div className="mt-2 text-sm space-y-1">
								// 	<p className={getColor(passwordChecks.length)}>
								// 		• At least 8 characters
								// 	</p>
								// 	<p className={getColor(passwordChecks.alphanumeric)}>
								// 		• Alphanumeric (letters + numbers)
								// 	</p>
								// 	<p className={getColor(passwordChecks.capital)}>
								// 		• At least one uppercase letter
								// 	</p>
								// 	<p className={getColor(passwordChecks.special)}>
								// 		• At least one special character
								// 	</p>
								// </div>
                                // </div>
								// 	) : (<></>)
								}
                                
							</Field>

							<Field>
								<div className="flex items-center">
									<FieldLabel htmlFor="password">Confirm Password</FieldLabel>
								</div>
								<Input
									id="password"
									type="password"
									value={formData.confirmPassword}
									onChange={(e) =>
										onChangeValue("confirmPassword", e.target.value)
									}
									required
								/>
							</Field>
							<Field>
								<Button
									type="button"
									onClick={(e) => {
										onSubmit()
									}}
								>
									{loading ? <Spinner /> : "Register"}
								</Button>
							</Field>
							{/* <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
								Or continue with
							</FieldSeparator>
							<Field className="grid grid-cols-3 gap-4">
								<Button variant="outline" type="button">
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
										<path
											d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
											fill="currentColor"
										/>
									</svg>
									<span className="sr-only">Login with Apple</span>
								</Button>
								<Button variant="outline" type="button">
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
										<path
											d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
											fill="currentColor"
										/>
									</svg>
									<span className="sr-only">Login with Google</span>
								</Button>
								<Button variant="outline" type="button">
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
										<path
											d="M6.915 4.03c-1.968 0-3.683 1.28-4.871 3.113C.704 9.208 0 11.883 0 14.449c0 .706.07 1.369.21 1.973a6.624 6.624 0 0 0 .265.86 5.297 5.297 0 0 0 .371.761c.696 1.159 1.818 1.927 3.593 1.927 1.497 0 2.633-.671 3.965-2.444.76-1.012 1.144-1.626 2.663-4.32l.756-1.339.186-.325c.061.1.121.196.183.3l2.152 3.595c.724 1.21 1.665 2.556 2.47 3.314 1.046.987 1.992 1.22 3.06 1.22 1.075 0 1.876-.355 2.455-.843a3.743 3.743 0 0 0 .81-.973c.542-.939.861-2.127.861-3.745 0-2.72-.681-5.357-2.084-7.45-1.282-1.912-2.957-2.93-4.716-2.93-1.047 0-2.088.467-3.053 1.308-.652.57-1.257 1.29-1.82 2.05-.69-.875-1.335-1.547-1.958-2.056-1.182-.966-2.315-1.303-3.454-1.303zm10.16 2.053c1.147 0 2.188.758 2.992 1.999 1.132 1.748 1.647 4.195 1.647 6.4 0 1.548-.368 2.9-1.839 2.9-.58 0-1.027-.23-1.664-1.004-.496-.601-1.343-1.878-2.832-4.358l-.617-1.028a44.908 44.908 0 0 0-1.255-1.98c.07-.109.141-.224.211-.327 1.12-1.667 2.118-2.602 3.358-2.602zm-10.201.553c1.265 0 2.058.791 2.675 1.446.307.327.737.871 1.234 1.579l-1.02 1.566c-.757 1.163-1.882 3.017-2.837 4.338-1.191 1.649-1.81 1.817-2.486 1.817-.524 0-1.038-.237-1.383-.794-.263-.426-.464-1.13-.464-2.046 0-2.221.63-4.535 1.66-6.088.454-.687.964-1.226 1.533-1.533a2.264 2.264 0 0 1 1.088-.285z"
											fill="currentColor"
										/>
									</svg>
									<span className="sr-only">Login with Meta</span>
								</Button>
							</Field> */}
							<FieldDescription className="text-center cursor-pointer">
								Already have an account?{" "}
								<span onClick={() => router.push("/auth/login")}>Sign In</span>
							</FieldDescription>
						</FieldGroup>
					</form>
					<div className="bg-muted relative hidden md:block">
						<img
							src="https://s3.cdn.almostgods.com/wp-content/uploads/2025/10/fila-banner-desktop-1.webp"
							alt="Image"
							className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
						/>
					</div>
				</CardContent>
			</Card>
			<FieldDescription className="px-6 text-center">
				By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
				and <a href="#">Privacy Policy</a>.
			</FieldDescription>
		</div>
// 		<div
// 	className={cn(
// 		"flex flex-col gap-6 w-full max-w-7xl mx-auto px-4 sm:px-6 transition-all duration-300",
// 		className
// 	)}
// 	{...props}
// >
// 	<Card className="overflow-hidden p-0 transition-shadow duration-300 hover:shadow-xl">
// 		<CardContent className="grid p-0 md:grid-cols-2 transition-all duration-500">
// 			<form className="p-6 sm:p-8 md:p-10 lg:p-12 bg-black/20 backdrop-blur-lg flex items-center transition-all duration-300">
// 				<FieldGroup className="w-full space-y-4 sm:space-y-5">
// 					<div className="flex flex-col items-center gap-2 text-center animate-in fade-in slide-in-from-top-4 duration-500">
// 						<h1 className="text-xl sm:text-2xl md:text-3xl font-bold transition-all duration-300">Hello there</h1>
// 						<p className="text-muted-foreground text-balance text-sm sm:text-base transition-all duration-300">
// 							Create your <strong>SHDWME</strong> account!
// 						</p>
// 					</div>
// 					<Field className="animate-in fade-in slide-in-from-left-4 duration-500 delay-100">
// 						<FieldLabel htmlFor="email" className="text-sm sm:text-base">Email</FieldLabel>
// 						<Input
// 							id="email"
// 							type="email"
// 							placeholder="m@example.com"
// 							value={formData.email}
// 							onChange={(e) => onChangeValue("email", e.target.value)}
// 							className="transition-all duration-200 focus:scale-[1.01]"
// 							required
// 						/>
// 					</Field>
// 					<Field className="animate-in fade-in slide-in-from-left-4 duration-500 delay-100">
// 						<div className="flex items-center">
// 							<FieldLabel htmlFor="password" className="text-sm sm:text-base">Password</FieldLabel>
// 						</div>
// 						<Input
// 							id="password"
// 							type="password"
// 							value={formData.password}
// 							onChange={handlePasswordChange}
// 							className="transition-all duration-200 focus:scale-[1.01]"
// 							required
// 						/>
// 					</Field>

// 					<Field className="animate-in fade-in slide-in-from-left-4 duration-500 delay-100">
// 						<div className="flex items-center">
// 							<FieldLabel htmlFor="confirmPassword" className="text-sm sm:text-base">Confirm Password</FieldLabel>
// 						</div>
// 						<Input
// 							id="confirmPassword"
// 							type="password"
// 							value={formData.confirmPassword}
// 							onChange={(e) =>
// 								onChangeValue("confirmPassword", e.target.value)
// 							}
// 							className="transition-all duration-200 focus:scale-[1.01] bg-[#E8F0FE]"
// 							required
// 						/>
// 					</Field>
// 					<Field className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
// 						<Button
// 							type="button"
// 							onClick={(e) => {
// 								onSubmit()
// 							}}
// 							className="w-full transition-all duration-200 hover:scale-[1.02] active:scale-95"
// 						>
// 							{loading ? <Spinner /> : "Register"}
// 						</Button>
// 					</Field>
// 					<FieldDescription className="text-center cursor-pointer text-sm sm:text-base animate-in fade-in duration-500 delay-500">
// 						Already have an account?{" "}
// 						<span onClick={() => router.push("/auth/login")} className="underline transition-all duration-200 hover:text-primary">Sign In</span>
// 					</FieldDescription>
// 				</FieldGroup>
// 			</form>
// 			<div className="bg-muted relative hidden md:block min-h-[500px] lg:min-h-[600px] overflow-hidden group">
// 				<img
// 					src="https://s3.cdn.almostgods.com/wp-content/uploads/2025/10/fila-banner-desktop-1.webp"
// 					alt="Image"
// 					className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale transition-transform duration-700 group-hover:scale-105"
// 				/>
// 			</div>
// 		</CardContent>
// 	</Card>
// 	<FieldDescription className="text-center text-xs sm:text-sm transition-all duration-300 animate-in fade-in duration-700">
// 		By clicking continue, you agree to our <a href="#" className="underline transition-all duration-200 hover:text-primary">Terms of Service</a>{" "}
// 		and <a href="#" className="underline transition-all duration-200 hover:text-primary">Privacy Policy</a>.
// 	</FieldDescription>
// </div>
	)
}
