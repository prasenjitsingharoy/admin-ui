import React, { useEffect, useState } from "react";

function Search({ userData, setFilteredData }) {
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!search) {
      setFilteredData(userData);
      return;
    }

    const filteredData = userData.filter(
      (user) =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()) ||
        user.role.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredData(filteredData);
  }, [search, userData, setFilteredData]);

  const searchHandler = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div className="searchbar-container">
      <input
        type="search"
        name="user-input"
        id="input"
        placeholder="Search by name, email or role"
        value={search}
        onChange={searchHandler}
        required
      />
    </div>
  );
}
export default Search;
