"use client"
import { CalculatedDoor, DoorData } from "@/utils/types/DoorData";
import { calculateDoorPrice } from "@/utils/CalcPrice";
import { useState } from "react";

// prop onSubmit que o componente pai passa
type DoorDataProps = {
  onSubmit: (door: CalculatedDoor) => void;
};

export default function DoorRegistration({ onSubmit }: DoorDataProps) {
  // setar altura, largura e quantidade
  const [widthDoor, setWidthDoor] = useState(0);
  const [heightDoor, setHeightDoor] = useState(0);
  const [quantityDoor, setQuantityDoor] = useState(0);
  // setar se é lâmina transvision ou não
  const [laminaTransvision, setLaminaTransvision] = useState(false);
  // setar opção com noBreak ou sem noBreak
  const [hasUPS, setHasUPS] = useState<"comNB" | "semNB" | "" >("");
  // setar se é kit para serralheiro ou Porta com Instalação
  const [productType, setProductType] = useState<"kitSerralheiro" | "kitInstalado" | "">("");
  // setar m² da porta
  const [valueM2, setValueM2] = useState(0);

  // Calculo área
  const area = widthDoor * heightDoor ;

  // Função onSubmit
  function handleSubmit() {
    // condicional para não preencher errado
    if (!hasUPS || !productType || widthDoor <= 0 || heightDoor <= 0 || quantityDoor <= 0) {
      alert("Preencha todos os campos obrigatórios!");
      return;
    }
    // monta objeto porta para cálculo
    const door: DoorData = {
      width: widthDoor,
      height: heightDoor,
      quantity: quantityDoor,
      engine: hasUPS,
      productType: productType,
      laminaTransvision: laminaTransvision,
      valueM2: productType === "kitInstalado" && area < 10 ? valueM2 : undefined,
    };

    // calcula preço da porta
    const calculatedDoor = calculateDoorPrice(door);
    // envia porta calculada para o componente pai
    onSubmit(calculatedDoor);

    // resetar campos
    setWidthDoor(0);
    setHeightDoor(0);
    setQuantityDoor(1);
    setHasUPS("");
    setProductType("");
    setValueM2(0);
    setLaminaTransvision(false);
  }

  return (
    <div className="bg-gray-900 text-white p-6 rounded-2xl shadow-md shadow-blue-900/30 max-w-md mx-auto mb-6 border border-blue-800/40">
      <h2 className="text-2xl mb-4 font-semibold text-orange-400 text-center tracking-wide">
        Adicionar Porta
      </h2>

      {/* Largura */}
        <label className="block mb-3">
          <span className="text-sm text-gray-300">Largura (m):</span>
          <input 
            type="number"
            placeholder="Exemplo: 3,24"
            step="0.01"
            min={1}
            value={widthDoor || ""}
            onChange={(e) => setWidthDoor(parseFloat(e.target.value) || 0)}
            className="w-full p-2 mt-1 bg-gray-800 border border-blue-800 rounded text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </label>

        {/* Altura */}
        <label className="block mb-3">
          <span className="text-sm text-gray-300">Altura (m):</span>
          <input
            type="number"
            placeholder="Exemplo: 3,24"
            step="0.01"
            min={1}
            value={heightDoor || ""}
            onChange={(e) => setHeightDoor(parseFloat(e.target.value) || 0)}
            className="w-full p-2 mt-1 bg-gray-800 border border-blue-800 rounded text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </label>

        {/* Lâmina Transvision */}
        <label className="flex items-center gap-2 mb-3 text-sm text-gray-300">
          <input 
            type="checkbox" 
            id="laminaTransvision"
            checked={laminaTransvision}
            onChange={(e) => setLaminaTransvision(e.target.checked)}
            className="w-4 h-4 accent-orange-500"
          />
          Lâmina Transvision
        </label>

        {/* Quantidade */}
        <label className="block mb-3">
          <span className="text-sm text-gray-300">Quantidade:</span>
          <input 
            type="number"
            min={1}
            placeholder="Exemplo: 2"
            value={quantityDoor}
            onChange={(e) => setQuantityDoor(parseInt(e.target.value) || 0)}
            className="w-full p-2 mt-1 bg-gray-800 border border-blue-800 rounded text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </label>

        {/* Tipo de motor */}
        <label className="block mb-3">
          <span className="text-sm text-gray-300">Tipo de motor:</span>
          <select 
            value={hasUPS} 
            onChange={(e) => setHasUPS(e.target.value as "comNB" | "semNB")}
            className="w-full p-2 mt-1 bg-gray-800 border border-blue-800 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Selecione...</option>
            <option value="comNB">Com nobreak</option>
            <option value="semNB">Sem nobreak</option>
          </select>
        </label>

        {/* Tipo de solução */}
        <label className="block mb-3">
          <span className="text-sm text-gray-300">Tipo de solução:</span>
          <select 
            value={productType}
            onChange={(e) => setProductType(e.target.value as "kitSerralheiro" | "kitInstalado")}
            className="w-full p-2 mt-1 bg-gray-800 border border-blue-800 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Selecione...</option>
            <option value="kitSerralheiro">Kit para serralheiro</option>
            <option value="kitInstalado">Kit com Instalação</option>
          </select>
        </label>

        {/* Valor m² se <10m² */}
        {productType === "kitInstalado" && area < 10 && (
          <label className="block mb-3">
            <span className="text-sm text-orange-400">Área do vão menor que 10m², informe novo valor:</span>
            <input 
              type="number"
              min={0}
              step="0.01"
              value={valueM2 || ""}
              onChange={(e) => setValueM2(parseFloat(e.target.value))}
              className="w-full p-2 mt-1 bg-gray-800 border border-orange-500 rounded text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
            />
          </label>
        )}

        {/* Área calculada */}
        {widthDoor > 0 && heightDoor > 0 && (
          <p className="mt-2 text-sm text-gray-400 italic">
            Área calculada: {area.toFixed(2)} m²
          </p>
        )}

        {/* Botão */}
        <button
          onClick={handleSubmit}
          className="mt-5 w-full bg-gradient-to-r from-blue-800 to-orange-600 hover:from-blue-700 hover:to-orange-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all"
        >
          Adicionar Porta
        </button>

    </div>
  )
  
}