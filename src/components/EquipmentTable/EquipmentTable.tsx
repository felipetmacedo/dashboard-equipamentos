"use client";

import { useEffect, useState, useCallback } from "react";
import { getEquipments } from "@/services/equipmentService";
import { Equipment, EquipmentFilters } from "@/types";
import { formatCurrency, formatDate, getEquipmentAge } from "@/lib/utils";
import { FilterPanel } from "./FilterPanel";
import { ServiceOrderModal } from "../ServiceOrderModal/ServiceOrderModal";
import { ChevronRight, Package, Loader2 } from "lucide-react";

function getStatusBadge(status: string) {
  switch (status) {
    case "Operacional":
      return "bg-emerald-100 text-emerald-700 border-emerald-200";
    case "Em Manutenção":
      return "bg-amber-100 text-amber-700 border-amber-200";
    case "Baixado":
      return "bg-red-100 text-red-700 border-red-200";
    default:
      return "bg-slate-100 text-slate-700 border-slate-200";
  }
}

function getPriorityColor(score: number): string {
  if (score >= 90) return "text-red-600";
  if (score >= 70) return "text-amber-600";
  if (score >= 40) return "text-blue-600";
  return "text-emerald-600";
}

export function EquipmentTable() {
  const [equipments, setEquipments] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<EquipmentFilters>({});
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const loadEquipments = useCallback(async () => {
    setLoading(true);
    const data = await getEquipments(filters);
    setEquipments(data);
    setLoading(false);
  }, [filters]);

  useEffect(() => {
    loadEquipments();
  }, [loadEquipments]);

  const handleRowClick = (equipment: Equipment) => {
    setSelectedEquipment(equipment);
    setIsModalOpen(true);
  };

  const handleFiltersChange = (newFilters: EquipmentFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="space-y-6">
      <FilterPanel filters={filters} onFiltersChange={handleFiltersChange} />

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl">
              <Package className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-slate-800">
              Parque de Equipamentos
            </h3>
          </div>
          <span className="px-3 py-1.5 bg-slate-100 rounded-full text-sm font-medium text-slate-600">
            {equipments.length} equipamento{equipments.length !== 1 ? "s" : ""}
          </span>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-violet-500 animate-spin" />
          </div>
        ) : equipments.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Package className="w-12 h-12 text-slate-300" />
            <span className="text-slate-500">Nenhum equipamento encontrado</span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="text-left py-4 px-6 text-sm font-semibold text-slate-600">ID</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-slate-600">Modelo</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-slate-600">Fabricante</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-slate-600">Setor</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-slate-600">Status</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-slate-600">Aquisição</th>
                  <th className="text-right py-4 px-6 text-sm font-semibold text-slate-600">Custo</th>
                  <th className="text-right py-4 px-6 text-sm font-semibold text-slate-600">Custo Externo</th>
                  <th className="text-center py-4 px-6 text-sm font-semibold text-slate-600">Prioridade</th>
                  <th className="py-4 px-6 w-10"></th>
                </tr>
              </thead>
              <tbody>
                {equipments.map((equipment) => {
                  const age = getEquipmentAge(equipment.dataAquisicao);

                  return (
                    <tr
                      key={equipment.identificador}
                      onClick={() => handleRowClick(equipment)}
                      className="border-b border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors"
                    >
                      <td className="py-4 px-6">
                        <span className="text-sm font-mono font-medium text-slate-800">
                          {equipment.identificador}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div>
                          <p className="text-sm font-medium text-slate-800">{equipment.modelo}</p>
                          {age > 10 && (
                            <p className="text-xs text-amber-600 font-medium">{age} anos</p>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-sm text-slate-600">{equipment.fabricante}</span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-sm text-slate-600">{equipment.setor}</span>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`px-2.5 py-1 rounded-lg text-xs font-medium border ${getStatusBadge(equipment.status)}`}>
                          {equipment.status}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-sm text-slate-600">
                          {formatDate(equipment.dataAquisicao)}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <span className="text-sm font-medium text-slate-800">
                          {formatCurrency(equipment.custo)}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <span className="text-sm font-medium text-slate-800">
                          {formatCurrency(equipment.totalCustoExterno)}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className={`text-sm font-bold ${getPriorityColor(equipment.prioridadeScore)}`}>
                          {equipment.prioridadeScore}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <ChevronRight className="w-5 h-5 text-slate-400" />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <ServiceOrderModal
        equipment={selectedEquipment}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
