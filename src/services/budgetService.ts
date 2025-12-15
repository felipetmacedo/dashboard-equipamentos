import { BudgetDistributionResult, BudgetSuggestion } from "@/types";
import { API_BASE_URL, API_ENDPOINTS } from "@/config/api";

/**
 * Distribute budget and get equipment purchase suggestions
 */
export async function distributeBudget(budget: number): Promise<BudgetDistributionResult> {
  try {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.distributeBudget}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ orcamento: budget })
    });
    
    if (!response.ok) {
      throw new Error(`Failed to distribute budget: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    return {
      suggestions: data.suggestions || [],
      totalConsumido: data.totalConsumido || 0,
      saldo: data.saldo || budget
    };
  } catch (error) {
    console.error('Error distributing budget:', error);
    
    // Return empty result on error
    return {
      suggestions: [],
      totalConsumido: 0,
      saldo: budget
    };
  }
}

/**
 * Get all suggested replacement equipment
 * This is a helper function that calls distributeBudget with a large budget
 */
export async function getSuggestedReplacements(): Promise<BudgetSuggestion[]> {
  try {
    // Use a very large budget to get all possible suggestions
    const result = await distributeBudget(999999999);
    return result.suggestions;
  } catch (error) {
    console.error('Error fetching suggested replacements:', error);
    return [];
  }
}

