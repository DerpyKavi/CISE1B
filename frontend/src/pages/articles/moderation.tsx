import React, {useState} from "react";
import { GetStaticProps, NextPage } from "next";
import SortableTable from "../../components/table/SortableTable";
import data from "../../utils/dummydata.json";
import SearchBar from "@/components/nav/SearchBar";
import RejectArticle from "@/components/RejectArticle";

interface ArticlesInterface {
    id: string;
    title: string;
    authors: string;
    pubyear: string;
    source: string;
    claim: string;
    evidence: string;
    researchType: string;
    participantType: string;
    accept: boolean;
    reject: boolean;
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
    "accept",
    "reject"
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
      { key: "accept", label: "Accept" },
      { key: "reject", label: "Reject" }
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
    const articledata = data.articles.map((article) => ({
          id: article.id ?? article._id,
          title: article.title,
          authors: article.authors,
          source: article.source,
          pubyear: article.pubyear,
          doi: article.doi,
          claim: article.claim,
          evidence: article.evidence,
          accept: false,
          reject: false,
          display: true,
        }));
       

      const [articleaDta, setArticle] = useState(articledata);

    return (
      <div className="container">
        <h1>Moderation Page</h1>
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
        <SearchBar tableData={articleaDta} updateData={setArticle} />
        <SortableTable headers={filteredHeaders} data={articleaDta} updateData={setArticle} />
      </div>
    );
  };

  export default Articles;