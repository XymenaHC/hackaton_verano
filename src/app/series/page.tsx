'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const SeriesPage = () => {
  const [showCuriosities, setShowCuriosities] = useState(false);
  const [showPlatforms, setShowPlatforms] = useState(false);
  const [showTimeline, setShowTimeline] = useState(false);
  const [showSimilares, setShowSimilares] = useState(false);
  const router = useRouter();
  const [reviewText, setReviewText] = useState('');
  const [reviewRating, setReviewRating] = useState('5');
  return (
  <main style={{ padding: '2rem', maxWidth: 900, margin: '0 auto' }}>
    <h1>Series</h1>
    <section style={{ margin: '1rem 0' }}>
      <input type="text" placeholder="Buscar por nombre..." style={{ marginRight: 8 }} />
      <select><option>Género</option><option>Acción</option><option>Aventura</option><option>Comedia</option></select>
      <select><option>Año</option><option>2025</option><option>2024</option><option>2023</option></select>
      <select><option>Calificación</option><option>5</option><option>4</option><option>3</option></select>
    </section>
    <section>
      <h2>Recomendaciones</h2>
      <div className="series-list">
        <div className="series-card">
          <h3>Ejemplo: Stranger Things</h3>
          <p>Género: Ciencia Ficción</p>
          <p>Año: 2016</p>
          <p>Calificación: 5</p>
          <button>Marcar como completada</button>
          <button onClick={() => router.push('/trivia?type=series&title=Stranger%20Things')}>Ver trivia</button>
          <button onClick={() => setShowCuriosities(true)}>Ver datos curiosos</button>
<React.Fragment>
  {showCuriosities && (
    <div style={{position:'fixed',top:0,left:0,width:'100vw',height:'100vh',background:'rgba(0,0,0,0.5)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000}}>
      <div style={{background:'#fff',padding:24,borderRadius:12,maxWidth:400}}>
        <h3>Datos curiosos de Stranger Things</h3>
        <ul style={{textAlign:'left', color:'#222'}}>
          <li>La serie está inspirada en películas y cultura pop de los 80.</li>
          <li>El Demogorgon fue creado con una mezcla de efectos prácticos y CGI.</li>
          <li>Once (Eleven) casi fue interpretada por otra actriz.</li>
        </ul>
        <button style={{marginTop:12}} onClick={() => setShowCuriosities(false)}>Cerrar</button>
      </div>
    </div>
  )}
  {showPlatforms && (
    <div style={{position:'fixed',top:0,left:0,width:'100vw',height:'100vh',background:'rgba(0,0,0,0.5)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000}}>
      <div style={{background:'#fff',padding:24,borderRadius:12,maxWidth:400}}>
        <h3>Dónde ver Stranger Things</h3>
        <ul style={{textAlign:'left', color:'#222'}}>
          <li>Netflix</li>
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
      <h3>Cronología de Stranger Things</h3>
      <ul style={{textAlign:'left', color:'#222'}}>
        <li>2016 - Temporada 1</li>
        <li>2017 - Temporada 2</li>
        <li>2019 - Temporada 3</li>
        <li>2022 - Temporada 4</li>
      </ul>
      <button style={{marginTop:12}} onClick={() => setShowTimeline(false)}>Cerrar</button>
    </div>
  </div>
)}
          <button onClick={() => setShowSimilares(true)}>Ver similares</button>
{showSimilares && (
  <div style={{position:'fixed',top:0,left:0,width:'100vw',height:'100vh',background:'rgba(0,0,0,0.5)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000}}>
    <div style={{background:'#fff',padding:24,borderRadius:12,maxWidth:400}}>
      <h3>Series similares a Stranger Things</h3>
      <ul style={{textAlign:'left', color:'#222'}}>
        <li>Dark (2017)</li>
        <li>The OA (2016)</li>
        <li>Sense8 (2015)</li>
        <li>Locke & Key (2020)</li>
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

export default SeriesPage;
