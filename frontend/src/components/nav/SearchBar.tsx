// SearchBar.tsx

//imports
import React, { SetStateAction, useState } from 'react';
import styles from './SearchBar.module.scss'; // Create a CSS module for styling
import fuzzysort from 'fuzzysort';

//define variables
type SearchBarProps = {
  tableData: Array<any>;
  updateData: (value: Array<any>) => void;
};

//search bar function
const SearchBar: React.FC<SearchBarProps> = ({ tableData, updateData }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    let results = fuzzysort.go(searchQuery, tableData, {
      // Change "claim" to the name of the key for methods
      // eg: keys: ["SE Methods"]
      // eg: keys: ["methods"]
      keys: ["claim"]
    })
    //print results to console
    console.log(results)

    //display searched item
    let counter = 0;
    tableData.forEach(element => {
        element.display = false;
    });
    tableData.forEach(element => {
      results.forEach(result => {
        if (element.id == result.obj.id) {
          element.display = true;
        }
      })
    })

    // console.log(results)
    updateData([...tableData ])

  };

  //return the UI of the search bar
  return (
    <div className={styles.searchBar}>
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleInputChange}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
