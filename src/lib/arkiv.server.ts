import {
  createWalletClient,
  createPublicClient,
  http,
} from "@arkiv-network/sdk";
import { privateKeyToAccount } from "@arkiv-network/sdk/accounts";
import { braga } from "@arkiv-network/sdk/chains";
import { ExpirationTime, jsonToPayload } from "@arkiv-network/sdk/utils";
import { eq } from "@arkiv-network/sdk/query";
import { getWebRequest } from "@tanstack/react-start/server";
import { PROJECT_ATTRIBUTE, CREATOR_WALLET_ADDRESS, type UserProfile } from "./arkiv";

let walletClientInstance: ReturnType<typeof createWalletClient> | null = null;
let publicClientInstance: ReturnType<typeof createPublicClient> | null = null;

function getWalletClient() {
  if (!walletClientInstance) {
    let privateKey: string | undefined;
    
    try {
      const request = getWebRequest();
      const env = (request as any).cloudflare?.env || {};
      privateKey = env.ARKIV_PRIVATE_KEY || process.env.ARKIV_PRIVATE_KEY;
    } catch {
      privateKey = process.env.ARKIV_PRIVATE_KEY;
    }
    
    if (!privateKey) {
      throw new Error("ARKIV_PRIVATE_KEY is not set in environment variables");
    }

    const account = privateKeyToAccount(privateKey as `0x${string}`);

    walletClientInstance = createWalletClient({
      chain: braga,
      transport: http(),
      account,
    });
  }
  
  return walletClientInstance;
}

function getPublicClient() {
  if (!publicClientInstance) {
    publicClientInstance = createPublicClient({
      chain: braga,
      transport: http(),
    });
  }
  
  return publicClientInstance;
}

export async function logMentorQuery(userMessage: string, aiResponse: string) {
  try {
    const walletClient = getWalletClient();
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
  const publicClient = getPublicClient();
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

export async function saveUserProfile(profile: UserProfile) {
  try {
    const walletClient = getWalletClient();
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
    const publicClient = getPublicClient();
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
  const publicClient = getPublicClient();
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
