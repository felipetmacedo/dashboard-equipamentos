/**
 * API Configuration for Backend Integration
 * 
 * This file contains the base URL configuration for the FastAPI backend.
 * The URL can be overridden using the NEXT_PUBLIC_API_URL environment variable.
 */

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://gestao-ativos-hc.onrender.com';

/**
 * API endpoints configuration
 */
export const API_ENDPOINTS = {
  // Equipment endpoints
  equipments: '/equipamentos',
  equipmentById: (id: string) => `/equipamentos/${id}`,
  equipmentServiceOrders: (id: string) => `/equipamentos/${id}/ordens-servico`,
  topPriority: '/top-5-substituicao',
  setores: '/setores',
  
  // KPI endpoints
  totalEquipments: '/quantidade-equipamentos',
  maintenanceCount: '/quantidade-em-manutencao',
  agePercentage: '/porcentagem-mais-10-anos',
  externalCostTotal: '/custo-externo-total',
  
  // Budget endpoint
  distributeBudget: '/distribuir-orcamento',
  
  // Data management endpoints
  importData: '/importar-dados-csv',
  calculatePriorities: '/calcular-prioridades',
} as const;

