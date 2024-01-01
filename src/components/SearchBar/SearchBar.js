import React, { useState, useRef } from "react";
import './SearchBar.css';




function SearchBar({ onSearch }) {
    const inputRef = useRef('')
    const [term, setTerm] = useState('');





    function handleChange(e) {
        setTerm(e.target.value);
    }



    function searchHandler() {
        onSearch(term)
    }



    return (
        <div className="searchbar">
            <label htmlFor="searchbar"></label>
            <input id="searchbar" value={term} ref={inputRef} onChange={handleChange} placeholder="Title, Artist, Album"></input>
            <button onClick={searchHandler} className="searchbtn">Search</button>
        </div>
    )
}
export default SearchBar;