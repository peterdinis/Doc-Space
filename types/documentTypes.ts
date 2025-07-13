import { z } from "zod";

export const collaboratorSchema = z.object({
	id: z.string(),
	name: z.string(),
	email: z.string().email(),
	role: z.enum(["owner", "editor", "viewer"]),
	avatar: z.string().url().optional(),
	isOnline: z.boolean().optional(),
});

export const documentSchema = z.object({
	id: z.string(),
	title: z.string(),
	content: z.string(),
	createdAt: z.coerce.date(),
	updatedAt: z.coerce.date(),
	ownerId: z.string(),
	ownerName: z.string(),
	collaborators: z.array(collaboratorSchema),
	isShared: z.boolean(),
	status: z.enum(["draft", "published", "archived"]),
});

export const documentShareSchema = z.object({
	documentId: z.string(),
	userId: z.string(),
	role: z.enum(["editor", "viewer"]),
	invitedBy: z.string(),
	invitedAt: z.coerce.date(),
});

export type Collaborator = z.infer<typeof collaboratorSchema>;
export type Document = z.infer<typeof documentSchema>;
export type DocumentShare = z.infer<typeof documentShareSchema>;