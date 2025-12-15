import { Equipment, EquipmentFilters } from "@/types";
import { API_BASE_URL, API_ENDPOINTS } from "@/config/api";

/**
 * Build query string from filters
 */
function buildQueryString(filters?: EquipmentFilters): string {
  if (!filters) return '';
  
  const params = new URLSearchParams();
  
  if (filters.setor) params.append('setor', filters.setor);
  if (filters.status) params.append('status', filters.status);
  if (filters.dataAquisicaoInicio) params.append('data_aquisicao_inicio', filters.dataAquisicaoInicio);
  if (filters.dataAquisicaoFim) params.append('data_aquisicao_fim', filters.dataAquisicaoFim);
  if (filters.custoMin !== undefined) params.append('custo_min', filters.custoMin.toString());
  if (filters.custoMax !== undefined) params.append('custo_max', filters.custoMax.toString());
  
  const queryString = params.toString();
  return queryString ? `?${queryString}` : '';
}

/**
 * Get all equipments with optional filters
 */
export async function getEquipments(filters?: EquipmentFilters): Promise<Equipment[]> {
  try {
    const queryString = buildQueryString(filters);
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.equipments}${queryString}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch equipments: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching equipments:', error);
    return [];
  }
}

/**
 * Get a single equipment by ID
 */
export async function getEquipmentById(id: string): Promise<Equipment | null> {
  try {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.equipmentById(id)}`);
    
    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error(`Failed to fetch equipment: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching equipment:', error);
    return null;
  }
}

/**
 * Get top priority equipments for replacement
 */
export async function getTopPriorityEquipments(limit: number = 5): Promise<Equipment[]> {
  try {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.topPriority}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch top priority equipments: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // The backend returns top 5, but we can slice if needed
    return Array.isArray(data) ? data.slice(0, limit) : [];
  } catch (error) {
    console.error('Error fetching top priority equipments:', error);
    return [];
  }
}

/**
 * Get unique list of setores for filtering
 */
export async function getUniqueSetores(): Promise<string[]> {
  try {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.setores}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch setores: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching setores:', error);
    return [];
  }
}

