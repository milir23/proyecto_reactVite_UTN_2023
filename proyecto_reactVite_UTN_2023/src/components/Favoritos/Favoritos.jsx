// Favoritos.jsx
import React from 'react';
import './Favoritos.css';

const Favoritos = ({ favorites, removeFromFavorites }) => {
  return (
    <div>
      <h2 className='estilo'>Favoritos</h2>
      {favorites.length > 0 ? (
        <div className="favorites-list">
          {favorites.map((movie) => (
            <div className="favorite-card" key={movie.id}>
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
              />
              <h3 className='titulofav'>{movie.title}</h3>
              <p className='estilopdos'>{movie.overview}</p>
              <button className='btn' onClick={() => removeFromFavorites(movie)}>
                Quitar de favoritos
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className='estilop'>No hay películas en favoritos.</p>
      )}
    </div>
  );
};

export default Favoritos;
