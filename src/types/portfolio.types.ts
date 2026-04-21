export interface Portfolio {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  currency: string;
  created_at: string;
  updated_at: string;
}

export interface PortfolioWithStats extends Portfolio {
  total_value: number;
  total_cost: number;
  total_gain_loss: number;
  total_gain_loss_pct: number;
  positions_count: number;
  positions: Position[];
}

export interface Position {
  id: string;
  portfolio_id: string;
  ticker: string;
  name: string;
  asset_type: AssetType;
  quantity: number;
  avg_cost: number;
  current_price: number;
  current_value: number;
  gain_loss: number;
  gain_loss_pct: number;
  currency: string;
  weight: number;
  country?: string;
  sector?: string;
  created_at: string;
  updated_at: string;
}

export type AssetType = "stock" | "etf" | "crypto" | "bond" | "fund" | "other";

export interface PortfolioAnalysis {
  id: string;
  portfolio_id: string;
  created_at: string;
  summary: string;
  insights: Insight[];
  geographic_distribution: Distribution[];
  sector_distribution: Distribution[];
  currency_exposure: Distribution[];
  risk_level: "low" | "moderate" | "high";
  overlap_warnings: OverlapWarning[];
}

export interface Insight {
  type: "info" | "warning" | "positive";
  title: string;
  body: string;
}

export interface Distribution {
  label: string;
  value: number;
  color?: string;
}

export interface OverlapWarning {
  tickers: string[];
  message: string;
}

export interface CreatePortfolioDto {
  name: string;
  description?: string;
  currency?: string;
}

export interface UpdatePortfolioDto {
  name?: string;
  description?: string;
}

export interface ImportPortfolioDto {
  image_base64: string;
}
