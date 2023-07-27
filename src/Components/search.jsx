

import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleInput = (event) => {
    setSearchValue(event.target.value);
    console.log("I am typing", event.target.value);
  };

  const handleSearchClick = () => {
    console.log("I am typing");
    onSearch(searchValue);
  };

  return (
    <div>
      <input
        className="search"
        type="text"
        placeholder="Search"
        value={searchValue}
        onChange={handleInput}
      />
      <button onClick={handleSearchClick}>Search</button>
    </div>
  );
};

export default SearchBar;
