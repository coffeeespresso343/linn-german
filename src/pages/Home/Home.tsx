import DashboardPreview from "./components/DashboardPreview";
import Features from "./components/Features";
import FinalCta from "./components/FinalCta";
import Hero from "./components/Hero";
import LevelSelector from "./components/LevelSelector";
import MultilingualSection from "./components/MultilingualSection";
import Showcase from "./components/Showcase";
import { Stats } from "./components/Stats";

const Home = () => {
  return (
    <>
      <Hero />
      <Stats />
      <LevelSelector />
      <Features />
      <Showcase />
      <MultilingualSection />
      <DashboardPreview />
      <FinalCta />
    </>
  );
};

export default Home;
