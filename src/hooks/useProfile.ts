import { UpdateProfileDto, userApi } from "@/src/api/user.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const USER_KEYS = {
  me: ["user", "me"] as const,
};

export function useProfile() {
  return useQuery({
    queryKey: USER_KEYS.me,
    queryFn: userApi.getMe,
  });
}

export function useUpdateProfile() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (dto: UpdateProfileDto) => userApi.updateMe(dto),
    onSuccess: () => qc.invalidateQueries({ queryKey: USER_KEYS.me }),
  });
}
