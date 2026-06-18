"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Image from "next/image";


export default function Header() {
  const pathname = usePathname();
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <div className="bg-green-600 h-1 w-full" />

      <div className="bg-[#1a1a2e] border-b border-yellow-400/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center py-3">


            <Link href="/" className="flex items-center gap-3 group">
              <Image
                src="/logobrasil.png"
                alt="CBF Logo"
                width={75}
                height={75}
                className="group-hover:scale-105 transition"
              />
              <div>
                <p className="text-yellow-400 font-black text-lg leading-tight tracking-wide">
                  SELEÇÃO BRASILEIRA
                </p>
                <p className="text-white/70 text-xs tracking-widest uppercase">
                  Confederação Brasileira de Futebol
                </p>
              </div>
            </Link>

            <nav className="flex gap-3 items-center">
              <Link
                href="/login"
                className={` px-5 py-2 rounded-full text-sm font-semibold transition-all border ${pathname === "/login"
                    ? "bg-yellow-400 text-[#1a1a2e] border-yellow-400"
                    : "bg-transparent text-white border-white/30 hover:border-yellow-400 hover:text-yellow-400"
                  }`}
              >
                Login
              </Link>


            </nav>

          </div>
        </div>
      </div>

      <div className="bg-yellow-400 h-[2px] w-full" />
    </header>
  );
}