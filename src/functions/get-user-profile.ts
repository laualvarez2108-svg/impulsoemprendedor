import { createServerFn } from "@tanstack/react-start";
import { getUserProfile as getUserProfileFromArkiv } from "@/lib/arkiv.server";
import type { UserProfile } from "@/lib/arkiv";

export const getUserProfile = createServerFn({ method: "GET" })
  .handler(async () => {
    try {
      const profile = await getUserProfileFromArkiv();
      return profile;
    } catch (error) {
      console.error("Error getting user profile:", error);
      return null;
    }
  });
