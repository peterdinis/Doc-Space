"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FileText } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRegister } from "@/hooks/auth/useAuth";
import { useToast } from "@/hooks/shared/useToast";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const registerSchema = z.object({
	name: z.string().min(1, "Name is required"),
	email: z.string().email("Invalid email"),
	password: z.string().min(6, "Password must be at least 6 characters"),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

const RegisterForm: FC = () => {
	const registerMutation = useRegister();

	const router = useRouter();
	const { toast } = useToast();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<RegisterFormValues>({
		resolver: zodResolver(registerSchema),
	});

	const onSubmit = (data: RegisterFormValues) => {
		registerMutation.mutate(data);
		toast({
			title: "Register DONE",
			duration: 2000,
			className: "bg-green-800 text-white font-bold text-base leading-[125%]",
		});
		router.push("/login");
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50">
			<div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
				<div className="text-center">
					<div className="flex justify-center mb-4">
						<FileText className="h-12 w-12 text-blue-600" />
					</div>
					<h2 className="text-3xl font-bold text-gray-900">DocSpace</h2>
					<p className="mt-2 text-gray-600">Create your account</p>
				</div>

				<form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
					<div className="space-y-4">
						<div>
							<Label htmlFor="name" className="text-gray-800">
								Full name
							</Label>
							<Input
								id="name"
								type="text"
								placeholder="Enter your full name"
								{...register("name")}
								className="mt-2 text-gray-800"
							/>
							{errors.name && (
								<p className="text-sm text-red-500 mt-1">
									{errors.name.message}
								</p>
							)}
						</div>

						<div>
							<Label htmlFor="email" className="text-gray-800">
								Email address
							</Label>
							<Input
								id="email"
								type="email"
								placeholder="Enter your email"
								{...register("email")}
								className="mt-2 text-gray-800"
							/>
							{errors.email && (
								<p className="text-sm text-red-500 mt-1">
									{errors.email.message}
								</p>
							)}
						</div>

						<div>
							<Label htmlFor="password" className="text-gray-800">
								Password
							</Label>
							<Input
								id="password"
								type="password"
								placeholder="Create a password"
								{...register("password")}
								className="mt-2 text-gray-800"
							/>
							{errors.password && (
								<p className="text-sm text-red-500 mt-1">
									{errors.password.message}
								</p>
							)}
						</div>
					</div>

					{registerMutation.error && (
						<p className="text-red-500 text-sm mt-2">
							{registerMutation.error.message}
						</p>
					)}

					<Button
						type="submit"
						className="w-full"
						disabled={registerMutation.isPending}
					>
						{registerMutation.isPending
							? "Creating account..."
							: "Create account"}
					</Button>

					<div className="text-center">
						<span className="text-gray-600">Already have an account? </span>
						<Link href="/login" className="text-blue-600 hover:text-blue-500">
							Sign in
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
};

export default RegisterForm;
