import React from 'react';

const GamesPage = () => (
  <main style={{ padding: '2rem', maxWidth: 900, margin: '0 auto' }}>
    <h1>Videojuegos</h1>
    <section style={{ margin: '1rem 0' }}>
      <input type="text" placeholder="Buscar por nombre..." style={{ marginRight: 8 }} />
      <select><option>Género</option><option>Acción</option><option>Aventura</option><option>RPG</option></select>
      <select><option>Año</option><option>2025</option><option>2024</option><option>2023</option></select>
      <select><option>Calificación</option><option>5</option><option>4</option><option>3</option></select>
    </section>
    <section>
      <h2>Recomendaciones</h2>
      <div className="game-list">
        <div className="game-card">
          <h3>Ejemplo: The Legend of Zelda</h3>
          <p>Género: Aventura</p>
          <p>Año: 1986</p>
          <p>Calificación: 5</p>
          <button>Marcar como completado</button>
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

export default GamesPage;
