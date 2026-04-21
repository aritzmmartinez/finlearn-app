export type ConceptStatus = "pending" | "seen" | "understood";

export type ConceptCategory =
  | "diversification"
  | "risk"
  | "valuation"
  | "geography"
  | "sectors"
  | "currency"
  | "etf"
  | "dividends"
  | "general";

export interface Concept {
  id: string;
  slug: string;
  title: string;
  summary: string;
  body: string;
  category: ConceptCategory;
  created_at: string;
}

export interface UserConcept extends Concept {
  status: ConceptStatus;
  updated_at: string;
  portfolio_context?: string;
}

export interface ConceptProgress {
  total: number;
  seen: number;
  understood: number;
  pending: number;
  pct_complete: number;
}

export interface ConceptProgressResponse {
  progress: ConceptProgress;
  concepts: UserConcept[];
}

export interface UpdateConceptStatusDto {
  status: ConceptStatus;
}
