"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  ColumnDef,
  SortingState,
} from "@tanstack/react-table";
import { getEquipments } from "@/services/equipmentService";
import { Equipment, EquipmentFilters } from "@/types";
import { formatCurrency, formatDate, getEquipmentAge } from "@/lib/utils";
import { FilterPanel } from "./FilterPanel";
import { ServiceOrderModal } from "../ServiceOrderModal/ServiceOrderModal";
import { 
  ChevronRight, 
  Package, 
  Loader2, 
  ChevronLeft, 
  ChevronUp,
  ChevronDown,
  ChevronsLeft,
  ChevronsRight
} from "lucide-react";

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
  const [sorting, setSorting] = useState<SortingState>([]);

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

  // Define columns for TanStack Table
  const columns = useMemo<ColumnDef<Equipment>[]>(
    () => [
      {
        accessorKey: "identificador",
        header: "ID",
        cell: (info) => (
          <span className="text-sm font-mono font-medium text-slate-800">
            {info.getValue() as string}
          </span>
        ),
      },
      {
        accessorKey: "modelo",
        header: "Modelo",
        cell: (info) => {
          const age = getEquipmentAge(info.row.original.dataAquisicao);
          return (
            <div>
              <p className="text-sm font-medium text-slate-800">{info.getValue() as string}</p>
              {age > 10 && (
                <p className="text-xs text-amber-600 font-medium">{age} anos</p>
              )}
            </div>
          );
        },
      },
      {
        accessorKey: "fabricante",
        header: "Fabricante",
        cell: (info) => (
          <span className="text-sm text-slate-600">{info.getValue() as string}</span>
        ),
      },
      {
        accessorKey: "setor",
        header: "Setor",
        cell: (info) => (
          <span className="text-sm text-slate-600">{info.getValue() as string}</span>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: (info) => (
          <span className={`px-2.5 py-1 rounded-lg text-xs font-medium border ${getStatusBadge(info.getValue() as string)}`}>
            {info.getValue() as string}
          </span>
        ),
      },
      {
        accessorKey: "dataAquisicao",
        header: "Aquisição",
        cell: (info) => (
          <span className="text-sm text-slate-600">
            {formatDate(info.getValue() as string)}
          </span>
        ),
      },
      {
        accessorKey: "custo",
        header: "Custo",
        cell: (info) => (
          <span className="text-sm font-medium text-slate-800">
            {formatCurrency(info.getValue() as number)}
          </span>
        ),
      },
      {
        accessorKey: "totalCustoExterno",
        header: "Custo Externo",
        cell: (info) => (
          <span className="text-sm font-medium text-slate-800">
            {formatCurrency(info.getValue() as number)}
          </span>
        ),
      },
      {
        accessorKey: "prioridadeScore",
        header: "Prioridade",
        cell: (info) => (
          <span className={`text-sm font-bold ${getPriorityColor(info.getValue() as number)}`}>
            {info.getValue() as number}
          </span>
        ),
      },
      {
        id: "actions",
        header: "",
        cell: () => <ChevronRight className="w-5 h-5 text-slate-400" />,
      },
    ],
    []
  );

  const table = useReactTable({
    data: equipments,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    initialState: {
      pagination: {
        pageSize: 20,
      },
    },
  });

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
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id} className="bg-slate-50 border-b border-slate-200">
                      {headerGroup.headers.map((header) => (
                        <th
                          key={header.id}
                          className={`py-4 px-6 text-sm font-semibold text-slate-600 ${
                            header.column.id === "custo" || 
                            header.column.id === "totalCustoExterno"
                              ? "text-right"
                              : header.column.id === "prioridadeScore"
                              ? "text-center"
                              : "text-left"
                          } ${header.column.getCanSort() ? "cursor-pointer select-none" : ""}`}
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          <div className={`flex items-center gap-2 ${
                            header.column.id === "custo" || 
                            header.column.id === "totalCustoExterno"
                              ? "justify-end"
                              : header.column.id === "prioridadeScore"
                              ? "justify-center"
                              : "justify-start"
                          }`}>
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {header.column.getCanSort() && (
                              <span className="inline-flex">
                                {header.column.getIsSorted() === "asc" ? (
                                  <ChevronUp className="w-4 h-4" />
                                ) : header.column.getIsSorted() === "desc" ? (
                                  <ChevronDown className="w-4 h-4" />
                                ) : (
                                  <div className="w-4 h-4" />
                                )}
                              </span>
                            )}
                          </div>
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody>
                  {table.getRowModel().rows.map((row) => (
                    <tr
                      key={row.id}
                      onClick={() => handleRowClick(row.original)}
                      className="border-b border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td
                          key={cell.id}
                          className={`py-4 px-6 ${
                            cell.column.id === "custo" || 
                            cell.column.id === "totalCustoExterno"
                              ? "text-right"
                              : cell.column.id === "prioridadeScore"
                              ? "text-center"
                              : ""
                          }`}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200">
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-600">
                  Mostrando {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} a{" "}
                  {Math.min(
                    (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
                    equipments.length
                  )}{" "}
                  de {equipments.length} equipamentos
                </span>
              </div>

              <div className="flex items-center gap-2">
                {/* Page Size Selector */}
                <select
                  value={table.getState().pagination.pageSize}
                  onChange={(e) => {
                    table.setPageSize(Number(e.target.value));
                  }}
                  className="px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-violet-500"
                >
                  {[10, 20, 50, 100].map((pageSize) => (
                    <option key={pageSize} value={pageSize}>
                      {pageSize} por página
                    </option>
                  ))}
                </select>

                {/* Pagination Buttons */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => table.setPageIndex(0)}
                    disabled={!table.getCanPreviousPage()}
                    className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronsLeft className="w-4 h-4 text-slate-600" />
                  </button>
                  <button
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                    className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4 text-slate-600" />
                  </button>
                  
                  <span className="px-4 py-2 text-sm text-slate-600">
                    Página {table.getState().pagination.pageIndex + 1} de{" "}
                    {table.getPageCount()}
                  </span>

                  <button
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                    className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronRight className="w-4 h-4 text-slate-600" />
                  </button>
                  <button
                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                    disabled={!table.getCanNextPage()}
                    className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronsRight className="w-4 h-4 text-slate-600" />
                  </button>
                </div>
              </div>
            </div>
          </>
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
