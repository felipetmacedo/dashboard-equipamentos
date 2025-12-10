export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("pt-BR");
}

export function getEquipmentAge(dataAquisicao: string): number {
  const acquisitionDate = new Date(dataAquisicao);
  const today = new Date();
  const diffYears = today.getFullYear() - acquisitionDate.getFullYear();
  return diffYears;
}

export function getStatusColor(status: string): {
  bg: string;
  text: string;
  border: string;
} {
  switch (status) {
    case "Operacional":
      return {
        bg: "bg-emerald-500/10",
        text: "text-emerald-400",
        border: "border-emerald-500/30"
      };
    case "Em Manutenção":
      return {
        bg: "bg-amber-500/10",
        text: "text-amber-400",
        border: "border-amber-500/30"
      };
    case "Baixado":
      return {
        bg: "bg-rose-500/10",
        text: "text-rose-400",
        border: "border-rose-500/30"
      };
    default:
      return {
        bg: "bg-sky-500/10",
        text: "text-sky-400",
        border: "border-sky-500/30"
      };
  }
}

export function getPriorityColor(score: number): string {
  if (score >= 90) return "text-rose-400";
  if (score >= 70) return "text-amber-400";
  if (score >= 40) return "text-sky-400";
  return "text-emerald-400";
}

