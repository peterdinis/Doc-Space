"use client";

import { useEditor } from "@tiptap/react";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import Color from "@tiptap/extension-color";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import StarterKit from "@tiptap/starter-kit";

export function useCreateEditor(content: string, onChange: (content: string) => void) {
	return useEditor({
		extensions: [
            StarterKit,
			Underline,
			TextAlign.configure({
				types: ["heading", "paragraph"],
			}),
			Color,
			Highlight,
			Link.configure({
				openOnClick: false,
			}),
			Image,
		],
		content,
		editorProps: {
			attributes: {
				class:
					"prose dark:prose-invert max-w-none outline-none px-4 py-6 min-h-[300px]",
			},
		},
		onUpdate({ editor }) {
			onChange(editor.getHTML());
		},
	});
}