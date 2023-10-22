import React, { useState } from "react";
import { GetStaticProps, NextPage } from "next";
import SortableTable from "../../components/table/SortableTable";
// import data from "../../utils/dummydata.json";
import SearchBar from "@/components/nav/SearchBar";
import axios from "axios";
// import { AsyncLocalStorage } from "async_hooks";

export async function getServerSideProps() {
  const userData = await fetch("http://localhost:8082/api/books");
  const userJSON = await userData.json();

  return {
    props: {
      articles: userJSON,
    },
  };
}

//define variables
export interface ArticlesInterface {
  id: string;
  title: string;
  authors: string;
  pubyear: Date;
  source: string;
  claim: string;
  evidence: string;
  researchType: string;
  participantType: string;
  rating: number;
}

type ArticlesProps = {
  articles: ArticlesInterface[];
};

//defines which columns are displayed
const defaultColumnsToShow = [
  "title",
  "authors",
  "pubyear",
  "source",
  "claim",
  "evidence",
  "researchType",
  "participantType",
  "rating"
];

const Articles: React.FC<ArticlesProps> = ({ articles }) => {
  const headers: { key: keyof ArticlesInterface; label: string }[] = [
    { key: "title", label: "Title" },
    { key: "authors", label: "Authors" },
    { key: "pubyear", label: "Publication Year" },
    { key: "source", label: "Journal/Conference" },
    { key: "claim", label: "Claim" },
    { key: "evidence", label: "Evidence Result" },
    { key: "researchType", label: "Research Type" },
    { key: "participantType", label: "Participant Type" },
    { key: "rating", label: "Rating"},
  ];

  const [columnsToShow, setColumnsToShow] = useState(defaultColumnsToShow);

  //hide columms if the title is toggled
  const handleColumnToggle = (columnKey: keyof ArticlesInterface) => {
    if (columnsToShow.includes(columnKey)) {
      setColumnsToShow(columnsToShow.filter((key) => key !== columnKey));
    } else {
      setColumnsToShow([...columnsToShow, columnKey]);
    }
  };

  const filteredHeaders = headers.filter((header) =>
    columnsToShow.includes(header.key)
  );
  
  //defines which variables to display
  const articleData = articles.map((article) => ({
    id: article.id,
    title: article.title,
    authors: article.authors,
    source: article.source,
    pubyear: article.pubyear,
    claim: article.claim,
    evidence: article.evidence,
    rating: article.rating ? article.rating : 0,
    display: true,
  }));

  const [articleaDta, setArticle] = useState(articleData);
  // localStorage.setItem("articleData", articleaDta);

  //return the article display UI
  return (
    <div className="container">
      <h1>Articles Index Page</h1>
      <div>
        <strong>Select Columns to Display:</strong>
        {headers.map((header) => (
          <label key={header.key}>
            <input
              type="checkbox"
              checked={columnsToShow.includes(header.key)}
              onChange={() => handleColumnToggle(header.key)}
            />
            {header.label}
          </label>
        ))}
      </div>
      <SearchBar tableData={articleData} updateData={setArticle} />
      <SortableTable
        headers={filteredHeaders}
        data={articleaDta}
        updateData={setArticle}
      />
    </div>
  );
};

export default Articles;
