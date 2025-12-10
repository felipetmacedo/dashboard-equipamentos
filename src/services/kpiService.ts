import { equipments } from "@/data/equipments";
import { KPIData } from "@/types";

const DELAY_MS = 200;

const delay = () => new Promise(resolve => setTimeout(resolve, DELAY_MS));

export async function getKPIData(): Promise<KPIData> {
  await delay();
  
  // Calculate top 5 priority equipment IDs
  const topPrioridade = [...equipments]
    .sort((a, b) => b.prioridadeScore - a.prioridadeScore)
    .slice(0, 5)
    .map(e => e.identificador);
  
  // Calculate percentage of equipment older than 10 years
  const currentYear = new Date().getFullYear();
  const oldEquipmentCount = equipments.filter(e => {
    const acquisitionYear = new Date(e.dataAquisicao).getFullYear();
    return currentYear - acquisitionYear > 10;
  }).length;
  
  const percentualAntigos = (oldEquipmentCount / equipments.length) * 100;
  
  // Calculate total equipment count
  const totalEquipamentos = equipments.length;
  
  // Calculate equipment in maintenance
  const equipamentosEmManutencao = equipments.filter(
    e => e.status === "Em Manutenção"
  ).length;
  
  // Calculate total external cost
  const custoExternoTotal = equipments.reduce(
    (sum, e) => sum + e.totalCustoExterno, 
    0
  );
  
  return {
    topPrioridade,
    percentualAntigos: Math.round(percentualAntigos * 10) / 10,
    orcamentoDisponivel: 350000.00,
    totalEquipamentos,
    equipamentosEmManutencao,
    custoExternoTotal
  };
}
