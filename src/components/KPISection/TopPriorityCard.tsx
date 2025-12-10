"use client";

import { useEffect, useState } from "react";
import { getTopPriorityEquipments } from "@/services/equipmentService";
import { Equipment } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { AlertTriangle, Loader2 } from "lucide-react";

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

export function TopPriorityCard() {
  const [equipments, setEquipments] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const data = await getTopPriorityEquipments(5);
      setEquipments(data);
      setLoading(false);
    }
    loadData();
  }, []);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 h-full shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 bg-gradient-to-br from-red-500 to-rose-600 rounded-xl">
          <AlertTriangle className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-slate-800">
          Top 5 Prioridade de Substituição
        </h3>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="w-8 h-8 text-red-500 animate-spin" />
        </div>
      ) : (
        <div className="space-y-3">
          {equipments.map((equipment, index) => (
            <div
              key={equipment.identificador}
              className="bg-slate-50 border border-slate-200 rounded-xl p-4 hover:border-slate-300 transition-all"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-slate-200 rounded-lg flex items-center justify-center font-bold text-sm text-slate-600">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-sm text-slate-800">
                      {equipment.modelo}
                    </p>
                    <p className="text-xs text-slate-500">
                      {equipment.identificador} • {equipment.fabricante}
                    </p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-lg text-xs font-medium border ${getStatusBadge(equipment.status)}`}>
                  {equipment.status}
                </span>
              </div>
              
              <div className="flex justify-between items-center pt-3 border-t border-slate-200">
                <div>
                  <p className="text-xs text-slate-500">Setor</p>
                  <p className="text-sm text-slate-700">{equipment.setor}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-500">Custo Externo</p>
                  <p className="text-sm font-medium text-slate-700">
                    {formatCurrency(equipment.totalCustoExterno)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-500">Prioridade</p>
                  <p className={`text-xl font-bold ${getPriorityColor(equipment.prioridadeScore)}`}>
                    {equipment.prioridadeScore}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
