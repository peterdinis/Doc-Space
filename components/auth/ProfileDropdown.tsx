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
import { useToast } from "@/hooks/shared/useToast";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const ProfileDropdown: FC = () => {
	const { toast } = useToast();

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
				<Avatar>
					<AvatarImage src="https://github.com/shadcn.png" />
					<AvatarFallback>CN</AvatarFallback>
				</Avatar>
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
