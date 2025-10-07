"use client";

import { PDFViewer, pdf } from "@react-pdf/renderer";
import Modal from "./Modal";
import BudgetPDF from "./BudgetPDF";
import { CalculatedDoor } from "@/utils/types/DoorData";
import { ExtraProduct } from "@/utils/types/ExtraProduct"; 
import company from "../data/company.json";

interface BudgetPreviewProps {
  doors: CalculatedDoor[];
  extraProducts: ExtraProduct[]; 
  clientName: string;
  discount: number; 
  open: boolean;
  onClose: () => void;
}

export default function BudgetPreview({
  doors,
  extraProducts,
  clientName,
  discount,
  open,
  onClose,
}: BudgetPreviewProps) {
  const totalDoors = doors.reduce((acc, d) => acc + d.total, 0);
  const totalExtras = extraProducts.reduce((acc, p) => acc + p.total, 0);
  const totalGeral = totalDoors + totalExtras;

  const descontoValor = totalGeral * (discount / 100);
  const totalComDesconto = totalGeral - descontoValor;

  const dataHoje = new Date().toLocaleDateString("pt-BR");

  async function handleDownload() {
    const blob = await pdf(
      <BudgetPDF
        doors={doors}
        extraProducts={extraProducts} 
        clientName={clientName}
        company={company}
        totalGeral={totalGeral}
        totalComDesconto={totalComDesconto}
        discount={discount} 
        dataHoje={dataHoje}
      />
    ).toBlob();

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `orcamento-${clientName || "cliente"}.pdf`;
    link.click();
    URL.revokeObjectURL(url);
  }

  if (!open) return null;

  return (
    <Modal onClose={onClose}>
      <div className="flex flex-col items-center w-full max-w-full p-2">
        {/* PDF responsivo */}
        <div className="w-full flex justify-center">
          {window.innerWidth >= 768 ? (
            <PDFViewer style={{ width: "100%", maxWidth: "100%", height: "80vh", minHeight: "350px" }}>
              <BudgetPDF
                doors={doors}
                extraProducts={extraProducts} 
                clientName={clientName}
                company={company}
                totalGeral={totalGeral}
                totalComDesconto={totalComDesconto} 
                discount={discount}
                dataHoje={dataHoje}
              />
            </PDFViewer>
          ) : (
            <p className="text-center text-sm p-4">
              Seu orçamento está pronto! Clique no botão abaixo para baixar o PDF.
            </p>
          )}
        </div>

        {/* Botão de download */}
        <button
          onClick={handleDownload}
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Baixar PDF
        </button>
      </div>
    </Modal>
  );
}
