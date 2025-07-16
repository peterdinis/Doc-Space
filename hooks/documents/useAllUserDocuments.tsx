"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { Document } from "@/types/documentTypes";

type UseAllUserDocumentsProps = {
	userId?: string;
};

export function useAllUserDocuments({ userId }: UseAllUserDocumentsProps) {

	return useQuery<Document[]>({
		queryKey: ["my-documents", userId],
		queryFn: async () => {
			if (!userId) throw new Error("User ID is missing");

			const token = localStorage.getItem("access_token");
			if (!token) throw new Error("No access token found");

			return api<Document[]>(`/users/documents/me/${userId}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
		},
		enabled: !!userId
	});
}
