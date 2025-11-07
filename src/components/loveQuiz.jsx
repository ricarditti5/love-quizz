import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import UserInfoForm from "./userForm";

export default function LoveQuiz() {
  const [userInfo, setUserInfo] = useState(null);

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
    {
      id: 5,
      q: "Quando o preconceito toca no seu amor, o que acontece?",
      choices: [
        { id: "a", text: "O amor fica mais forte e apaixonado para resistir" },
        { id: "b", text: "O amor une-nos para construir algo melhor juntos" },
        { id: "c", text: "O amor continua livre, sem se importar com o exterior" },
        { id: "d", text: "O amor cria um espaço de proteção entre nós" },
      ],
    },
    {
      id: 6,
      q: "Como funciona a pressão de paz no seu amor?",
      choices: [
        { id: "a", text: "Limita a intensidade e autenticidade dos sentimentos" },
        { id: "b", text: "Cria uma base sólida para crescer juntos" },
        { id: "c", text: "Não é necessária quando há liberdade verdadeira" },
        { id: "d", text: "Garante que ambos se sentem seguros e cuidados" },
      ],
    },
    {
      id: 7,
      q: "Na sua experiência, como o preconceito afeta o amor?",
      choices: [
        { id: "a", text: "Faz o amor arder com mais força e determinação" },
        { id: "b", text: "Revela como o amor pode construir pontes entre diferenças" },
        { id: "c", text: "O amor verdadeiro simplesmente existe, acima de tudo" },
        { id: "d", text: "Faz o amor ser um lugar seguro onde nos refugiamos" },
      ],
    },
    {
      id: 8,
      q: "Para si, manter a pressão de paz no amor significa:",
      choices: [
        { id: "a", text: "Suavizar sentimentos que deveriam ser intensos" },
        { id: "b", text: "Investir na harmonia que fortalece a relação" },
        { id: "c", text: "Algo que surge naturalmente sem esforço" },
        { id: "d", text: "Garantir que o outro se sente protegido e estável" },
      ],
    },
    {
      id: 9,
      q: "Quando há preconceito, o que o amor faz em si?",
      choices: [
        { id: "a", text: "Acende uma chama de defesa apaixonada" },
        { id: "b", text: "Abre espaço para diálogo e compreensão mútua" },
        { id: "c", text: "Permanece indiferente, mantendo a liberdade de ser" },
        { id: "d", text: "Ativa o instinto de proteger o relacionamento" },
      ],
    },
    {
      id: 10,
      q: "Como sente que a pressão de paz funciona no seu tipo de amor?",
      choices: [
        { id: "a", text: "Pode apagar a chama da paixão genuína" },
        { id: "b", text: "É o cimento que une e fortalece a parceria" },
        { id: "c", text: "Vem naturalmente quando há respeito e liberdade" },
        { id: "d", text: "É essencial para sentir segurança e cuidado contínuo" },
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

  useEffect(() => {
    if (showResult && resultKey) {
      saveResult(resultKey);
    }
  }, [showResult, resultKey]);

  async function saveResult(resultKey) {
    if (!userInfo) return;
    const resultTypes = {
      a: "O Romântico",
      b: "O Parceiro(a)",
      c: "O Libertador(a)",
      d: "O Guardião(ã)",
    };

    console.log("🔄 Tentando salvar resultado...");
    console.log("User Info:", userInfo);
    console.log("Result Key:", resultKey);
    
    const cardNumber = parseInt(userInfo.card_Number) || 0;
    const resultado = resultTypes[resultKey] || null;
    
    const dataToSave = {
      name: userInfo.name,
      card_number: cardNumber,
      turma: userInfo.turma || null,
      ano_escolar: parseInt(userInfo.ano_escolar) || null,
      resultado: resultado, // Tipo de amor do usuário
    };
    
    console.log("📝 Dados para inserir/atualizar:", dataToSave);

    // Verificar se já existe um registro com o mesmo card_number ou name
    const { data: existingRecords, error: checkError } = await supabase
      .from("quizz_results")
      .select("id, card_number, name")
      .or(`card_number.eq.${cardNumber},name.eq.${userInfo.name}`)
      .limit(1);

    let data, error;

    // Se encontrou um registro existente (checkError é null e há dados)
    if (!checkError && existingRecords && existingRecords.length > 0) {
      // Já existe um registro - atualizar
      console.log("📝 Registro existente encontrado. Atualizando...");
      const { data: updateData, error: updateError } = await supabase
        .from("quizz_results")
        .update(dataToSave)
        .eq("id", existingRecords[0].id)
        .select();
      
      data = updateData;
      error = updateError;
    } else {
      // Não existe - inserir novo
      console.log("📝 Novo registro. Inserindo...");
      // Tentar UPSERT primeiro (se card_number for único)
      const upsertResult = await supabase
        .from("quizz_results")
        .upsert(
          [dataToSave],
          {
            onConflict: 'card_number',
            ignoreDuplicates: false
          }
        )
        .select();
      
      // Se UPSERT falhar (card_number não único), tentar INSERT normal
      if (upsertResult.error && (upsertResult.error.code === '23505' || upsertResult.error.message.includes('unique'))) {
        console.log("⚠️ UPSERT falhou (card_number pode não ser único). Tentando INSERT...");
        const insertResult = await supabase
          .from("quizz_results")
          .insert([dataToSave])
          .select();
        data = insertResult.data;
        error = insertResult.error;
      } else {
        data = upsertResult.data;
        error = upsertResult.error;
      }
    }

    if (error) {
      console.error("❌ Erro ao guardar:", error);
      console.error("Mensagem:", error.message);
      console.error("Código:", error.code);
      console.error("Detalhes:", error.details);
      alert(`Erro ao guardar resultado: ${error.message}`);
    } else {
      console.log("✅ Resultado guardado/atualizado no Supabase com sucesso!");
      console.log("Dados salvos:", data);
    }
  }

  if (!userInfo) return <UserInfoForm onSubmit={setUserInfo} />;

  return (
    <div className="max-w-3xl mx-auto p-6 min-h-screen bg-gray-900">
      <header className="mb-6 text-center">
        <h1 className="text-3xl font-extrabold text-white">Quiz Interativo: O Amor</h1>
        <p className="text-sm text-gray-400 mt-1">
          Responda com sinceridade. No final, receberá um resultado tipo-personalidade.
        </p>
      </header>

      {!showResult && (
        <main className="bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm text-gray-300">
              Pergunta {index + 1} de {QUESTIONS.length}
            </div>
            <div className="text-sm text-gray-400">
              Progresso: {Math.round((index / QUESTIONS.length) * 100)}%
            </div>
          </div>

          <h2 className="text-xl font-semibold mb-6 text-white">{current.q}</h2>

          <div className="grid gap-3">
            {current.choices.map((c) => {
              const selected = answers[current.id] === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => selectChoice(current.id, c.id)}
                  className={`text-left p-4 rounded-xl border transition-all focus:outline-none ${
                    selected
                      ? "bg-pink-600 border-pink-500 shadow-lg shadow-pink-500/50 text-white"
                      : "bg-gray-700 border-gray-600 hover:bg-gray-650 hover:border-gray-500 text-gray-100"
                  }`}
                >
                  <div className="font-medium">{c.text}</div>
                </button>
              );
            })}
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div>
              <button
                onClick={prev}
                disabled={index === 0}
                className="px-4 py-2 rounded-md border border-gray-600 bg-gray-700 text-gray-200 mr-2 disabled:opacity-50 hover:bg-gray-600"
              >
                Anterior
              </button>
              <button
                onClick={next}
                className="px-4 py-2 rounded-md bg-pink-600 text-white hover:bg-pink-700"
              >
                {index === QUESTIONS.length - 1 ? "Ver Resultado" : "Próxima"}
              </button>
            </div>

            <div>
              <button
                onClick={reset}
                className="text-sm text-pink-400 hover:text-pink-300 underline"
              >
                Recomeçar
              </button>
            </div>
          </div>
        </main>
      )}

      {showResult && (
        <section className="bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-700">
          <h2 className="text-2xl font-bold text-white">Resultado</h2>
          {!resultKey ? (
            <p className="mt-4 text-gray-300">
              Não há respostas — por favor responda ao quiz.
            </p>
          ) : (
            <article className="mt-4">
              <h3 className="text-xl font-semibold text-pink-400">
                {RESULTS[resultKey].title}
              </h3>
              <p className="mt-2 text-gray-300">{RESULTS[resultKey].desc}</p>

              <div className="mt-4">
                <h4 className="font-medium text-white">Conselho prático</h4>
                <p className="mt-1 text-sm text-gray-400">
                  {resultKey === "a" && "Abraça a paixão, mas lembre-se de construir confiança."}
                  {resultKey === "b" && "Continue a construir com presença — vulnerabilidade é força."}
                  {resultKey === "c" && "Equilibre liberdade com pequenos rituais de ligação."}
                  {resultKey === "d" && "Cuidados consistentes geram segurança emocional — mantenha isso."}
                </p>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={reset}
                  className="px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700"
                >
                  Refazer
                </button>
              </div>
            </article>
          )}
        </section>
      )}
    </div>
  );
}
