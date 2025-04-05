"use client";

import { useState, useEffect } from "react";
import TrendingCoins from "./TrendingCoins";
import MarketOutlook from "./MarketOutlook";
import News from "./News";
import TopCoins from "./TopCoins";
import { useAutoUpdateGlobal } from "@/store/useAutoUpdate";
import { motion } from "framer-motion";

export default function Dashboard({
  initialData,
}: {
  initialData: { topCoinsData: any; trendingCoinsData: any; globalData: any };
}) {
  const [showContent, setShowContent] = useState(false);
  useAutoUpdateGlobal();

  useEffect(() => {
    const timeout = setTimeout(() => setShowContent(true), 2000); // Show message for 2 seconds
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-muted/40 overflow-hidden">
      {!showContent && (
        <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/50 backdrop-blur-lg text-white text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="p-6 bg-black/70 rounded-lg shadow-lg"
            onClick={() => setShowContent(true)}
          >
            <h1 className="text-4xl font-bold sm:text-6xl">
              Welcome to Dashboard
            </h1>
            <p className="mt-2 text-lg sm:text-xl text-gray-300">
              Click anywhere to enter
            </p>
          </motion.div>
        </div>
      )}
      <main
        className={`flex flex-col-reverse lg:flex-row flex-1 gap-8 p-4 md:p-8 justify-between transition-opacity duration-700 ${showContent ? "opacity-100" : "opacity-0"}`}
      >
        <div className="w-full lg:w-8/12">
          <MarketOutlook initialData={initialData.globalData} />
          <News />
        </div>
        <div className="w-full lg:w-4/12 space-y-4">
          <TrendingCoins initialData={initialData.trendingCoinsData} />
          <TopCoins initialData={initialData.topCoinsData} />
        </div>
      </main>
    </div>
  );
}
