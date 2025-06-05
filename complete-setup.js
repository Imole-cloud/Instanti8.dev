#!/usr/bin/env node

// Complete setup script for Instantiate deployment
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Setting up Instantiate for production deployment...\n');

// 1. Update package.json for Netlify compatibility
const packagePath = path.join(__dirname, 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

packageJson.scripts = {
  ...packageJson.scripts,
  "build": "tsc && vite build",
  "build:netlify": "npm run build"
};

fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2));
console.log('✓ Updated package.json build scripts');

// 2. Create production environment template
const envTemplate = `# Azure Credentials for Netlify
AZURE_CLIENT_ID=4a7525be-f9dd-437b-bf77-9a5a87bb5129
AZURE_CLIENT_SECRET=[AZURE_CLIENT_SECRET_REDACTED]
AZURE_TENANT_ID=4d2858d9-441d-46f0-b085-60e4ca7a5e75
AZURE_SUBSCRIPTION_ID=b5afed01-d5e1-4c1c-9834-5431940b0f25

# Database Connection
DATABASE_URL=${process.env.DATABASE_URL || 'postgresql://user:pass@host:port/db'}

# Environment
NODE_ENV=production
`;

fs.writeFileSync('.env.netlify', envTemplate);
console.log('✓ Created .env.netlify template');

// 3. Verify netlify.toml configuration
const netlifyConfig = `[build]
  command = "npm run build"
  functions = "netlify/functions"
  publish = "dist"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/server"
  status = 200

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[functions]
  node_bundler = "esbuild"
`;

fs.writeFileSync('netlify.toml', netlifyConfig);
console.log('✓ Updated netlify.toml configuration');

// 4. Create deployment verification script
const verifyScript = `#!/usr/bin/env node

const https = require('https');

function testEndpoint(url, description) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          console.log(\`✓ \${description}: \${res.statusCode}\`);
          console.log(\`  Response: \${JSON.stringify(json, null, 2)}\`);
          resolve(true);
        } catch (e) {
          console.log(\`✗ \${description}: Parse error\`);
          resolve(false);
        }
      });
    }).on('error', (err) => {
      console.log(\`✗ \${description}: \${err.message}\`);
      resolve(false);
    });
  });
}

async function verifyDeployment() {
  console.log('🔍 Verifying Netlify deployment...\\n');
  
  const baseUrl = 'https://instantiate-dev.netlify.app';
  
  await testEndpoint(\`\${baseUrl}/.netlify/functions/server\`, 'Health Check');
  await testEndpoint(\`\${baseUrl}/api/user\`, 'User API');
  await testEndpoint(\`\${baseUrl}/api/stats\`, 'Stats API');
  
  console.log('\\n📋 To test Azure credentials:');
  console.log(\`curl -X POST \${baseUrl}/api/credentials/test/azure\`);
}

verifyDeployment();
`;

fs.writeFileSync('verify-deployment.js', verifyScript);
fs.chmodSync('verify-deployment.js', 0o755);
console.log('✓ Created deployment verification script');

console.log('\n🎯 Setup Complete! Next steps:');
console.log('\n1. Set Environment Variables in Netlify Dashboard:');
console.log('   → Go to: https://app.netlify.com/sites/instantiate-dev/settings/env');
console.log('   → Copy variables from .env.netlify file');

console.log('\n2. Push to GitHub (triggers auto-deploy):');
console.log('   → git add .');
console.log('   → git commit -m "Production deployment configuration"');
console.log('   → git push');

console.log('\n3. Verify deployment:');
console.log('   → node verify-deployment.js');

console.log('\n🌐 Your deployment URL: http://instantiate-dev.netlify.app');
console.log('📊 API endpoints will be available at: /api/*');