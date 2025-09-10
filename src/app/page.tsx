"use client"
import BudgetPreview from "@/components/BudgetPreview";
import Calculator from "@/components/Calculator";
import Login from "@/components/Login";
import { useState } from "react";

export default function Home() {
  const [acessoLiberado, setAcessoLiberado] = useState(false);

  return (
    <div>
      {!acessoLiberado ? (
        <Login onLoginSucess={() => setAcessoLiberado(true)} />
      ) : (
        <Calculator /> 
      )}
    </div>
  );
}
