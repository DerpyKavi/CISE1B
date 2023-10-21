import { GetStaticProps, NextPage } from 'next';
import SortableTable from '../../components/table/SortableTable';
import axios from 'axios';

// Define the ArticlesInterface interface before importing it
interface ArticlesInterface {
  id: string;
  title: string;
  authors: string;
  source: string;
  pubyear: string;
  doi: string;
  claim: string;
  evidence: string;
}

type ArticlesProps = {
  articles: ArticlesInterface[];
};

export const getStaticProps: GetStaticProps<ArticlesProps> = async () => {
  try {
    const response = await axios.get('http://localhost:8082/api/books');

    const articles = response.data;

    return {
      props: {
        articles,
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);

    return {
      props: {
        articles: [],
      },
    };
  }
};

const Articles: NextPage<ArticlesProps> = ({ articles }) => {
  const headers: { key: keyof ArticlesInterface; label: string }[] = [
    { key: "title", label: "Title" },
    { key: "authors", label: "Authors" },
    { key: "source", label: "Source" },
    { key: "pubyear", label: "Publication Year" },
    { key: "doi", label: "DOI" },
    { key: "claim", label: "Claim" },
    { key: "evidence", label: "Evidence" },
  ];

  return (
    <div className="container">
      <h1>Articles Index Page</h1>
      <p>Page containing a table of articles:</p>
      <SortableTable headers={headers} data={articles} />
    </div>
  );
};

export default Articles;

