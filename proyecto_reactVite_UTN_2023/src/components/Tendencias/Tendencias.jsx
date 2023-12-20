import React, { useState, useEffect } from 'react';
import './Tendencias.css';

const Tendencias = ({ addToFavorites }) => {
  const [titulos, setTitulos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [readMore, setReadMore] = useState(Array(titulos.length).fill(false));

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const response = await fetch('https://api.themoviedb.org/3/trending/all/day?api_key=e0ffd6d156ab1d1e0cc1451054eb0288&language=es-ES');
        const data = await response.json();
        setTitulos(data.results);
        console.log(data.results);
      } catch (error) {
        console.error('Error fetching trending movies:', error);
      }
    };

    fetchTrendingMovies();
  }, []);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 < 0 ? titulos.length - 1 : prevIndex - 1));
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1 >= titulos.length ? 0 : prevIndex + 1));
  };

  const handleCardClick = (index) => {
    setCurrentIndex(index);
  };

  const handleReadMoreClick = (index) => {
    setReadMore((prevReadMore) => {
      const updatedReadMore = [...prevReadMore];
      updatedReadMore[index] = !updatedReadMore[index];
      return updatedReadMore;
    });
  };

  return (
    <section className="margsec" id="tendenciasSecDos">
      <div className="orgdivsec2">
        <h2 className="estilotendencia">Tendencias</h2>
        <a href="#" className="ver-mas-link">
          Ver más
        </a>
      </div>

      <div className="orgdiv2sec2">
        {titulos.length > 0 && (
          <div className='cajatarjetas'>
            <div className='catarjet'>
              {titulos.map((titulo, index) => (
                <div
                  key={index}
                  className={`tarjeta ${index === currentIndex ? 'active' : ''}`}
                  onClick={() => handleCardClick(index)}
                >
                  <img src={`https://image.tmdb.org/t/p/w500${titulo.poster_path}`} alt={titulo.title} />
                  <h3 className="tituloclas">{titulo.title}</h3>
                  <p className="estilopar">{readMore[index] ? titulo.overview : `${titulo.overview.slice(0, 100)}...`}</p>
                  <div className="btnes">
                    <button className="leer-mas-button" onClick={() => handleReadMoreClick(index)}>
                      {readMore[index] ? 'Leer menos' : 'Leer más'}
                    </button>
                    <button className="agregar-favoritos-button" onClick={() => addToFavorites(titulo)}>
                      <i class="bi bi-bookmark-star-fill"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>



    </section>
  );
};

export default Tendencias;

