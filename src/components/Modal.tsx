"use client";
import { ReactNode, useEffect } from "react";

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
}

export default function Modal({ children, onClose }: ModalProps) {
  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center p-2">
      {/* Botão Fechar */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-[60] bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
      >
        Fechar
      </button>

      <div className="bg-white rounded-xl shadow-lg max-h-[95vh] w-full max-w-[90%] overflow-auto p-4">
        {children}
      </div>
    </div>
  );
}
