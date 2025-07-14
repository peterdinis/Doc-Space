"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import {
	type CreateFolderDto,
	createFolderSchema,
	type Folder,
	type FolderListResponse,
	folderListResponseSchema,
	folderSchema,
	type UpdateFolderDto,
	updateFolderSchema,
} from "@/types/folderTypes";

export function useFolders(ownerId: string, search = "", page = 1, limit = 10) {
	return useQuery<FolderListResponse>({
		queryKey: ["folders", ownerId, search, page, limit],
		queryFn: async () => {
			const res = await api(
				`/folders?ownerId=${ownerId}&search=${search}&page=${page}&limit=${limit}`,
			);
			return folderListResponseSchema.parse(res);
		},
	});
}

export function useFolder(id: string) {
	return useQuery<Folder>({
		queryKey: ["folder", id],
		queryFn: async () => {
			const res = await api(`/folders/${id}`);
			return folderSchema.parse(res);
		},
		enabled: !!id,
	});
}

export function useCreateFolder() {
	const queryClient = useQueryClient();
	return useMutation<Folder, Error, CreateFolderDto>({
		mutationKey: ["createFolder"],
		mutationFn: async (data) => {
			console.log("D", data)
			createFolderSchema.parse(data);
			const res = await api("/folders", {
				method: "POST",
				body: JSON.stringify(data),
			});
			return folderSchema.parse(res);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["folders"] });
		},
	});
}

// ✏️ PUT: update folder
export function useUpdateFolder() {
	const queryClient = useQueryClient();
	return useMutation<Folder, Error, { id: string; data: UpdateFolderDto }>({
		mutationKey: ["updateFolder"],
		mutationFn: async ({ id, data }) => {
			updateFolderSchema.parse(data);
			const res = await api(`/folders/${id}`, {
				method: "PUT",
				body: JSON.stringify(data),
			});
			return folderSchema.parse(res);
		},
		onSuccess: (updatedFolder) => {
			queryClient.invalidateQueries({ queryKey: ["folders"] });
			queryClient.invalidateQueries({ queryKey: ["folder", updatedFolder.id] });
		},
	});
}

export function useDeleteFolder() {
	const queryClient = useQueryClient();
	return useMutation<Folder, Error, string>({
		mutationKey: ["deleteFolder"],
		mutationFn: async (id) => {
			const res = await api(`/folders/${id}`, {
				method: "DELETE",
			});
			return folderSchema.parse(res);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["folders"] });
		},
	});
}
