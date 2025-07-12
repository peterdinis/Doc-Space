"use client";

import { Loader2, Share2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

interface ShareDialogProps {
	isOpen: boolean;
	onClose: () => void;
	onShare: (email: string, role: "editor" | "viewer") => Promise<void>;
	documentTitle: string;
}

export const ShareDialog = ({
	isOpen,
	onClose,
	onShare,
	documentTitle,
}: ShareDialogProps) => {
	const [email, setEmail] = useState("");
	const [role, setRole] = useState<"editor" | "viewer">("editor");
	const [isSharing, setIsSharing] = useState(false);

	const handleShare = async () => {
		if (!email.trim()) return;

		setIsSharing(true);
		try {
			await onShare(email, role);
			setEmail("");
			setRole("editor");
			onClose();
		} catch (error) {
			setIsSharing(false);
		}
	};

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle className="flex items-center">
						<Share2 className="h-5 w-5 mr-2" />
						Share "{documentTitle}"
					</DialogTitle>
					<DialogDescription>
						Invite others to collaborate on this document. They'll receive an
						email invitation.
					</DialogDescription>
				</DialogHeader>

				<div className="grid gap-4 py-4">
					<div className="grid gap-2">
						<Label htmlFor="email">Email address</Label>
						<Input
							id="email"
							type="email"
							placeholder="Enter email address"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>

					<div className="grid w-full gap-2">
						<Label htmlFor="role">Role</Label>
						<Select
							value={role}
							onValueChange={(value: "editor" | "viewer") => setRole(value)}
						>
							<SelectTrigger>
								<SelectValue placeholder="Select role" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="editor">
									Editor - Can edit the document
								</SelectItem>
								<SelectItem value="viewer">
									Viewer - Can only view the document
								</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</div>

				<DialogFooter>
					<Button variant="outline" onClick={onClose}>
						Cancel
					</Button>
					<Button onClick={handleShare} disabled={!email.trim() || isSharing}>
						{isSharing ? <Loader2 className="animate-spin w-8 h-8" /> : "Share"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
