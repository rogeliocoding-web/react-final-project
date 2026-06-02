import React, { useState, useRef, useEffect } from "react";
import "./Home.css";
import Navbar from "../../components/Navbar/Navbar";
import hero_banner from "../../assets/hero_banner.jpg";
import hero_title from "../../assets/hero_title.png";
import info_icon from "../../assets/info_icon.png";
import search_icon from "../../assets/search_icon.svg";
import { useNavigate } from 'react-router-dom';


const Home = () => {
  const navigate = useNavigate(); 
  const searchRef = useRef(null);

useEffect(() => {
  const handleClickOutside = (e) => {
    if (searchRef.current && !searchRef.current.contains(e.target)) {
      setResults([]);
      setQuery('');
    }
  };

  document.addEventListener('mousedown', handleClickOutside);
  return () => document.removeEventListener('mousedown', handleClickOutside);
}, []);

// ✅ now inside the component
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
  
  const handleSearch = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 2) {
      setLoading(true);
      try {
        const response = await fetch(
          `https://www.omdbapi.com/?s=${value}&apikey=${API_KEY}`
        );
        const data = await response.json();

        if (data.Response === 'True') {
          setResults(data.Search.slice(0, 6)); 
        } else {
          setResults([]);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    } else {
      setResults([]);
    }
  };
  return (
    <div className="home">
      <Navbar />

      <div className="hero">
        <img src={hero_banner} alt="" className="banner-img" />

       <div className="search-container" ref={searchRef}>
  <div className="search-bar">
    <img src={search_icon} alt="" className="search-icon" />
    <input
      type="text"
      placeholder="Search movies, shows..."
      value={query}
      onChange={handleSearch}
    />
  </div>

  {/* Loading */}
  {loading && (
    <div className="search-results">
      <p className="no-results">Searching...</p>
    </div>
  )}

  {/* Results */}
  {!loading && results.length > 0 && (
    <div className="search-results">
      {results.map(item => (
        <div key={item.imdbID} className="search-result-item" onClick={() => navigate(`/movie/${item.imdbID}`)}>
          {item.Poster !== 'N/A'
            ? <img src={item.Poster} alt={item.Title} />
            : <div className="no-img">No Image</div>
          }
          <div>
            <span>{item.Title}</span>
            <p>{item.Type} • {item.Year}</p>
          </div>
        </div>
      ))}
    </div>
  )}

  {/* No results */}
  {!loading && query.length > 2 && results.length === 0 && (
    <div className="search-results">
      <p className="no-results">No results found for "{query}"</p>
    </div>
  )}
</div>

        <div className="hero-caption">
          <img src={hero_title} alt="" className="caption-img" />
          <p>
            Discovering his ties to a secret ancient order, a young man lifing
            in modern Istanbul embarks on a quest to find a legendary artifact
            and save humanity from a powerful enemy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
