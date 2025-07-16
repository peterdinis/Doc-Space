import { z } from "zod";

export const userSchema = z.object({
	id: z.string(),
	email: z.string().email(),
	name: z.string().optional(),
	createdAt: z.string(),
	updatedAt: z.string(),
	userId: z.string(),
});

export const authResponseSchema = z.object({
	access_token: z.string(),
	user: userSchema,
});

export const loginDtoSchema = z.object({
	email: z.string().email(),
	password: z.string().min(1, "Password is required"),
});

export const registerDtoSchema = loginDtoSchema.extend({
	name: z.string().optional(),
});

export type User = z.infer<typeof userSchema>;
export type AuthResponse = z.infer<typeof authResponseSchema>;
export type LoginDto = z.infer<typeof loginDtoSchema>;
export type RegisterDto = z.infer<typeof registerDtoSchema>;
