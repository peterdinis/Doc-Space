"use client";

import {
	ChevronDown,
	ChevronRight,
	FileText,
	Folder,
	MoreHorizontal,
	Plus,
	Search,
	User,
	Users,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";
import { useToast } from "@/hooks/shared/useToast";
import type { Document } from "@/types/document";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

interface Folder {
	id: string;
	name: string;
	documentsCount: number;
	documents: Document[];
}

interface Connection {
	id: string;
	name: string;
	email: string;
	avatar?: string;
	isOnline: boolean;
}

const mockFolders: Folder[] = [
	{
		id: "1",
		name: "Work Projects",
		documentsCount: 5,
		documents: [],
	},
	{
		id: "2",
		name: "Personal",
		documentsCount: 3,
		documents: [],
	},
	{
		id: "3",
		name: "Shared with me",
		documentsCount: 8,
		documents: [],
	},
];

const mockConnections: Connection[] = [
	{
		id: "1",
		name: "Alice Johnson",
		email: "alice@example.com",
		isOnline: true,
	},
	{ id: "2", name: "Bob Smith", email: "bob@example.com", isOnline: false },
	{ id: "3", name: "Carol Davis", email: "carol@example.com", isOnline: true },
];

export const AppSidebar = () => {
	const { state } = useSidebar();
	const [open, setOpen] = useState(false);
	const { toast } = useToast();
	const [searchTerm, setSearchTerm] = useState("");
	const [documents, setDocuments] = useState<Document[]>([]);
	const [folders, setFolders] = useState<Folder[]>(mockFolders);
	const [expandedSections, setExpandedSections] = useState({
		folders: true,
		connections: true,
		documents: true,
	});
	const [draggedDocument, setDraggedDocument] = useState<Document | null>(null);

	const toggleSection = (section: keyof typeof expandedSections) => {
		setExpandedSections((prev) => ({
			...prev,
			[section]: !prev[section],
		}));
	};

	const handleDragStart = (e: React.DragEvent, document: Document) => {
		setDraggedDocument(document);
		e.dataTransfer.effectAllowed = "move";
	};

	const handleDragOver = (e: React.DragEvent) => {
		e.preventDefault();
		e.dataTransfer.dropEffect = "move";
	};

	const handleDrop = (e: React.DragEvent, folderId: string) => {
		e.preventDefault();
		if (!draggedDocument) return;

		const targetFolder = folders.find((f) => f.id === folderId);
		if (!targetFolder) return;

		// Update folders state
		setFolders((prev) =>
			prev.map((folder) => {
				if (folder.id === folderId) {
					const isAlreadyInFolder = folder.documents.some(
						(doc) => doc.id === draggedDocument.id,
					);
					if (!isAlreadyInFolder) {
						return {
							...folder,
							documents: [...folder.documents, draggedDocument],
							documentsCount: folder.documentsCount + 1,
						};
					}
				} else {
					// Remove from other folders
					return {
						...folder,
						documents: folder.documents.filter(
							(doc) => doc.id !== draggedDocument.id,
						),
						documentsCount: Math.max(
							0,
							folder.documentsCount -
								(folder.documents.some((doc) => doc.id === draggedDocument.id)
									? 1
									: 0),
						),
					};
				}
				return folder;
			}),
		);

		toast({
			title: "Document moved",
			description: `"${draggedDocument.title}" has been moved to "${targetFolder.name}".`,
		});

		setDraggedDocument(null);
	};

	const isCollapsed = state === "collapsed";

	const filteredDocuments = documents.filter((doc) =>
		doc.title.toLowerCase().includes(searchTerm.toLowerCase()),
	);

	return (
		<Sidebar className="border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
			<SidebarHeader className="p-4 border-b border-gray-100 dark:border-gray-700">
				<div className="flex items-center space-x-3">
					<FileText className="h-8 w-8 text-blue-600 dark:text-blue-400" />
					{!isCollapsed && (
						<div>
							<h1 className="text-lg font-bold text-gray-900 dark:text-white">
								DocSpace
							</h1>
							<p className="text-sm text-gray-500 dark:text-gray-400">
								Welcome, abcd
							</p>
						</div>
					)}
				</div>
			</SidebarHeader>

			<SidebarContent className="p-2">
				{/* Search */}
				{!isCollapsed && (
					<div className="mb-4 px-2">
						<div className="relative">
							<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
							<Input
								placeholder="Search documents..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="pl-10 h-9 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
							/>
						</div>
					</div>
				)}

				<SidebarGroup>
					<SidebarGroupContent>
						<SidebarMenu>
							<SidebarMenuItem>
								<SidebarMenuButton asChild>
									<Link
										href="/dashboard"
										className={`bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 transition-colors duration-200`}
									>
										<FileText className="h-4 w-4" />
										{!isCollapsed && <span>All Documents</span>}
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>

				{/* Documents */}
				<SidebarGroup>
					<SidebarGroupLabel
						className="flex items-center justify-between cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md px-2 py-1 transition-colors"
						onClick={() => toggleSection("documents")}
					>
						<div className="flex items-center">
							{expandedSections.documents ? (
								<ChevronDown className="h-4 w-4 mr-1" />
							) : (
								<ChevronRight className="h-4 w-4 mr-1" />
							)}
							<FileText className="h-4 w-4 mr-2" />
							{!isCollapsed && <span>Recent Documents</span>}
						</div>
					</SidebarGroupLabel>

					{expandedSections.documents && !isCollapsed && (
						<SidebarGroupContent className="animate-accordion-down">
							<SidebarMenu>
								{filteredDocuments.slice(0, 5).map((document) => (
									<SidebarMenuItem key={document.id}>
										<SidebarMenuButton
											asChild
											className="transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-move"
											draggable
											onDragStart={(e) => handleDragStart(e, document)}
										>
											<Link
												href={`/document/${document.id}`}
												className="flex items-center justify-between w-full"
											>
												<div className="flex items-center flex-1 min-w-0">
													<FileText className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-2 flex-shrink-0" />
													<span className="truncate text-sm">
														{document.title}
													</span>
												</div>
												<MoreHorizontal className="h-3 w-3 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
											</Link>
										</SidebarMenuButton>
									</SidebarMenuItem>
								))}
							</SidebarMenu>
						</SidebarGroupContent>
					)}
				</SidebarGroup>

				<SidebarGroup>
					<Dialog open={open} onOpenChange={setOpen}>
						<SidebarGroupLabel className="flex items-center justify-between cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md px-2 py-1 transition-colors">
							<div
								className="flex items-center"
								onClick={() => toggleSection("folders")}
							>
								{expandedSections.folders ? (
									<ChevronDown className="h-4 w-4 mr-1" />
								) : (
									<ChevronRight className="h-4 w-4 mr-1" />
								)}
								<Folder className="h-4 w-4 mr-2" />
								{!isCollapsed && <span>Folders</span>}
							</div>

							<Button
								variant="ghost"
								size="sm"
								className="h-6 w-6 p-0 hover:bg-gray-200 dark:hover:bg-gray-600"
								onClick={(e) => {
									e.stopPropagation();
									setOpen(true);
								}}
							>
								<Plus className="h-3 w-3" />
							</Button>
						</SidebarGroupLabel>

						<DialogContent>
							<DialogHeader>
								<DialogTitle>Add New Folder</DialogTitle>
							</DialogHeader>

							<form
								onSubmit={(e) => {
									e.preventDefault();
									const form = e.target as HTMLFormElement;
									const formData = new FormData(form);
									const folderName =
										formData.get("folderName")?.toString() || "";

									console.log("Pridaný folder:", folderName);

									setOpen(false);
								}}
							>
								<Input
									name="folderName"
									type="text"
									placeholder="Folder Name"
									className="w-full border rounded-md p-2 mb-4"
									required
								/>
								<Button type="submit">
									Add new folder <Folder />
								</Button>
							</form>
						</DialogContent>
					</Dialog>

					{expandedSections.folders && (
						<SidebarGroupContent className="animate-accordion-down">
							<SidebarMenu>
								{folders.map((folder) => (
									<SidebarMenuItem key={folder.id}>
										<SidebarMenuButton
											className="transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-gray-700 border-2 border-transparent hover:border-blue-200 dark:hover:border-blue-800"
											onDragOver={handleDragOver}
											onDrop={(e) => handleDrop(e, folder.id)}
										>
											<Folder className="h-4 w-4 text-gray-500 dark:text-gray-400" />
											{!isCollapsed && (
												<>
													<span className="flex-1">{folder.name}</span>
													<span className="text-xs text-gray-400 dark:text-gray-500">
														{folder.documentsCount}
													</span>
												</>
											)}
										</SidebarMenuButton>

										{/* Show documents in folder */}
										{!isCollapsed && folder.documents.length > 0 && (
											<div className="ml-6 mt-1 space-y-1">
												{folder.documents.map((doc) => (
													<Link
														key={doc.id}
														href={`/document/${doc.id}`}
														className="block px-2 py-1 text-xs text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700 rounded truncate"
													>
														{doc.title}
													</Link>
												))}
											</div>
										)}
									</SidebarMenuItem>
								))}
							</SidebarMenu>
						</SidebarGroupContent>
					)}
				</SidebarGroup>

				{/* Connections */}
				<SidebarGroup>
					<SidebarGroupLabel
						className="flex items-center justify-between cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md px-2 py-1 transition-colors"
						onClick={() => toggleSection("connections")}
					>
						<div className="flex items-center">
							{expandedSections.connections ? (
								<ChevronDown className="h-4 w-4 mr-1" />
							) : (
								<ChevronRight className="h-4 w-4 mr-1" />
							)}
							<Users className="h-4 w-4 mr-2" />
							{!isCollapsed && <span>Connections</span>}
						</div>
						{!isCollapsed && (
							<Button
								variant="ghost"
								size="sm"
								className="h-6 w-6 p-0 hover:bg-gray-200 dark:hover:bg-gray-600"
							>
								<Plus className="h-3 w-3" />
							</Button>
						)}
					</SidebarGroupLabel>

					{expandedSections.connections && (
						<SidebarGroupContent className="animate-accordion-down">
							<SidebarMenu>
								{mockConnections.map((connection) => (
									<SidebarMenuItem key={connection.id}>
										<SidebarMenuButton className="transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-gray-700">
											<div className="relative">
												<User className="h-4 w-4 text-gray-500 dark:text-gray-400" />
												{connection.isOnline && (
													<div className="absolute -bottom-1 -right-1 w-2 h-2 bg-green-400 rounded-full border border-white dark:border-gray-800"></div>
												)}
											</div>
											{!isCollapsed && (
												<div className="flex-1 min-w-0">
													<div className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
														{connection.name}
													</div>
													<div className="text-xs text-gray-500 dark:text-gray-400 truncate">
														{connection.email}
													</div>
												</div>
											)}
										</SidebarMenuButton>
									</SidebarMenuItem>
								))}
							</SidebarMenu>
						</SidebarGroupContent>
					)}
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	);
};
