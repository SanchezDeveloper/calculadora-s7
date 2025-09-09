"use client"
import { useState } from "react";

//prop onSubmit que o componente pai passa
type DoorData = {
  width: number;
  height: number;
  quantity: number;
  engine: "comNB" | "semNB";
  productType: "kitSerralheiro" | "kitInstalado";
  valueM2?: number;
};
type DoorDataProps = {
  onSubmit: (door: DoorData) => void;
};


export default function DoorRegistration({ onSubmit }: DoorDataProps) {
  //setar altura, largura e quantidade
  const [widthDoor, setWidthDoor] = useState(0);
  const [heightDoor, setHeightDoor] = useState(0);
  const [quantityDoor, setQuantityDoor] = useState(1);
  //setar opção com noBreak ou sem noBreak
  const [hasUPS, setHasUPS] = useState<"comNB" | "semNB" | "" >("");
  //setar se é kit para serralheiro ou Porta com Instalação
  const [productType, setProductType] = useState<"kitSerralheiro" | "kitInstalado" | "">("");
  // setar m² da porta
  const [valueM2, setValueM2] = useState(0);


  //Calculo área
  const CalcArea = widthDoor * heightDoor ;

  //Função onSubmit
   function handleSubmit() {
    //condicional para não preencher errado
    if (!hasUPS || !productType || widthDoor <= 0 || heightDoor <= 0 || quantityDoor <= 0) {
      alert("Preencha todos os campos obrigatórios!");
      return;
    }
    const data: DoorData = {
      width: widthDoor,
      height: heightDoor,
      quantity: quantityDoor,
      engine: hasUPS,
      productType: productType,
      valueM2: productType === "kitInstalado" && CalcArea < 10 ? valueM2 : undefined,
    };

    onSubmit(data);

    // resetar campos
    setWidthDoor(0);
    setHeightDoor(0);
    setQuantityDoor(1);
    setHasUPS("");
    setProductType("");
    setValueM2(0);
  }


  return (
    <div className="bg-white p-6 rounded shadow-md max-w-md mx-auto ">
      <h2 className="text-xl font-bold mb-4 text-center">Adicionar Porta</h2>

      {/* escolher largura, altura e quantidade */}
      <label className="block mb-2">
        Altura (m):
        <input
          type="number"
          placeholder="Exemplo: 3,24"
          step="0.01"
          min={1}
          value={heightDoor || ""}
          onChange={(e) => setHeightDoor(parseFloat(e.target.value) || 0)}
          className="w-full p-2 border rounded mt-1"
        />
      </label>

      <label className="block mb-2">
        Largura (m):
        <input 
          type="number"
          placeholder="Exemplo: 3,24"
          step="0.01"
          min={1}
          value={widthDoor || ""}
          onChange={(e) => setWidthDoor(parseFloat(e.target.value) || 0)}
          className="w-full p-2 border rounded mt-1"
        />
      </label>

      <label className="block mb-2">
        Quantidade:
        <input 
          type="number"
          min={1}
          placeholder="Exemplo: 2"
          value={quantityDoor}
          onChange={(e) => setQuantityDoor(parseInt(e.target.value) || 1)}
          className="w-full p-2 border rounded mt-1"
        />
      </label>

      {/* Escolher se tem noBreak ou não */}
      <label className="block mb-2">
        Tipo de motor:
        <select 
          value={hasUPS} 
          onChange={(e) => setHasUPS(e.target.value as "comNB" | "semNB")}
          className="w-full p-2 border rounded mt-1"
        >
          <option value="">Selecione...</option>
          <option value="comNB">Com nobreak</option>
          <option value="semNB">Sem nobreak</option>
        </select>
      </label>

      {/* Escolher se é kit para serralheiro ou kit instalado */}
      <label className="block mb-2">
        Tipo de solução:
        <select 
          value={productType}
          onChange={(e) => setProductType(e.target.value as "kitSerralheiro" | "kitInstalado")}
          className="w-full p-2 border rounded mt-1"
        >
          <option value="">Selecione...</option>
          <option value="kitSerralheiro">Kit para serralheiro</option>
          <option value="kitInstalado">Kit com Instalação</option>
        </select>
      </label>

      {/*  Se o productType for "kitInstalado" e a area for < 10, mostrar um input extra para o usuário digitar o valor do m² manualmente. */}
      {productType === "kitInstalado" && CalcArea < 10 && (
        <label className="block mb-2">
          <span className="text-red-600 opacity-70">Área do vão menor que 10m², digite o novo valor no m2 da porta instalada:</span>
          <input 
            type="number"
            min={0}
            step="0.01"
            value={valueM2 || ""}
            onChange={(e) => setValueM2(parseFloat(e.target.value))}
            className="w-full p-2 border rounded mt-1"
          />
        </label>
      )}

      {/* exibir préviamente área calculada*/}
      {widthDoor > 0 && heightDoor > 0 && (
        <p className="mt-2 text-sm text-gray-600">
          Área calculada: {CalcArea.toFixed(2)} m²
        </p>
      )}

      {/* botão onSubmit*/}
      <button
        onClick={handleSubmit}
        className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
      >
        Adicionar Porta
      </button>

    </div>
  )
  
}