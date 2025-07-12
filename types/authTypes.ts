export interface AuthResponse {
	access_token: string;
	user: {
		id: string;
		email: string;
		name?: string;
		createdAt: string;
		updatedAt: string;
	};
}
 
export interface LoginDto {
	email: string;
	password: string;
}

export interface RegisterDto extends LoginDto {
	name?: string;
}

export interface User {
	id: string;
	email: string;
	name?: string;
	createdAt: string;
	updatedAt: string;
}
