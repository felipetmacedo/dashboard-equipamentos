import { BudgetSuggestion } from "@/types";

export const budgetSuggestions: BudgetSuggestion[] = [
  {
    identificador: "N001",
    modelo: "Ventilador Pulmonar Neo V1000",
    fabricante: "RespiroCorp",
    setor: "UTI 2",
    status: "Novo (Substituição E0012)",
    custo: 160000.00,
    totalCustoExterno: 0.00,
    substituicaoEquipamentoId: "E0012"
  },
  {
    identificador: "N002",
    modelo: "Monitor Cardíaco Smart P700",
    fabricante: "MedTech",
    setor: "UTI 1",
    status: "Novo (Substituição E0003)",
    custo: 50000.00,
    totalCustoExterno: 0.00,
    substituicaoEquipamentoId: "E0003"
  },
  {
    identificador: "N003",
    modelo: "Desfibrilador Quick Life",
    fabricante: "ElectroCare",
    setor: "UTI 1",
    status: "Novo (Substituição E0025)",
    custo: 20000.00,
    totalCustoExterno: 0.00,
    substituicaoEquipamentoId: "E0025"
  },
  {
    identificador: "N004",
    modelo: "Bomba de Infusão Pro XL-200",
    fabricante: "BioPump",
    setor: "Emergência",
    status: "Novo (Substituição E0008)",
    custo: 15000.00,
    totalCustoExterno: 0.00,
    substituicaoEquipamentoId: "E0008"
  }
];

