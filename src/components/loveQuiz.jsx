import React, { useState } from "react";

export default function LoveQuiz() {
  const QUESTIONS = [
    {
      id: 1,
      q: "Quando pensa em amor, o que vem primeiro à sua cabeça?",
      choices: [
        { id: "a", text: "Paixão intensa e imediata" },
        { id: "b", text: "Companheirismo e parceria" },
        { id: "c", text: "Liberdade para crescer" },
        { id: "d", text: "Cuidado e segurança" },
      ],
    },
    {
      id: 2,
      q: "Qual destas ações mais demonstra amor para si?",
      choices: [
        { id: "a", text: "Surpresas românticas" },
        { id: "b", text: "Estar presente nos momentos difíceis" },
        { id: "c", text: "Dar espaço quando necessário" },
        { id: "d", text: "Gestos práticos, como ajudar nas tarefas" },
      ],
    },
    {
      id: 3,
      q: "Numa relação ideal, qual é o papel da comunicação?",
      choices: [
        { id: "a", text: "Chama sempre acesa: falar muito" },
        { id: "b", text: "Diálogo honesto e consistente" },
        { id: "c", text: "Silêncios confortáveis também contam" },
        { id: "d", text: "Comunicação sobretudo através de ações" },
      ],
    },
    {
      id: 4,
      q: "Escolha a sua frase favorita sobre o amor:",
      choices: [
        { id: "a", text: "Amar é sentir borboletas constantes" },
        { id: "b", text: "Amar é construir algo com alguém" },
        { id: "c", text: "Amar é crescer lado a lado, livres" },
        { id: "d", text: "Amar é cuidar com atenção" },
      ],
    },
  ];

  const RESULTS = {
    a: {
      title: "O Romântico",
      desc: "Você valoriza emoção, intensidade e momentos mágicos. O seu amor é uma chama viva — vibrante e impulsiva.",
    },
    b: {
      title: "O Parceiro(a)",
      desc: "Para si, amor é presença e construção. Procura estabilidade, confiança e crescimento mútuo.",
    },
    c: {
      title: "O Libertador(a)",
      desc: "Valoriza autonomia e espaço pessoal. O amor ideal para si permite voar e voltar sem prisões.",
    },
    d: {
      title: "O Guardião(ã)",
      desc: "Mostra amor através de cuidado prático e proteção. Pequenos gestos constantes dizem tudo.",
    },
  };

  const [answers, setAnswers] = useState({});
  const [index, setIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);

  function selectChoice(questionId, choiceId) {
    setAnswers((s) => ({ ...s, [questionId]: choiceId }));
  }

  function next() {
    if (index < QUESTIONS.length - 1) setIndex((i) => i + 1);
    else setShowResult(true);
  }

  function prev() {
    if (index > 0) setIndex((i) => i - 1);
  }

  function reset() {
    setAnswers({});
    setIndex(0);
    setShowResult(false);
  }

  function computeResult() {
    const freq = {};
    Object.values(answers).forEach((c) => {
      freq[c] = (freq[c] || 0) + 1;
    });
    const entries = Object.entries(freq);
    if (entries.length === 0) return null;
    entries.sort((a, b) => b[1] - a[1]);
    return entries[0][0];
  }

  const current = QUESTIONS[index];
  const resultKey = computeResult();

  return (
    <div className="max-w-3xl mx-auto p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-extrabold">Quiz Interactivo: O Amor</h1>
        <p className="text-sm opacity-80 mt-1">Responda com sinceridade. No final, receberá um resultado tipo-personalidade.</p>
      </header>

      {!showResult && (
        <main className="bg-white rounded-2xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm text-gray-600">Pergunta {index + 1} de {QUESTIONS.length}</div>
            <div className="text-sm text-gray-500">Progresso: {Math.round(((index) / QUESTIONS.length) * 100)}%</div>
          </div>

          <h2 className="text-xl font-semibold mb-4">{current.q}</h2>

          <div className="grid gap-3">
            {current.choices.map((c) => {
              const selected = answers[current.id] === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => selectChoice(current.id, c.id)}
                  className={`text-left p-4 rounded-xl border transition-shadow focus:outline-none ${selected ? 'shadow-lg border-transparent ring-2 ring-offset-2 ring-pink-300' : 'border-gray-200 hover:shadow-sm'}`}
                >
                  <div className="font-medium">{c.text}</div>
                </button>
              );
            })}
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div>
              <button onClick={prev} disabled={index === 0} className="px-4 py-2 rounded-md border mr-2 disabled:opacity-50">Anterior</button>
              <button onClick={next} className="px-4 py-2 rounded-md bg-pink-600 text-white">{index === QUESTIONS.length - 1 ? 'Ver Resultado' : 'Próxima'}</button>
            </div>

            <div>
              <button onClick={reset} className="text-sm underline">Recomeçar</button>
            </div>
          </div>
        </main>
      )}

      {showResult && (
        <section className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-2xl font-bold">Resultado</h2>
          {!resultKey ? (
            <p className="mt-4">Não há respostas — por favor responda ao quiz.</p>
          ) : (
            <article className="mt-4">
              <h3 className="text-xl font-semibold">{RESULTS[resultKey].title}</h3>
              <p className="mt-2 text-gray-700">{RESULTS[resultKey].desc}</p>

              <div className="mt-4">
                <h4 className="font-medium">Conselho prático</h4>
                <p className="mt-1 text-sm text-gray-600">{resultKey === 'a' && 'Abraça a paixão, mas lembre-se de construir confiança.'}
                {resultKey === 'b' && 'Continue a construir com presença — vulnerabilidade é força.'}
                {resultKey === 'c' && 'Equilibre liberdade com pequenos rituais de ligação.'}
                {resultKey === 'd' && 'Cuidados consistentes geram segurança emocional — mantenha isso.'}</p>
              </div>

              <div className="mt-6 flex gap-3">
                <button onClick={reset} className="px-4 py-2 bg-pink-600 text-white rounded-md">Refazer</button>
              </div>
            </article>
          )}
        </section>
      )}

      <footer className="mt-6 text-xs text-gray-500"></footer>
    </div>
  );
}