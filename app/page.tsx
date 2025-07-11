import type { NextPage } from "next";
import Features from "../components/hero/Features";
import Hero from "../components/hero/Hero";
import Stats from "../components/hero/Stats";
import Footer from "../components/shared/Footer";

const Homepage: NextPage = () => {
	return (
		<>
			<Hero />
			<Features />
			<Stats />
			<Footer />
		</>
	);
};

export default Homepage;
