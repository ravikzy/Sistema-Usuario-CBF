"use client";
import { useEffect, useState } from "react";

export default function About() {
  const [stats, setStats] = useState({ atletas: 0, tecnicos: 0 });

  useEffect(() => {
    async function carregarStats() {
      const response = await fetch("/api/stats");
      const data = await response.json();
      setStats(data);
    }
    carregarStats();
  }, []);

  const patrocinadores = ["NIKE", "VOLKSWAGEN", "SADIA", "AMAZON", "CAIXA", "ITAÚ"];

  return (
    <section id="sobre" className="bg-[#1a1a2e] py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>


            <h2 className="mt-5 text-4xl font-extrabold leading-tight text-white sm:text-5xl">
              O coração do <br />
              <span className="text-yellow-400">futebol brasileiro</span>
            </h2>

            <p className="mt-6 text-base leading-relaxed text-white/60">
              A Confederação Brasileira de Futebol é o órgão máximo do futebol no Brasil,
              responsável por organizar, desenvolver e promover o esporte em todo o território nacional.
            </p>

            <p className="mt-4 text-base leading-relaxed text-white/60">
              Este sistema centraliza a gestão dos atletas e da comissão técnica da Seleção Brasileira,
              garantindo controle e transparência nas operações.
            </p>
          </div>

          {/* Direita — stat cards brancos, mesmo padrão do dashboard */}
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                Atletas
              </p>
              <p className="mt-2 text-4xl font-extrabold text-[#1a1a2e]">
                {stats.atletas}
              </p>
              <p className="mt-1 text-sm text-gray-500">na Seleção</p>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                Técnicos
              </p>
              <p className="mt-2 text-4xl font-extrabold text-[#1a1a2e]">
                {stats.tecnicos}
              </p>
              <p className="mt-1 text-sm text-gray-500">registrados</p>
            </div>

            <div className="col-span-2 rounded-2xl bg-yellow-400 p-6">
              <p className="text-sm font-bold uppercase tracking-wider text-[#1a1a2e]/70">
                Gestão centralizada
              </p>
              <p className="mt-1 text-base font-semibold text-[#1a1a2e]">
                Cadastro, auditoria e acompanhamento em um só lugar.
              </p>
            </div>
          </div>
        </div>

        {/* Faixa de patrocinadores */}
        <div className="mt-20 border-t border-white/10 pt-10">
          <p className="mb-6 text-center text-xs font-semibold uppercase tracking-wider text-white/40">
            Patrocinadores oficiais
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {patrocinadores.map((nome) => (
              <span
                key={nome}
                className="text-lg font-extrabold tracking-tight text-white/40 transition hover:text-white/80"
              >
                {nome}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 