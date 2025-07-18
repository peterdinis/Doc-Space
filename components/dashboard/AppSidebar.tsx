"use client";

import { useQueryClient } from "@tanstack/react-query";
import {
	ChevronDown,
	ChevronRight,
	FileText,
	Folder,
	Loader2,
	Plus,
	Users,
	X,
} from "lucide-react";
import Link from "next/link";
import { type Key, useMemo, useState } from "react";
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
import { useMe } from "@/hooks/auth/useAuth";
import {
	useCreateFolder,
	useDeleteFolder,
	useLoggedUserFolders,
} from "@/hooks/folders/useFolders";
import { useToast } from "@/hooks/shared/useToast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

export const AppSidebar = () => {
	const { state } = useSidebar();
	const [open, setOpen] = useState(false);
	const [connectionDialogOpen, setConnectionDialogOpen] = useState(false);
	const { toast } = useToast();
	const { data: user } = useMe();

	const userId = useMemo(() => {
		return user?.userId;
	}, [user]);

	const { data: folderData, isLoading } = useLoggedUserFolders(userId!);
	const queryClient = useQueryClient();
	const deleteFolder = useDeleteFolder();

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

	if (isLoading) return <Loader2 className="animate-spin w-6 h-6" />;

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
										className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 transition-colors duration-200"
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
									const folderName =
										formData.get("folderName")?.toString() || "";
									try {
										await createFolder.mutate({
											name: folderName,
											ownerId: user?.userId!,
											documents: [],
										});
										toast({
											title: "Folder created",
											description: `Folder "${folderName}" has been created successfully.`,
											duration: 2000,
											className: "bg-green-800 text-white font-bold text-xl",
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
									Add new folder <Folder className="ml-2" />
								</Button>
							</form>
						</DialogContent>
					</Dialog>

					{expandedSections.folders && (
						<SidebarGroupContent className="animate-accordion-down">
							<SidebarMenu>
								{folderData &&
									folderData.data.map(
										(folder: {
											id: Key;
											name: string;
											documents: unknown[];
										}) => (
											<SidebarMenuItem key={folder.id}>
												<SidebarMenuButton className="transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-gray-700 border-2 border-transparent hover:border-blue-200 dark:hover:border-blue-800">
													<Folder className="h-4 w-4 text-gray-500 dark:text-gray-400" />
													{!isCollapsed && (
														<>
															<Link href={`/folders/${folder.id}`}>
																<span className="flex-1">{folder.name}</span>
															</Link>
															<X
																onClick={() => {
																	deleteFolder.mutate(String(folder?.id!));
																	toast({
																		title: "Folder was deleted",
																		duration: 2000,
																		className:
																			"bg-green-800 text-white font-bold text-base leading-[130%]",
																	});
																	queryClient.prefetchQuery({
																		queryKey: ["folders"],
																	});
																	window.location.reload();
																}}
																className="cursor-pointer text-red-700 dark:text-red-200"
															/>
														</>
													)}
												</SidebarMenuButton>
											</SidebarMenuItem>
										),
									)}
							</SidebarMenu>
						</SidebarGroupContent>
					)}
				</SidebarGroup>

				<SidebarGroup>
					<Dialog
						open={connectionDialogOpen}
						onOpenChange={setConnectionDialogOpen}
					>
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
								onClick={(e) => {
									e.stopPropagation();
									setConnectionDialogOpen(true);
								}}
							>
								<Plus className="h-3 w-3" />
							</Button>
						</SidebarGroupLabel>

						<DialogContent>
							<DialogHeader>
								<DialogTitle>Add Connection</DialogTitle>
							</DialogHeader>
							<form
								onSubmit={(e) => {
									e.preventDefault();
									const form = e.target as HTMLFormElement;
									const formData = new FormData(form);
									const email = formData.get("email")?.toString() || "";
									console.log("Connection email:", email);
									form.reset();
									setConnectionDialogOpen(false);
									toast({
										title: "Connection request sent",
										description: `Invitation sent to ${email}`,
										duration: 2000,
										className: "bg-green-800 text-white font-bold text-base",
									});
								}}
							>
								<Input
									name="email"
									type="email"
									placeholder="User email"
									className="w-full border rounded-md p-2 mb-4"
									required
								/>
								<Button type="submit">
									Send Invite <Users className="ml-2" />
								</Button>
							</form>
						</DialogContent>
					</Dialog>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	);
};
