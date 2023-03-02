import NewsArticlesGrid from "@/components/NewsArticlesGrid";
import { NewsArticle, NewsResponse } from "@/models/NewsArticles";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

interface CategoryNewsPageProps {
  newsArticles: NewsArticle[];
}

export const getStaticPaths: GetStaticPaths = async () => {
  const categorySlugs = [
    "business",
    "entertainment",
    "general",
    "health",
    "science",
    "sports",
    "technology",
  ];

  const paths = categorySlugs.map((slug) => ({ params: { category: slug } }));

  return {
    paths,
    fallback: false,
  };
};
// getStaticProps fetchs the data when we compile the project but we have a dynamic url [category],
//so how is the compiler supposed to know
// for which category it has to fetch the data, we have to tell it in advance what the possible categories to put in the url
// and this is why we have to use getStaticPaths for.
export const getStaticProps: GetStaticProps<CategoryNewsPageProps> = async ({
  params,
}) => {
  const category = params?.category?.toString();

  const response = await fetch(
    `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${process.env.NEWS_API_KEY}`
  );
  const newsResponse: NewsResponse = await response.json();

  //console.log("-----------", newsResponse);

  return {
    props: { newsArticles: newsResponse.articles },
    // fetch the data again after 5 min and generate a new static HTML page, this is in production not development
    revalidate: 5 * 60,
  };
  // Let error go to 500
};

const CategoryNewsPage = ({ newsArticles }: CategoryNewsPageProps) => {
  const router = useRouter();
  const categoryName = router.query.category?.toString();

  const title = "Category: " + categoryName;
  return (
    <>
      <main>
        <Head>
          <title key="title"> {`${title} - News Generator`}</title>
        </Head>
        <h1>{title}</h1>
        <NewsArticlesGrid articles={newsArticles} />
      </main>
    </>
  );
};

export default CategoryNewsPage;
