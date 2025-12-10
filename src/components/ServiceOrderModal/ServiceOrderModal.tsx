"use client";

import { useEffect, useState } from "react";
import { getServiceOrdersByEquipment } from "@/services/serviceOrderService";
import { Equipment, ServiceOrder } from "@/types";
import { formatCurrency, formatDate } from "@/lib/utils";
import { X, Wrench, Calendar, DollarSign, FileText, Loader2 } from "lucide-react";

interface ServiceOrderModalProps {
  equipment: Equipment | null;
  isOpen: boolean;
  onClose: () => void;
}

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

export function ServiceOrderModal({ equipment, isOpen, onClose }: ServiceOrderModalProps) {
  const [serviceOrders, setServiceOrders] = useState<ServiceOrder[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadServiceOrders() {
      if (equipment && isOpen) {
        setLoading(true);
        const data = await getServiceOrdersByEquipment(equipment.identificador);
        setServiceOrders(data);
        setLoading(false);
      }
    }
    loadServiceOrders();
  }, [equipment, isOpen]);

  if (!isOpen || !equipment) return null;

  const totalCost = serviceOrders.reduce((sum, os) => sum + os.custo, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="p-6 border-b border-slate-200">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-4">
              <div className="p-2.5 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl">
                <Wrench className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-slate-800">
                  Ordens de Serviço
                </h2>
                <p className="text-sm text-slate-500">
                  {equipment.modelo} ({equipment.identificador})
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-slate-600" />
            </button>
          </div>
        </div>

        {/* Equipment Info */}
        <div className="p-6 bg-slate-50 border-b border-slate-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-xs text-slate-500 mb-1">Fabricante</p>
              <p className="text-sm font-medium text-slate-800">{equipment.fabricante}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-1">Setor</p>
              <p className="text-sm font-medium text-slate-800">{equipment.setor}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-1">Status</p>
              <span className={`px-2.5 py-1 rounded-lg text-xs font-medium border ${getStatusBadge(equipment.status)}`}>
                {equipment.status}
              </span>
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-1">Total Custo Externo</p>
              <p className="text-sm font-semibold text-amber-600">
                {formatCurrency(equipment.totalCustoExterno)}
              </p>
            </div>
          </div>
        </div>

        {/* Service Orders List */}
        <div className="p-6 overflow-y-auto max-h-[400px]">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 text-violet-500 animate-spin" />
            </div>
          ) : serviceOrders.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 gap-3">
              <FileText className="w-12 h-12 text-slate-300" />
              <span className="text-slate-500">Nenhuma ordem de serviço registrada</span>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">
                  {serviceOrders.length} ordem{serviceOrders.length !== 1 ? "s" : ""} de serviço
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-600">Total:</span>
                  <span className="text-sm font-semibold text-emerald-600">
                    {formatCurrency(totalCost)}
                  </span>
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-50">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">
                        Ordem de Serviço
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">
                        Data Início
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">
                        Data Conclusão
                      </th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-slate-600">
                        Custo
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {serviceOrders.map((os) => {
                      const startDate = new Date(os.dataInicio);
                      const endDate = new Date(os.dataConclusao);
                      const duration = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

                      return (
                        <tr key={os.ordemServico} className="border-t border-slate-100">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <FileText className="w-4 h-4 text-slate-400" />
                              <span className="text-sm font-mono font-medium text-slate-800">
                                {os.ordemServico}
                              </span>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-slate-400" />
                              <span className="text-sm text-slate-600">
                                {formatDate(os.dataInicio)}
                              </span>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div>
                              <p className="text-sm text-slate-600">{formatDate(os.dataConclusao)}</p>
                              <p className="text-xs text-slate-400">{duration} dia{duration !== 1 ? "s" : ""}</p>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <DollarSign className="w-4 h-4 text-emerald-500" />
                              <span className="text-sm font-medium text-slate-800">
                                {formatCurrency(os.custo)}
                              </span>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200">
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium rounded-lg transition-colors"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
