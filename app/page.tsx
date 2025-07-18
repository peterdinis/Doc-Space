import type { NextPage } from "next";
import Features from "../components/hero/Features";
import Hero from "../components/hero/Hero";
import Footer from "../components/shared/Footer";

const Homepage: NextPage = () => {
	return (
		<>
			<Hero />
			<Features />
			<Footer />
		</>
	);
};

export default Homepage;
