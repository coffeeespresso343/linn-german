import { useEffect } from "react";
import DashboardPreview from "./components/DashboardPreview";
import Features from "./components/Features";
import FinalCta from "./components/FinalCta";
import Hero from "./components/Hero";
import LevelSelector from "./components/LevelSelector";
import MultilingualSection from "./components/MultilingualSection";
import Showcase from "./components/Showcase";
import { Stats } from "./components/Stats";
import { supabase } from "@/lib/supabase";

const Home = () => {
  useEffect(() => {
    supabase
      .from("levels")
      .select("code, name")
      .order("sort_order")
      .then(({ data, error }) => console.log("levels", data, error));

    supabase
      .from("profiles")
      .select("*")
      .then(({ data }) => console.log("profiles (Empty?)", data));
  });

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
