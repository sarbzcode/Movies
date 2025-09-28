import React, { useState } from 'react';
import "../css/MovieCard.css";
import { useMovieContext } from '../contexts/MovieContext.jsx';
function MovieCard({movie}) {
    const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();
    const favorite = isFavorite(movie.id);

    function onFavoriteClick(e) {
        e.preventDefault();
        if (favorite) {
            removeFromFavorites(movie.id);
        } else {
            addToFavorites(movie);
        }
    }

    function handleGoogle() {
        const query = encodeURIComponent(movie.title + " " + movie.release_date?.split("-")[0]);
        const url = `https://www.google.com/search?q=${query}`;
        window.open(url, '_blank');
    }

    return (
        <div className="movie-card">
            <button style={{ border: 'none', cursor: 'pointer' }} onClick={handleGoogle}>
                <div className="movie-poster">
                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                    <div className="movie-overlay">
                        <button className={`favorite-btn ${favorite ? "active" : ""}`} onClick={onFavoriteClick}>♥</button>
                    </div>
                </div>
                <div className="movie-info">
                    <h3 className="movie-title">{movie.title}</h3>
                    <p className="movie-release-date">{movie.release_date?.split("-")[0]}</p>
                </div>
            </button>
        </div>
    );
}


export default MovieCard;