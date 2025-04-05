"use client";

import { useEffect, useState } from "react";
import { fetchCryptoNews, Article } from "@/store/fetchNews";
import { CircularProgress } from "@mui/material";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

export default function News() {
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
    <section className="py-10">
      <div>
        <h2 className="mb-4 text-2xl font-bold">Latest Crypto News</h2>
        {loading ? (
          <div className="flex justify-center items-center h-60">
            <CircularProgress />
          </div>
        ) : news.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {news.map((article, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{article.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {article.summary}
                  </p>
                </CardContent>
                <CardFooter>
                  <div className="flex items-center justify-between w-full">
                    <div className="text-xs text-muted-foreground">
                      {article.pubDate}
                    </div>
                    <Link
                      href={article.link}
                      target="_blank"
                      className="text-primary font-semibold hover:underline"
                    >
                      Read more →
                    </Link>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-lg text-gray-800 dark:text-gray-300 text-center">
            No news available 😕
          </p>
        )}
      </div>
    </section>
  );
}
