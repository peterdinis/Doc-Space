import {
	ArrowRight,
	Edit,
	Globe,
	Share2,
	Shield,
	Star,
	Users,
	Zap,
} from "lucide-react";
import Link from "next/link";
import type { FC } from "react";
import { Button } from "@/components/ui/button";

const Hero: FC = () => {
	return (
		<>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
				<div className="grid lg:grid-cols-2 gap-12 items-center">
					{/* Left Column - Content */}
					<div className="space-y-8 animate-fade-in">
						<div className="inline-flex items-center bg-gradient-to-r from-blue-100 to-purple-100 rounded-full px-4 py-2 animate-scale-in">
							<Star className="h-4 w-4 text-blue-600 mr-2" />
							<span className="text-sm font-medium text-blue-800">
								✨ New: Real-time collaboration features
							</span>
						</div>

						<h2 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
							Create,
							<span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
								{" "}
								Collaborate
							</span>
							,
							<br />
							Share Documents
						</h2>

						<p className="text-xl text-gray-600 leading-relaxed">
							DocSpace is a modern document collaboration platform that lets you
							create, edit, and share documents in real-time with your team.
							Simple, powerful, and secure.
						</p>

						<div className="flex flex-col sm:flex-row gap-4 animate-scale-in">
							<Button
								size="lg"
								asChild
								className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white hover-scale group"
							>
								<Link
									href="/register"
									className="flex items-center justify-center"
								>
									Start Creating
									<ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
								</Link>
							</Button>
							<Button
								size="lg"
								variant="outline"
								asChild
								className="hover-scale border-2"
							>
								<Link href="/login">Sign In</Link>
							</Button>
						</div>

						{/* Feature highlights */}
						<div
							className="grid grid-cols-3 gap-6 pt-8 animate-fade-in"
							style={{ animationDelay: "0.3s" }}
						>
							<div className="text-center">
								<div className="bg-blue-100 p-3 rounded-full w-fit mx-auto mb-2">
									<Zap className="h-5 w-5 text-blue-600" />
								</div>
								<p className="text-sm text-gray-600 font-medium">Real-time</p>
							</div>
							<div className="text-center">
								<div className="bg-purple-100 p-3 rounded-full w-fit mx-auto mb-2">
									<Shield className="h-5 w-5 text-purple-600" />
								</div>
								<p className="text-sm text-gray-600 font-medium">Secure</p>
							</div>
							<div className="text-center">
								<div className="bg-green-100 p-3 rounded-full w-fit mx-auto mb-2">
									<Globe className="h-5 w-5 text-green-600" />
								</div>
								<p className="text-sm text-gray-600 font-medium">Global</p>
							</div>
						</div>
					</div>

					{/* Right Column - Visual Elements */}
					<div
						className="relative animate-scale-in"
						style={{ animationDelay: "0.2s" }}
					>
						{/* Main mockup */}
						<div className="bg-white rounded-2xl shadow-2xl p-6 transform rotate-2 hover:rotate-0 transition-transform duration-300">
							<div className="bg-gray-100 h-4 w-3/4 rounded mb-4"></div>
							<div className="bg-gray-200 h-3 w-full rounded mb-2"></div>
							<div className="bg-gray-200 h-3 w-5/6 rounded mb-2"></div>
							<div className="bg-gradient-to-r from-blue-200 to-purple-200 h-3 w-2/3 rounded mb-4"></div>
							<div className="flex space-x-2 mb-4">
								<div className="bg-blue-500 h-8 w-8 rounded-full"></div>
								<div className="bg-purple-500 h-8 w-8 rounded-full -ml-2"></div>
								<div className="bg-green-500 h-8 w-8 rounded-full -ml-2"></div>
							</div>
							<div className="bg-gray-100 h-24 rounded"></div>
						</div>

						{/* Floating elements */}
						<div className="absolute -top-4 -right-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-full shadow-lg animate-bounce">
							<span className="text-sm font-medium">99.9% Uptime</span>
						</div>

						<div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-2 rounded-full shadow-lg animate-pulse">
							<span className="text-sm font-medium">Real-time Sync</span>
						</div>

						{/* Background decoration */}
						<div className="absolute inset-0 -z-10">
							<div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
							<div
								className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-purple-200 rounded-full opacity-20 animate-pulse"
								style={{ animationDelay: "1s" }}
							></div>
						</div>
					</div>
				</div>

				{/* Trust indicators */}
				<div
					className="mt-20 text-center animate-fade-in"
					style={{ animationDelay: "0.4s" }}
				>
					<p className="text-sm text-gray-500 mb-6">Trusted by teams at</p>
					<div className="flex justify-center items-center space-x-8 opacity-60">
						<div className="h-8 w-20 bg-gray-300 rounded animate-pulse"></div>
						<div
							className="h-8 w-20 bg-gray-300 rounded animate-pulse"
							style={{ animationDelay: "0.2s" }}
						></div>
						<div
							className="h-8 w-20 bg-gray-300 rounded animate-pulse"
							style={{ animationDelay: "0.4s" }}
						></div>
						<div
							className="h-8 w-20 bg-gray-300 rounded animate-pulse"
							style={{ animationDelay: "0.6s" }}
						></div>
					</div>
				</div>
			</div>

			<div className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 text-white py-20 relative overflow-hidden">
				<div className="absolute inset-0 opacity-10">
					<div
						className="w-full h-full"
						style={{
							backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
						}}
					></div>
				</div>

				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
					<div className="animate-fade-in">
						<h3 className="text-4xl lg:text-5xl font-bold mb-6">
							Collaborate Like Never Before
						</h3>
						<p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
							Experience seamless real-time collaboration with advanced features
							designed for modern teams.
						</p>

						<div className="grid md:grid-cols-3 gap-8 mt-12">
							<div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/15 transition-colors duration-300 animate-scale-in">
								<div className="bg-blue-500 p-3 rounded-full w-fit mx-auto mb-4">
									<Edit className="h-6 w-6 text-white" />
								</div>
								<h4 className="text-lg font-semibold mb-2">Live Editing</h4>
								<p className="text-blue-100 text-sm">
									See changes in real-time
								</p>
							</div>

							<div
								className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/15 transition-colors duration-300 animate-scale-in"
								style={{ animationDelay: "0.1s" }}
							>
								<div className="bg-purple-500 p-3 rounded-full w-fit mx-auto mb-4">
									<Users className="h-6 w-6 text-white" />
								</div>
								<h4 className="text-lg font-semibold mb-2">Team Sync</h4>
								<p className="text-blue-100 text-sm">
									Perfect collaboration flow
								</p>
							</div>

							<div
								className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/15 transition-colors duration-300 animate-scale-in"
								style={{ animationDelay: "0.2s" }}
							>
								<div className="bg-green-500 p-3 rounded-full w-fit mx-auto mb-4">
									<Share2 className="h-6 w-6 text-white" />
								</div>
								<h4 className="text-lg font-semibold mb-2">Smart Sharing</h4>
								<p className="text-blue-100 text-sm">
									Control access precisely
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Hero;
