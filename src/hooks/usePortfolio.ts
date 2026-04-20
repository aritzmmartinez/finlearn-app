import { portfolioApi } from "@/src/api/portfolio.api";
import type {
  CreatePortfolioDto,
  UpdatePortfolioDto,
} from "@/types/portfolio.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const PORTFOLIO_KEYS = {
  all: ["portfolios"] as const,
  detail: (id: string) => ["portfolios", id] as const,
  analyses: (id: string) => ["portfolios", id, "analyses"] as const,
};

export function usePortfolios() {
  return useQuery({
    queryKey: PORTFOLIO_KEYS.all,
    queryFn: portfolioApi.getAll,
  });
}

export function usePortfolio(id: string) {
  return useQuery({
    queryKey: PORTFOLIO_KEYS.detail(id),
    queryFn: () => portfolioApi.getById(id),
    enabled: !!id,
  });
}

export function usePortfolioAnalyses(id: string) {
  return useQuery({
    queryKey: PORTFOLIO_KEYS.analyses(id),
    queryFn: () => portfolioApi.getAnalyses(id),
    enabled: !!id,
  });
}

export function useCreatePortfolio() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreatePortfolioDto) => portfolioApi.create(dto),
    onSuccess: () => qc.invalidateQueries({ queryKey: PORTFOLIO_KEYS.all }),
  });
}

export function useUpdatePortfolio(id: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (dto: UpdatePortfolioDto) => portfolioApi.update(id, dto),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: PORTFOLIO_KEYS.detail(id) });
      qc.invalidateQueries({ queryKey: PORTFOLIO_KEYS.all });
    },
  });
}

export function useDeletePortfolio() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => portfolioApi.remove(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: PORTFOLIO_KEYS.all }),
  });
}
