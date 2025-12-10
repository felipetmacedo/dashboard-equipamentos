"use client";

import { useState } from "react";
import { distributeBudget } from "@/services/budgetService";
import { BudgetDistributionResult } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { Calculator, ShoppingCart, TrendingUp, ArrowRight, Sparkles, CircleDollarSign, Loader2 } from "lucide-react";

export function BudgetDistributor() {
  const [budget, setBudget] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<BudgetDistributionResult | null>(null);

  // Parse Brazilian currency format (1.000,00 -> 1000.00)
  const getBudgetValue = () => {
    return parseFloat(budget.replace(/\./g, "").replace(",", ".")) || 0;
  };

  const formatInputValue = (value: string) => {
    const numericValue = value.replace(/\D/g, "");
    if (!numericValue) return "";
    const number = parseInt(numericValue) / 100;
    return number.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatInputValue(e.target.value);
    setBudget(formatted);
  };

  const handleDistribute = async () => {
    const budgetValue = getBudgetValue();
    if (budgetValue <= 0) return;

    setLoading(true);
    const data = await distributeBudget(budgetValue);
    setResult(data);
    setLoading(false);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
      {/* Header */}
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-center gap-4">
          <div className="p-2.5 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl">
            <Calculator className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-800">
              Distribuição Eficiente de Orçamento
            </h3>
            <p className="text-sm text-slate-500">
              Insira um valor para calcular a melhor distribuição de compras
            </p>
          </div>
        </div>
      </div>

      {/* Input Section */}
      <div className="p-6 bg-slate-50 border-b border-slate-200">
        <div className="flex flex-col sm:flex-row gap-4 items-end">
          <div className="flex-1">
            <label className="block text-sm font-medium text-slate-600 mb-2">
              Orçamento Disponível (R$)
            </label>
            <div className="flex items-center bg-white border border-slate-300 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-emerald-500 focus-within:border-transparent">
              <div className="px-4 py-3 bg-slate-100 border-r border-slate-300">
                <span className="font-medium text-slate-600">R$</span>
              </div>
              <input
                type="text"
                value={budget}
                onChange={handleInputChange}
                placeholder="0,00"
                className="flex-1 px-4 py-3 text-xl font-semibold text-slate-800 placeholder-slate-400 focus:outline-none"
              />
            </div>
          </div>

          <button
            onClick={handleDistribute}
            disabled={loading || getBudgetValue() <= 0}
            className="flex items-center gap-2 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-colors whitespace-nowrap"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Sparkles className="w-5 h-5" />
            )}
            Distribuir Orçamento
          </button>
        </div>
      </div>

      {/* Results Section */}
      {result && (
        <div className="p-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <CircleDollarSign className="w-5 h-5 text-blue-500" />
                <span className="text-sm text-slate-600">Orçamento Inicial</span>
              </div>
              <span className="text-2xl font-bold text-slate-800">
                {formatCurrency(getBudgetValue())}
              </span>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <ShoppingCart className="w-5 h-5 text-emerald-500" />
                <span className="text-sm text-slate-600">Total Consumido</span>
              </div>
              <span className="text-2xl font-bold text-emerald-600">
                {formatCurrency(result.totalConsumido)}
              </span>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="w-5 h-5 text-amber-500" />
                <span className="text-sm text-slate-600">Saldo Restante</span>
              </div>
              <span className="text-2xl font-bold text-amber-600">
                {formatCurrency(result.saldo)}
              </span>
            </div>
          </div>

          {/* Suggestions Table */}
          {result.suggestions.length > 0 ? (
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <ShoppingCart className="w-5 h-5 text-violet-500" />
                  <h4 className="text-lg font-semibold text-slate-800">
                    Equipamentos Sugeridos para Compra
                  </h4>
                </div>
                <span className="px-3 py-1 bg-violet-100 text-violet-700 rounded-full text-sm font-medium">
                  {result.suggestions.length} item{result.suggestions.length !== 1 ? "s" : ""}
                </span>
              </div>

              <div className="rounded-xl border border-slate-200 overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-50">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">ID</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">Modelo</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">Fabricante</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">Setor</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">Status</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-slate-600">Custo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.suggestions.map((suggestion, index) => {
                      let runningTotal = 0;
                      for (let i = 0; i <= index; i++) {
                        runningTotal += result.suggestions[i].custo;
                      }

                      return (
                        <tr key={suggestion.identificador} className="border-t border-slate-100">
                          <td className="py-3 px-4">
                            <span className="text-sm font-mono font-medium text-emerald-600">
                              {suggestion.identificador}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div>
                              <p className="text-sm font-medium text-slate-800">{suggestion.modelo}</p>
                              {suggestion.substituicaoEquipamentoId && (
                                <div className="flex items-center gap-1 mt-1">
                                  <ArrowRight className="w-3 h-3 text-slate-400" />
                                  <span className="text-xs text-slate-500">
                                    Substitui {suggestion.substituicaoEquipamentoId}
                                  </span>
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <span className="text-sm text-slate-600">{suggestion.fabricante}</span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="text-sm text-slate-600">{suggestion.setor}</span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="px-2.5 py-1 bg-blue-100 text-blue-700 border border-blue-200 rounded-lg text-xs font-medium">
                              Novo
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <div>
                              <p className="text-sm font-medium text-slate-800">
                                {formatCurrency(suggestion.custo)}
                              </p>
                              <p className="text-xs text-slate-500">
                                Total: {formatCurrency(runningTotal)}
                              </p>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 gap-3">
              <ShoppingCart className="w-12 h-12 text-slate-300" />
              <span className="text-slate-500">Orçamento insuficiente para sugestões de compra</span>
            </div>
          )}
        </div>
      )}

      {/* Empty State */}
      {!result && !loading && (
        <div className="p-6">
          <div className="flex flex-col items-center justify-center py-16 gap-4 border-2 border-dashed border-slate-200 rounded-xl">
            <div className="p-4 bg-slate-100 rounded-2xl">
              <Calculator className="w-8 h-8 text-slate-400" />
            </div>
            <div className="text-center">
              <p className="font-medium text-slate-600 mb-1">
                Nenhuma distribuição calculada
              </p>
              <p className="text-sm text-slate-500 max-w-sm">
                Insira um valor de orçamento acima e clique em &quot;Distribuir Orçamento&quot; para ver as sugestões de compra otimizadas
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
