"use client";

import { FileText, Filter, MoreVertical, Plus, Search } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton"
import { type FC, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import type { Document } from "@/types/document";
import { AppSidebar } from "./AppSidebar";

const DashboardWrapper: FC = () => {
	const [documents, setDocuments] = useState<Document[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [searchTerm, setSearchTerm] = useState("");

	const filteredDocuments = documents.filter((doc) =>
		doc.title.toLowerCase().includes(searchTerm.toLowerCase()),
	);

	const formatDate = (date: Date) => {
		return new Intl.DateTimeFormat("en-US", {
			year: "numeric",
			month: "short",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		}).format(date);
	};

	const getStatusColor = (status: string) => {
		switch (status) {
			case "published":
				return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
			case "draft":
				return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
			case "archived":
				return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
			default:
				return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
		}
	};

	return (
		<SidebarProvider>
			<div className="min-h-screen w-full flex bg-background">
				<AppSidebar />
				<SidebarInset className="flex-1">
					<header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
						<div className="flex items-center justify-between">
							<div className="flex items-center space-x-4">
								<SidebarTrigger />
								<div>
									<h1 className="text-2xl font-bold text-gray-900 dark:text-white">
										Dashboard
									</h1>
									<p className="text-gray-600 dark:text-gray-400">
										Welcome back, ABCD!
									</p>
								</div>
							</div>
							<div className="flex items-center justify-between">
								<div className="flex items-center space-x-3">
									<Button
										className="flex items-center space-x-2"
									>
										<Plus className="h-4 w-4" />
										<Link href="/documents/create">Create document</Link>
									</Button>
								</div>
							</div>
						</div>
					</header>

					{/* Main Content */}
					<main className="flex-1 p-6">
						{/* Search and Filters */}
						<div className="flex items-center space-x-4 mb-6">
							<div className="relative flex-1 max-w-md">
								<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
								<Input
									placeholder="Search documents..."
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									className="pl-10"
								/>
							</div>
							<Button variant="outline" size="sm">
								<Filter className="h-4 w-4 mr-2" />
								Filter
							</Button>
						</div>

						{/* Documents Grid */}
						{isLoading ? (
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
								{[...Array(6)].map((_, i) => (
									<div className="flex flex-col space-y-3">
										<Skeleton className="h-[125px] w-[250px] rounded-xl" />
										<div className="space-y-2">
											<Skeleton className="h-4 w-[250px]" />
											<Skeleton className="h-4 w-[200px]" />
										</div>
									</div>
								))}
							</div>
						) : filteredDocuments.length === 0 ? (
							<div className="text-center py-12">
								<FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
								<h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
									{searchTerm ? "No documents found" : "No documents yet"}
								</h3>
								<p className="text-gray-600 dark:text-gray-400 mb-4">
									{searchTerm
										? "Try adjusting your search terms"
										: "Get started by creating your first document"}
								</p>
								{!searchTerm && (
									<Button>
										<Plus className="h-4 w-4 mr-2" />
										Create Document
									</Button>
								)}
							</div>
						) : (
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
								{filteredDocuments.map((document) => (
									<Card
										key={document.id}
										className="group hover:shadow-md transition-all duration-200 animate-fade-in"
									>
										<CardHeader className="pb-3">
											<div className="flex items-start justify-between">
												<div className="flex-1 min-w-0">
													<CardTitle className="text-lg font-semibold truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
														<Link href={`/document/${document.id}`}>
															{document.title}
														</Link>
													</CardTitle>
													<CardDescription className="mt-1">
														Updated {formatDate(document.updatedAt)}
													</CardDescription>
												</div>
												<Button
													variant="ghost"
													size="sm"
													className="opacity-0 group-hover:opacity-100 transition-opacity"
												>
													<MoreVertical className="h-4 w-4" />
												</Button>
											</div>
										</CardHeader>
										<CardContent className="pt-0">
											<div className="flex items-center justify-between">
												<Badge className={getStatusColor(document.status)}>
													{document.status}
												</Badge>
												<div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
													<span>
														{document.collaborators.length} collaborators
													</span>
												</div>
											</div>
											{document.content && (
												<p className="mt-3 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
													{document.content.substring(0, 100)}...
												</p>
											)}
										</CardContent>
									</Card>
								))}
							</div>
						)}
					</main>
				</SidebarInset>
			</div>
		</SidebarProvider>
	);
};

export default DashboardWrapper;
