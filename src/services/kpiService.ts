import { KPIData } from "@/types";
import { API_BASE_URL, API_ENDPOINTS } from "@/config/api";

/**
 * Fetch all KPI data from the backend
 */
export async function getKPIData(): Promise<KPIData> {
  try {
    // Fetch all KPI data in parallel
    const [
      totalEquipamentosRes,
      equipamentosEmManutencaoRes,
      percentualAntigosRes,
      custoExternoTotalRes,
      topPrioridadeRes
    ] = await Promise.all([
      fetch(`${API_BASE_URL}${API_ENDPOINTS.totalEquipments}`),
      fetch(`${API_BASE_URL}${API_ENDPOINTS.maintenanceCount}`),
      fetch(`${API_BASE_URL}${API_ENDPOINTS.agePercentage}`),
      fetch(`${API_BASE_URL}${API_ENDPOINTS.externalCostTotal}`),
      fetch(`${API_BASE_URL}${API_ENDPOINTS.topPriority}`)
    ]);

    // Parse all responses
    const totalEquipamentosData = await totalEquipamentosRes.json();
    const equipamentosEmManutencaoData = await equipamentosEmManutencaoRes.json();
    const percentualAntigosData = await percentualAntigosRes.json();
    const custoExternoTotalData = await custoExternoTotalRes.json();
    const topPrioridadeData = await topPrioridadeRes.json();

    // Extract top 5 equipment IDs
    const topPrioridade = Array.isArray(topPrioridadeData)
      ? topPrioridadeData.map((eq: any) => eq.identificador)
      : [];

    return {
      topPrioridade,
      percentualAntigos: percentualAntigosData.porcentagem || 0,
      orcamentoDisponivel: 350000.00, // Keep as frontend-managed value for now
      totalEquipamentos: totalEquipamentosData.total_equipamentos || 0,
      equipamentosEmManutencao: equipamentosEmManutencaoData.quantidade_em_manutencao || 0,
      custoExternoTotal: custoExternoTotalData.custo_total_bruto || 0
    };
  } catch (error) {
    console.error('Error fetching KPI data:', error);
    
    // Return default values on error
    return {
      topPrioridade: [],
      percentualAntigos: 0,
      orcamentoDisponivel: 350000.00,
      totalEquipamentos: 0,
      equipamentosEmManutencao: 0,
      custoExternoTotal: 0
    };
  }
}
