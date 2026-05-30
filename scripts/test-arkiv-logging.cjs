const { createWalletClient, http } = require('@arkiv-network/sdk');
const { privateKeyToAccount } = require('@arkiv-network/sdk/accounts');
const { braga } = require('@arkiv-network/sdk/chains');
const { jsonToPayload, ExpirationTime } = require('@arkiv-network/sdk/utils');
require('dotenv').config();

async function testArkivLogging() {
  console.log('\n🧪 Probando integración con Arkiv...\n');

  const privateKey = process.env.ARKIV_PRIVATE_KEY;
  
  if (!privateKey) {
    console.error('❌ ARKIV_PRIVATE_KEY no está configurada en .env');
    process.exit(1);
  }

  const account = privateKeyToAccount(privateKey);
  
  const walletClient = createWalletClient({
    chain: braga,
    transport: http(),
    account,
  });

  const PROJECT_ATTRIBUTE = {
    key: 'project',
    value: 'impulso-emprendedor-ia-7x9k',
  };

  try {
    console.log('📝 Registrando consulta de prueba en Arkiv...\n');

    const { entityKey, txHash } = await walletClient.createEntity({
      payload: jsonToPayload({
        userQuery: '¿Cómo lanzo mi primer producto digital?',
        aiResponse: 'Para lanzar tu primer producto digital: 1) Valida tu idea con tu audiencia, 2) Crea un MVP mínimo, 3) Establece un precio inicial accesible, 4) Lanza con una oferta de preventa, 5) Itera basado en feedback.',
        timestamp: new Date().toISOString(),
      }),
      contentType: 'application/json',
      attributes: [
        PROJECT_ATTRIBUTE,
        { key: 'entityType', value: 'mentor_query' },
        { key: 'created', value: Date.now() },
        { key: 'userWallet', value: account.address },
      ],
      expiresIn: ExpirationTime.fromDays(90),
    });

    console.log('✅ ¡Consulta registrada exitosamente!\n');
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
