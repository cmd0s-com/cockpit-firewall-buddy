
const fs = require('fs');
const path = require('path');

// Path to the package.json file
const packageJsonPath = path.resolve(__dirname, '../package.json');

// Read the current package.json
const packageJson = require(packageJsonPath);

// Add or modify the build script
packageJson.scripts = {
  ...packageJson.scripts,
  "build": "vite build",
  "build:cockpit": "vite build && cp manifest.json cockpit-package.json dist/ && mv dist/cockpit-package.json dist/package.json"
};

// Write the updated package.json back to the file
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');

console.log('Updated package.json with Cockpit build scripts');
