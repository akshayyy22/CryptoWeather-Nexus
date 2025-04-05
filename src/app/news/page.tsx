"use client";

import { useEffect, useState } from "react";
import { fetchCryptoNews, Article } from "@/store/fetchNews";
import { CircularProgress } from "@mui/material";
import Link from "next/link";
import DynamicAlert from "@/components/ui/DynamicAlert";

const NewsPage = () => {
  const [news, setNews] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getNews = async () => {
      const articles = await fetchCryptoNews();
      setNews(articles);
      setLoading(false);
    };
    getNews();
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gray-100 dark:bg-black flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-5 text-gray-900 dark:text-white">
        Latest Cryptocurrency News
      </h1>

      {loading ? (
        <div className="flex justify-center items-center h-60">
          <CircularProgress />
        </div>
      ) : news.length > 0 ? (
        news.map((article, index) => (
          <div
            key={index}
            className="w-full max-w-2xl mb-4 p-4 bg-white dark:bg-gray-900 rounded-xl shadow-lg transition-transform transform hover:scale-[1.02]"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {article.title}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 my-2 italic">
              {article.summary}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              📰 {article.source} | 📅 {article.pubDate}
            </p>
            <div className="mt-3 text-right">
              <Link
                href={article.link}
                target="_blank"
                className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
              >
                🔗 Read More →
              </Link>
            </div>
          </div>
        ))
      ) : (
        <p className="text-lg text-gray-800 dark:text-gray-300 text-center">
          No news available 😕
        </p>
      )}
      <DynamicAlert />
    </div>
  );
};

export default NewsPage;
