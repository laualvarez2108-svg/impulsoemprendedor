import { createServerFn } from "@tanstack/react-start";
import { saveUserProfile as saveUserProfileToArkiv } from "@/lib/arkiv.server";
import type { UserProfile } from "@/lib/arkiv";

export const saveUserProfile = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => d as UserProfile)
  .handler(async ({ data }) => {
    try {
      const result = await saveUserProfileToArkiv(data);
      return result;
    } catch (error) {
      console.error("Error saving user profile:", error);
      throw error;
    }
  });
