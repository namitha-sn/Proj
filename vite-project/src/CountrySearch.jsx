import React, { useState } from "react";

function CountrySearch({ onSearch }) {
  const [country, setCountry] = useState("");

  const handleSearch = () => {
    
    onSearch(country);
  };

  return (
    <div>
      <h2>Search Country</h2>
      <input
        type="text"
        placeholder="Enter country name..."
        value={country}
        onChange={(e) => setCountry(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default CountrySearch;
