//imports
import React from "react";
import RejectArticle from "../RejectArticle";
import AcceptAricle from "../AcceptAricle";
import Rating from "../Rating";

//Display table
interface SortableTableProps {
  headers: { key: string; label: string }[];
  data: any[];
  updateData: (value: Array<any>) => void;
}

const SortableTable: React.FC<SortableTableProps> = ({ headers, data, updateData}) => {
  // Check if data is empty or undefined
  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }

  //return the UI of the sortable table
  return (
    <table>
      <thead>
        <tr>
          {headers.map((header) => {
            return <th key={header.key}>{header.label}</th>
          }
          
          )}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => {
          if (row.display) {
            return (
              <tr key={i}>
                {headers.map((header) => {
                  if (header.key == "accept") {
                    return <td><AcceptAricle id={row["id"]} update={updateData} /></td>
                  } else if (header.key == "reject") {
                    return <td><RejectArticle id={row["id"]} update={updateData}/></td>
                  } else if (header.key == "rating") {
                    return <td><Rating id={row["id"]} update={updateData} rating={row["rating"]}/></td>
                  }

                  return (
                    <td key={header.key}>{row[header.key]}</td>
                  )
                }
                )}
          </tr>
      )}})}
      </tbody>
    </table>
  );
};

export default SortableTable;
