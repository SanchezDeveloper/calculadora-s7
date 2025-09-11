"use client";
import { useState } from "react";
import DoorRegistration from "../components/DoorRegistration";
import { CalculatedDoor } from "@/utils/types/DoorData";
import BudgetPreview from "./BudgetPreview";

export default function Calculator() {
  const [doors, setDoors] = useState<CalculatedDoor[]>([]);
  const [clientName, setClientName] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  // Adiciona porta
  function handleAddDoor(calculatedDoor: CalculatedDoor) {
    setDoors((prev) => [...prev, calculatedDoor]);
  }

  // Remove porta
  function handleRemoveDoor(index: number) {
    setDoors((prev) => prev.filter((_, i) => i !== index));
  }

  const totalGeral = doors.reduce((acc, door) => acc + door.total, 0);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {/* Título */}
      <div className="text-center mx-auto py-6 w-full">
        <h1 className="text-2xl font-bold text-blue-700">Dados do Orçamento</h1>
      </div>

      {/* Nome do Cliente */}
      <div className="bg-white p-6 rounded shadow-md max-w-md mx-auto mb-4 flex flex-col justify-center">
        <h2 className="text-xl mb-4 font-medium">Informações do Cliente</h2>
        <div className="w-full max-w-md">
          <label className="block mb-1" htmlFor="clientName">
            Nome:
          </label>
          <input
            id="clientName"
            type="text"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            className="border rounded px-3 py-2 w-full"
            placeholder="Digite o nome do cliente"
          />
        </div>
      </div>

      {/* Cadastro de portas */}
      <DoorRegistration onSubmit={handleAddDoor} />

      {/* Lista de portas */}
      {doors.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Portas adicionadas:</h2>
          <div className="space-y-2">
            {doors.map((d, index) => (
              <div
                key={index}
                className="p-4 border rounded flex justify-between items-start"
              >
                <div>
                  <p>Tipo: {d.productType}</p>
                  <p>Dimensões: {d.width} x {d.height}</p>
                  <p>Quantidade: {d.quantity}</p>
                  <p>Área: {d.area.toFixed(2)} m²</p>
                  <p>Total: R$ {d.total.toFixed(2)}</p>
                  {d.productType === "kitSerralheiro" && (
                    <>
                      <p>Motor: {d.motor}</p>
                      <p>Preço do motor: R$ {d.motorPrice}</p>
                      <p>Peso estimado: {d.pesoMotor}</p>
                    </>
                  )}
                </div>

                <button
                  onClick={() => handleRemoveDoor(index)}
                  className="ml-4 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                >
                  Remover
                </button>
              </div>
            ))}
          </div>

          {/* Total geral */}
          <div className="mt-4 p-4 border-t font-bold text-lg">
            Total geral: R$ {totalGeral.toFixed(2)}
          </div>

          {/* Botão para abrir modal de prévia */}
          <div className="mt-6 text-center">
            <button
              onClick={() => setShowPreview(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded shadow"
            >
              Visualizar Prévia do Orçamento
            </button>
          </div>
        </div>
      )}

      {/* Modal de prévia com PDF (direto) */}
      <BudgetPreview
        doors={doors}
        clientName={clientName}
        open={showPreview}
        onClose={() => setShowPreview(false)}
      />
    </div>
  );
}
