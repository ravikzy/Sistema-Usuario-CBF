"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/sections/Header";
import Link from "next/link";

export default function Login() {
const [form, setForm] = useState({
email: "",
senha: "",
});

const [enviando, setEnviando] = useState(false);
const router = useRouter();

function handleChange(e) {
setForm({
...form,
[e.target.name]: e.target.value,
});
}

async function handleSubmit(e) {
e.preventDefault();
setEnviando(true);


try {
  const response = await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  });

  const data = await response.json();

  setEnviando(false);

  if (response.ok) {
    localStorage.setItem("token", data.token);
    localStorage.setItem(
      "usuario",
      JSON.stringify(data.usuario)
    );

    switch (data.usuario.funcao) {
      case "administrador":
        router.push("/dashboard/administrador");
        break;

      case "tecnico":
        router.push("/dashboard/tecnico");
        break;

      case "atleta":
        router.push("/dashboard/atleta");
        break;

      default:
        router.push("/");
    }
  } else {
    alert(data.error);
  }
} catch (error) {
  setEnviando(false);
  alert("Erro ao realizar login.");
  console.error(error);
}


}

return (
<> <Header />


  <div className="min-h-screen flex items-center justify-center pt-28 px-8 bg-[#f8f8f8]">
    <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">

      <div className="text-center mb-8">


        <h1 className="text-2xl font-black text-[#1a1a2e]">
          Acessar conta
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border border-gray-300 p-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400"
          required
        />

        <input
          type="password"
          name="senha"
          placeholder="Senha"
          value={form.senha}
          onChange={handleChange}
          className="w-full border border-gray-300 p-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400"
          required
        />

        <button
          type="submit"
          disabled={enviando}
          className="bg-[#1a1a2e] text-white w-full py-3 rounded-lg font-semibold hover:bg-[#252544] transition disabled:opacity-50"
        >
          {enviando
            ? "Entrando..."
            : "Entrar"}
        </button>
      </form>

      <p className="text-center text-sm text-gray-500 mt-6">
        Não tem conta?{" "}
        <Link
          href="/cadastro"
          className="text-yellow-600 font-semibold hover:underline"
        >
          Cadastre-se
        </Link>
      </p>

    </div>
  </div>
</>

);
}
