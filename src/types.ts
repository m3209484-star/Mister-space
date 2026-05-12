export interface Stakeholder {
  name: string;
  impact: string;
  urgency: 'low' | 'medium' | 'high';
}

export interface CausalityEffect {
  timeframe: string;
  description: string;
  silentStakeholder: Stakeholder;
}

export interface CausalityMap {
  initialAction: string;
  effects: CausalityEffect[];
}

export interface BackwardStep {
  action: string;
  rationale: string;
  difficulty: 'low' | 'medium' | 'high';
}

export interface InverseSearchResult {
  goal: string;
  steps: BackwardStep[];
}
