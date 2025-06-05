#!/usr/bin/env node

const https = require('https');

function testEndpoint(url, description) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          console.log(`✓ ${description}: ${res.statusCode}`);
          console.log(`  Response: ${JSON.stringify(json, null, 2)}`);
          resolve(true);
        } catch (e) {
          console.log(`✗ ${description}: Parse error`);
          resolve(false);
        }
      });
    }).on('error', (err) => {
      console.log(`✗ ${description}: ${err.message}`);
      resolve(false);
    });
  });
}

async function verifyDeployment() {
  console.log('🔍 Verifying Netlify deployment...\n');
  
  const baseUrl = 'https://instantiate-dev.netlify.app';
  
  await testEndpoint(`${baseUrl}/.netlify/functions/server`, 'Health Check');
  await testEndpoint(`${baseUrl}/api/user`, 'User API');
  await testEndpoint(`${baseUrl}/api/stats`, 'Stats API');
  
  console.log('\n📋 To test Azure credentials:');
  console.log(`curl -X POST ${baseUrl}/api/credentials/test/azure`);
}

verifyDeployment();
