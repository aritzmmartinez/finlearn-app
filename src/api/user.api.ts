import { apiClient } from "@/src/lib/apiClient";

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  plan: "free" | "pro";
  created_at: string;
}

export interface UpdateProfileDto {
  full_name?: string;
}

export const userApi = {
  getMe: async (): Promise<UserProfile> => {
    const { data } = await apiClient.get("/user/me");
    return data;
  },

  updateMe: async (dto: UpdateProfileDto): Promise<UserProfile> => {
    const { data } = await apiClient.patch("/user/me", dto);
    return data;
  },
};
