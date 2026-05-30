import crypto from "crypto";
import { config } from "dotenv";

config();

const privateKey = process.env.ARKIV_PRIVATE_KEY;

if (!privateKey) {
  console.error("Error: ARKIV_PRIVATE_KEY no está configurada en .env");
  process.exit(1);
}

const privateKeyHex = privateKey.startsWith("0x") ? privateKey.slice(2) : privateKey;
const privateKeyBuffer = Buffer.from(privateKeyHex, "hex");

const ecdh = crypto.createECDH("secp256k1");
ecdh.setPrivateKey(privateKeyBuffer);
const publicKey = ecdh.getPublicKey(null, "uncompressed");

const publicKeyWithoutPrefix = publicKey.subarray(1);

const keccak256 = crypto.createHash("sha3-256");
keccak256.update(publicKeyWithoutPrefix);
const hash = keccak256.digest();

const address = "0x" + hash.subarray(-20).toString("hex");

console.log("\n🔑 Wallet de Arkiv creada exitosamente\n");
console.log("📍 Dirección pública:", address);
console.log("\n💡 Usa esta dirección para:");
console.log("   - Recibir tokens GLM del faucet: https://braga.hoodi.arkiv.network/faucet/");
console.log("   - Configurar CREATOR_WALLET_ADDRESS en lib/arkiv.ts");
console.log("   - Verificar transacciones en: https://explorer.braga.hoodi.arkiv.network/\n");
