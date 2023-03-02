import NewsArticlesGrid from "@/components/NewsArticlesGrid";
import { NewsArticle } from "@/models/NewsArticles";
import { setRequestMeta } from "next/dist/server/request-meta";
import { useState, FormEvent } from "react";
import { Form, Button, Spinner } from "react-bootstrap";

const SearchNewsPage = () => {
  const [searchResult, setSearchResult] = useState<NewsArticle[] | null>(null);
  const [searchResultIsLoading, setSearchresultIsLoading] = useState(false);
  const [searchResultLoadingIsError, setsearchResultLoadingIsError] =
    useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const searchQuery = formData.get("searchQuery")?.toString().trim();

    if (searchQuery) {
      try {
        setSearchResult(null);
        setsearchResultLoadingIsError(false);
        setSearchresultIsLoading(true);
        const response = await fetch("/api/search-news?q=" + searchQuery);
        const articles: NewsArticle[] = await response.json();
        setSearchResult(articles);
      } catch (error) {
        console.error(error);
        setsearchResultLoadingIsError(true);
      } finally {
        setSearchresultIsLoading(false);
      }
    }
  }

  return (
    <main>
      <h1>Search News</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="search-input">
          <Form.Label> Search Query </Form.Label>
          <Form.Control
            name="searchQuery"
            placeholder="E.g. politics, sports, ..."
          />
        </Form.Group>
        <Button type="submit" className="mb-3" disabled={searchResultIsLoading}>
          Search
        </Button>
      </Form>
      <div className="d-flex flex-column align-items-center">
        {searchResultIsLoading && <Spinner animation="border" />}
        {searchResultLoadingIsError && <p>Something went wrong, try again.</p>}
        {searchResult?.length === 0 && (
          <p>Nos found result, try another query</p>
        )}
        {searchResult && <NewsArticlesGrid articles={searchResult} />}
      </div>
    </main>
  );
};

export default SearchNewsPage;
