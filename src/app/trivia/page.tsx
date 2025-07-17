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
  ],
};

const TriviaPage = () => {
  const params = useSearchParams();
  const router = useRouter();
  const type = params.get("type") || "";
  const title = params.get("title") || "";
  const triviaKey = `${type}:${title}`;
  const questions = useMemo(() => TRIVIAS[triviaKey] || [], [triviaKey]);

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
