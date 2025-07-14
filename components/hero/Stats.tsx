import type { FC } from "react";

const Stats: FC = () => {
	return (
		<div className="bg-white/80 dark:bg-background backdrop-blur-sm py-16 animate-fade-in">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
					<div className="hover-scale">
						<div className="text-3xl font-bold text-blue-600 mb-2">10K+</div>
						<div className="text-gray-600 dark:text-sky-100">Active Users</div>
					</div>
					<div className="hover-scale">
						<div className="text-3xl font-bold text-purple-600 mb-2">50K+</div>
						<div className="text-gray-600 dark:text-sky-100">Documents Created</div>
					</div>
					<div className="hover-scale">
						<div className="text-3xl font-bold text-green-600 mb-2">99.9%</div>
						<div className="text-gray-600 dark:text-sky-100">Uptime</div>
					</div>
					<div className="hover-scale">
						<div className="text-3xl font-bold text-orange-600 mb-2">24/7</div>
						<div className="text-gray-600 dark:text-sky-100">Support</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Stats;
