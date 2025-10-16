import { DoorData, Motor } from "@/utils/types/DoorData";
import prices from "../data/prices.json";

export function calculateDoorPrice(door: DoorData) {
  const { width, height, quantity, engine, productType, valueM2 } = door;

  const area = width * height;
  const pesoMotorBase = area * 15; // peso estimado original (sempre exibido)

  // -----------------------
  // Função auxiliar: escolhe o primeiro motor que satisfaça a regra
  // -----------------------
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
    const pesoMotorAjustado = engine === "comNB" ? pesoMotorBase + 100 : pesoMotorBase;
    const escolhido = escolherMotorPorRegras(engine, pesoMotorAjustado);
    if (!escolhido) throw new Error("Nenhum motor suporta esse peso!");

    const { key: motorKey, motor } = escolhido;
    const motorPrice = motor.price;

    // Se for Lâmina Transvision, usar preço diferente
    const valorLamina = area * (
      door.laminaTransvision
        ? prices.KitSerralheiro.metroQLaminaTransvision
        : prices.KitSerralheiro.metroQLamina
    );

    const valorGuias = height * prices.KitSerralheiro.metroGuias * 2;
    const valorSoleira = width * prices.KitSerralheiro.metroSoleira;
    const valorEixo = width * prices.KitSerralheiro.metroEixo;
    const total = (motorPrice + valorLamina + valorGuias + valorSoleira + valorEixo) * quantity;

    return {
      productType,
      area,
      pesoMotor: pesoMotorBase,
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
    let pricePerM2: number;

    // Seleciona o preço base considerando área e tipo de lâmina
    if (area >= 10) {
      pricePerM2 = door.laminaTransvision
        ? prices.KitInstalado.acima10MetrosTransvision
        : prices.KitInstalado.acima10Metros;
    } else {
      // Se o usuário informou um valor manual, usa ele;
      // caso contrário, usa o preço padrão (ou o Transvision, se marcado)
      if (valueM2 && valueM2 > 0) {
        pricePerM2 = valueM2;
      } else {
        pricePerM2 = door.laminaTransvision
          ? prices.KitInstalado.abaixo10MetrosTransvision
          : prices.KitInstalado.abaixo10Metros;
      }
    }

    let total = area * pricePerM2 * quantity;

    // Seleção de motores (para exibição)
    const pesoMotorAjustado = engine === "comNB" ? pesoMotorBase + 100 : pesoMotorBase;
    const escolhido = escolherMotorPorRegras(engine, pesoMotorAjustado);

    let motorKey = "Não definido";
    let motorPrice = 0;

    if (escolhido) {
      motorKey = escolhido.key;
      motorPrice = escolhido.motor.price;
    }

    // Diferença de preço de motor quando COM NB
    if (engine === "comNB") {
      const semSelecionado = escolherMotorPorRegras("semNB", pesoMotorBase);
      const comSelecionado = escolherMotorPorRegras("comNB", pesoMotorBase + 100);
      if (semSelecionado && comSelecionado) {
        const diff = comSelecionado.motor.price - semSelecionado.motor.price;
        total += diff * quantity;
      }
    }

    // Validação de motor para versão SEM NB
    if (engine === "semNB") {
      const semOk = escolherMotorPorRegras("semNB", pesoMotorBase);
      if (!semOk) {
        throw new Error("Nenhum motor semNB suporta esse peso dentro do limite de 90%!");
      }
    }

    return {
      productType,
      area,
      pesoMotor: pesoMotorBase, // exibir sempre o peso estimado
      motor: motorKey, // motor escolhido
      motorPrice, // preço do motor apenas para exibição
      pricePerM2,
      total,
      width,
      height,
      quantity,
    };
  }

  throw new Error("Tipo de produto inválido");
}
