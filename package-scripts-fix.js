// Fix for Netlify build command
const fs = require('fs');
const path = require('path');

// Ensure package.json has correct build script
const packagePath = path.join(__dirname, 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

// Update scripts
packageJson.scripts = {
  ...packageJson.scripts,
  "build": "tsc && vite build",
  "build:netlify": "npm run build"
};

// Write updated package.json
fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2));

console.log('✓ Package.json build scripts updated for Netlify deployment');