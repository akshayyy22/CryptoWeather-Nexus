import axios from "axios";

export interface Article {
  title: string;
  link: string;
  summary: string;
  pubDate: string;
  source: string;
}

export const fetchCryptoNews = async (): Promise<Article[]> => {
  try {
    const { data } = await axios.get("/api/crypto-news");
    return data;
  } catch (error) {
    console.error("Error fetching crypto news:", error);
    return [];
  }
};
