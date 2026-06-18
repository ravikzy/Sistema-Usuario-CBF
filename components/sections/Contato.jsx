"use client";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faFlickr, faInstagram, faLinkedin, faXTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";

export default function Contato() {
  const [form, setForm] = useState({ nome: "", email: "", mensagem: "" });
  const [enviando, setEnviando] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setEnviando(true);

    const response = await fetch("/api/mensagens", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setEnviando(false);

    if (response.ok) {
      alert("Mensagem enviada com sucesso!");
      setForm({ nome: "", email: "", mensagem: "" });
    } else {
      alert("Erro ao enviar mensagem.");
    }
  }

  const canais = [
    { icon: faEnvelope, label: "Email", valor: "contato@cbf.com.br" },
    { icon: faPhone, label: "Telefone", valor: "(21) 3398-3000" },
    { icon: faLocationDot, label: "Sede", valor: "Rio de Janeiro, RJ" },
  ];

  const redes = [
    { icon: faFacebook, href: "https://www.facebook.com/CBF", label: "Facebook" },
    { icon: faInstagram, href: "https://instagram.com/brasil", label: "Instagram" },
    { icon: faXTwitter, href: "https://twitter.com/CBF_Futebol", label: "X" },
    { icon: faYoutube, href: "https://www.youtube.com/user/CBFSelecao?sub_confirmation=1", label: "YouTube" },
    { icon: faLinkedin, href: "https://www.linkedin.com/company/cbf-futebol", label: "LinkedIn" },
    { icon: faFlickr, href: "https://www.flickr.com/photos/cbf_futebol", label: "Flickr" },
  ];

  return (
    <section id="contato" className="bg-[#1a1a2e] py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-14 text-center">

          <h2 className="mt-5 text-4xl font-extrabold text-white sm:text-5xl">
            Área de comentários
          </h2>
          <p className="mt-3 text-white/50">
            Dúvidas, sugestões ou parcerias
          </p>
        </div>



        <div className="rounded-2xl bg-white p-8 shadow-sm">
          <h3 className="mb-6 text-center text-xl font-bold text-[#1a1a2e]">
            Envie sua mensagem
          </h3>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              required
              type="text"
              name="nome"
              placeholder="Seu nome"
              value={form.nome}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-200 bg-gray-50 p-3 text-[#1a1a2e] placeholder-gray-400 outline-none transition focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/30"
            />
            <input
              required
              type="email"
              name="email"
              placeholder="Seu email"
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-200 bg-gray-50 p-3 text-[#1a1a2e] placeholder-gray-400 outline-none transition focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/30"
            />
            <textarea
              required
              name="mensagem"
              placeholder="Sua mensagem"
              value={form.mensagem}
              onChange={handleChange}
              rows={4}
              className="w-full resize-none rounded-lg border border-gray-200 bg-gray-50 p-3 text-[#1a1a2e] placeholder-gray-400 outline-none transition focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/30"
            />
            <button
              disabled={enviando}
              className="rounded-full bg-yellow-400 py-3 font-bold text-[#1a1a2e] transition hover:bg-yellow-300 disabled:opacity-50"
            >
              {enviando ? "Enviando..." : "Enviar Mensagem"}
            </button>
          </form>
        </div>

        {/* Redes sociais */}
        <div className="mt-8 flex justify-center gap-3">
          {redes.map((r) => (
            <a
              key={r.label}
              href={r.href}
              aria-label={r.label}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/70 transition hover:bg-yellow-400 hover:text-[#1a1a2e]"
            >
              <FontAwesomeIcon icon={r.icon} className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}