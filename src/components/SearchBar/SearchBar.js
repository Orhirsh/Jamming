import React from "react";
import './SearchBar.css'
function SearchBar() {
    return (
        <>
            <label htmlFor="searchbar"></label>
            <input id="searchbar" placeholder="Title, Artist, Album"></input>
            <button className="searchbtn">Search</button>
        </>
    )
}
export default SearchBar;