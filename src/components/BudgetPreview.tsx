"use client";

import { PDFViewer, pdf } from "@react-pdf/renderer";
import Modal from "./Modal";
import BudgetPDF from "./BudgetPDF";
import { CalculatedDoor } from "@/utils/types/DoorData";
import company from "../data/company.json";

interface BudgetPreviewProps {
  doors: CalculatedDoor[];
  clientName: string;  // ✅ vem do Calculator
  open: boolean;
  onClose: () => void;
}

export default function BudgetPreview({ doors, clientName, open, onClose }: BudgetPreviewProps) {
  const totalGeral = doors.reduce((acc, d) => acc + d.total, 0);
  const dataHoje = new Date().toLocaleDateString("pt-BR");

  async function handleDownload() {
    const blob = await pdf(
      <BudgetPDF
        doors={doors}
        clientName={clientName}
        company={company}
        totalGeral={totalGeral}
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
          <PDFViewer style={{ width: "100%", maxWidth: "850px", height: "80vh" }}>
            <BudgetPDF
              doors={doors}
              clientName={clientName}  // ✅ aqui garante que aparece no PDF
              company={company}
              totalGeral={totalGeral}
              dataHoje={dataHoje}
            />
          </PDFViewer>
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
