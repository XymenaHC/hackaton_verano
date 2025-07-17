import React from 'react';

const MoviesPage = () => (
  <main style={{ padding: '2rem', maxWidth: 900, margin: '0 auto' }}>
    <h1>Películas</h1>
    <section style={{ margin: '1rem 0' }}>
      <input type="text" placeholder="Buscar por nombre..." style={{ marginRight: 8 }} />
      <select><option>Género</option><option>Acción</option><option>Aventura</option><option>Comedia</option></select>
      <select><option>Año</option><option>2025</option><option>2024</option><option>2023</option></select>
      <select><option>Calificación</option><option>5</option><option>4</option><option>3</option></select>
    </section>
    <section>
      <h2>Recomendaciones</h2>
      <div className="movie-list">
        <div className="movie-card">
          <h3>Ejemplo: Matrix</h3>
          <p>Género: Ciencia Ficción</p>
          <p>Año: 1999</p>
          <p>Calificación: 5</p>
          <button>Marcar como completada</button>
          <button>Ver trivia</button>
          <button>Ver datos curiosos</button>
          <button>Ver plataformas</button>
          <button>Ver timeline</button>
          <button>Ver similares</button>
          <button>Reseñar</button>
        </div>
        {/* Más tarjetas simuladas aquí */}
      </div>
    </section>
    <section style={{ marginTop: '2rem' }}>
      <h2>Reseña y Calificación</h2>
      <textarea maxLength={100} placeholder="Escribe tu reseña (máx. 100 caracteres)" style={{ width: '100%', minHeight: 60 }} />
      <div>
        <label>Calificación: </label>
        <select><option>5</option><option>4</option><option>3</option><option>2</option><option>1</option></select>
        <button>Enviar reseña</button>
      </div>
    </section>
  </main>
);

export default MoviesPage;
