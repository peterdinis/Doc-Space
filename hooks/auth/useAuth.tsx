"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type {
	AuthResponse,
	LoginDto,
	RegisterDto,
	User,
} from "@/types/authTypes";

export function useLogin() {
	return useMutation<AuthResponse, Error, LoginDto>({
		mutationKey: ["login"],
		mutationFn: (data) =>
			api<AuthResponse>("/auth/login", {
				method: "POST",
				body: JSON.stringify(data),
			}),
	});
}

export function useRegister() {
	return useMutation<AuthResponse, Error, RegisterDto>({
		mutationKey: ["register"],
		mutationFn: (data) =>
			api<AuthResponse>("/auth/register", {
				method: "POST",
				body: JSON.stringify(data),
			}),
	});
}

export function useMe() {
	return useQuery<User>({
		queryKey: ["me"],
		queryFn: async () => {
			const token = localStorage.getItem("access_token");

			if (!token) {
				throw new Error("No access token found");
			}

			try {
				return await api<User>("/user/me", {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
			} catch (error: any) {
				localStorage.removeItem("access_token");
				throw new Error("Invalid or expired token");
			}
		},
		enabled: typeof window !== "undefined",
		retry: false,
	});
}
