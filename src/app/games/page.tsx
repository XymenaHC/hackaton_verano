'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const GamesPage = () => {
  const [showCuriosities, setShowCuriosities] = useState(false);
  const [showPlatforms, setShowPlatforms] = useState(false);
  const [showTimeline, setShowTimeline] = useState(false);
  const [showSimilares, setShowSimilares] = useState(false);
  const router = useRouter();
  const [reviewText, setReviewText] = useState('');
  const [reviewRating, setReviewRating] = useState('5');
  return (
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
          <button onClick={() => router.push('/trivia?type=game&title=The%20Legend%20of%20Zelda')}>Ver trivia</button>
          <button onClick={() => setShowCuriosities(true)}>Ver datos curiosos</button>
<React.Fragment>
  {showCuriosities && (
    <div style={{position:'fixed',top:0,left:0,width:'100vw',height:'100vh',background:'rgba(0,0,0,0.5)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000}}>
      <div style={{background:'#fff',padding:24,borderRadius:12,maxWidth:400}}>
        <h3>Datos curiosos de The Legend of Zelda</h3>
        <ul style={{textAlign:'left', color:'#222'}}>
          <li>El nombre "Zelda" viene de la esposa del escritor F. Scott Fitzgerald.</li>
          <li>Link es zurdo en la mayoría de los juegos.</li>
          <li>El primer juego fue lanzado en 1986 para Famicom Disk System.</li>
        </ul>
        <button style={{marginTop:12}} onClick={() => setShowCuriosities(false)}>Cerrar</button>
      </div>
    </div>
  )}
  {showPlatforms && (
    <div style={{position:'fixed',top:0,left:0,width:'100vw',height:'100vh',background:'rgba(0,0,0,0.5)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000}}>
      <div style={{background:'#fff',padding:24,borderRadius:12,maxWidth:400}}>
        <h3>Dónde jugar The Legend of Zelda</h3>
        <ul style={{textAlign:'left', color:'#222'}}>
          <li>Nintendo Switch Online</li>
          <li>Wii U</li>
          <li>3DS</li>
        </ul>
        <button style={{marginTop:12}} onClick={() => setShowPlatforms(false)}>Cerrar</button>
      </div>
    </div>
  )}
  <button onClick={() => setShowPlatforms(true)}>Ver plataformas</button>
</React.Fragment>
          <button onClick={() => setShowTimeline(true)}>Ver timeline</button>
{showTimeline && (
  <div style={{position:'fixed',top:0,left:0,width:'100vw',height:'100vh',background:'rgba(0,0,0,0.5)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000}}>
    <div style={{background:'#fff',padding:24,borderRadius:12,maxWidth:400}}>
      <h3>Cronología de The Legend of Zelda</h3>
      <ul style={{textAlign:'left', color:'#222'}}>
        <li>1986 - The Legend of Zelda</li>
        <li>1991 - A Link to the Past</li>
        <li>1998 - Ocarina of Time</li>
        <li>2002 - The Wind Waker</li>
        <li>2017 - Breath of the Wild</li>
      </ul>
      <button style={{marginTop:12}} onClick={() => setShowTimeline(false)}>Cerrar</button>
    </div>
  </div>
)}
          <button onClick={() => setShowSimilares(true)}>Ver similares</button>
{showSimilares && (
  <div style={{position:'fixed',top:0,left:0,width:'100vw',height:'100vh',background:'rgba(0,0,0,0.5)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000}}>
    <div style={{background:'#fff',padding:24,borderRadius:12,maxWidth:400}}>
      <h3>Juegos similares a The Legend of Zelda</h3>
      <ul style={{textAlign:'left', color:'#222'}}>
        <li>Secret of Mana (1993)</li>
        <li>Okami (2006)</li>
        <li>Hollow Knight (2017)</li>
        <li>Hyper Light Drifter (2016)</li>
      </ul>
      <button style={{marginTop:12}} onClick={() => setShowSimilares(false)}>Cerrar</button>
    </div>
  </div>
)}
          <button>Reseñar</button>
        </div>
        {/* Más tarjetas simuladas aquí */}
      </div>
    </section>
    <section style={{ marginTop: '2rem' }}>
  <h2>Reseña y Calificación</h2>
  <textarea
    maxLength={100}
    placeholder="Escribe tu reseña (máx. 100 caracteres)"
    style={{ width: '100%', minHeight: 60 }}
    value={reviewText}
    onChange={e => setReviewText(e.target.value)}
  />
  <div>
    <label>Calificación: </label>
    <select value={reviewRating} onChange={e => setReviewRating(e.target.value)}>
      <option value="5">5</option>
      <option value="4">4</option>
      <option value="3">3</option>
      <option value="2">2</option>
      <option value="1">1</option>
    </select>
    <button onClick={() => {
      if (!reviewText.trim()) {
        alert('Por favor, escribe una reseña.');
        return;
      }
      alert(`¡Gracias por tu reseña!\nCalificación: ${reviewRating}\nTexto: ${reviewText}`);
      setReviewText('');
      setReviewRating('5');
    }}>Enviar reseña</button>
  </div>
</section>
  </main>
  );
};

export default GamesPage;
