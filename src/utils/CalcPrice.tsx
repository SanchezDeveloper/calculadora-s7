
import { DoorData, Motor } from "@/utils/types/DoorData";
import prices from "../data/prices.json";

export function calculateDoorPrice(door: DoorData) {
  const { width, height, quantity, engine, productType, valueM2 } = door;

  const area = width * height;
  const pesoMotorBase = area * 15; // peso estimado original (sempre exibido)

  // Função auxiliar: escolhe o primeiro motor que satisfaça a regra
  function escolherMotorPorRegras(
    tipoEngine: "comNB" | "semNB",
    pesoParaSelecao: number
  ): { key: string; motor: Motor } | null {
    const motores = prices.KitSerralheiro.motor[tipoEngine] as Record<string, Motor>;

    for (const [key, motor] of Object.entries(motores)) {
      const m = motor as Motor;
      if (tipoEngine === "semNB") {
        // semNB: só aceita se peso <= 90% da capacidade
        if (pesoParaSelecao <= m.capacity * 0.9) {
          return { key, motor: m };
        }
      } else {
        // comNB: regra normal (peso já deve vir com +100 se necessário)
        if (pesoParaSelecao <= m.capacity) {
          return { key, motor: m };
        }
      }
    }
    return null;
  }

  // -----------------------
  // CÁLCULO PARA KIT SERRALHEIRO
  // -----------------------
  if (productType === "kitSerralheiro") {
    // peso usado para seleção: se comNB, considera +100; se semNB usa o peso base
    const pesoMotorAjustado = engine === "comNB" ? pesoMotorBase + 100 : pesoMotorBase;

    const escolhido = escolherMotorPorRegras(engine, pesoMotorAjustado);
    if (!escolhido) throw new Error("Nenhum motor suporta esse peso!");

    const { key: motorKey, motor } = escolhido;
    const motorPrice = motor.price;

    const valorLamina = area * prices.KitSerralheiro.metroQLamina;
    const valorGuias = height * prices.KitSerralheiro.metroGuias * 2;
    const valorSoleira = width * prices.KitSerralheiro.metroSoleira;
    const valorEixo = width * prices.KitSerralheiro.metroEixo;

    const total = (motorPrice + valorLamina + valorGuias + valorSoleira + valorEixo) * quantity;

    return {
      productType,
      area,
      pesoMotor: pesoMotorBase, // exibir sempre o peso estimado original
      motor: motorKey,
      motorPrice,
      total,
      width,
      height,
      quantity,
    };
  }

  // -----------------------
  // CÁLCULO PARA KIT INSTALADO
  // -----------------------
  if (productType === "kitInstalado") {
    const pricePerM2 = area >= 10 ? prices.KitInstalado.acima10Metros : valueM2 || prices.KitInstalado.abaixo10Metros;

    let total = area * pricePerM2 * quantity;

    // Se for comNB: calcular diferença entre motor comNB e semNB (aplicando regras de seleção)
    if (engine === "comNB") {
      // seleciona semNB usando regra semNB com peso base
      const semSelecionado = escolherMotorPorRegras("semNB", pesoMotorBase);
      // seleciona comNB usando regra comNB com peso base + 100
      const comSelecionado = escolherMotorPorRegras("comNB", pesoMotorBase + 100);

      if (semSelecionado && comSelecionado) {
        const diff = comSelecionado.motor.price - semSelecionado.motor.price;
        total += diff * quantity;
      } else {
        // se não encontrou um par de motores, podemos tentar ainda:
        // - se semNB não existir dentro de 90% -> erro (ou ignorar)
        // - se comNB não existir -> erro (ou ignorar)
        // Escolhi não lançar aqui para não quebrar o fluxo, apenas não somo a diferença.
      }
    }

    // Se for semNB: garantir que exista um motor semNB que suporte o peso dentro de 90%
    if (engine === "semNB") {
      const semOk = escolherMotorPorRegras("semNB", pesoMotorBase);
      if (!semOk) {
        throw new Error("Nenhum motor semNB suporta esse peso dentro do limite de 90%!");
      }
    }

    return {
      productType,
      area,
      pricePerM2,
      total,
      width,
      height,
      quantity,
    };
  }

  throw new Error("Tipo de produto inválido");
}
