"use client"
import Calculator from "@/components/Calculator";
import Login from "@/components/Login";
import { useState } from "react";

export default function Home() {
  const [acessoLiberado, setAcessoLiberado] = useState(false);

  return (
    <div className="bg-gradient-to-b from-gray-950 via-gray-900 to-black">
      {!acessoLiberado ? (
        <Login onLoginSucess={() => setAcessoLiberado(true)} />
      ) : (
        <Calculator /> 
      )}
    </div>
  );
}
