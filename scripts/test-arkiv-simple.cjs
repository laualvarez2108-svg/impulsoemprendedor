const https = require('https');
const fs = require('fs');
const path = require('path');

const WALLET_ADDRESS = '0xd782091c75b88c38756cc67f2c0a5f9aa52589bd';
const RPC_URL = 'https://braga.hoodi.arkiv.network/rpc';

function makeRpcCall(method, params) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      jsonrpc: '2.0',
      method,
      params,
      id: Date.now()
    });

    const url = new URL(RPC_URL);
    const options = {
      hostname: url.hostname,
      path: url.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      }
    };

    const req = https.request(options, (res) => {
      let responseData = '';
      res.on('data', chunk => responseData += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(responseData);
          if (json.error) {
            reject(new Error(json.error.message));
          } else {
            resolve(json.result);
          }
        } catch (e) {
          reject(new Error('Failed to parse response'));
        }
      });
    });

    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

async function testArkivIntegration() {
  console.log('\n🧪 Probando integración con Arkiv...\n');
  
  try {
    console.log('1️⃣  Verificando balance...');
    const balanceHex = await makeRpcCall('eth_getBalance', [WALLET_ADDRESS, 'latest']);
    const balance = parseInt(balanceHex, 16) / 1e18;
    console.log(`   💰 Balance: ${balance.toFixed(6)} GLM\n`);

    if (balance === 0) {
      console.log('   ❌ No tienes tokens GLM. Visita el faucet primero.\n');
      process.exit(1);
    }

    console.log('2️⃣  Verificando conectividad con la red Braga...');
    const blockNumber = await makeRpcCall('eth_blockNumber', []);
    console.log(`   🔗 Block actual: ${parseInt(blockNumber, 16)}\n`);

    console.log('3️⃣  Obteniendo nonce de la wallet...');
    const nonce = await makeRpcCall('eth_getTransactionCount', [WALLET_ADDRESS, 'latest']);
    console.log(`   🔢 Nonce: ${parseInt(nonce, 16)}\n`);

    console.log('4️⃣  Verificando chain ID...');
    const chainId = await makeRpcCall('eth_chainId', []);
    console.log(`   🔗 Chain ID: ${parseInt(chainId, 16)}\n`);

    console.log('✅ ¡Integración con Arkiv verificada exitosamente!\n');
    console.log('📋 Resumen:');
    console.log(`   - Wallet: ${WALLET_ADDRESS}`);
    console.log(`   - Balance: ${balance.toFixed(6)} GLM`);
    console.log(`   - Red: Braga Testnet (Chain ID: ${parseInt(chainId, 16)})`);
    console.log(`   - RPC: ${RPC_URL}\n`);
    
    console.log('💡 La aplicación está lista para registrar consultas del Mentor IA.');
    console.log('   Cada consulta se guardará como una entidad en Arkiv con:');
    console.log('   - Pregunta del usuario');
    console.log('   - Respuesta de la IA');
    console.log('   - Timestamp');
    console.log('   - Expiración de 90 días\n');

    console.log('🚀 Para probar la aplicación:');
    console.log('   npm run dev\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
    console.log('\n💡 Posibles soluciones:');
    console.log('   - Verifica tu conexión a internet');
    console.log('   - Asegúrate de tener tokens GLM del faucet');
    console.log('   - Revisa que la red Braga esté funcionando\n');
    process.exit(1);
  }
}

testArkivIntegration();
