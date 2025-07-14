"use client";

import { ArrowLeft, Loader2, Share2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { type FC, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import { useMe } from "@/hooks/auth/useAuth";
import {
	type CreateDocumentDto,
	useCreateDocument,
} from "@/hooks/documents/useCreateDocument";
import { useToast } from "@/hooks/shared/useToast";
import { AppSidebar } from "../dashboard/AppSidebar";
import { TiptapEditor } from "../editor/TipTapEditor";
import { ShareDialog } from "./ShareDialog";

const DocumentEditor: FC = () => {
	const router = useRouter();
	const { data: user } = useMe();
	
	const { toast } = useToast();
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);

	const createDocumentMutation = useCreateDocument();

	const handleBack = () => {
		router.push("/dashboard");
	};

	const handleShare = () => {
		setIsShareDialogOpen(true);
	};

	const handleContentChange = (newContent: string) => {
		setContent(newContent);
	};

	const handleSave = () => {
		if (!user) {
			toast({
				title: "User is not logged in",
				className: "bg-orange-800 text-white font-bold text-xl leading-[125%]",
				duration: 2000,
			});
			return;
		}

		const dto: CreateDocumentDto = {
			title,
			content,
			userId: user.id,
		};

		createDocumentMutation.mutate(dto, {
			onSuccess: () => {
				toast({
					title: "New document was created",
					className: "bg-green-800 text-white font-bold text-xl leading-[125%]",
					duration: 2000,
				});
				router.push("/dashboard");
			},
			onError: (error) => {
				toast({
					title: "Failed to create document",
					className: "bg-red-800 text-white font-bold text-xl leading-[125%]",
					duration: 2000,
				});
			},
		});
	};

	const handleShareDocument = async (
		email: string,
		role: "editor" | "viewer",
	) => {
		// TODO
	};

	return (
		<SidebarProvider>
			<div className="min-h-screen w-full flex bg-background">
				<AppSidebar />
				<SidebarInset className="flex-1">
					<header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between">
						<div className="flex items-center space-x-4">
							<SidebarTrigger />
							<Button
								variant="ghost"
								size="sm"
								onClick={handleBack}
								className="flex items-center space-x-2"
							>
								<ArrowLeft className="h-4 w-4" />
								<span>Back</span>
							</Button>
							<Input
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								className="text-lg font-semibold border-none shadow-none focus-visible:ring-0 max-w-md bg-transparent"
								placeholder="Untitled document"
							/>
						</div>
						<div className="flex items-center space-x-3">
							<Button
								onClick={handleSave}
								size="sm"
								disabled={createDocumentMutation.isPending}
							>
								{createDocumentMutation.isPending ? (
									<Loader2 className="animate-spin w-8 h-8" />
								) : (
									"Save"
								)}
							</Button>
							<Button
								onClick={handleShare}
								size="sm"
								className="flex items-center space-x-2"
							>
								<Share2 className="h-4 w-4" />
								<span>Share</span>
							</Button>
						</div>
					</header>

					<main className="flex-1 bg-gray-50 dark:bg-gray-900">
						<div className="bg-white dark:bg-gray-800 min-h-screen shadow-sm">
							<TiptapEditor content={content} onChange={handleContentChange} />
						</div>
					</main>
					<ShareDialog
						isOpen={isShareDialogOpen}
						onClose={() => setIsShareDialogOpen(false)}
						onShare={handleShareDocument}
						documentTitle={title || "Untitled document"}
					/>
				</SidebarInset>
			</div>
		</SidebarProvider>
	);
};

export default DocumentEditor;
