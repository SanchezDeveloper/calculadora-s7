"use client";
import { useState } from "react";
import DoorRegistration from "../components/DoorRegistration";
import { CalculatedDoor } from "@/utils/types/DoorData";

export default function Calculator() {
  const [doors, setDoors] = useState<CalculatedDoor[]>([]);

  // Adiciona porta à lista
  function handleAddDoor(calculatedDoor: CalculatedDoor) {
    setDoors((prev) => [...prev, calculatedDoor]);
  }

  // Remove porta da lista
  function handleRemoveDoor(index: number) {
    setDoors((prev) => prev.filter((_, i) => i !== index));
  }

  // Total geral
  const totalGeral = doors.reduce((acc, door) => acc + door.total, 0);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Calculadora de Portas</h1>

      {/* Formulário para adicionar porta */}
      <DoorRegistration onSubmit={handleAddDoor} />

      {/* Lista de portas adicionadas */}
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
        </div>
      )}
    </div>
  );
}