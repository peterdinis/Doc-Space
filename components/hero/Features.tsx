import { CheckCircle, Edit, Share2, Users } from "lucide-react";
import type { FC } from "react";

const Features: FC = () => {
	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
			<div className="text-center mb-16 animate-fade-in">
				<h3 className="text-3xl font-bold text-gray-900 mb-4">
					Everything you need to collaborate
				</h3>
				<p className="text-lg text-gray-600 max-w-2xl mx-auto">
					Powerful features designed to make document collaboration seamless and
					efficient.
				</p>
			</div>

			<div className="grid md:grid-cols-3 gap-8">
				<div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center group hover-scale animate-fade-in">
					<div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-2xl w-fit mx-auto mb-6 group-hover:scale-110 transition-transform">
						<Edit className="h-8 w-8 text-white" />
					</div>
					<h4 className="text-xl font-semibold text-gray-900 mb-3">
						Real-time Editing
					</h4>
					<p className="text-gray-600 mb-4">
						Edit documents together with your team in real-time. See changes as
						they happen with live cursors.
					</p>
					<div className="flex items-center justify-center text-blue-600 text-sm font-medium">
						<CheckCircle className="h-4 w-4 mr-2" />
						Live collaboration
					</div>
				</div>

				<div
					className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center group hover-scale animate-fade-in"
					style={{ animationDelay: "0.1s" }}
				>
					<div className="bg-gradient-to-r from-purple-500 to-purple-600 p-4 rounded-2xl w-fit mx-auto mb-6 group-hover:scale-110 transition-transform">
						<Users className="h-8 w-8 text-white" />
					</div>
					<h4 className="text-xl font-semibold text-gray-900 mb-3">
						Team Collaboration
					</h4>
					<p className="text-gray-600 mb-4">
						Invite team members and collaborate seamlessly with role-based
						permissions and comments.
					</p>
					<div className="flex items-center justify-center text-purple-600 text-sm font-medium">
						<CheckCircle className="h-4 w-4 mr-2" />
						Smart permissions
					</div>
				</div>

				<div
					className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center group hover-scale animate-fade-in"
					style={{ animationDelay: "0.2s" }}
				>
					<div className="bg-gradient-to-r from-green-500 to-green-600 p-4 rounded-2xl w-fit mx-auto mb-6 group-hover:scale-110 transition-transform">
						<Share2 className="h-8 w-8 text-white" />
					</div>
					<h4 className="text-xl font-semibold text-gray-900 mb-3">
						Easy Sharing
					</h4>
					<p className="text-gray-600 mb-4">
						Share documents with a simple link and control who can view or edit
						your content.
					</p>
					<div className="flex items-center justify-center text-green-600 text-sm font-medium">
						<CheckCircle className="h-4 w-4 mr-2" />
						Secure sharing
					</div>
				</div>
			</div>
		</div>
	);
};

export default Features;
