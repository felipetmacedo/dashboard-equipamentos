"use client";

import { useEffect, useState } from "react";
import { EquipmentFilters, EquipmentStatus } from "@/types";
import { getUniqueSetores } from "@/services/equipmentService";
import { Filter, X, Search } from "lucide-react";

interface FilterPanelProps {
  filters: EquipmentFilters;
  onFiltersChange: (filters: EquipmentFilters) => void;
}

export function FilterPanel({ filters, onFiltersChange }: FilterPanelProps) {
  const [setores, setSetores] = useState<string[]>([]);
  const [localFilters, setLocalFilters] = useState<EquipmentFilters>(filters);

  useEffect(() => {
    async function loadSetores() {
      const data = await getUniqueSetores();
      setSetores(data);
    }
    loadSetores();
  }, []);

  const handleFilterChange = (key: keyof EquipmentFilters, value: string | number | undefined) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
  };

  const applyFilters = () => {
    onFiltersChange(localFilters);
  };

  const clearFilters = () => {
    const emptyFilters: EquipmentFilters = {};
    setLocalFilters(emptyFilters);
    onFiltersChange(emptyFilters);
  };

  const hasActiveFilters = Object.values(localFilters).some(v => v !== undefined && v !== "");

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
            <Filter className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-slate-800">Filtros</h3>
        </div>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-600 transition-colors"
          >
            <X className="w-4 h-4" />
            <span className="text-sm">Limpar</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
        {/* Setor Filter */}
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-2">Setor</label>
          <select
            value={localFilters.setor || ""}
            onChange={(e) => handleFilterChange("setor", e.target.value || undefined)}
            className="w-full h-10 px-3 bg-white border border-slate-300 rounded-lg text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Todos</option>
            {setores.map((setor) => (
              <option key={setor} value={setor}>{setor}</option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-2">Status</label>
          <select
            value={localFilters.status || ""}
            onChange={(e) => handleFilterChange("status", e.target.value as EquipmentStatus | "")}
            className="w-full h-10 px-3 bg-white border border-slate-300 rounded-lg text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Todos</option>
            <option value="Operacional">Operacional</option>
            <option value="Em Manutenção">Em Manutenção</option>
            <option value="Baixado">Baixado</option>
          </select>
        </div>

        {/* Data Aquisição Início */}
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-2">Data Aquisição (De)</label>
          <input
            type="date"
            value={localFilters.dataAquisicaoInicio || ""}
            onChange={(e) => handleFilterChange("dataAquisicaoInicio", e.target.value || undefined)}
            className="w-full h-10 px-3 bg-white border border-slate-300 rounded-lg text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Data Aquisição Fim */}
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-2">Data Aquisição (Até)</label>
          <input
            type="date"
            value={localFilters.dataAquisicaoFim || ""}
            onChange={(e) => handleFilterChange("dataAquisicaoFim", e.target.value || undefined)}
            className="w-full h-10 px-3 bg-white border border-slate-300 rounded-lg text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Custo Min */}
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-2">Custo Mínimo (R$)</label>
          <input
            type="number"
            placeholder="0"
            value={localFilters.custoMin || ""}
            onChange={(e) => handleFilterChange("custoMin", e.target.value ? Number(e.target.value) : undefined)}
            className="w-full h-10 px-3 bg-white border border-slate-300 rounded-lg text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Custo Max */}
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-2">Custo Máximo (R$)</label>
          <input
            type="number"
            placeholder="∞"
            value={localFilters.custoMax || ""}
            onChange={(e) => handleFilterChange("custoMax", e.target.value ? Number(e.target.value) : undefined)}
            className="w-full h-10 px-3 bg-white border border-slate-300 rounded-lg text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={applyFilters}
          className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
        >
          <Search className="w-4 h-4" />
          <span>Aplicar Filtros</span>
        </button>
      </div>
    </div>
  );
}
