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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative max-w-full max-h-full overflow-auto p-4">
        {/* Botão Fechar */}
        <button
          onClick={onClose}
          className="absolute top-10 right-16 z-[60] bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
        >
          Fechar
        </button>
        <div className="text-sm text-gray-600">
          {children}
        </div>
      </div>
    </div>
  )
}