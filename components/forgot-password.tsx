"use client"
import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"
import {Card, CardContent} from "@/components/ui/card"
import {
	Field,
	FieldDescription,
	FieldGroup,
	FieldLabel
} from "@/components/ui/field"
import {Input} from "@/components/ui/input"
import {useState} from "react"
import {useRouter} from "next/navigation"
import {forgotPassword, register} from "@/lib/api/auth.service"
import {toast} from "sonner"
import {Spinner} from "./ui/shadcn-io/spinner"

type registerForm = {
	email: string
	oldPassword: string
	password: string
	confirmPassword: string
}

const initialValue: registerForm = {
	email: "",
	oldPassword: "",
	password: "",
	confirmPassword: ""
}

export function ForgotPasswordForm({
	className,
	...props
}: React.ComponentProps<"div">) {
	const [formData, setFormData] = useState<registerForm>(initialValue)
	const [loading, setLoading] = useState<boolean>(false)
	const router = useRouter()

	const onChangeValue = (key: string, value: string) => {
		setFormData((prev) => ({
			...prev,
			[key]: value
		}))
	}

	const onSubmit = async () => {
		setLoading(true)
		if (formData.password !== formData.confirmPassword) {
			toast.error("Confirm password does not match")
			setLoading(false)
			return
		}
		if (formData.password === formData.confirmPassword) {
			await forgotPassword({
				email: formData.email,
				oldPassword: formData.oldPassword,
				password: formData.password
			})
				.then((res) => {
					toast.success(res.message)
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
								<h1 className="text-2xl font-bold">Forgot Password</h1>
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
									<FieldLabel htmlFor="password">Old Password</FieldLabel>
								</div>
								<Input
									id="oldPassword"
									type="password"
									value={formData.oldPassword}
									onChange={(e) => onChangeValue("oldPassword", e.target.value)}
									required
								/>
							</Field>

							<Field>
								<div className="flex items-center">
									<FieldLabel htmlFor="password">New Password</FieldLabel>
								</div>
								<Input
									id="password"
									type="password"
									value={formData.password}
									onChange={(e) => onChangeValue("password", e.target.value)}
									required
								/>
							</Field>

							<Field>
								<div className="flex items-center">
									<FieldLabel htmlFor="password">Confirm Password</FieldLabel>
								</div>
								<Input
									id="confirmPassword"
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
									{loading ? <Spinner /> : "Reset Password"}
								</Button>
							</Field>
						</FieldGroup>
						<FieldDescription className="text-center cursor-pointer mt-6 pt-3">
							Already have an account password!?{" "}
							<span onClick={() => router.push("/auth/login")}>Sign In</span>
						</FieldDescription>
					</form>
					<div className="bg-muted relative hidden md:block">
						<img
							src="https://s3.cdn.almostgods.com/wp-content/uploads/2025/10/AWD1-Womenswear.webp"
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
	)
}
