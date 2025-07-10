export interface Document {
	id: string;
	title: string;
	content: string;
	createdAt: Date;
	updatedAt: Date;
	ownerId: string;
	ownerName: string;
	collaborators: Collaborator[];
	isShared: boolean;
	status: "draft" | "published" | "archived";
}

export interface Collaborator {
	id: string;
	name: string;
	email: string;
	role: "owner" | "editor" | "viewer";
	avatar?: string;
	isOnline?: boolean;
}

export interface DocumentShare {
	documentId: string;
	userId: string;
	role: "editor" | "viewer";
	invitedBy: string;
	invitedAt: Date;
}
