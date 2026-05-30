import { createWalletClient, http } from '@arkiv-network/sdk';
import { privateKeyToAccount } from '@arkiv-network/sdk/accounts';
import { braga } from '@arkiv-network/sdk/chains';
import { jsonToPayload, ExpirationTime } from '@arkiv-network/sdk/utils';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.join(__dirname, '..', '.env');
const envContent = fs.readFileSync(envPath, 'utf-8');
const envVars = {};
envContent.split('\n').forEach(line => {
  const [key, value] = line.split('=');
  if (key && value) {
    envVars[key.trim()] = value.trim();
  }
});

const PRIVATE_KEY = envVars.ARKIV_PRIVATE_KEY;
const WALLET_ADDRESS = '0xd782091c75b88c38756cc67f2c0a5f9aa52589bd';

const PROJECT_ATTRIBUTE = {
  key: 'project',
  value: 'impulso-emprendedor-ia-7x9k',
};

async function testArkivLogging() {
  console.log('\n🧪 Probando registro de transacción en Arkiv...\n');

  if (!PRIVATE_KEY) {
    console.error('❌ ARKIV_PRIVATE_KEY no está configurada en .env');
    process.exit(1);
  }

  const account = privateKeyToAccount(PRIVATE_KEY);
  console.log('📍 Wallet:', account.address);
  console.log('🔑 Private key cargada correctamente\n');

  const walletClient = createWalletClient({
    chain: braga,
    transport: http(),
    account,
  });

  try {
    console.log('📝 Registrando consulta de prueba en Arkiv...\n');

    const testPayload = {
      userQuery: '¿Cómo lanzo mi primer producto digital?',
      aiResponse: 'Para lanzar tu primer producto digital: 1) Valida tu idea con tu audiencia, 2) Crea un MVP mínimo, 3) Establece un precio inicial accesible, 4) Lanza con una oferta de preventa, 5) Itera basado en feedback.',
      timestamp: new Date().toISOString(),
    };

    const { entityKey, txHash } = await walletClient.createEntity({
      payload: jsonToPayload(testPayload),
      contentType: 'application/json',
      attributes: [
        PROJECT_ATTRIBUTE,
        { key: 'entityType', value: 'mentor_query' },
        { key: 'created', value: Date.now() },
        { key: 'userWallet', value: account.address },
      ],
      expiresIn: ExpirationTime.fromDays(90),
    });

    console.log('✅ ¡Transacción registrada exitosamente!\n');
    console.log('📍 Entity Key:', entityKey);
    console.log('🔗 Transaction Hash:', txHash);
    console.log('\n🌐 Ver en explorador:');
    console.log(`   https://explorer.braga.hoodi.arkiv.network/tx/${txHash}\n`);

    console.log('✅ Integración con Arkiv funcionando correctamente.');
    console.log('💡 Ahora cada consulta al Mentor IA se registrará automáticamente en la blockchain.\n');

  } catch (error) {
    console.error('❌ Error al registrar en Arkiv:', error.message);
    console.log('\n💡 Posibles soluciones:');
    console.log('   - Verifica que tienes tokens GLM en tu wallet');
    console.log('   - Asegúrate de que la red Braga está funcionando');
    console.log('   - Revisa tu conexión a internet\n');
    process.exit(1);
  }
}

testArkivLogging();
