"use client";

import { useEffect, useState } from "react";
import { getKPIData } from "@/services/kpiService";
import { KPIData } from "@/types";
import { Clock, Wallet, Wrench, Package, TrendingDown, Loader2 } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export function AgePercentageChart() {
  const [kpiData, setKpiData] = useState<KPIData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const data = await getKPIData();
      setKpiData(data);
      setLoading(false);
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-6 h-full shadow-sm">
        <div className="flex items-center justify-center py-16">
          <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
        </div>
      </div>
    );
  }

  if (!kpiData) return null;

  const percentage = kpiData.percentualAntigos;
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        {/* Total Equipment Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
              <Package className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-medium text-slate-600">Total Equipamentos</span>
          </div>
          <p className="text-3xl font-bold text-slate-800">{kpiData.totalEquipamentos}</p>
          <p className="text-xs text-slate-500 mt-1">no parque tecnológico</p>
        </div>

        {/* Maintenance Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl">
              <Wrench className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-medium text-slate-600">Em Manutenção</span>
          </div>
          <p className="text-3xl font-bold text-amber-600">{kpiData.equipamentosEmManutencao}</p>
          <p className="text-xs text-slate-500 mt-1">equipamentos parados</p>
        </div>
      </div>

      {/* Age Percentage Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 flex-1 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-gradient-to-br from-red-500 to-rose-600 rounded-xl">
            <Clock className="w-4 h-4 text-white" />
          </div>
          <h3 className="text-sm font-semibold text-slate-800">
            Equipamentos {">"} 10 Anos
          </h3>
        </div>
        
        <div className="flex items-center justify-center gap-6">
          {/* Donut Chart */}
          <div className="relative w-24 h-24">
            <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="#e2e8f0"
                strokeWidth="10"
                fill="none"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="url(#ageGradient)"
                strokeWidth="10"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-1000 ease-out"
              />
              <defs>
                <linearGradient id="ageGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#ef4444" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-lg font-bold text-amber-600">
                {percentage}%
              </span>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-amber-500 to-red-500" />
              <span className="text-sm text-slate-600">{"> "}10 anos</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-slate-200" />
              <span className="text-sm text-slate-600">≤ 10 anos</span>
            </div>
          </div>
        </div>
      </div>

      {/* External Cost Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-gradient-to-br from-rose-500 to-red-600 rounded-xl">
            <TrendingDown className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-medium text-slate-600">Custo Externo Total</span>
        </div>
        <p className="text-2xl font-bold text-red-600">
          {formatCurrency(kpiData.custoExternoTotal)}
        </p>
        <p className="text-xs text-slate-500 mt-1">em manutenções terceirizadas</p>
      </div>
      
      {/* Budget Available Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl">
            <Wallet className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-medium text-slate-600">Orçamento Disponível</span>
        </div>
        <p className="text-2xl font-bold text-emerald-600">
          {formatCurrency(kpiData.orcamentoDisponivel)}
        </p>
        <p className="text-xs text-slate-500 mt-1">para substituição de equipamentos</p>
      </div>
    </div>
  );
}
