// config.js - Configuration file for webhook URL
// This file should NOT be committed to GitHub (add to .gitignore)
// Ensure availability on window for non-module scripts
window.CONFIG = {
    webhookUrl: 'https://michaelcarey.app.n8n.cloud/webhook/3b64a35a-d0c5-476e-bb82-40a381e25138'
};
// Also keep a local const for backwards compatibility if referenced
const CONFIG = window.CONFIG;