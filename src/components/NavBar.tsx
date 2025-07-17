import Link from 'next/link';
import React from 'react';
import './NavBar.css';

const NavBar = () => (
  <nav className="navbar">
    <ul className="navbar-list">
      <li><Link href="/">Inicio</Link></li>
      <li><Link href="/movies">Películas</Link></li>
      <li><Link href="/series">Series</Link></li>
      <li><Link href="/games">Videojuegos</Link></li>
      <li><Link href="/profile">Perfil</Link></li>
      <li><Link href="/settings">Configuración</Link></li>
    </ul>
  </nav>
);

export default NavBar;
