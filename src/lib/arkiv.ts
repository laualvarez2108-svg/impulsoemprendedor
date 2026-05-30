import {
  createWalletClient,
  createPublicClient,
  http,
} from "@arkiv-network/sdk";
import { privateKeyToAccount } from "@arkiv-network/sdk/accounts";
import { braga } from "@arkiv-network/sdk/chains";
import { ExpirationTime, jsonToPayload } from "@arkiv-network/sdk/utils";
import { eq } from "@arkiv-network/sdk/query";

export const PROJECT_ATTRIBUTE = {
  key: "project",
  value: "impulso-emprendedor-ia-7x9k",
} as const;

if (!PROJECT_ATTRIBUTE.value) {
  throw new Error(
    "Set PROJECT_ATTRIBUTE.value to a unique string identifying your project."
  );
}

const privateKey = process.env.ARKIV_PRIVATE_KEY as `0x${string}`;

if (!privateKey) {
  throw new Error("ARKIV_PRIVATE_KEY is not set in environment variables");
}

const account = privateKeyToAccount(privateKey);

export const CREATOR_WALLET_ADDRESS = "0xC66D552D7a6981ce3634c3c0eaB58766FC3D428F";

export const walletClient = createWalletClient({
  chain: braga,
  transport: http(),
  account,
});

export const publicClient = createPublicClient({
  chain: braga,
  transport: http(),
});

export async function logMentorQuery(userMessage: string, aiResponse: string) {
  try {
    const { entityKey, txHash } = await walletClient.createEntity({
      payload: jsonToPayload({
        userQuery: userMessage,
        aiResponse,
        timestamp: new Date().toISOString(),
      }),
      contentType: "application/json",
      attributes: [
        PROJECT_ATTRIBUTE,
        { key: "entityType", value: "mentor_query" },
        { key: "created", value: Date.now() },
        { key: "userWallet", value: CREATOR_WALLET_ADDRESS },
      ],
      expiresIn: ExpirationTime.fromDays(90),
    });

    console.log("✅ Mentor query logged to Arkiv:", {
      entityKey,
      txHash,
    });

    return { entityKey, txHash };
  } catch (error) {
    console.error("❌ Failed to log to Arkiv:", error);
    throw error;
  }
}

export async function getMentorQueries(limit = 50) {
  const query = publicClient.buildQuery();
  const result = await query
    .where([
      eq(PROJECT_ATTRIBUTE.key, PROJECT_ATTRIBUTE.value),
      eq("entityType", "mentor_query"),
    ])
    .createdBy(CREATOR_WALLET_ADDRESS)
    .withPayload(true)
    .withMetadata(true)
    .limit(limit)
    .fetch();

  return result.entities;
}

export interface UserProfile {
  brandTone?: string;
  productOrService?: string;
  industry?: string;
  creativeStyle?: string;
  targetAudience?: string;
  brandValues?: string[];
}

export async function saveUserProfile(profile: UserProfile) {
  try {
    const { entityKey, txHash } = await walletClient.createEntity({
      payload: jsonToPayload({
        ...profile,
        updatedAt: new Date().toISOString(),
      }),
      contentType: "application/json",
      attributes: [
        PROJECT_ATTRIBUTE,
        { key: "entityType", value: "user_profile" },
        { key: "userWallet", value: CREATOR_WALLET_ADDRESS },
        { key: "updated", value: Date.now() },
      ],
      expiresIn: ExpirationTime.fromDays(365),
    });

    console.log("✅ User profile saved to Arkiv:", { entityKey, txHash });
    return { entityKey, txHash };
  } catch (error) {
    console.error("❌ Failed to save user profile:", error);
    throw error;
  }
}

export async function getUserProfile(): Promise<UserProfile | null> {
  try {
    const query = publicClient.buildQuery();
    const result = await query
      .where([
        eq(PROJECT_ATTRIBUTE.key, PROJECT_ATTRIBUTE.value),
        eq("entityType", "user_profile"),
        eq("userWallet", CREATOR_WALLET_ADDRESS),
      ])
      .createdBy(CREATOR_WALLET_ADDRESS)
      .withPayload(true)
      .withMetadata(true)
      .limit(1)
      .fetch();

    if (result.entities.length === 0) {
      return null;
    }

    const entity = result.entities[0];
    const payload = entity.toJson();
    
    return {
      brandTone: payload.brandTone,
      productOrService: payload.productOrService,
      industry: payload.industry,
      creativeStyle: payload.creativeStyle,
      targetAudience: payload.targetAudience,
      brandValues: payload.brandValues,
    };
  } catch (error) {
    console.error("❌ Failed to get user profile:", error);
    return null;
  }
}

export async function getCreativeHistory(limit = 20) {
  const query = publicClient.buildQuery();
  const result = await query
    .where([
      eq(PROJECT_ATTRIBUTE.key, PROJECT_ATTRIBUTE.value),
      eq("entityType", "mentor_query"),
    ])
    .createdBy(CREATOR_WALLET_ADDRESS)
    .withPayload(true)
    .withMetadata(true)
    .limit(limit)
    .fetch();

  return result.entities.map(entity => {
    const payload = entity.toJson();
    return {
      userQuery: payload.userQuery,
      aiResponse: payload.aiResponse,
      timestamp: payload.timestamp,
    };
  });
}
