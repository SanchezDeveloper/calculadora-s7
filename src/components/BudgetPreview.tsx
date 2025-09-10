"use cliente"

import { useState, useRef, useEffect } from "react";
import company from "../data/company.json";
import { CalculatedDoor } from "@/utils/types/DoorData";
import Image from "next/image";

interface BudgetPreviewProps {
  doors: CalculatedDoor[];
}

export default function BudgetPreview({doors}: BudgetPreviewProps){
  // Referência para a folha A4
  const a4Ref = useRef<HTMLDivElement>(null);

  // Estado para escala do conteúdo (zoom responsivo)
  const [scale, setScale] = useState(1);

  // Estado para nome do cliente
  const [clientName, setClientName] = useState("");

  // Atualiza o scale conforme a largura da folha muda
  useEffect(() => {
    function handleResize() {
      if (a4Ref.current) {
        const folhaLargura = a4Ref.current.offsetWidth;
        const baseLargura = 794; // largura padrão A4 em px
        setScale(folhaLargura / baseLargura);
      }
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Soma total dos produtos
  const totalGeral = doors.reduce((acc, d) => acc + d.total, 0);

  // Data atual formatada
  const dataHoje = new Date().toLocaleDateString("pt-BR");

  return (
    // Folha A4 com proporção fixa
    <div className="a4 mx-auto" ref={a4Ref}>
      {/* Conteúdo da folha, escala dinâmica */}
      <div
        style={{
          width: 794,
          height: 1123,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
        className=" p-6 bg-white rounded-lg aspect-[210/297]"
      >
        {/* Cabeçalho com logo e dados da empresa */}
        <header className="flex items-center gap-4 border-b pb-4 mb-6">
          {company.logo && (
            <Image src={company.logo} alt="Logo" width={180} height={60} />
          )}
            <div>
              <h1 className="text-2xl font-bold">{company.name}</h1>
              <p className="text-sm text-gray-600">CNPJ: {company.cnpj}</p>
            </div>
        </header>

        {/* Dados do cliente e data */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <label className="block text-sm font-medium mb-1">Cliente:</label>
            <input 
              type="text"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="border p-2 rounded w-64"
              placeholder="Nome do cliente"
            />
          </div>
          <p className="text-sm text-gray-600">Data: {dataHoje}</p>
        </div>

        {/* Tabela de produtos */}
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="border p-2">Produto</th>
              <th className="border p-2">Quantidade</th>
              <th className="border p-2">Valor Unitário (R$)</th>
              <th className="border p-2">Valor Total (R$)</th>
            </tr>
          </thead>
          <tbody>
            {doors.map((d, idx) => (
              <tr key={idx}>
                <td className="border p-2 capitalize">{d.productType}</td>
                <td className="border p-2">{d.quantity}</td>
                <td className="border p-2">{(d.total / d.quantity).toFixed(2)}</td>
                <td className="border p-2">{d.total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Total geral */}
        <div className="mt-4 text-right font-bold text-lg">
          Total do Orçamento: R$ {totalGeral.toFixed(2)}
        </div>
      </div>
    </div>
  );
}