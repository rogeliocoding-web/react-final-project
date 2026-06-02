import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './MovieDetail.css'

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(
          `https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`
        );
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="movie-detail">
      <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>

      <div className="movie-content">
        <img src={movie.Poster} alt={movie.Title} className="movie-poster" />

        <div className="movie-info">
          <h1>{movie.Title}</h1>
          <p className="movie-meta">{movie.Year} • {movie.Rated} • {movie.Runtime}</p>
          <p className="movie-genre">{movie.Genre}</p>
          <p className="movie-plot">{movie.Plot}</p>

          <div className="movie-details">
            <p><span>Director:</span> {movie.Director}</p>
            <p><span>Cast:</span> {movie.Actors}</p>
            <p><span>Language:</span> {movie.Language}</p>
            <p><span>IMDB Rating:</span> ⭐ {movie.imdbRating}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieDetail