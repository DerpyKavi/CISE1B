/*import { IoMdArrowDropdown } from "react-icons/io";
import NavBar from "./nav/NavBar";
import NavDropdown from "./nav/NavDropdown";
import NavItem from "./nav/NavItem";

const PopulatedNavBar = () => {
  return (
    <NavBar>
      <NavItem>SPEED</NavItem>
      <NavItem route="/" end>
        Home
      </NavItem>
      <NavItem dropdown route="/articles">
        Articles <IoMdArrowDropdown />
        <NavDropdown>
          <NavItem route="/articles">View articles</NavItem>
          <NavItem route="/articles/new">Submit new</NavItem>
        </NavDropdown>
      </NavItem>
    </NavBar>
  );
};

export default PopulatedNavBar;
*/
// PopulatedNavBar.tsx
import React from 'react';
import { IoMdArrowDropdown } from 'react-icons/io';
import NavBar from './nav/NavBar';
import NavDropdown from './nav/NavDropdown';
import NavItem from './nav/NavItem';
import SearchBar from './nav/SearchBar'; // Import the SearchBar component

const PopulatedNavBar = () => {
  const handleSearch = (query: string) => {
    // Implement your search logic here
    console.log(`Searching for: ${query}`);
  };

  return (
    <NavBar>
      <NavItem>SPEED</NavItem>
      <NavItem route="/" end>
        Home
      </NavItem>
      <NavItem dropdown route="/articles">
        Articles <IoMdArrowDropdown />
        <NavDropdown>
          <NavItem route="/articles">View articles</NavItem>
          <NavItem route="/articles/new">Submit new</NavItem>
        </NavDropdown>
      </NavItem>
      {/* Add the SearchBar component */}
      <SearchBar onSearch={handleSearch} />
    </NavBar>
  );
};

export default PopulatedNavBar;
