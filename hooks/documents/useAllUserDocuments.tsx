"use client";

import { useQuery } from "@tanstack/react-query";
import { useMe } from "@/hooks/auth/useAuth";
import { api } from "@/lib/api";
import { Document } from "@/types/documentTypes";
import { getAccessToken } from "@/lib/tokenStorage";

export function useAllUserDocuments() {
	const { data: user } = useMe();

	return useQuery<Document[]>({
		queryKey: ["my-documents", user?.id],
		queryFn: async () => {
			if (!user?.id) throw new Error("User ID is missing");

			const token = getAccessToken()
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
