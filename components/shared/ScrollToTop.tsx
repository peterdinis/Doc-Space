"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ScrollToTopButton() {
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const toggleVisibility = () => {
			setVisible(window.scrollY > 300);
		};

		window.addEventListener("scroll", toggleVisibility);
		return () => window.removeEventListener("scroll", toggleVisibility);
	}, []);

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	return (
		<Button
			onClick={scrollToTop}
			variant="secondary"
			size="icon"
			className={cn(
				"fixed bottom-6 right-6 z-50 rounded-full shadow-lg transition-opacity duration-300",
				visible ? "opacity-100" : "opacity-0 pointer-events-none",
			)}
		>
			<ArrowUp className="h-5 w-5" />
		</Button>
	);
}
