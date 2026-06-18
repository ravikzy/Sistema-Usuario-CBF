"use client";

import { useEffect, useState } from "react";
import Breadcrumb from "@/components/ui/Breadcrumb";

export default function DashboardAtleta() {
  const [atletas, setAtletas] = useState([]);
  const [tecnicos, setTecnicos] = useState([]);
  const [treinos, setTreinos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [aba, setAba] = useState("atletas");

  useEffect(() => {
    async function carregar() {
      const token = localStorage.getItem("token");

      if (!token) {
        window.location.href = "/login";
        return;
      }

      const headers = { Authorization: `Bearer ${token}` };

      const [a, t, tr] = await Promise.all([
        fetch("/api/atleta", { headers }).then(r => r.json()),
        fetch("/api/tecnico", { headers }).then(r => r.json()),
        fetch("/api/treino").then(r => r.json()),
      ]);

      setAtletas(Array.isArray(a) ? a : []);
      setTecnicos(Array.isArray(t) ? t : []);
      setTreinos(Array.isArray(tr) ? tr : []);
      setLoading(false);
    }

    carregar();
  }, []);

  if (loading) {
    return (
      <div className="p-8 space-y-4">
        <div className="h-8 w-64 bg-gray-200 rounded animate-pulse" />
        <div className="grid grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-28 bg-gray-100 rounded-2xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8">

      <div>

        <h1 className="text-3xl font-black text-[#1a1a2e]">Dashboard</h1>
        <p className="text-gray-400 mt-1 text-sm">Consulte o elenco e a programação de treinos.</p>
      </div>

      <Breadcrumb pagina="Dashboard" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
          <p className="text-gray-400 text-xs font-semibold tracking-widest uppercase mb-2">Atletas</p>
          <p className="text-4xl font-black text-green-600">{atletas.length}</p>
          <p className="text-xs text-gray-400 mt-1">No elenco</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
          <p className="text-gray-400 text-xs font-semibold tracking-widest uppercase mb-2">Técnicos</p>
          <p className="text-4xl font-black text-yellow-500">{tecnicos.length}</p>
          <p className="text-xs text-gray-400 mt-1">Comissão técnica</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
          <p className="text-gray-400 text-xs font-semibold tracking-widest uppercase mb-2">Treinos</p>
          <p className="text-4xl font-black text-blue-600">{treinos.length}</p>
          <p className="text-xs text-gray-400 mt-1">Programados</p>
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
        <p className="text-gray-400 text-xs font-semibold tracking-widest uppercase mb-4">Navegação</p>
        <div className="flex gap-2">
          {["atletas", "tecnicos", "treinos"].map((tab) => (
            <button
              key={tab}
              onClick={() => setAba(tab)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition capitalize ${
                aba === tab
                  ? "bg-[#1a1a2e] text-white"
                  : "bg-white border border-gray-200 text-gray-500 hover:border-gray-300"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      

      {aba === "atletas" && (
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left p-4 text-gray-400 text-xs font-semibold tracking-widest uppercase">Nome</th>
                <th className="text-left p-4 text-gray-400 text-xs font-semibold tracking-widest uppercase">Posição</th>
                <th className="text-left p-4 text-gray-400 text-xs font-semibold tracking-widest uppercase">Altura</th>
                <th className="text-left p-4 text-gray-400 text-xs font-semibold tracking-widest uppercase">Peso</th>
              </tr>
            </thead>
            <tbody>
              {atletas.map((a) => (
                <tr key={a.id} className="border-t border-gray-50 hover:bg-gray-50 transition">
                  <td className="p-4 font-medium text-[#1a1a2e]">{a.nome}</td>
                  <td className="p-4">
                    <span className="bg-green-100 text-green-700 border border-green-200 px-3 py-1 rounded-full text-xs font-semibold">
                      {a.posicao || "—"}
                    </span>
                  </td>
                  <td className="p-4 text-gray-500 text-sm">{a.altura ? `${a.altura}m` : "—"}</td>
                  <td className="p-4 text-gray-500 text-sm">{a.peso ? `${a.peso}kg` : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {aba === "tecnicos" && (
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left p-4 text-gray-400 text-xs font-semibold tracking-widest uppercase">Nome</th>
                <th className="text-left p-4 text-gray-400 text-xs font-semibold tracking-widest uppercase">Email</th>
              </tr>
            </thead>
            <tbody>
              {tecnicos.map((t) => (
                <tr key={t.id} className="border-t border-gray-50 hover:bg-gray-50 transition">
                  <td className="p-4 font-medium text-[#1a1a2e]">{t.nome}</td>
                  <td className="p-4 text-gray-500 text-sm">{t.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {aba === "treinos" && (
        <div className="grid md:grid-cols-2 gap-4">
          {treinos.map((t) => (
            <div key={t.id} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-black text-[#1a1a2e]">{t.titulo}</h3>
                <span className="bg-yellow-400/10 border border-yellow-400/20 text-yellow-600 text-xs font-semibold px-3 py-1 rounded-full">
                  {t.tipo}
                </span>
              </div>
              <p className="text-gray-500 text-sm mb-4">{t.descricao}</p>
              <div className="flex gap-4 text-xs text-gray-400">
                <span>{new Date(t.data_treino).toLocaleDateString("pt-BR")}</span>
                <span>{t.horario}</span>
                <span>{t.local}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="text-right">
        <button
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("usuario");
            window.location.href = "/login";
          }}
          className="text-sm text-gray-400 hover:text-red-500 transition font-semibold"
        >
          Sair da conta
        </button>
      </div>

    </div>
  );
}