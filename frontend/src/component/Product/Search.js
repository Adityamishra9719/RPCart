import React, { Fragment, useState } from 'react';
import MetaData from '../layout/MetaData';
import "./Search.css";
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Search = () => {
    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate(); // Use useNavigate instead of history

    const searchSubmitHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            navigate(`/products/${keyword}`);
        } else {
            navigate("/products");
        }
    };

    return (
        <Fragment>
            <MetaData title="Search a Product --RPCart" />
            <form className="searchBox" onSubmit={searchSubmitHandler}>
                <input
                    type="text"
                    placeholder="Search a Product ..."
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <input type="submit" value="Search" />
            </form>
        </Fragment>
    );
};

export default Search;
