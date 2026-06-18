"use client";

import { useState } from "react";
import Header from "@/components/sections/Header";
import Link from "next/link";
import { temPermissao } from "@/lib/auth";


export default function Cadastro() {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
    posicao: "",
    altura: "",
    peso: "",
  });
  const [enviando, setEnviando] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setEnviando(true);

    const response = await fetch("/api/atleta", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, tipoUsuario: "atleta" }),
    });

    const data = await response.json();
    setEnviando(false);

    if (response.ok) {
      alert("Cadastro realizado com sucesso!");
      setForm({ nome: "", email: "", senha: "", posicao: "", altura: "", peso: "" });
    } else {
      alert(data.error || "Erro ao cadastrar");
    }
  }

  return (
    <>
      <Header />

      <div className="min-h-screen flex items-center justify-center pt-28 px-8 bg-[#f8f8f8]">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">

          <div className="text-center mb-8">

            <h1 className="text-2xl font-black text-[#1a1a2e]">
              Cadastrar atleta
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              required
              type="text"
              name="nome"
              placeholder="Nome completo"
              value={form.nome}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400"
            />

            <input
              required
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400"
            />

            <input
              required
              type="password"
              name="senha"
              placeholder="Senha"
              value={form.senha}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400"
            />

            <div className="grid grid-cols-3 gap-3">
              <input
                required
                type="text"
                name="posicao"
                placeholder="Posição"
                value={form.posicao}
                onChange={handleChange}
                className="col-span-1 border border-gray-300 p-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400"
              />
              <input
                required
                type="number"
                step="0.01"
                name="altura"
                placeholder="Altura (m)"
                value={form.altura}
                onChange={handleChange}
                className="col-span-1 border border-gray-300 p-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400"
              />
              <input
                required
                type="number"
                step="0.01"
                name="peso"
                placeholder="Peso (kg)"
                value={form.peso}
                onChange={handleChange}
                className="col-span-1 border border-gray-300 p-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400"
              />
            </div>

            <button
              type="submit"
              disabled={enviando}
              className="bg-[#1a1a2e] text-white w-full py-3 rounded-lg font-semibold hover:bg-[#252544] transition disabled:opacity-50"
            >
              {enviando ? "Cadastrando..." : "Cadastrar"}
            </button>

          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Já tem conta?{" "}
            <Link href="/login" className="text-yellow-600 font-semibold hover:underline">
              Fazer login
            </Link>
          </p>

        </div>
      </div>
    </>
  );
}