"use client";

import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
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
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface TiptapEditorProps {
	content: string;
	onChange: (content: string) => void;
}

export const TiptapEditor = ({ content, onChange }: TiptapEditorProps) => {
	const [showColorPicker, setShowColorPicker] = useState(false);

	const editor = useEditor({
		extensions: [
			StarterKit,
			Underline,
			TextAlign.configure({
				types: ["heading", "paragraph"],
			}),
			Color,
			TextStyle,
			Highlight.configure({
				multicolor: true,
			}),
			Link.configure({
				openOnClick: false,
			}),
			Image,
		],
		content,
		onUpdate: ({ editor }) => {
			onChange(editor.getHTML());
		},
		editorProps: {
			attributes: {
				class:
					"prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[500px] p-8",
			},
		},
	});

	if (!editor) {
		return null;
	}

	const addImage = () => {
		const url = window.prompt("Enter image URL:");
		if (url) {
			editor.chain().focus().setImage({ src: url }).run();
		}
	};

	const setLink = () => {
		const previousUrl = editor.getAttributes("link").href;
		const url = window.prompt("Enter URL:", previousUrl);

		if (url === null) {
			return;
		}

		if (url === "") {
			editor.chain().focus().extendMarkRange("link").unsetLink().run();
			return;
		}

		editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
	};

	const colors = [
		"#000000",
		"#FF0000",
		"#00FF00",
		"#0000FF",
		"#FFFF00",
		"#FF00FF",
		"#00FFFF",
		"#808080",
		"#800000",
		"#008000",
		"#000080",
		"#808000",
		"#800080",
		"#008080",
	];

	return (
		<div className="border border-gray-200 rounded-lg bg-white shadow-sm">
			{/* Toolbar */}
			<div className="border-b border-gray-200 p-3 bg-gray-50 rounded-t-lg">
				<div className="flex flex-wrap items-center gap-2">
					{/* Text Formatting */}
					<div className="flex items-center gap-1 border-r border-gray-300 pr-2">
						<Button
							variant={editor.isActive("bold") ? "default" : "ghost"}
							size="sm"
							onClick={() => editor.chain().focus().toggleBold().run()}
							className="h-8 w-8 p-0"
						>
							<Bold className="h-4 w-4" />
						</Button>
						<Button
							variant={editor.isActive("italic") ? "default" : "ghost"}
							size="sm"
							onClick={() => editor.chain().focus().toggleItalic().run()}
							className="h-8 w-8 p-0"
						>
							<Italic className="h-4 w-4" />
						</Button>
						<Button
							variant={editor.isActive("underline") ? "default" : "ghost"}
							size="sm"
							onClick={() => editor.chain().focus().toggleUnderline().run()}
							className="h-8 w-8 p-0"
						>
							<UnderlineIcon className="h-4 w-4" />
						</Button>
						<Button
							variant={editor.isActive("strike") ? "default" : "ghost"}
							size="sm"
							onClick={() => editor.chain().focus().toggleStrike().run()}
							className="h-8 w-8 p-0"
						>
							<Strikethrough className="h-4 w-4" />
						</Button>
					</div>

					{/* Alignment */}
					<div className="flex items-center gap-1 border-r border-gray-300 pr-2">
						<Button
							variant={
								editor.isActive({ textAlign: "left" }) ? "default" : "ghost"
							}
							size="sm"
							onClick={() => editor.chain().focus().setTextAlign("left").run()}
							className="h-8 w-8 p-0"
						>
							<AlignLeft className="h-4 w-4" />
						</Button>
						<Button
							variant={
								editor.isActive({ textAlign: "center" }) ? "default" : "ghost"
							}
							size="sm"
							onClick={() =>
								editor.chain().focus().setTextAlign("center").run()
							}
							className="h-8 w-8 p-0"
						>
							<AlignCenter className="h-4 w-4" />
						</Button>
						<Button
							variant={
								editor.isActive({ textAlign: "right" }) ? "default" : "ghost"
							}
							size="sm"
							onClick={() => editor.chain().focus().setTextAlign("right").run()}
							className="h-8 w-8 p-0"
						>
							<AlignRight className="h-4 w-4" />
						</Button>
						<Button
							variant={
								editor.isActive({ textAlign: "justify" }) ? "default" : "ghost"
							}
							size="sm"
							onClick={() =>
								editor.chain().focus().setTextAlign("justify").run()
							}
							className="h-8 w-8 p-0"
						>
							<AlignJustify className="h-4 w-4" />
						</Button>
					</div>

					{/* Lists and Blocks */}
					<div className="flex items-center gap-1 border-r border-gray-300 pr-2">
						<Button
							variant={editor.isActive("bulletList") ? "default" : "ghost"}
							size="sm"
							onClick={() => editor.chain().focus().toggleBulletList().run()}
							className="h-8 w-8 p-0"
						>
							<List className="h-4 w-4" />
						</Button>
						<Button
							variant={editor.isActive("orderedList") ? "default" : "ghost"}
							size="sm"
							onClick={() => editor.chain().focus().toggleOrderedList().run()}
							className="h-8 w-8 p-0"
						>
							<ListOrdered className="h-4 w-4" />
						</Button>
						<Button
							variant={editor.isActive("blockquote") ? "default" : "ghost"}
							size="sm"
							onClick={() => editor.chain().focus().toggleBlockquote().run()}
							className="h-8 w-8 p-0"
						>
							<Quote className="h-4 w-4" />
						</Button>
						<Button
							variant={editor.isActive("code") ? "default" : "ghost"}
							size="sm"
							onClick={() => editor.chain().focus().toggleCode().run()}
							className="h-8 w-8 p-0"
						>
							<Code className="h-4 w-4" />
						</Button>
					</div>

					{/* Colors and Highlighting */}
					<div className="flex items-center gap-1 border-r border-gray-300 pr-2">
						<div className="relative">
							<Button
								variant="ghost"
								size="sm"
								onClick={() => setShowColorPicker(!showColorPicker)}
								className="h-8 w-8 p-0"
							>
								<Palette className="h-4 w-4" />
							</Button>
							{showColorPicker && (
								<div className="absolute top-10 left-0 z-10 bg-white border border-gray-200 rounded-lg p-2 shadow-lg">
									<div className="grid grid-cols-7 gap-1">
										{colors.map((color) => (
											<button
												key={color}
												className="w-6 h-6 rounded border border-gray-300 hover:scale-110 transition-transform"
												style={{ backgroundColor: color }}
												onClick={() => {
													editor.chain().focus().setColor(color).run();
													setShowColorPicker(false);
												}}
											/>
										))}
									</div>
								</div>
							)}
						</div>
						<Button
							variant={editor.isActive("highlight") ? "default" : "ghost"}
							size="sm"
							onClick={() => editor.chain().focus().toggleHighlight().run()}
							className="h-8 w-8 p-0"
						>
							<Highlighter className="h-4 w-4" />
						</Button>
					</div>

					{/* Links and Media */}
					<div className="flex items-center gap-1 border-r border-gray-300 pr-2">
						<Button
							variant={editor.isActive("link") ? "default" : "ghost"}
							size="sm"
							onClick={setLink}
							className="h-8 w-8 p-0"
						>
							<LinkIcon className="h-4 w-4" />
						</Button>
						<Button
							variant="ghost"
							size="sm"
							onClick={addImage}
							className="h-8 w-8 p-0"
						>
							<ImageIcon className="h-4 w-4" />
						</Button>
					</div>

					{/* Undo/Redo */}
					<div className="flex items-center gap-1">
						<Button
							variant="ghost"
							size="sm"
							onClick={() => editor.chain().focus().undo().run()}
							disabled={!editor.can().undo()}
							className="h-8 w-8 p-0"
						>
							<Undo className="h-4 w-4" />
						</Button>
						<Button
							variant="ghost"
							size="sm"
							onClick={() => editor.chain().focus().redo().run()}
							disabled={!editor.can().redo()}
							className="h-8 w-8 p-0"
						>
							<Redo className="h-4 w-4" />
						</Button>
					</div>
				</div>
			</div>

			{/* Editor Content */}
			<div className="min-h-[500px] max-w-none">
				<EditorContent editor={editor} className="tiptap-editor" />
			</div>
		</div>
	);
};
