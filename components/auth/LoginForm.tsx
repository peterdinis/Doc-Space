"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FileText, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useLogin } from "@/hooks/auth/useAuth";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const loginSchema = z.object({
	email: z.string().email("Invalid email"),
	password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginForm: FC = () => {
	const loginMutation = useLogin();
	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormValues>({
		resolver: zodResolver(loginSchema),
	});

	const onSubmit = async (data: LoginFormValues) => {
		loginMutation.mutate(data, {
			onSuccess: (res: { access_token: string }) => {
				localStorage.setItem("access_token", res.access_token);
				router.push("/dashboard");
			},
		});
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50">
			<div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
				<div className="text-center">
					<div className="flex justify-center mb-4">
						<FileText className="h-12 w-12 text-blue-600" />
					</div>
					<h2 className="text-3xl font-bold text-gray-900">DocSpace</h2>
					<p className="mt-2 text-gray-600">Sign in to your account</p>
				</div>

				<form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
					<div className="space-y-4">
						<div>
							<Label htmlFor="email">Email address</Label>
							<Input
								id="email"
								type="email"
								placeholder="Enter your email"
								{...register("email")}
								className="mt-2"
							/>
							{errors.email && (
								<p className="text-sm text-red-500 mt-1">
									{errors.email.message}
								</p>
							)}
						</div>

						<div>
							<Label htmlFor="password">Password</Label>
							<Input
								id="password"
								type="password"
								placeholder="Enter your password"
								{...register("password")}
								className="mt-2"
							/>
							{errors.password && (
								<p className="text-sm text-red-500 mt-1">
									{errors.password.message}
								</p>
							)}
						</div>
					</div>

					{loginMutation.error && (
						<p className="text-red-500 text-sm mt-2">
							{loginMutation.error.message}
						</p>
					)}

					<Button
						type="submit"
						className="w-full"
						disabled={loginMutation.isPending}
					>
						{loginMutation.isPending ? (
							<Loader2 className="animate-spin w-8 h-8" />
						) : (
							"Sign in"
						)}
					</Button>

					<div className="text-center">
						<span className="text-gray-600">Don’t have an account? </span>
						<Link
							href="/register"
							className="text-blue-600 hover:text-blue-500"
						>
							Register
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
};

export default LoginForm;
