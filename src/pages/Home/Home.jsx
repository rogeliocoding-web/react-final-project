import React, { useState, useRef, useEffect } from "react";
import "./Home.css";
import Navbar from "../../components/Navbar/Navbar";
import hero_banner from "../../assets/hero_banner.jpg";
import hero_title from "../../assets/hero_title.png";
import info_icon from "../../assets/info_icon.png";
import search_icon from "../../assets/search_icon.svg";
import { useNavigate } from 'react-router-dom';
import loading_spinner from "../../assets/loading_spinner.gif";

const Home = () => {
  const navigate = useNavigate();
  const searchRef = useRef(null);

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

useEffect(() => {
  const handleClickOutside = (e) => {
    if (searchRef.current && !searchRef.current.contains(e.target)) {
      setResults([]);
    }
  };
  document.addEventListener('click', handleClickOutside);
  return () => document.removeEventListener('click', handleClickOutside);
}, []);
  const handleSearch = async (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value.length > 2) {
      setLoading(true);
      try {
        const response = await fetch(`https://www.omdbapi.com/?s=${value}&apikey=${API_KEY}`);
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

      <div className="hero-wrapper">

       
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

            {loading && (
             <div className="search-results loading-container">
             <img src={loading_spinner} alt="Loading..." className="loading-spinner" />
             </div>
           )}

         

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

            {!loading && query.length > 2 && results.length === 0 && (
              <div className="search-results">
                <p className="no-results">No results found for "{query}"</p>
              </div>
            )}
          </div>
        </div>

        
        <div className="hero-caption">
          <img src={hero_title} alt="" className="caption-img" />
          <p>
            Discovering his ties to a secret ancient order, a young man living
            in modern Istanbul embarks on a quest to find a legendary artifact
            and save humanity from a powerful enemy.
          </p>
        </div>

      </div>
    </div>
  );
};

export default Home;