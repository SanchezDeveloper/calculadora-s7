"use cliente"

import { useState } from "react";
import company from "../data/company.json";
import { CalculatedDoor } from "@/utils/types/DoorData";

interface BudgetPreviewProps {
  doors: CalculatedDoor[];
}
export default function BudgetPreview({doors}: BudgetPreviewProps){
  const [clientName, setClientName] = useState("");

  const totalGeral = doors.reduce((acc, d) => acc + d.total, 0);
  const dataHoje = new Date().toLocaleDateString("pt-BR");

  return (
    <div className="p-6 bg-white shadow rounded-lg">
      {/* Cabeçalho */}
      <header className="flex items-center gap-4 border-b pb-4 mb-6">
        {company.logo && (
          <img src={company.logo} alt="Logo" className="w-16 h-16 object-contain" />
        )}
          <div>
            <h1 className="text-2xl font-bold">{company.name}</h1>
            <p className="text-sm text-gray-600">CNPJ: {company.cnpj}</p>
            
          </div>
          
      </header>

      {/* Dados cliente + data */}
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
  );
}