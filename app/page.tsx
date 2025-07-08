import { NextPage } from "next";
import Navigation from "../components/shared/Navigation";
import Hero from "../components/hero/Hero";
import Features from "../components/hero/Features";
import Stats from "../components/hero/Stats";
import Footer from "../components/shared/Footer";

const Homepage: NextPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <Navigation />
        <Hero />
        <Features />
        <Stats />
        <Footer />
    </div>  
  )
}

export default Homepage