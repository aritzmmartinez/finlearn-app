import { importApi } from "@/src/api/import.api";
import { PORTFOLIO_KEYS } from "@/src/hooks/usePortfolio";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useImportFromScreenshot() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({
      portfolioId,
      imageBase64,
      mimeType,
    }: {
      portfolioId: string;
      imageBase64: string;
      mimeType?: "image/jpeg" | "image/png";
    }) => importApi.fromScreenshot(portfolioId, imageBase64, mimeType),

    onSuccess: (_, { portfolioId }) => {
      // Invalidate the portfolio detail so positions refresh automatically
      qc.invalidateQueries({ queryKey: PORTFOLIO_KEYS.detail(portfolioId) });
      qc.invalidateQueries({ queryKey: PORTFOLIO_KEYS.all });
    },
  });
}
