import { Collaborator } from "@/types/documentTypes";
import { Users } from "lucide-react";

interface CollaboratorsListProps {
	collaborators: Collaborator[];
}

export const CollaboratorsList = ({
	collaborators,
}: CollaboratorsListProps) => {
	const onlineCollaborators = collaborators.filter(
		(c) => c.isOnline && c.role !== "owner",
	);

	return (
		<div className="flex items-center space-x-2">
			{onlineCollaborators.length > 0 && (
				<div className="flex items-center">
					<div className="flex -space-x-2">
						{onlineCollaborators.slice(0, 3).map((collaborator) => (
							<div
								key={collaborator.id}
								className="relative"
								title={`${collaborator.name} (${collaborator.role})`}
							>
								<div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-medium border-2 border-white">
									{collaborator.name.charAt(0).toUpperCase()}
								</div>
								<div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div>
							</div>
						))}
					</div>

					{onlineCollaborators.length > 3 && (
						<div className="ml-2 text-sm text-gray-500">
							+{onlineCollaborators.length - 3} more
						</div>
					)}
				</div>
			)}

			<div className="flex items-center text-sm text-gray-500">
				<Users className="h-4 w-4 mr-1" />
				{collaborators.length} collaborator
				{collaborators.length !== 1 ? "s" : ""}
			</div>
		</div>
	);
};
