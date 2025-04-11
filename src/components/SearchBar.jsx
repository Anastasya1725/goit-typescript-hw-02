import { useState } from "react";
import {toast} from "react-hot-toast";
import s from "./SearchBar.module.css";

const SearchBar =({onSubmit}) => {
    const [query, setQuery] = useState('');

    const handleChange =(e) => {
        setQuery(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if(query.trim() === ''){
            toast.error('Please enter a search term');
            return;
        }

        onSubmit(query);
        setQuery('');
        
    };

    return (
        <header>
        <form onSubmit={handleSubmit} className={s.searchBar}>
        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={handleChange}
        />
        <button type="submit" className={s.searchBar}>Search</button>
      </form>
    </header>
    );
};

export default SearchBar;