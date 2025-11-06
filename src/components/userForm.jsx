import React, { useState } from "react";

export default function UserInfoForm({ onSubmit }) {
  const [form, setForm] = useState({
    name: "",
    card_Number: "",
    turma: "",
    ano_escolar: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.card_Number) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }
    onSubmit(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white shadow-md rounded-2xl p-6 mt-10"
    >
      <h2 className="text-2xl font-bold mb-4 text-center">
        Identificação do Aluno
      </h2>

      <input
        type="text"
        name="name"
        placeholder="Nome completo"
        value={form.name}
        onChange={handleChange}
        className="w-full border p-2 rounded mb-3"
        required
      />

      <input
        type="text"
        name="card_Number"
        placeholder="Número do cartão"
        value={form.card_Number}
        onChange={handleChange}
        className="w-full border p-2 rounded mb-3"
        required
      />

      <input
        type="text"
        name="turma"
        placeholder="Turma"
        value={form.turma}
        onChange={handleChange}
        className="w-full border p-2 rounded mb-3"
      />

      <input
        type="number"
        name="ano_escolar"
        placeholder="Ano"
        value={form.ano_escolar}
        onChange={handleChange}
        className="w-full border p-2 rounded mb-3"
      />

      <button
        type="submit"
        className="bg-pink-600 text-white px-4 py-2 rounded-md w-full hover:bg-pink-700 transition"
      >
        Iniciar Quiz
      </button>
    </form>
  );
}
