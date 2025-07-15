"use client";

import { Filter, Plus, Search } from "lucide-react";
import Link from "next/link";
import { type FC, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import { useMe } from "@/hooks/auth/useAuth";
import { useMediaQuery } from "@/hooks/shared/useMediaQuery";
import DocumentList from "../documents/DocumentList";
import { AppSidebar } from "./AppSidebar";

const DashboardWrapper: FC = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [filterBy, setFilterBy] = useState("all");
	const [page, setPage] = useState(1);
	const pageCount = 10;
	const { data: user } = useMe();

	const isMobile = useMediaQuery("(max-width: 640px)");

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
									<Button asChild className="flex items-center space-x-2">
										<Link href="/documents/create">
											<Plus className="h-4 w-4" />
											<span>Create document</span>
										</Link>
									</Button>
								</div>
							</div>
						</div>
					</header>

					<main className="flex-1 p-6">
						<div className="flex flex-wrap items-center gap-4 mb-6">
							<div className="relative flex-1">
								<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
								<Input
									placeholder="Search documents..."
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									className="pl-10"
								/>
							</div>

							<Popover>
								<PopoverTrigger asChild>
									<Button variant="outline" size="sm">
										<Filter className="h-4 w-4 mr-2" />
										Filter
									</Button>
								</PopoverTrigger>
								<PopoverContent className="w-[160px] p-2">
									<Select
										value={filterBy}
										onValueChange={(val) => setFilterBy(val)}
									>
										<SelectTrigger className="w-full">
											<SelectValue placeholder="Filter" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="all">All</SelectItem>
											<SelectItem value="text">Text</SelectItem>
											<SelectItem value="pdf">PDF</SelectItem>
											<SelectItem value="spreadsheet">Spreadsheet</SelectItem>
										</SelectContent>
									</Select>
								</PopoverContent>
							</Popover>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
							<DocumentList />
						</div>

						<div className="flex justify-center">
							<Pagination>
								<PaginationContent>
									<PaginationPrevious
										onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
										href="#"
									/>

									{isMobile ? (
										<PaginationItem>
											<PaginationLink isActive href="#">
												{page}
											</PaginationLink>
										</PaginationItem>
									) : (
										Array.from({ length: pageCount }, (_, index) => {
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
										})
									)}

									<PaginationNext
										onClick={() =>
											setPage((prev) => Math.min(prev + 1, pageCount))
										}
										href="#"
									/>
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
