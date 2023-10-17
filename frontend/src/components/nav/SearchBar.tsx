// SearchBar.tsx
import React, { SetStateAction, useState } from 'react';
import styles from './SearchBar.module.scss'; // Create a CSS module for styling
import fuzzysort from 'fuzzysort';
import { table } from 'console';
import { resourceLimits } from 'worker_threads';
import { ArticlesInterface } from '@/pages/articles';

type SearchBarProps = {
  tableData: Array<any>;
  updateData: (value: Array<any>) => void;
};

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
    console.log(results)

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
