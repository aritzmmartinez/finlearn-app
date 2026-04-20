import { apiClient } from "@/src/lib/apiClient";
import type {
  CreatePortfolioDto,
  Portfolio,
  PortfolioAnalysis,
  PortfolioWithStats,
  UpdatePortfolioDto,
} from "@/src/types/portfolio.types";

export const portfolioApi = {
  // GET /portfolios
  getAll: async (): Promise<Portfolio[]> => {
    const { data } = await apiClient.get("/portfolios");
    return data;
  },

  // GET /portfolios/:id
  getById: async (id: string): Promise<PortfolioWithStats> => {
    const { data } = await apiClient.get(`/portfolios/${id}`);
    return data;
  },

  // POST /portfolios
  create: async (dto: CreatePortfolioDto): Promise<Portfolio> => {
    const { data } = await apiClient.post("/portfolios", dto);
    return data;
  },

  // PATCH /portfolios/:id
  update: async (id: string, dto: UpdatePortfolioDto): Promise<Portfolio> => {
    const { data } = await apiClient.patch(`/portfolios/${id}`, dto);
    return data;
  },

  // DELETE /portfolios/:id
  remove: async (id: string): Promise<void> => {
    await apiClient.delete(`/portfolios/${id}`);
  },

  // GET /portfolios/:id/analyses
  getAnalyses: async (id: string): Promise<PortfolioAnalysis[]> => {
    const { data } = await apiClient.get(`/portfolios/${id}/analyses`);
    return data;
  },
};
