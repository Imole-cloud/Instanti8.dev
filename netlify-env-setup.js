// Script to set Netlify environment variables via API
const fetch = require('node-fetch');

const NETLIFY_TOKEN = 'nfp_ieS75iREmcjSQJZhDn5sFN2SDtWKYk9Wbdfa';

// Environment variables to set
const envVars = {
  'AZURE_CLIENT_ID': '4a7525be-f9dd-437b-bf77-9a5a87bb5129',
  'AZURE_TENANT_ID': '4d2858d9-441d-46f0-b085-60e4ca7a5e75',
  'NODE_ENV': 'production'
};

async function setSiteEnvVars(siteId) {
  try {
    for (const [key, value] of Object.entries(envVars)) {
      const response = await fetch(`https://api.netlify.com/api/v1/sites/${siteId}/env/${key}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${NETLIFY_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          key: key,
          values: [value]
        })
      });
      
      if (response.ok) {
        console.log(`✓ Set ${key}`);
      } else {
        console.log(`✗ Failed to set ${key}: ${response.statusText}`);
      }
    }
  } catch (error) {
    console.error('Error setting environment variables:', error);
  }
}

// Usage: node netlify-env-setup.js [site-id]
const siteId = process.argv[2];
if (siteId) {
  setSiteEnvVars(siteId);
} else {
  console.log('Usage: node netlify-env-setup.js <site-id>');
}