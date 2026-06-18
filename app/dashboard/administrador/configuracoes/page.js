"use client";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Link from "next/link";

export default function ConfiguracoesPage() {
  return (
    <div className="p-8">

      <div className="mb-8">

        <h1 className="text-3xl font-black text-[#1a1a2e]">Configurações</h1>
      </div>
      <Breadcrumb pagina="Configurações" />

      <div className="grid md:grid-cols-2 gap-6">

        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
          <p className="text-gray-400 text-xs font-semibold tracking-widest uppercase mb-3">Conta</p>
          <h2 className="text-lg font-black text-[#1a1a2e] mb-2">Administrador</h2>
          <p className="text-gray-500 text-sm mb-6">Gerencie informações da conta administrativa.</p>
          <a href="/dashboard/administrador" className="bg-[#1a1a2e] text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-[#252544] transition">
            Gerenciar
          </a>
        </div>



        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
          <p className="text-gray-400 text-xs font-semibold tracking-widest uppercase mb-3">Versão</p>
          <h2 className="text-lg font-black text-[#1a1a2e] mb-2">Sistema</h2>
          <p className="text-gray-500 text-sm mb-6">Versão atual do sistema instalada.</p>
          <span className="bg-yellow-400/10 border border-yellow-400/20 text-yellow-600 text-xs font-semibold px-4 py-2 rounded-full">
            v1.0.0
          </span>
        </div>



      </div>
    </div>
  );
}