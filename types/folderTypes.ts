// types/folderSchemas.ts
import { z } from "zod";

export const createFolderSchema = z.object({
	name: z.string().min(1, "Name is required"),
	ownerId: z.string(),
	documents: z.array(z.any()),
});

export const updateFolderSchema = z.object({
	name: z.string().min(1).optional(),
});

export const folderSchema = z.object({
	id: z.string(),
	name: z.string(),
	ownerId: z.string(),
	createdAt: z.string(),
	updatedAt: z.string(),
	documents: z.array(z.any()),
	owner: z.any(),
});

export const folderListResponseSchema = z.object({
	data: z.array(folderSchema),
	totalCount: z.number(),
	page: z.number(),
	limit: z.number(),
	totalPages: z.number(),
});

export type CreateFolderDto = z.infer<typeof createFolderSchema>;
export type UpdateFolderDto = z.infer<typeof updateFolderSchema>;
export type Folder = z.infer<typeof folderSchema>;
export type FolderListResponse = z.infer<typeof folderListResponseSchema>;
