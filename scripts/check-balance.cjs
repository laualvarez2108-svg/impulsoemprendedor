const https = require('https');

const address = '0xC66D552D7a6981ce3634c3c0eaB58766FC3D428F';

const options = {
  hostname: 'braga.hoodi.arkiv.network',
  path: '/rpc',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
};

const req = https.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    try {
      const json = JSON.parse(data);
      if (json.result) {
        const balance = parseInt(json.result, 16) / 1e18;
        console.log('\n💰 Balance de tu wallet:\n');
        console.log('📍 Dirección:', address);
        console.log('💎 Balance:', balance.toFixed(6), 'GLM\n');
        
        if (balance === 0) {
          console.log('⚠️  No tienes tokens GLM todavía.');
          console.log('\n📋 Para obtener tokens:');
          console.log('1. Visita: https://braga.hoodi.arkiv.network/faucet/');
          console.log('2. Ingresa tu dirección:', address);
          console.log('3. Completa el CAPTCHA');
          console.log('4. Recibirás 0.001 GLM de prueba\n');
        } else {
          console.log('✅ Tienes tokens GLM. Puedes registrar transacciones en Arkiv.\n');
        }
      } else {
        console.log('Error al obtener balance:', json.error || 'Respuesta inválida');
      }
    } catch(e) {
      console.log('Error:', e.message);
    }
  });
});

req.on('error', (e) => {
  console.error('Error de conexión:', e.message);
});

req.write(JSON.stringify({
  jsonrpc: '2.0',
  method: 'eth_getBalance',
  params: [address, 'latest'],
  id: 1
}));

req.end();
