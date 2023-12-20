// App.jsx
import React, { useState, useEffect } from 'react';
import Header from './components/Header/Header.jsx';
import SearchBar from './components/SearchBar/SearchBar.jsx';
import Favoritos from './components/Favoritos/Favoritos.jsx';
import Tendencias from './components/Tendencias/Tendencias.jsx';
import Genero from './components/Genero/Genero.jsx';
import Footer from './components/Footer/Footer.jsx';
import './App.css';


const App = () => {
  const [titulos, setTitulos] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    fetchPopularMovies();
    fetchGenres();
  }, []);

  const fetchPopularMovies = async () => {
    try {
      const response = await fetch('https://api.themoviedb.org/3/discover/movie?api_key=e0ffd6d156ab1d1e0cc1451054eb0288');
      const data = await response.json();
      setTitulos(data.results);
    } catch (error) {
      console.error('Error fetching popular movies:', error);
    }
  };

  const fetchGenres = async () => {
    try {
      const response = await fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=e0ffd6d156ab1d1e0cc1451054eb0288&language=es-ES');
      const data = await response.json();
      setGenres(data.genres);
    } catch (error) {
      console.error('Error fetching genres:', error);
    }
  };

  const addToFavorites = (movie) => {
    setFavorites((prevFavorites) => [...prevFavorites, movie]);
  };

  const removeFromFavorites = (movieToRemove) => {
    setFavorites((prevFavorites) => prevFavorites.filter((movie) => movie.id !== movieToRemove.id));
  };

  return (
    <>
      <Header />
      <SearchBar addToFavorites={addToFavorites} />
      <Favoritos favorites={favorites} removeFromFavorites={removeFromFavorites} />
      <Tendencias addToFavorites={addToFavorites} favoritos={favorites} />
      <Genero genres={genres} />
      <Footer />
    </>
  );
};

export default App;
