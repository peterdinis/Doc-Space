import { FileText } from "lucide-react";
import Link from "next/link";
import type { FC } from "react";
import { Button } from "@/components/ui/button";
import ThemeDropdown from "./ThemeDropdown";
import ProfileDropdown from "../auth/ProfileDropdown";

const Navigation: FC = () => {
	return (
		<header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 animate-fade-in">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-16">
					<div className="flex items-center animate-scale-in">
						<div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg mr-3">
							<FileText className="h-6 w-6 text-white" />
						</div>
						<h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
							DocSpace
						</h1>
					</div>

					<div className="flex items-center space-x-4 animate-fade-in">
						<Button variant="outline" asChild className="hover-scale">
							<Link href="/login">Sign In</Link>
						</Button>
						<Button
							asChild
							className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover-scale"
						>
							<Link href="/register">Get Started</Link>
						</Button>
						<ThemeDropdown />
						<ProfileDropdown />
					</div>
				</div>
			</div>
		</header>
	);
};

export default Navigation;
