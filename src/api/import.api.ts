import { apiClient } from "@/src/lib/apiClient";
import type { PortfolioWithStats } from "@/src/types/portfolio.types";

export interface ImportResult {
  portfolio_id: string;
  positions_imported: number;
  positions: PortfolioWithStats["positions"];
  raw_text?: string; // debug
}

export const importApi = {
  // POST /portfolios/import
  // Sends base64 image → backend calls Claude Vision → returns detected positions
  fromScreenshot: async (
    portfolioId: string,
    imageBase64: string,
    mimeType: "image/jpeg" | "image/png" = "image/jpeg",
  ): Promise<ImportResult> => {
    const { data } = await apiClient.post("/portfolios/import", {
      portfolio_id: portfolioId,
      image_base64: imageBase64,
      mime_type: mimeType,
    });
    return data;
  },
};
