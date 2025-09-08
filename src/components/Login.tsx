"use client";

import { useState } from "react";
import senha from "../data/password.json";

interface LoginProps {
  onLoginSucess: () => void;
}

export default function Login({ onLoginSucess }: LoginProps) {
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const handleLogin = ()=> {
    if (senha === pass.senhaAcesso)
  }
}