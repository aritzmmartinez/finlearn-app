import { apiClient } from "@/src/lib/apiClient";
import type {
  ConceptProgressResponse,
  UpdateConceptStatusDto,
  UserConcept,
} from "@/src/types/concept.types";

export const conceptsApi = {
  // GET /concepts/suggested
  getSuggested: async (): Promise<UserConcept[]> => {
    const { data } = await apiClient.get("/concepts/suggested");
    return data;
  },

  // GET /concepts/progress
  getProgress: async (): Promise<ConceptProgressResponse> => {
    const { data } = await apiClient.get("/concepts/progress");
    return data;
  },

  // PATCH /concepts/:id/status
  updateStatus: async (
    id: string,
    dto: UpdateConceptStatusDto,
  ): Promise<UserConcept> => {
    const { data } = await apiClient.patch(`/concepts/${id}`, dto);
    return data;
  },
};
