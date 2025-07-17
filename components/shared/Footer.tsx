import { FileText } from "lucide-react";
import type { FC } from "react";

const Footer: FC = () => {
	return (
		<footer className="bg-gray-900 text-white py-12 animate-fade-in">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center">
					<div className="flex justify-center items-center mb-4">
						<div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg mr-3">
							<FileText className="h-6 w-6 text-white" />
						</div>
						<span className="text-xl font-bold">DocSpace</span>
					</div>
					<p className="text-gray-400 dark:text-sky-100 mb-4">
						Create, collaborate, and share documents like never before.
					</p>
					<div className="text-sm text-gray-500 dark:text-sky-50">
						© 2025 DocSpace. All rights reserved.
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
