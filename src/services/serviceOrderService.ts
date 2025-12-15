import { ServiceOrder } from "@/types";
import { API_BASE_URL, API_ENDPOINTS } from "@/config/api";

/**
 * Get all service orders for a specific equipment
 */
export async function getServiceOrdersByEquipment(equipmentId: string): Promise<ServiceOrder[]> {
  try {
    const response = await fetch(
      `${API_BASE_URL}${API_ENDPOINTS.equipmentServiceOrders(equipmentId)}`
    );
    
    if (!response.ok) {
      if (response.status === 404) return [];
      throw new Error(`Failed to fetch service orders: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching service orders:', error);
    return [];
  }
}

/**
 * Get all service orders (across all equipment)
 * Note: This endpoint doesn't exist in the backend yet, so we return empty array
 */
export async function getAllServiceOrders(): Promise<ServiceOrder[]> {
  try {
    // This could be implemented by fetching all equipment first, then their orders
    // For now, return empty array as this isn't used in the current UI
    console.warn('getAllServiceOrders: Not implemented in backend yet');
    return [];
  } catch (error) {
    console.error('Error fetching all service orders:', error);
    return [];
  }
}

