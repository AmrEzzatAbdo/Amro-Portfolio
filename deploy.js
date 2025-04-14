// deploy.js - ES Modules version
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create .nojekyll file
fs.writeFileSync(path.join(__dirname, 'dist/public/.nojekyll'), '');

console.log('Deployment preparation complete');