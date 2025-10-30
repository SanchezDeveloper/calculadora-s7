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
        <h1 className="text-4xl font-bold text-gray-100">Dados do Orçamento</h1>
      </div>

      {/* Nome do Cliente */}
      <div className="bg-gray-900 text-gray-300 p-6 rounded-2xl shadow-lg shadow-blue-900/40 max-w-md mx-auto mb-6 border border-gray-500/10">
        <h2 className="text-2xl mb-4 font-semibold text-center text-orange-400 tracking-wide">
          Informações do Cliente
        </h2>
        <div className="w-full max-w-md">
          <label className="block mb-1" htmlFor="clientName">
            Nome:
          </label>
          <input
            id="clientName"
            type="text"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            className="w-full px-3 py-2 rounded bg-gray-800 border border-blue-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
            placeholder="Digite o nome do cliente"
          />
        </div>
      </div>

      {/* Cadastro de portas */}
      <DoorRegistration onSubmit={handleAddDoor} />

      {/* Cadastro de produtos extras */}
      <div className="bg-gray-900 text-white p-6 rounded-2xl shadow-md shadow-blue-900/30 max-w-3xl mx-auto mb-6 border border-blue-800/40">
        <h2 className="text-2xl mb-4 font-semibold text-orange-400 text-center tracking-wide">
          Adicionar Outros Produtos
        </h2>

        <div className="mt-2">
          <ExtraProductForm onSubmit={handleAddExtraProduct} doors={doors} />
        </div>
      </div>

      {/* Lista de portas */}
      {doors.length > 0 && (
        <div className="mt-8 max-w-4xl mx-auto bg-gray-950 p-6 rounded-2xl border border-blue-900/30 shadow-md shadow-blue-800/20">
          <h2 className="text-2xl font-semibold text-orange-400 mb-4 text-center">
            Portas Adicionadas
          </h2>

          <div className="space-y-4">
            {doors.map((d, index) => (
              <div
                key={index}
                className="bg-gray-800 p-4 rounded-xl border border-gray-700 flex justify-between items-start hover:border-blue-700 transition-all"
              >
                <div className="text-sm space-y-1">
                  <p><span className="font-bold text-blue-400">Tipo:</span> {d.productType === "kitSerralheiro" ? "Kit Serralheiro" : "Kit Instalado"} - {d.laminaTransvision ? "Lâmina Transvision" : "Lâmina Tradicional"}</p>
                  <p><span className="font-bold text-blue-400">Dimensões:</span> {d.width}m × {d.height}m</p>
                  <p><span className="font-bold text-blue-400">Quantidade:</span> {d.quantity}</p>
                  <p><span className="font-bold text-blue-400">Área:</span> {d.area.toFixed(2)} m²</p>
                  <p><span className="font-bold text-blue-400">Motor:</span> {d.motor}</p>
                  <p><span className="font-bold text-blue-400">Valor do Motor:</span> R$ {d.motorPrice}</p>
                  <p><span className="font-bold text-blue-400">Peso Estimado:</span> {d.pesoMotor.toFixed(2)} kg</p>
                  <p className="font-bold text-orange-400 text-lg mt-2">Total: R$ {d.total.toFixed(2)}</p>
                </div>

                <button
                  onClick={() => handleRemoveDoor(index)}
                  className="ml-4 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition-colors"
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
        <div className="mt-8 max-w-3xl mx-auto bg-gray-950 p-6 rounded-2xl border border-orange-700/40 shadow-md shadow-orange-900/30">
          <h2 className="text-2xl font-semibold text-orange-400 mb-4 text-center">
            Outros Produtos Adicionados
          </h2>

          <div className="space-y-4">
            {extraProducts.map((p, index) => (
              <div
                key={index}
                className="bg-gray-800 p-4 rounded-xl border border-gray-700 flex justify-between items-start hover:border-orange-600 transition-all"
              >
                <div className="text-sm space-y-1">
                  <p><span className="font-bold text-blue-400">Produto:</span> {p.name}</p>
                  <p><span className="font-bold text-blue-400">Quantidade:</span> {p.quantity}</p>
                  <p><span className="font-bold text-blue-400">Valor Unitário:</span> R$ {p.unitPrice.toFixed(2)}</p>
                  <p className="font-bold text-orange-400 text-lg mt-2">Total: R$ {p.total.toFixed(2)}</p>
                </div>

                <button
                  onClick={() => handleRemoveExtraProduct(index)}
                  className="ml-4 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition-colors"
                >
                  Remover
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Totais e desconto */}
      <div className="mt-8 max-w-3xl mx-auto bg-gray-900 p-6 rounded-2xl shadow-inner border-t border-blue-700/30">
        <div className="font-bold text-2xl text-orange-400 text-center">
          Total Geral: R$ {totalGeral.toFixed(2)}
        </div>

        <div className="mt-6 text-center">
          <label className="block mb-2 text-blue-400 font-medium">
            Desconto (% para pagamento à vista)
          </label>
          <input
            type="number"
            value={discount}
            onChange={(e) => setDiscount(Number(e.target.value))}
            className="border border-blue-700 rounded px-3 py-2 w-24 text-center bg-gray-800 text-white"
            placeholder="0"
          />
        </div>

        {discount > 0 && (
          <div className="mt-4 text-green-400 text-lg font-semibold text-center">
            Total com desconto: R$ {totalComDesconto.toFixed(2)}
          </div>
        )}
      </div>

      {/* Botão para abrir prévia */}
      {(doors.length > 0 || extraProducts.length > 0) && (
        <div className="mt-8 text-center">
          <button
            onClick={() => setShowPreview(true)}
            className="bg-gradient-to-r from-orange-500 to-blue-700 hover:opacity-90 text-white px-8 py-3 rounded-xl text-lg font-semibold shadow-md shadow-blue-900/40 transition-all"
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
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-gray-800 p-6 rounded-xl shadow-lg shadow-blue-900/30 text-white border border-blue-800/30"
    >
      <div>
        <label className="block mb-1 text-sm text-gray-300">Produto</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-gray-900 border border-gray-700 rounded px-3 py-2 w-full text-white focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition-all"
          placeholder="Nome do produto"
        />
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block mb-1 text-sm text-gray-300">Quantidade</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="bg-gray-900 border border-gray-700 rounded px-3 py-2 w-full text-white focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition-all"
          />
        </div>

        <div className="flex-1">
          <label className="block mb-1 text-sm text-gray-300">Valor Unitário (R$)</label>
          <input
            type="number"
            step="0.01"
            value={unitPrice}
            onChange={(e) => setUnitPrice(Number(e.target.value))}
            className="bg-gray-900 border border-gray-700 rounded px-3 py-2 w-full text-white focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition-all"
          />
        </div>
      </div>

      <div>
        <label className="block mb-1 text-sm text-gray-300">Associar a porta (opcional)</label>
        <select
          value={attachedTo}
          onChange={(e) => setAttachedTo(e.target.value)}
          className="bg-gray-900 border border-gray-700 rounded px-3 py-2 w-full text-white focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition-all"
        >
          <option value="general">Orçamento geral / sem associação</option>
          {doors.map((d, idx) => (
            <option key={idx} value={String(idx)}>
              {`Porta ${idx + 1} — ${d.productType === "kitSerralheiro" ? "Kit Serralheiro" : "Kit Instalado"} — ${d.width}x${d.height}`}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2 rounded-lg shadow transition-all"
      >
        Adicionar Produto
      </button>
    </form>

  );
}
