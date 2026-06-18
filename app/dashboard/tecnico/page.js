"use client";

import { useEffect, useState } from "react";
import Breadcrumb from "@/components/ui/Breadcrumb";

export default function DashboardTecnico() {
  const [atletas, setAtletas] = useState([]);
  const [tecnicos, setTecnicos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [aba, setAba] = useState("atletas");
  const [editando, setEditando] = useState(null);
  const [form, setForm] = useState({});
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    carregar();
  }, []);

  async function carregar() {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    const headers = { Authorization: `Bearer ${token}` };

    const [a, t] = await Promise.all([
      fetch("/api/atleta", { headers }).then(r => r.json()),
      fetch("/api/tecnico", { headers }).then(r => r.json()),
    ]);

    setAtletas(Array.isArray(a) ? a : []);
    setTecnicos(Array.isArray(t) ? t : []);
    setLoading(false);
  }

  function abrirEdicao(atleta) {
    setEditando(atleta.id);
    setForm({ nome: atleta.nome, email: atleta.email, posicao: atleta.posicao, altura: atleta.altura, peso: atleta.peso });
  }

  async function salvarEdicao() {
    setSalvando(true);
    const token = localStorage.getItem("token");

    const response = await fetch("/api/atleta", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id: editando, ...form }),
    });

    setSalvando(false);
    if (response.ok) {
      setEditando(null);
      carregar();
    } else {
      alert("Erro ao salvar. Verifique suas permissões.");
    }
  }

  if (loading) {
    return (
      <div className="p-8 space-y-4">
        <div className="h-8 w-64 bg-gray-200 rounded animate-pulse" />
        <div className="grid grid-cols-2 gap-4">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="h-28 bg-gray-100 rounded-2xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  const inputClass = "w-full border border-gray-200 rounded-lg p-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400 transition";

  return (
    <div className="p-8 space-y-8">

      <div>

        <h1 className="text-3xl font-black text-[#1a1a2e]">Dashboard</h1>
        <p className="text-gray-400 mt-1 text-sm">Visualize e edite as informações dos atletas.</p>
      </div>

      <Breadcrumb pagina="Dashboard" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
        <p className="text-gray-400 text-xs font-semibold tracking-widest uppercase mb-4">Navegação</p>
        <div className="flex gap-2">
          {["atletas", "tecnicos"].map((tab) => (
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
                <th className="text-left p-4 text-gray-400 text-xs font-semibold tracking-widest uppercase">Ações</th>
              </tr>
            </thead>
            <tbody>
              {atletas.map((a) => (
                <>
                  <tr key={a.id} className="border-t border-gray-50 hover:bg-gray-50 transition">
                    <td className="p-4 font-medium text-[#1a1a2e]">{a.nome}</td>
                    <td className="p-4">
                      <span className="bg-green-100 text-green-700 border border-green-200 px-3 py-1 rounded-full text-xs font-semibold">
                        {a.posicao || "—"}
                      </span>
                    </td>
                    <td className="p-4 text-gray-500 text-sm">{a.altura ? `${a.altura}m` : "—"}</td>
                    <td className="p-4 text-gray-500 text-sm">{a.peso ? `${a.peso}kg` : "—"}</td>
                    <td className="p-4">
                      <button
                        onClick={() => abrirEdicao(a)}
                        className="bg-[#1a1a2e] text-white px-4 py-1.5 rounded-full text-xs font-semibold hover:bg-[#252544] transition"
                      >
                        Editar
                      </button>
                    </td>
                  </tr>
                  {editando === a.id && (
                    <tr key={`edit-${a.id}`} className="bg-yellow-50 border-t border-yellow-100">
                      <td colSpan={5} className="p-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                          <div>
                            <label className="text-xs text-gray-500 font-semibold mb-1 block">Nome</label>
                            <input className={inputClass} value={form.nome} onChange={e => setForm({...form, nome: e.target.value})} />
                          </div>
                          <div>
                            <label className="text-xs text-gray-500 font-semibold mb-1 block">Posição</label>
                            <input className={inputClass} value={form.posicao} onChange={e => setForm({...form, posicao: e.target.value})} />
                          </div>
                          <div>
                            <label className="text-xs text-gray-500 font-semibold mb-1 block">Altura (m)</label>
                            <input type="number" step="0.01" className={inputClass} value={form.altura} onChange={e => setForm({...form, altura: e.target.value})} />
                          </div>
                          <div>
                            <label className="text-xs text-gray-500 font-semibold mb-1 block">Peso (kg)</label>
                            <input type="number" className={inputClass} value={form.peso} onChange={e => setForm({...form, peso: e.target.value})} />
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={salvarEdicao} disabled={salvando} className="bg-green-600 text-white px-5 py-2 rounded-full text-xs font-semibold hover:bg-green-700 transition disabled:opacity-50">
                            {salvando ? "Salvando..." : "Salvar"}
                          </button>
                          <button onClick={() => setEditando(null)} className="bg-gray-100 text-gray-500 px-5 py-2 rounded-full text-xs font-semibold hover:bg-gray-200 transition">
                            Cancelar
                          </button>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
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