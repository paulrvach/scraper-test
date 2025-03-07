"use client";
import HeroSection from "./home-page-components/hero-section";
import ScrollingBanner from "./home-page-components/marquee";
import NavCards from "./home-page-components/nav-cards";

export default function Home() {
  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)]">
      <main>
        <HeroSection />
        <ScrollingBanner />
        <NavCards />
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
