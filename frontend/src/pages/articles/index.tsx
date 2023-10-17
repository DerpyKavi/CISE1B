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

export interface ArticlesInterface {
  id: string;
  title: string;
  authors: string;
  pubyear: string;
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

  //displaying table data from dummydata

  // console.log(articles);
  // let requestData = [];

  const articleData = articles.map((article) => ({
    id: article.id ?? article._id,
    title: article.title,
    authors: article.authors,
    source: article.source,
    pubyear: article.updated_date ? article.updated_date.split("T")[0] : "2023",
    doi: article.doi,
    claim: article.claim,
    evidence: article.evidence,
    rating: article.rating ? article.rating : 0,
    display: true,
  }));

  const [articleaDta, setArticle] = useState(articleData);
  // localStorage.setItem("articleData", articleaDta);

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
