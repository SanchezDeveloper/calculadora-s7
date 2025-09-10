"use client" 
import { ReactNode, useEffect } from "react";

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
}

export default function Modal({ children, onClose}: ModalProps) {
  // Travar scroll do body quando modal estiver aberto
  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  return(
    <div className="fixed inset-0 z-50 max-h-[100vh] bg-black/50 flex justify-center items-center">
      {/* Botão Fechar */}
      <button
        onClick={onClose}
        className="absolute top-10 right-16 z-[60] bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
      >
        Fechar
      </button>
      
      {children}
      
    </div>
  )
}