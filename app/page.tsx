import type { NextPage } from "next";
import Features from "../components/hero/Features";
import Hero from "../components/hero/Hero";
import Stats from "../components/hero/Stats";
import Footer from "../components/shared/Footer";
import Navigation from "../components/shared/Navigation";

const Homepage: NextPage = () => {
	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
			<Navigation />
			<Hero />
			<Features />
			<Stats />
			<Footer />
		</div>
	);
};

export default Homepage;
