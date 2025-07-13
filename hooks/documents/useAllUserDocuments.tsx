"use client";

import { useQuery } from "@tanstack/react-query";
import { useMe } from "@/hooks/auth/useAuth";
import { api } from "@/lib/api";
import type { Document } from "@/types/documentTypes";

export function useAllUserDocuments() {
	const { data: user } = useMe();

	return useQuery<Document[]>({
		queryKey: ["my-documents", user?.id],
		queryFn: async () => {
			if (!user?.id) throw new Error("User ID is missing");

			const token = localStorage.getItem("access_token");
			if (!token) throw new Error("No access token found");

			return api<Document[]>(`/documents/me/${user.id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
		},
		enabled: !!user?.id,
	});
}
