"use client";

import { useState } from "react";
import Image from "next/image";
import password from "../data/password.json";

interface LoginProps {
  onLoginSucess: () => void;
}

export default function Login({ onLoginSucess }: LoginProps) {
  // Estado para armazenar a senha digitada
  const [senha, setSenha] = useState("");
  // Estado para mensagem de erro
  const [erro, setErro] = useState("");

  // Função para validar o login
  const handleLogin = () => {
    if (senha === password.senhaAcesso) {
      setErro("");
      onLoginSucess(); // Libera acesso à calculadora
    } else {
      setErro("Senha incorreta. tente novamente.")
    }
  };

  // Permite login ao pressionar Enter
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    // Layout centralizado do formulário de login
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black relative overflow-hidden">

      {/* Efeito sutil de brilho no fundo */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#002b5c20] via-transparent to-[#ff660020] blur-3xl opacity-30"></div>

      <div className="relative bg-gray-900/80 backdrop-blur-sm border border-[#002b5c40] p-8 rounded-xl shadow-lg shadow-black/40 w-90 h-full text-gray-100">
        {/* Logo */}
        <Image 
          src="/assets/logo-s7.png"
          alt="Logo" 
          width={150} 
          height={150} 
          className="mx-auto mb-4 w-24" 
        />
        

        {/* Título */}
        <h1 className="text-2xl font-extrabold mb-6 text-center text-[#ff6600] tracking-wide flex flex-col">
          Bem-vindo a AutoPorta Pro <span className="text-sm text-gray-700">- gerador de orçamento pdf -</span>
        </h1>

        {/* Campo de senha */}
        <input 
          type="password"
          placeholder="Digite a senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          onKeyDown={handleKeyPress}
          className="w-full p-2 bg-gray-800 border border-[#002b5c80] rounded-md mb-4 text-gray-100 placeholder-gray-400 
                    focus:outline-none focus:ring-2 focus:ring-[#ff6600] focus:border-transparent transition-all duration-200"
        />

        {/* Mensagem de erro */}
        {erro && <p className="text-red-500 mb-2 text-sm">{erro}</p>}

        {/* Botão de login */}
        <button 
          onClick={handleLogin}
          className="w-full py-2 rounded-md font-semibold 
                    bg-gradient-to-r from-[#002b5c] to-[#ff6600] text-white 
                    hover:brightness-110 transition-all duration-200 shadow-md shadow-black/40"
        >
          Entrar
        </button>
      </div>
    </div>
  )
}