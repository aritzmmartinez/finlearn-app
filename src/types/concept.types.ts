// ─── Concept ──────────────────────────────────────────────────────────────────

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
  summary: string; // 1-2 líneas para la card
  body: string; // explicación completa en markdown
  category: ConceptCategory;
  created_at: string;
}

export interface UserConcept extends Concept {
  status: ConceptStatus;
  updated_at: string;
  portfolio_context?: string; // explicación contextualizada a la cartera del usuario
}

// ─── Progress ─────────────────────────────────────────────────────────────────

export interface ConceptProgress {
  total: number;
  seen: number;
  understood: number;
  pending: number;
  pct_complete: number; // 0-100
}

export interface ConceptProgressResponse {
  progress: ConceptProgress;
  concepts: UserConcept[];
}

// ─── Request ──────────────────────────────────────────────────────────────────

export interface UpdateConceptStatusDto {
  status: ConceptStatus;
}
