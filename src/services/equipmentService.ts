import { equipments } from "@/data/equipments";
import { Equipment, EquipmentFilters } from "@/types";

const DELAY_MS = 200;

const delay = () => new Promise(resolve => setTimeout(resolve, DELAY_MS));

export async function getEquipments(filters?: EquipmentFilters): Promise<Equipment[]> {
  await delay();
  
  let result = [...equipments];
  
  if (filters) {
    if (filters.setor) {
      result = result.filter(e => e.setor === filters.setor);
    }
    
    if (filters.status) {
      result = result.filter(e => e.status === filters.status);
    }
    
    if (filters.dataAquisicaoInicio) {
      result = result.filter(e => e.dataAquisicao >= filters.dataAquisicaoInicio!);
    }
    
    if (filters.dataAquisicaoFim) {
      result = result.filter(e => e.dataAquisicao <= filters.dataAquisicaoFim!);
    }
    
    if (filters.custoMin !== undefined) {
      result = result.filter(e => e.custo >= filters.custoMin!);
    }
    
    if (filters.custoMax !== undefined) {
      result = result.filter(e => e.custo <= filters.custoMax!);
    }
  }
  
  return result;
}

export async function getEquipmentById(id: string): Promise<Equipment | null> {
  await delay();
  return equipments.find(e => e.identificador === id) || null;
}

export async function getTopPriorityEquipments(limit: number = 5): Promise<Equipment[]> {
  await delay();
  return [...equipments]
    .sort((a, b) => b.prioridadeScore - a.prioridadeScore)
    .slice(0, limit);
}

export async function getUniqueSetores(): Promise<string[]> {
  await delay();
  return [...new Set(equipments.map(e => e.setor))].sort();
}

