import { conceptsApi } from "@/src/api/concepts.api";
import type { ConceptStatus } from "@/types/concept.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const CONCEPT_KEYS = {
  suggested: ["concepts", "suggested"] as const,
  progress: ["concepts", "progress"] as const,
};

export function useConceptsSuggested() {
  return useQuery({
    queryKey: CONCEPT_KEYS.suggested,
    queryFn: conceptsApi.getSuggested,
  });
}

export function useConceptsProgress() {
  return useQuery({
    queryKey: CONCEPT_KEYS.progress,
    queryFn: conceptsApi.getProgress,
  });
}

export function useUpdateConceptStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: ConceptStatus }) =>
      conceptsApi.updateStatus(id, { status }),
    onSuccess: () => {
      // Refresh both lists so UI stays consistent
      qc.invalidateQueries({ queryKey: CONCEPT_KEYS.suggested });
      qc.invalidateQueries({ queryKey: CONCEPT_KEYS.progress });
    },
  });
}
