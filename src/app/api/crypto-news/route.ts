import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  try {
    const API_KEY = process.env.NEXT_PUBLIC_CRYPTOPANIC_API_KEY;
    if (!API_KEY)
      return NextResponse.json({ error: "API key missing" }, { status: 500 });

    const API_URL = `https://cryptopanic.com/api/v1/posts/?auth_token=${API_KEY}&public=true`;

    const { data } = await axios.get(API_URL);
    const news = data.results.slice(0, 5).map((article: any) => ({
      title: article.title,
      link: article.url,
      summary: article.body || "No summary available",
      source: article.domain,
      pubDate: new Date(article.created_at).toLocaleString(),
    }));

    return NextResponse.json(news, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch crypto news" },
      { status: 500 }
    );
  }
}
