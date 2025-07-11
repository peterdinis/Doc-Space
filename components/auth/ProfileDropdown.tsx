"use client";

import { FC } from "react";
import { useRouter } from "next/navigation";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMe } from "@/hooks/auth/useAuth";

const ProfileDropdown: FC = () => {
	const router = useRouter();
	const { data: user, isLoading} = useMe();

	const handleLogout = () => {
		localStorage.removeItem("access_token");
		router.refresh();
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				{isLoading ? "..." : user?.name ?? user?.email ?? "Open"}
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>
					{user?.name ?? user?.email ?? "My Account"}
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={handleLogout}>
					Log out
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default ProfileDropdown;
