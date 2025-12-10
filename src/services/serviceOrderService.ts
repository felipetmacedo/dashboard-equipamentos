import { serviceOrders } from "@/data/serviceOrders";
import { ServiceOrder } from "@/types";

const DELAY_MS = 200;

const delay = () => new Promise(resolve => setTimeout(resolve, DELAY_MS));

export async function getServiceOrdersByEquipment(equipmentId: string): Promise<ServiceOrder[]> {
  await delay();
  return serviceOrders
    .filter(os => os.identificadorEquipamento === equipmentId)
    .sort((a, b) => new Date(b.dataInicio).getTime() - new Date(a.dataInicio).getTime());
}

export async function getAllServiceOrders(): Promise<ServiceOrder[]> {
  await delay();
  return [...serviceOrders].sort(
    (a, b) => new Date(b.dataInicio).getTime() - new Date(a.dataInicio).getTime()
  );
}

