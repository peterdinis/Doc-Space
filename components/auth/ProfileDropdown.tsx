"use client";

import Link from "next/link";
import type { FC } from "react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMe } from "@/hooks/auth/useAuth";
import { useToast } from "@/hooks/shared/useToast";

const ProfileDropdown: FC = () => {
	const { data: user, isLoading } = useMe();
	const { toast } = useToast();

	console.log("U", user);
	const handleLogout = () => {
		localStorage.removeItem("access_token");
		window.location.replace("/login");
		toast({
			title: "Logout",
			duration: 2000,
			className: "bg-green-800 text-white leading-[125%] text-base font-bold",
		});
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				{isLoading ? "..." : (user?.name ?? user?.email ?? "Open")}
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>
					<Link href="/dashboard">Dashboard</Link>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default ProfileDropdown;
