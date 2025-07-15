"use client";

import { useState } from "react";
import { EditorContent } from "@tiptap/react";
import {
	AlignCenter,
	AlignJustify,
	AlignLeft,
	AlignRight,
	Bold,
	Code,
	Highlighter,
	ImageIcon,
	Italic,
	Link as LinkIcon,
	List,
	ListOrdered,
	Palette,
	Quote,
	Redo,
	Strikethrough,
	Underline as UnderlineIcon,
	Undo,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { useCreateEditor } from "@/hooks/editor/useEditor";
import { useCreateDocument } from "@/hooks/documents/useCreateDocument";
import { useMe } from "@/hooks/auth/useAuth";

interface TiptapEditorProps {
	content: string;
	onChange: (content: string) => void;
	title: string
}

export const TiptapEditor = ({ content, onChange, title }: TiptapEditorProps) => {
	const [showColorPicker, setShowColorPicker] = useState(false);

	const editor = useCreateEditor(content, onChange);
	const createDocument = useCreateDocument();
	const {data: user} = useMe()

	if (!editor) return null;

	const colors = [
		"#000000", "#FF0000", "#00FF00", "#0000FF", "#FFFF00",
		"#FF00FF", "#00FFFF", "#808080", "#800000", "#008000",
		"#000080", "#808000", "#800080", "#008080",
	];

	const handleSave = async () => {
		try {
			await createDocument.mutateAsync({
				title,
				content: editor.getHTML(),
				userId: user?.userId!
			});
			alert("Document created!");
		} catch (err: any) {
			alert("Failed to create document: " + err.message);
		}
	};

	return (
		<div className="border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-muted shadow-sm">
			<ScrollArea>
				{/* Toolbar */}
				<div className="border-b border-gray-200 dark:border-gray-700 p-3 bg-gray-50 dark:bg-background rounded-t-lg">
					<div className="flex flex-wrap items-center gap-2">
						<Button
							variant="ghost"
							size="icon"
							onClick={() => editor.chain().focus().toggleBold().run()}
							className={editor.isActive("bold") ? "bg-muted" : ""}
							aria-label="Bold"
						>
							<Bold className="w-4 h-4" />
						</Button>
						<Button
							variant="ghost"
							size="icon"
							onClick={() => editor.chain().focus().toggleItalic().run()}
							className={editor.isActive("italic") ? "bg-muted" : ""}
							aria-label="Italic"
						>
							<Italic className="w-4 h-4" />
						</Button>
						<Button
							variant="ghost"
							size="icon"
							onClick={() => editor.chain().focus().toggleStrike().run()}
							className={editor.isActive("strike") ? "bg-muted" : ""}
							aria-label="Strikethrough"
						>
							<Strikethrough className="w-4 h-4" />
						</Button>
						<Button
							variant="ghost"
							size="icon"
							onClick={() => editor.chain().focus().toggleUnderline().run()}
							className={editor.isActive("underline") ? "bg-muted" : ""}
							aria-label="Underline"
						>
							<UnderlineIcon className="w-4 h-4" />
						</Button>

						{/* Text Alignment */}
						<Button
							variant="ghost"
							size="icon"
							onClick={() => editor.chain().focus().setTextAlign("left").run()}
							className={editor.isActive({ textAlign: "left" }) ? "bg-muted" : ""}
							aria-label="Align Left"
						>
							<AlignLeft className="w-4 h-4" />
						</Button>
						<Button
							variant="ghost"
							size="icon"
							onClick={() => editor.chain().focus().setTextAlign("center").run()}
							className={editor.isActive({ textAlign: "center" }) ? "bg-muted" : ""}
							aria-label="Align Center"
						>
							<AlignCenter className="w-4 h-4" />
						</Button>
						<Button
							variant="ghost"
							size="icon"
							onClick={() => editor.chain().focus().setTextAlign("right").run()}
							className={editor.isActive({ textAlign: "right" }) ? "bg-muted" : ""}
							aria-label="Align Right"
						>
							<AlignRight className="w-4 h-4" />
						</Button>
						<Button
							variant="ghost"
							size="icon"
							onClick={() => editor.chain().focus().setTextAlign("justify").run()}
							className={editor.isActive({ textAlign: "justify" }) ? "bg-muted" : ""}
							aria-label="Align Justify"
						>
							<AlignJustify className="w-4 h-4" />
						</Button>

						{/* Lists */}
						<Button
							variant="ghost"
							size="icon"
							onClick={() => editor.chain().focus().toggleBulletList().run()}
							className={editor.isActive("bulletList") ? "bg-muted" : ""}
							aria-label="Bullet List"
						>
							<List className="w-4 h-4" />
						</Button>
						<Button
							variant="ghost"
							size="icon"
							onClick={() => editor.chain().focus().toggleOrderedList().run()}
							className={editor.isActive("orderedList") ? "bg-muted" : ""}
							aria-label="Ordered List"
						>
							<ListOrdered className="w-4 h-4" />
						</Button>

						{/* Code and Quote */}
						<Button
							variant="ghost"
							size="icon"
							onClick={() => editor.chain().focus().toggleCode().run()}
							className={editor.isActive("code") ? "bg-muted" : ""}
							aria-label="Code"
						>
							<Code className="w-4 h-4" />
						</Button>
						<Button
							variant="ghost"
							size="icon"
							onClick={() => editor.chain().focus().toggleBlockquote().run()}
							className={editor.isActive("blockquote") ? "bg-muted" : ""}
							aria-label="Blockquote"
						>
							<Quote className="w-4 h-4" />
						</Button>

						{/* Highlight and Color */}
						<Button
							variant="ghost"
							size="icon"
							onClick={() => editor.chain().focus().toggleHighlight().run()}
							className={editor.isActive("highlight") ? "bg-muted" : ""}
							aria-label="Highlight"
						>
							<Highlighter className="w-4 h-4" />
						</Button>
						<Button
							variant="ghost"
							size="icon"
							onClick={() => setShowColorPicker(!showColorPicker)}
							aria-label="Text Color"
						>
							<Palette className="w-4 h-4" />
						</Button>

						{/* Link */}
						<Button
							variant="ghost"
							size="icon"
							onClick={() => {
								const previousUrl = editor.getAttributes("link").href;
								const url = window.prompt("Enter URL:", previousUrl);
								if (url === null) return;
								if (url === "") {
									editor.chain().focus().extendMarkRange("link").unsetLink().run();
									return;
								}
								editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
							}}
							className={editor.isActive("link") ? "bg-muted" : ""}
							aria-label="Link"
						>
							<LinkIcon className="w-4 h-4" />
						</Button>

						{/* Image */}
						<Button
							variant="ghost"
							size="icon"
							onClick={() => {
								const url = window.prompt("Enter image URL:");
								if (url) {
									editor.chain().focus().setImage({ src: url }).run();
								}
							}}
							aria-label="Image"
						>
							<ImageIcon className="w-4 h-4" />
						</Button>

						{/* Undo / Redo */}
						<Button
							variant="ghost"
							size="icon"
							onClick={() => editor.chain().focus().undo().run()}
							aria-label="Undo"
						>
							<Undo className="w-4 h-4" />
						</Button>
						<Button
							variant="ghost"
							size="icon"
							onClick={() => editor.chain().focus().redo().run()}
							aria-label="Redo"
						>
							<Redo className="w-4 h-4" />
						</Button>

						{/* Save Button */}
						<Button
							variant="default"
							size="sm"
							onClick={handleSave}
							className="ml-auto"
							disabled={createDocument.isPending}
						>
							{createDocument.isPending ? "Saving..." : "Save"}
						</Button>
					</div>

					{/* Color picker */}
					{showColorPicker && (
						<div className="flex flex-wrap gap-1 mt-2">
							{colors.map((color) => (
								<button
									key={color}
									onClick={() => {
										editor.chain().focus().setColor(color).run();
										setShowColorPicker(false);
									}}
									style={{ backgroundColor: color }}
									className="w-6 h-6 rounded"
									aria-label={`Set text color ${color}`}
								/>
							))}
						</div>
					)}
				</div>

				{/* Editor Content */}
				<div className="min-h-[500px] max-w-none">
					<EditorContent editor={editor} className="tiptap-editor" />
				</div>
			</ScrollArea>
		</div>
	);
};
