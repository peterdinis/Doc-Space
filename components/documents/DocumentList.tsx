"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Ghost, Loader2 } from "lucide-react";
import type { FC } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAllUserDocuments } from "@/hooks/documents/useAllUserDocuments"; // Your hook path
import { useMe } from "@/hooks/auth/useAuth";

const containerVariants = {
	hidden: {},
	visible: {
		transition: {
			staggerChildren: 0.1,
		},
	},
};

const itemVariants = {
	hidden: { opacity: 0, y: 10 },
	visible: { opacity: 1, y: 0 },
};

const DocumentList: FC = () => {
	const {data: user} = useMe()
	const { data: documents, isLoading, isError } = useAllUserDocuments({ userId: user?.userId });
	
	if (isLoading) return <Loader2 className="animate-spin w-8 h-8" />;
	if (isError) return <p>Failed to load documents.</p>;
	if (!documents || documents.length === 0)
		return (
			<div className="flex items-center space-x-2 text-muted-foreground">
				<Ghost className="animate-bounce w-6 h-6" />
				<p>No documents found.</p>
			</div>
		);

	return (
		<motion.div
			className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6"
			variants={containerVariants}
			initial="hidden"
			animate="visible"
			exit="hidden"
		>
			<AnimatePresence>
				{documents.map((doc) => (
					<motion.div key={doc.id} variants={itemVariants} layout>
						<Card className="hover:shadow-lg cursor-pointer transition-shadow duration-200">
							<CardHeader>
								<CardTitle>{doc.title}</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-sm text-muted-foreground truncate">
									{doc.content ?? "No content"}
								</p>
							</CardContent>
						</Card>
					</motion.div>
				))}
			</AnimatePresence>
		</motion.div>
	);
};

export default DocumentList;
