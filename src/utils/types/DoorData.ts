import { ExtraProduct } from "./ExtraProduct";

export type DoorData = {
  width: number;
  height: number;
  quantity: number;
  engine: "comNB" | "semNB";
  productType: "kitSerralheiro" | "kitInstalado";
  valueM2?: number;
};

export type Motor = {
  price: number;
  capacity: number;
};

export type Motors = Record<string, Motor>;

export type Pricing = {
  KitSerralheiro: {
    metroQLamina: number;
    metroEixo: number;
    metroSoleira: number;
    metroGuias: number;
    motor: {
      comNB: Motors;
      semNB: Motors;
    };
  };
  KitInstalado: {
    acima10Metros: number;
    abaixo10Metros: number;
  };
};

export type CalculatedDoor =
  | {
      productType: "kitSerralheiro";
      area: number;
      pesoMotor: number;
      motor: string;
      motorPrice: number;
      total: number;
      width: number;
      height: number;
      quantity: number;
    }
  | {
      productType: "kitInstalado";
      area: number;
      pricePerM2: number;
      total: number;
      width: number;
      height: number;
      quantity: number;
    };

export type BudgetData = {
  clientName: string;
  date: string;
  doors: CalculatedDoor[];
  extraProducts: ExtraProduct[];
  discountPercent: number;
};