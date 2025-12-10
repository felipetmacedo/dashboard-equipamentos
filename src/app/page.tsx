"use client";

import { KPISection } from "@/components/KPISection";
import { EquipmentTable } from "@/components/EquipmentTable";
import { BudgetDistributor } from "@/components/BudgetDistributor";
import { Activity, Building2 } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="p-2.5 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-slate-800">
                  Dashboard de Equipamentos
                </h1>
                <p className="text-sm text-slate-500">
                  Sistema de Substituição e Priorização
                </p>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-lg">
              <Building2 className="w-4 h-4 text-slate-500" />
              <span className="text-sm text-slate-600">Hospital das Clínicas</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="space-y-8">
          {/* Page Title */}
          <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">
              Visão Geral do Parque Tecnológico
            </h2>
            <p className="text-slate-500">
              Monitore, analise e planeje a substituição de equipamentos médicos
            </p>
          </div>

          {/* KPIs Section */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-6 bg-gradient-to-b from-red-500 to-amber-500 rounded-full" />
              <h3 className="text-lg font-semibold text-slate-800">
                Indicadores Chave
              </h3>
            </div>
            <KPISection />
          </section>

          {/* Equipment Table Section */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-6 bg-gradient-to-b from-indigo-500 to-blue-500 rounded-full" />
              <h3 className="text-lg font-semibold text-slate-800">
                Gestão de Equipamentos
              </h3>
            </div>
            <EquipmentTable />
          </section>

          {/* Budget Distribution Section */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-6 bg-gradient-to-b from-emerald-500 to-teal-500 rounded-full" />
              <h3 className="text-lg font-semibold text-slate-800">
                Planejamento de Investimentos
              </h3>
            </div>
            <BudgetDistributor />
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white mt-12">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <span className="text-sm text-slate-500">
              © 2025 Dashboard HC • Sistema de Gestão de Equipamentos
            </span>
            <span className="text-xs text-slate-400">
              Desenvolvido para o Hospital das Clínicas
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
