import Head from "next/head";
import Image from "next/image";
import { GetServerSideProps } from "next";
import { NewsArticle, NewsResponse } from "@/models/NewsArticles";
import NewsArticlesEntry from "@/components/NewsArticlesEntry";
import NewsArticlesGrid from "@/components/NewsArticlesGrid";

//  This page uses getServerSideProps to fetch data server-side on every request.
// This allows search engines to crawl the page content and improves SEO.

interface BreakingNewsPageProps {
  newsArticles: NewsArticle[];
}

export const getServerSideProps: GetServerSideProps<
  BreakingNewsPageProps
> = async () => {
  // artificial loading Time
  // await new Promise(r => setTimeout(r, 3000))
  const response = await fetch(
    "https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=" +
      process.env.NEWS_API_KEY
  );
  const newsResponse: NewsResponse = await response.json();
  // console.log(newsResponse.articles);
  return {
    props: { newsArticles: newsResponse.articles },
  };
    // Let error go to 500 page
};

export default function BreakingNewsPage({
  newsArticles,
}: BreakingNewsPageProps) {
  return (
    <>
      <Head>
        <title key="title">Breaking News</title>
      </Head>
      <main>
        <h1>Breaking News</h1>
        <NewsArticlesGrid articles={newsArticles} />
      </main>
    </>
  );
}
