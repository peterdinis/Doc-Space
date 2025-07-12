"use client";

import { Filter, Plus, Search } from "lucide-react";
import Link from "next/link";
import { type FC, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { useMe } from "@/hooks/auth/useAuth";
import DocumentList from "../documents/DocumentList";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
} from "@/components/ui/pagination";

const DashboardWrapper: FC = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [page, setPage] = useState(1);
	const pageCount = 10;
	const { data: user } = useMe();

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
										Welcome back, {user?.email}
									</p>
								</div>
							</div>
							<div className="flex items-center justify-between">
								<div className="flex items-center space-x-3">
									<Button className="flex items-center space-x-2">
										<Plus className="h-4 w-4" />
										<Link href="/documents/create">Create document</Link>
									</Button>
								</div>
							</div>
						</div>
					</header>

					<main className="flex-1 p-6">
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

						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
							<DocumentList />
						</div>

						{/* Pagination */}
						<div className="flex justify-center">
							<Pagination>
								<PaginationContent>
									{Array.from({ length: pageCount }, (_, index) => {
										const pageNum = index + 1;
										return (
											<PaginationItem key={pageNum}>
												<PaginationLink
													isActive={page === pageNum}
													onClick={() => setPage(pageNum)}
													href="#"
												>
													{pageNum}
												</PaginationLink>
											</PaginationItem>
										);
									})}
								</PaginationContent>
							</Pagination>
						</div>
					</main>
				</SidebarInset>
			</div>
		</SidebarProvider>
	);
};

export default DashboardWrapper;
