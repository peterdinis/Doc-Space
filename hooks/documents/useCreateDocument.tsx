"use client";

import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { z } from "zod";

export const createDocumentSchema = z.object({
	title: z.string().min(1, "Title is required"),
	content: z.string().optional(),
	userId: z.string().min(1, "User ID is required"),
});

export type CreateDocumentDto = z.infer<typeof createDocumentSchema>;

export function useCreateDocument() {
	return useMutation({
		mutationKey: ["create-document"],
		mutationFn: async (dto: CreateDocumentDto) => {
			const token = localStorage.getItem("access_token");
			if (!token) throw new Error("No access token found");

			const response = await api("/documents", {
				method: "POST",
				body: JSON.stringify(dto),
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
			});

			return response;
		},
	});
}
