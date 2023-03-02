import { NewsArticle } from "@/models/NewsArticles";
import { Card } from "react-bootstrap";
import Image from "next/image";
import placeholderImage from "@/assets/images/image-article.jpg";
import styles from "@/styles/NewsArticlesEntry.module.css";

//define the type of the article
interface NewsArticlesEntryProps {
  article: NewsArticle;
}

// destruction of the object to avoid writing article.title etc..
const NewsArticlesEntry = ({
  article: { title, description, url, urlToImage },
}: NewsArticlesEntryProps) => {
  const validImageUrl =
    urlToImage?.startsWith("http://") || urlToImage?.startsWith("https://")
      ? urlToImage
      : undefined;

  //console.log("here", description);

  return (
    <a href={url}>
      <Card className="h-100">
        <Image
          src={validImageUrl || placeholderImage}
          width={500}
          height={200}
          alt="image of news article"
          className={`card-img-top ${styles.image}`}
        />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{description}</Card.Text>
        </Card.Body>
      </Card>
    </a>
  );
};

export default NewsArticlesEntry;
