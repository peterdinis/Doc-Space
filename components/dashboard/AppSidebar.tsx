"use client";

import {
	ChevronDown,
	ChevronRight,
	FileText,
	Folder,
	Plus,
	Users,
} from "lucide-react";
import Link from "next/link";
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
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { useCreateFolder, useFolders } from "@/hooks/folders/useFolders";
import { useMe } from "@/hooks/auth/useAuth";

export const AppSidebar = () => {
	const { state } = useSidebar();
	const [open, setOpen] = useState(false);
	const { toast } = useToast();
	const { data: user } = useMe()
	const { data: folderData} = useFolders(user?.id!)
	const createFolder = useCreateFolder();
	const [expandedSections, setExpandedSections] = useState({
		folders: true,
		connections: true,
		documents: true,
	});

	const toggleSection = (section: keyof typeof expandedSections) => {
		setExpandedSections((prev) => ({
			...prev,
			[section]: !prev[section],
		}));
	};

	const isCollapsed = state === "collapsed";

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
						</div>
					)}
				</div>
			</SidebarHeader>

			<SidebarContent className="p-2">
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

					{/*
				{expandedSections.documents && !isCollapsed && (
					<SidebarGroupContent className="animate-accordion-down">
						<SidebarMenu>
							{filteredDocuments.slice(0, 5).map((document) => (
								<SidebarMenuItem key={document.id}>
									<SidebarMenuButton
										asChild
										className="transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-move"
										draggable
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
				*/}
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
								onSubmit={async (e) => {
									e.preventDefault();
									const form = e.target as HTMLFormElement;
									const formData = new FormData(form);
									const folderName = formData.get("folderName")?.toString() || "";

									try {
										await createFolder.mutateAsync({
											name: folderName,
											ownerId: user?.id!
										});
										toast({
											title: "Folder created",
											description: `Folder "${folderName}" has been created successfully.`,
											duration: 2000
										});
									} catch (err) {
										toast({
											title: "Error creating folder",
											description: (err as Error).message,
											variant: "destructive",
										});
									} finally {
										form.reset();
										setOpen(false);
									}
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
								{folderData && folderData.data.map((folder) => (
									<SidebarMenuItem key={folder.id}>
										<SidebarMenuButton
											className="transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-gray-700 border-2 border-transparent hover:border-blue-200 dark:hover:border-blue-800"
										>
											<Folder className="h-4 w-4 text-gray-500 dark:text-gray-400" />
											{!isCollapsed && (
												<>
													<span className="flex-1">{folder.name}</span>
												</>
											)}
										</SidebarMenuButton>

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
						<Button
							variant="ghost"
							size="sm"
							className="h-6 w-6 p-0 hover:bg-gray-200 dark:hover:bg-gray-600"
						>
							<Plus className="h-3 w-3" />
						</Button>
					</SidebarGroupLabel>

					{/*{expandedSections.connections && (
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
						*/}
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	);
};
