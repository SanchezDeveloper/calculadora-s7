"use client";
import { useEffect, useState } from "react";
import DoorRegistration from "../components/DoorRegistration";
import { CalculatedDoor } from "@/utils/types/DoorData";
import BudgetPreview from "./BudgetPreview";
import Modal from "./Modal";

export default function Calculator() {
  const [doors, setDoors] = useState<CalculatedDoor[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  const [scale, setScale] = useState(1);

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

  // Escala automática da folha a4
  useEffect(() => {
    function updateScale() {
      const screenWidth = window.innerWidth * 0.9;
      const screenHeight = window.innerHeight * 0.9;
      const a4Width = 210;
      const a4Height = 297;
      const dpi = 3.78;

      const pxWidth = a4Width * dpi;
      const pxHeight = a4Height * dpi;

      const scaleW = screenWidth / pxWidth;
      const scaleH = screenHeight / pxHeight;

      setScale(Math.min(scaleW, scaleH));
    }

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize",updateScale);
  }, []);


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

          {/* Botão para abrir prévia */}
          <div className="mt-6 text-center">
            <button
              onClick={() => setShowPreview(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded shadow"
            >
              Vizualizar Prévia do Orçamento
            </button>
          </div>
        </div>
      )}

      {/* Prévia em formato A4 e em modal*/}
      {showPreview && (
        <Modal onClose={() => setShowPreview(false)}>
          <div
            className="a4"
            style={{
              transform: `scale(${scale})`,
            }}
          >
            <BudgetPreview doors={doors} />
          </div>
        </Modal> 
      )}
    </div>
  );
}