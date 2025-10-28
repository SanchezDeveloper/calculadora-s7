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

    // ✅ Retorna todos os valores para usar no PDF
    return {
      productType,
      area,
      pesoMotor: pesoMotorBase,
      motor: motorKey,
      motorPrice,
      engine,
      total,
      width,
      height,
      quantity,
      priceLamina: valorLamina,
      priceGuia: prices.KitSerralheiro.metroGuias,
      priceSoleira: prices.KitSerralheiro.metroSoleira,
      priceEixo: prices.KitSerralheiro.metroEixo,
    };
  }

  // -----------------------
  // CÁLCULO PARA KIT INSTALADO
  // -----------------------
  if (productType === "kitInstalado") {
    let pricePerM2 =
      area >= 10
        ? prices.KitInstalado.acima10Metros
        : valueM2 || prices.KitInstalado.abaixo10Metros;

    // Se a lâmina for transvision, aplica acréscimo
    if (door.laminaTransvision) {
      pricePerM2 *= 1.15; // Exemplo: +15% (ajuste conforme sua tabela)
    }

    let total = area * pricePerM2 * quantity;

    // Seleção de motores (apenas para exibir, não influencia no total)
    const pesoMotorAjustado = engine === "comNB" ? pesoMotorBase + 100 : pesoMotorBase;
    const escolhido = escolherMotorPorRegras(engine, pesoMotorAjustado);

    let motorKey = "Não definido";
    let motorPrice = 0;

    if (escolhido) {
      motorKey = escolhido.key;
      motorPrice = escolhido.motor.price;
    }

    // Regras de diferença de preço
    if (engine === "comNB") {
      const semSelecionado = escolherMotorPorRegras("semNB", pesoMotorBase);
      const comSelecionado = escolherMotorPorRegras("comNB", pesoMotorBase + 100);
      if (semSelecionado && comSelecionado) {
        const diff = comSelecionado.motor.price - semSelecionado.motor.price;
        total += diff * quantity;
      }
    }

    if (engine === "semNB") {
      const semOk = escolherMotorPorRegras("semNB", pesoMotorBase);
      if (!semOk) {
        throw new Error("Nenhum motor semNB suporta esse peso dentro do limite de 90%!");
      }
    }

    return {
      productType,
      area,
      pesoMotor: pesoMotorBase,
      motor: motorKey,
      motorPrice,
      engine,
      pricePerM2,
      total,
      width,
      height,
      quantity,
    };
  }

  throw new Error("Tipo de produto inválido");
}
