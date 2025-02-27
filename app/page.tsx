"use client";
import HeroSection from "./home-page-components/hero-section";
import ListCard from "./[...productLine]/components/list-card";
import ScrollingBanner from "./home-page-components/marquee";

export default function Home() {
  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)]">
      <main>
        <HeroSection />
        <ScrollingBanner />
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
