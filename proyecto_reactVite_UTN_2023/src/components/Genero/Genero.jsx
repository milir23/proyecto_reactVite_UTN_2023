import React, { useEffect, useState } from 'react';
import './Genero.css';

const GeneroSection = ({ genres }) => {
  const [genresWithMovies, setGenresWithMovies] = useState([]);
  const [genreNames, setGenreNames] = useState({});

  useEffect(() => {
    const fetchGenreNames = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=e0ffd6d156ab1d1e0cc1451054eb0288&language=es-ES`
        );
        const data = await response.json();
        const names = {};
        data.genres.forEach((genre) => {
          names[genre.id] = genre.name;
        });
        setGenreNames(names);
      } catch (error) {
        console.error('Error fetching genre names:', error);
      }
    };

    fetchGenreNames();
  }, []);

  useEffect(() => {
    const fetchGenreMovies = async () => {
      const genresWithMovies = await Promise.all(
        genres.map(async (genre) => {
          try {
            const response = await fetch(
              `https://api.themoviedb.org/3/discover/movie?api_key=e0ffd6d156ab1d1e0cc1451054eb0288&with_genres=${genre.id}&language=es-ES`
            );
            const data = await response.json();

            return {
              ...genre,
              movies: data.results.length > 0 ? [data.results[0]] : [], // Tomamos la primera película
            };
          } catch (error) {
            console.error(`Error fetching movies for genre ${genre.name}:`, error);
            return {
              ...genre,
              movies: [],
            };
          }
        })
      );

      setGenresWithMovies(genresWithMovies);
    };

    fetchGenreMovies();
  }, [genres]);

  return (
    <section className="margsec" id="mirarPorGeneroSecTres">
      <div className="otronombre">
        <h2 className="estiloh">Mirar por género</h2>
        <div className='button-container'>
          {genresWithMovies.slice(0, 6).map((genre) => (
            <button className="botong" key={genre.id}>
              {genre.movies.length > 0 && (
                <div>
                  <img
                    src={`https://image.tmdb.org/t/p/w200${genre.movies[0].poster_path}`}
                    alt={genre.movies[0].title}
                  />
                  <div className="carousel-caption">
                    <a href="#"><h3>{genreNames[genre.id]}</h3></a>
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>
        <div>
          <a href="#" className='vertodos'>Ver todos</a>
        </div>
      </div>
    </section>
  );
};

export default GeneroSection;