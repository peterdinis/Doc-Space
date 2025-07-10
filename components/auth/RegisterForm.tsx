'use client';

import { FileText, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { SetStateAction, useState, type FC } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useRegister } from '@/hooks/auth/useAuth';
import { useRouter } from 'next/navigation';

const RegisterForm: FC = () => {
	const register = useRegister();
	const [form, setForm] = useState({
		name: '',
		email: '',
		password: '',
	});
	const [error, setError] = useState<string | null>(null);
	const router = useRouter();
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (!form.name.trim() || !form.email.trim() || !form.password.trim()) {
			setError('All fields are required.');
			return;
		}

		setError(null);
		register.mutate(form, {
			onError: (err: { message: SetStateAction<string | null>; }) => setError(err.message),
			onSuccess: (data) => {
				router.push("/login")
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
					<p className="mt-2 text-gray-600">Create your account</p>
				</div>

				<form className="mt-8 space-y-6" onSubmit={handleSubmit}>
					<div className="space-y-4">
						<div>
							<Label htmlFor="name">Full name</Label>
							<Input
								id="name"
								name="name"
								type="text"
								required
								placeholder="Enter your full name"
								className="mt-2"
								value={form.name}
								onChange={handleChange}
							/>
						</div>

						<div>
							<Label htmlFor="email">Email address</Label>
							<Input
								id="email"
								name="email"
								type="email"
								required
								placeholder="Enter your email"
								className="mt-2"
								value={form.email}
								onChange={handleChange}
							/>
						</div>

						<div>
							<Label htmlFor="password">Password</Label>
							<Input
								id="password"
								name="password"
								type="password"
								required
								placeholder="Create a password"
								className="mt-2"
								value={form.password}
								onChange={handleChange}
							/>
						</div>
					</div>

					{error && (
						<p className="text-red-500 text-sm mt-2">{error}</p>
					)}

					<Button type="submit" className="w-full" disabled={register.isPending}>
						{register.isPending ? <Loader2 className='animate-spin w-8 h-8' /> : 'Create account'}
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
