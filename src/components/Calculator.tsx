"use client";
import { useState } from "react";
import DoorRegistration from "../components/DoorRegistration";
import { CalculatedDoor } from "@/utils/types/DoorData";
import BudgetPreview from "./BudgetPreview";

type ExtraProduct = {
  name: string;
  quantity: number;
  unitPrice: number;
  total: number;
};

export default function Calculator() {
  // Estado para portas
  const [doors, setDoors] = useState<CalculatedDoor[]>([]);
  // Estado para produtos extras
  const [extraProducts, setExtraProducts] = useState<ExtraProduct[]>([]);
  // Estado para nome do cliente
  const [clientName, setClientName] = useState("");
  // Estado para abrir/fechar prévia
  const [showPreview, setShowPreview] = useState(false);
  // Estado para desconto
  const [discount, setDiscount] = useState<number>(0);

  // Adiciona porta
  function handleAddDoor(calculatedDoor: CalculatedDoor) {
    setDoors((prev) => [...prev, calculatedDoor]);
  }

  // Remove porta
  function handleRemoveDoor(index: number) {
    setDoors((prev) => prev.filter((_, i) => i !== index));
  }

  // Adiciona produto extra
  function handleAddExtraProduct(product: Omit<ExtraProduct, "total">) {
    const total = product.quantity * product.unitPrice;
    setExtraProducts((prev) => [...prev, { ...product, total }]);
  }

  // Remove produto extra
  function handleRemoveExtraProduct(index: number) {
    setExtraProducts((prev) => prev.filter((_, i) => i !== index));
  }

  // Total geral das portas
  const totalDoors = doors.reduce((acc, door) => acc + door.total, 0);
  // Total geral dos produtos extras
  const totalExtras = extraProducts.reduce((acc, p) => acc + p.total, 0);
  // Total combinado
  const totalGeral = totalDoors + totalExtras;
  // Total com desconto
  const totalComDesconto =
    discount > 0 ? totalGeral - totalGeral * (discount / 100) : totalGeral;

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

      {/* Cadastro de produtos extras */}
      <div className="bg-white p-6 rounded shadow-md max-w-md mx-auto mb-4 flex flex-col justify-center">
        <h2 className="text-xl mb-4 font-medium">Adicionar Outros Produtos</h2>
        <ExtraProductForm onSubmit={handleAddExtraProduct} />
      </div>

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
                  <p>
                    Dimensões: {d.width} x {d.height}
                  </p>
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
        </div>
      )}

      {/* Lista de produtos extras */}
      {extraProducts.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">
            Outros Produtos adicionados:
          </h2>
          <div className="space-y-2">
            {extraProducts.map((p, index) => (
              <div
                key={index}
                className="p-4 border rounded flex justify-between items-start"
              >
                <div>
                  <p>Produto: {p.name}</p>
                  <p>Quantidade: {p.quantity}</p>
                  <p>Valor Unitário: R$ {p.unitPrice.toFixed(2)}</p>
                  <p>Total: R$ {p.total.toFixed(2)}</p>
                </div>

                <button
                  onClick={() => handleRemoveExtraProduct(index)}
                  className="ml-4 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                >
                  Remover
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Totais e desconto */}
      <div className="mt-6 p-4 border-t">
        <div className="font-bold text-lg">
          Total geral: R$ {totalGeral.toFixed(2)}
        </div>
        <div className="mt-4">
          <label className="block mb-1">Desconto (% para pagamento à vista)</label>
          <input
            type="number"
            value={discount}
            onChange={(e) => setDiscount(Number(e.target.value))}
            className="border rounded px-3 py-2 w-24"
            placeholder="0"
          />
        </div>
        {discount > 0 && (
          <div className="mt-2 text-green-700 font-semibold">
            Total com desconto: R$ {totalComDesconto.toFixed(2)}
          </div>
        )}
      </div>

      {/* Botão para abrir prévia */}
      {(doors.length > 0 || extraProducts.length > 0) && (
        <div className="mt-6 text-center">
          <button
            onClick={() => setShowPreview(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded shadow"
          >
            Visualizar Prévia do Orçamento
          </button>
        </div>
      )}

      {/* Prévia em PDF */}
      <BudgetPreview
        doors={doors}
        extraProducts={extraProducts}
        clientName={clientName}
        discount={discount}
        open={showPreview}
        onClose={() => setShowPreview(false)}
      />
    </div>
  );
}

/* -----------------------------
 * Formulário para produtos extras
 * ----------------------------- */
function ExtraProductForm({
  onSubmit,
}: {
  onSubmit: (product: { name: string; quantity: number; unitPrice: number }) => void;
}) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState<number>(1);
  const [unitPrice, setUnitPrice] = useState<number>(0);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || quantity <= 0 || unitPrice <= 0) return;
    onSubmit({ name, quantity, unitPrice });
    setName("");
    setQuantity(1);
    setUnitPrice(0);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div>
        <label className="block mb-1">Produto</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border rounded px-3 py-2 w-full"
          placeholder="Nome do produto"
        />
      </div>
      <div className="flex gap-2">
        <div>
          <label className="block mb-1">Quantidade</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="border rounded px-3 py-2 w-24"
          />
        </div>
        <div>
          <label className="block mb-1">Valor Unitário (R$)</label>
          <input
            type="number"
            value={unitPrice}
            onChange={(e) => setUnitPrice(Number(e.target.value))}
            className="border rounded px-3 py-2 w-32"
            step="0.01"
          />
        </div>
      </div>
      <button
        type="submit"
        className="mt-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
      >
        Adicionar Produto
      </button>
    </form>
  );
}
