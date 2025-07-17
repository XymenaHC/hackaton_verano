"use client";
import React, { useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

// Preguntas de ejemplo para Matrix y Stranger Things
const TRIVIAS: Record<string, any> = {
  "movie:Matrix": [
    {
      question: "¿Cuál es el nombre real de Neo?",
      options: ["Thomas Anderson", "Morpheus", "Agent Smith", "Trinity"],
      answer: 0,
    },
    {
      question: "¿Qué pastilla toma Neo?",
      options: ["Verde", "Azul", "Roja", "Amarilla"],
      answer: 2,
    },
    {
      question: "¿Quién es el líder de la resistencia?",
      options: ["Neo", "Morpheus", "Smith", "Oracle"],
      answer: 1,
    },
    {
      question: "¿Cuál es el nombre de la nave principal?",
      options: ["Nebuchadnezzar", "Pegasus", "Enterprise", "Normandy"],
      answer: 0,
    },
    {
      question: "¿Quién traiciona a Morpheus y su equipo?",
      options: ["Tank", "Dozer", "Cypher", "Switch"],
      answer: 2,
    },
  ],
  "series:Stranger Things": [
    {
      question: "¿Cómo se llama la niña con poderes psíquicos?",
      options: ["Max", "Nancy", "Eleven", "Joyce"],
      answer: 2,
    },
    {
      question: "¿En qué ciudad ocurre la historia?",
      options: ["Hawkins", "Springfield", "Gotham", "Metropolis"],
      answer: 0,
    },
    {
      question: "¿Cómo apodan a los monstruos del otro lado?",
      options: ["Demogorgon", "Mind Flayer", "Vecna", "Todos los anteriores"],
      answer: 3,
    },
    {
      question: "¿Quién es el hermano mayor de Will Byers?",
      options: ["Steve", "Jonathan", "Mike", "Lucas"],
      answer: 1,
    },
    {
      question: "¿Cuál es el nombre del centro de investigación en Hawkins?",
      options: ["Hawkins Lab", "Umbrella Corp.", "Black Mesa", "Stark Industries"],
      answer: 0,
    },
  ],
  "game:The Legend of Zelda": [
    {
      question: "¿Cómo se llama el protagonista principal?",
      options: ["Zelda", "Link", "Ganondorf", "Epona"],
      answer: 1,
    },
    {
      question: "¿Cuál es el nombre de la princesa?",
      options: ["Peach", "Zelda", "Midna", "Ruto"],
      answer: 1,
    },
    {
      question: "¿Qué objeto es fundamental para viajar en el tiempo en Ocarina of Time?",
      options: ["Espada Maestra", "Ocarina del Tiempo", "Escudo Hyliano", "Trifuerza"],
      answer: 1,
    },
    {
      question: "¿Cuál es el villano principal en la mayoría de los juegos?",
      options: ["Vaati", "Majora", "Ganondorf", "Zant"],
      answer: 2,
    },
    {
      question: "¿Cómo se llama el reino donde ocurren la mayoría de las aventuras?",
      options: ["Termina", "Hyrule", "Koholint", "Holodrum"],
      answer: 1,
    },
  ],
};

const TriviaPage = () => {
  const params = useSearchParams();
  const router = useRouter();
  const type = params.get("type") || "";
  const title = params.get("title") || "";
  const triviaKey = `${type}:${title}`;
  const questions = useMemo(() => {
  const base = TRIVIAS[triviaKey] || [];
  if (base.length >= 5) return base.slice(0, 5);
  // Rellenar con preguntas dummy si hay menos de 5
  const dummy = {
    question: "Pregunta extra de ejemplo",
    options: ["Opción 1", "Opción 2", "Opción 3", "Opción 4"],
    answer: 0,
  };
  return [...base, ...Array(5 - base.length).fill(dummy)].map((q, i) => ({ ...q, question: q.question + ` (${i + 1})` }));
}, [triviaKey]);

  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);

  const handleAnswer = (idx: number) => {
    setSelected(idx);
    if (questions[step].answer === idx) setScore((s) => s + 1);
    setTimeout(() => {
      if (step + 1 < questions.length) {
        setStep(step + 1);
        setSelected(null);
      } else {
        setFinished(true);
      }
    }, 900);
  };

  if (!type || !title || questions.length === 0) {
    return (
      <main style={{ padding: 32, textAlign: "center" }}>
        <h1>Trivia</h1>
        <p>No hay preguntas para este contenido.</p>
        <button onClick={() => router.back()}>Volver</button>
      </main>
    );
  }

  return (
    <main style={{ padding: 32, maxWidth: 480, margin: "0 auto" }}>
      <h1>Trivia de {decodeURIComponent(title)}</h1>
      {finished ? (
        <>
          <h2>¡Terminaste!</h2>
          <p>Tu puntaje: {score} / {questions.length}</p>
          <button onClick={() => router.push("/profile")}>Volver al perfil</button>
        </>
      ) : (
        <>
          <h3>{questions[step].question}</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {questions[step].options.map((opt: string, idx: number) => (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                disabled={selected !== null}
                style={{
                  background: selected === idx
                    ? idx === questions[step].answer
                      ? "#a084ee"
                      : "#ffb347"
                    : "#23235b",
                  color: "white",
                  padding: 12,
                  borderRadius: 8,
                  border: "none",
                  cursor: selected === null ? "pointer" : "default",
                  fontWeight: "bold",
                }}
              >
                {opt}
              </button>
            ))}
          </div>
          <div style={{ marginTop: 24 }}>
            Pregunta {step + 1} de {questions.length}
          </div>
        </>
      )}
    </main>
  );
};

export default TriviaPage;
