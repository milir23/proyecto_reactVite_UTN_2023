// CompLogo.jsx

import React from 'react';
import './Header.css';


const ComponenteLogo = () => {
  return (
    <div>
      <a href="#"><img src="./src/assets/image6.png" alt="Flixhub" className="logo" /></a>
    </div>
  );
};




// CompNav.jsx


const ComponenteNav = () => {
  return (
    <div>
     <div className="estilonav">
    <input type="checkbox" id="mobile-menu-toggle" className="mobile-menu-toggle" />
    <label htmlFor="mobile-menu-toggle" className="mobile-menu-button">☰</label>
    <nav className='navegador'>
        <a href="#" className='orgnavsa'>Home</a>
        <a href="#" className='orgnavsa'>Buscador</a>
        <a href="#" className='orgnavsa'>Tendencias</a>
        <a href="#" className='orgnavsa'>Películas</a>
        <a href="#" className='orgnavsa'>Favoritos</a>
    </nav>
</div>

    </div>
  );
};






const Header = () => {
  return (
    <header className="header" id="headerOseaDigamos">
      <div className="ordendiv1">
        <ComponenteLogo />
        <ComponenteNav />
      </div>

    </header>
  );
};

export { ComponenteNav, ComponenteLogo };
export default Header;
