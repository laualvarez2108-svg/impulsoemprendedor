export const PROJECT_ATTRIBUTE = {
  key: "project",
  value: "impulso-emprendedor-ia-7x9k",
} as const;

export const CREATOR_WALLET_ADDRESS = "0xC66D552D7a6981ce3634c3c0eaB58766FC3D428F";

export interface UserProfile {
  brandTone?: string;
  productOrService?: string;
  industry?: string;
  creativeStyle?: string;
  targetAudience?: string;
  brandValues?: string[];
}
