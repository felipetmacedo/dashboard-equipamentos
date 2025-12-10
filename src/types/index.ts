// Equipment types
export type EquipmentStatus = "Operacional" | "Em Manutenção" | "Baixado";

export interface Equipment {
  identificador: string;
  modelo: string;
  fabricante: string;
  setor: string;
  status: EquipmentStatus;
  dataAquisicao: string;
  custo: number;
  totalCustoExterno: number;
  prioridadeScore: number;
  ordemServicoIds: string[];
}

// Service Order types
export interface ServiceOrder {
  ordemServico: string;
  identificadorEquipamento: string;
  custo: number;
  dataInicio: string;
  dataConclusao: string;
}

// KPI types
export interface KPIData {
  topPrioridade: string[];
  percentualAntigos: number;
  orcamentoDisponivel: number;
  totalEquipamentos: number;
  equipamentosEmManutencao: number;
  custoExternoTotal: number;
}

// Budget Suggestion types
export interface BudgetSuggestion {
  identificador: string;
  modelo: string;
  fabricante: string;
  setor: string;
  status: string;
  custo: number;
  totalCustoExterno: number;
  substituicaoEquipamentoId?: string;
}

// Filter types
export interface EquipmentFilters {
  setor?: string;
  status?: EquipmentStatus | "";
  dataAquisicaoInicio?: string;
  dataAquisicaoFim?: string;
  custoMin?: number;
  custoMax?: number;
}

// Budget Distribution Result
export interface BudgetDistributionResult {
  suggestions: BudgetSuggestion[];
  totalConsumido: number;
  saldo: number;
}
