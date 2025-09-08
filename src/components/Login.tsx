"use client";

import { useState } from "react";
import password from "../data/password.json";

interface LoginProps {
  onLoginSucess: () => void;
}

export default function Login({ onLoginSucess }: LoginProps) {
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const handleLogin = () => {
    if (senha === password.senhaAcesso) {
      setErro("");
      onLoginSucess(); //Libera acesso a calculadora
    } else {
      setErro("Senha incorreta. tente novamente.")
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-80">
        <h1 className="text-2xl font-bold mb-4 text-center"> bem-vindo à Calculadora S7</h1>

        <input 
          type="password"
          placeholder="Digite a senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          onKeyDown={handleKeyPress}
          className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {erro && <p className="text-red-500 mb-2">{erro}</p>}

        <button 
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Entrar
        </button>
      </div>
    </div>
  )
}