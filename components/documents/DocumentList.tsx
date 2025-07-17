"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Ghost, Loader2 } from "lucide-react";
import type { FC } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAllUserDocuments } from "@/hooks/documents/useAllUserDocuments";
import { useMe } from "@/hooks/auth/useAuth";

const containerVariants = {
	hidden: {},
	visible: {
		transition: {
			staggerChildren: 0.08,
		},
	},
};

const itemVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: { opacity: 1, y: 0 },
	exit: { opacity: 0, y: 20 },
};

const DocumentList: FC = () => {
	const { data: user } = useMe();
	const { data: documents, isLoading, isError } = useAllUserDocuments({ userId: user?.userId });

	if (isLoading)
		return (
			<div className="flex justify-center items-center h-32">
				<Loader2 className="animate-spin w-8 h-8 text-muted-foreground" />
			</div>
		);

	if (isError)
		return (
			<div className="text-center text-destructive">
				<p>⚠️ Failed to load documents.</p>
			</div>
		);

	if (!documents || documents.length === 0)
		return (
			<div className="flex items-center justify-center space-x-2 text-muted-foreground h-32">
				<Ghost className="animate-bounce w-6 h-6" />
				<p>No documents found.</p>
			</div>
		);

	return (
		<motion.div
			className="grid grid-cols-2 w-[300%] sm:grid-cols-2 lg:grid-cols-3 gap-4"
			variants={containerVariants}
			initial="hidden"
			animate="visible"
			exit="hidden"
		>
			<AnimatePresence>
				{documents.map((doc) => (
					<motion.div
						key={doc.id}
						variants={itemVariants}
						layout
						exit="exit"
						whileHover={{ scale: 1.03 }}
						transition={{ type: "spring", stiffness: 200, damping: 20 }}
					>
						<Link href={`/document/${doc.id}`} className="block h-full">
							<Card className="h-full transition-shadow shadow-sm hover:shadow-md rounded-2xl border-muted">
								<CardHeader>
									<CardTitle className="text-lg font-semibold truncate">
										{doc.title}
									</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-sm text-blue-600 hover:underline">Detail</p>
								</CardContent>
							</Card>
						</Link>
					</motion.div>
				))}
			</AnimatePresence>
		</motion.div>
	);
};

export default DocumentList;
