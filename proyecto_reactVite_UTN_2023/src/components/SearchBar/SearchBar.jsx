

import React, { useState, useEffect } from 'react';
import './SearchBar.css';

const SearchBar = ({ addToFavorites }) => {
    const [query, setQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [genres, setGenres] = useState({});
    const [showFullOverviewMap, setShowFullOverviewMap] = useState({});
    const [visibleTrendsCount, setVisibleTrendsCount] = useState(15); // Mostrar solo 15 tendencias en total (3 filas x 5 columnas)

    const handleInputChange = (event) => {
        setQuery(event.target.value);
    };

    const handleSearch = async () => {
        try {
            const apiKey = 'e0ffd6d156ab1d1e0cc1451054eb0288';

            const genresUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=es-ES`;
            const genresResponse = await fetch(genresUrl);
            const genresData = await genresResponse.json();
            const genresMap = {};
            genresData.genres.forEach((genre) => {
                genresMap[genre.id] = genre.name;
            });
            setGenres(genresMap);

            const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}&language=es-ES`;
            const searchResponse = await fetch(searchUrl);
            const searchData = await searchResponse.json();

            setSearchResults(searchData.results);
            const initialShowFullOverviewMap = {};
            searchData.results.forEach((movie) => {
                initialShowFullOverviewMap[movie.id] = false;
            });
            setShowFullOverviewMap(initialShowFullOverviewMap);
        } catch (error) {
            console.error('Error al buscar películas:', error);
        }
    };

    return (
        <div>
            <div className='sectionone'>
                <div className="imagen">
                    <img src="./src/assets/image4.png" className="tamañoimg" alt="popcorn" />
                </div>
                <div className='hdosyp'>
                    <h2 className='estilohdos'>Bienvenidos a FlixHub</h2>
                    <p>El buscador más completo de películas</p>
                    <div className='barrabusqueda'>
                        <input
                            className="barra"
                            type="text"
                            value={query}
                            onChange={handleInputChange}
                            placeholder=" Qué peli o serie estás buscando?"
                        />
                        <button onClick={handleSearch} className="botonbuscar">Buscar</button>
                    </div>
                </div>
            </div>
            <div className='resultados'>
                {searchResults.length > 0 && (
                    <div className="search-results">
                        <div className="trends-grid">
                            {searchResults.slice(0, visibleTrendsCount).map((movie) => (
                                <div className="tarjetapeli" key={movie.id}>
                                    <h3 className='titulopeli'>{movie.title}</h3>
                                    {movie.poster_path && (
                                        <img
                                            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                                            alt={movie.title}
                                        />
                                    )}
                                    <p className='genero'>Género: {genres[movie.genre_ids[0]]}</p>
                                    <p className='review'>
                                        {showFullOverviewMap[movie.id]
                                            ? movie.overview
                                            : `${movie.overview.slice(0, 150)}...`}
                                    </p>
                                    <div className="buttons-container">
                                        <button
                                            className="view-more-button"
                                            onClick={() => {
                                                const updatedShowFullOverviewMap = {
                                                    ...showFullOverviewMap,
                                                    [movie.id]: !showFullOverviewMap[movie.id],
                                                };
                                                setShowFullOverviewMap(updatedShowFullOverviewMap);
                                            }}
                                        >
                                            {showFullOverviewMap[movie.id] ? 'Ver menos' : 'Ver más'}
                                        </button>
                                        <button
                                            className="favorites-button"
                                            onClick={() => addToFavorites(movie)}
                                        >
                                            Favoritos
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchBar;
