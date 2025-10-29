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
  attachedToDoor?: number; // Índice da porta à qual o produto extra está anexado (opcional)
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
  function handleAddExtraProduct(product: { name: string; quantity: number; unitPrice: number; attachedToDoorIndex?: number }) {
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
        <ExtraProductForm onSubmit={handleAddExtraProduct} doors={doors} />
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
                  <p><span className=" font-bold">Tipo:</span>  
                    {d.productType === "kitSerralheiro" ? " Kit Serralheiro" : " Kit Instalado"} - {d.laminaTransvision ? "Lâmina Transvision" : "Lâmina Tradicional"}
                  </p>
                  <p>
                    <span className=" font-bold">Dimensões:</span> {d.width} x {d.height}
                  </p>
                  <p><span className=" font-bold">Quantidade:</span> {d.quantity}</p>
                  <p><span className=" font-bold">Área:</span> {d.area.toFixed(2)} m²</p>
                  <p><span className=" font-bold">Motor:</span> {d.motor}</p>
                  <p><span className=" font-bold">Valor do motor:</span> R$ {d.motorPrice}</p>
                  <p><span className=" font-bold">Peso Estimado:</span> {d.pesoMotor.toFixed(2)}Kg</p>
                  <p><span className=" font-bold">Total: </span> R$ {d.total.toFixed(2)}</p>
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
            {window.innerWidth >= 768
              ? "Visualizar e Baixar Orçamento (PDF)"
              : "Baixar Orçamento (PDF)"}
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
  doors,
}: {
  onSubmit: (product: { name: string; quantity: number; unitPrice: number; attachedToDoorIndex?: number }) => void;
  doors: CalculatedDoor[];
}) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState<number>(1);
  const [unitPrice, setUnitPrice] = useState<number>(0);
  const [attachedTo, setAttachedTo] = useState<string>("general"); // "general" ou índice string

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || quantity <= 0 || unitPrice <= 0) return;

    const attachedToDoorIndex =
      attachedTo === "general" ? undefined : Number(attachedTo);

    onSubmit({ name, quantity, unitPrice, attachedToDoorIndex });
    setName("");
    setQuantity(1);
    setUnitPrice(0);
    setAttachedTo("general");
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

      <div>
        <label className="block mb-1">Associar a porta (opcional)</label>
        <select
          value={attachedTo}
          onChange={(e) => setAttachedTo(e.target.value)}
          className="border rounded px-3 py-2 w-full"
        >
          <option value="general">Orçamento geral / sem associação</option>
          {doors.map((d, idx) => (
            <option key={idx} value={String(idx)}>
              {`Porta ${idx + 1} — ${d.productType} — ${d.width}x${d.height}`}
            </option>
          ))}
        </select>
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
