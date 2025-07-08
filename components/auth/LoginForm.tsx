import { FileText } from "lucide-react";
import { FC } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";

const LoginForm: FC = () => {
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

                <form className="mt-8 space-y-6">
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="name">Full name</Label>
                            <Input
                                id="name"
                                name="name"
                                type="text"
                                required
                                placeholder="Enter your full name"
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
                            />
                        </div>
                    </div>

                    <Button
                        type="submit"
                        className="w-full"
                    >
                        Create account
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
    )
}

export default LoginForm