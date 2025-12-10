import { budgetSuggestions } from "@/data/budgetSuggestions";
import { equipments } from "@/data/equipments";
import { BudgetDistributionResult, BudgetSuggestion } from "@/types";

const DELAY_MS = 200;

const delay = () => new Promise(resolve => setTimeout(resolve, DELAY_MS));

export async function distributeBudget(budget: number): Promise<BudgetDistributionResult> {
  await delay();
  
  // Sort equipment by priority score (descending) to prioritize replacements
  const sortedEquipments = [...equipments]
    .sort((a, b) => b.prioridadeScore - a.prioridadeScore);
  
  const suggestions: BudgetSuggestion[] = [];
  let remainingBudget = budget;
  let totalConsumido = 0;
  
  // For each high-priority equipment, find a matching suggestion
  for (const equipment of sortedEquipments) {
    const suggestion = budgetSuggestions.find(
      s => s.substituicaoEquipamentoId === equipment.identificador
    );
    
    if (suggestion && suggestion.custo <= remainingBudget) {
      suggestions.push(suggestion);
      remainingBudget -= suggestion.custo;
      totalConsumido += suggestion.custo;
    }
    
    if (remainingBudget <= 0) break;
  }
  
  return {
    suggestions,
    totalConsumido,
    saldo: remainingBudget
  };
}

export async function getSuggestedReplacements(): Promise<BudgetSuggestion[]> {
  await delay();
  return budgetSuggestions;
}

