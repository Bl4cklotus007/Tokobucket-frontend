// API Configuration for different environments
const API_CONFIG = {
  development: "http://localhost:5000",
  production: "https://your-backend-url.railway.app", // Ganti dengan URL Railway nanti
};

// Get current environment
const isDevelopment = import.meta.env.DEV;

// Export API base URL
export const API_BASE_URL = isDevelopment 
  ? API_CONFIG.development 
  : API_CONFIG.production;

// Environment variables
export const ENV = {
  isDevelopment,
  isProduction: !isDevelopment,
}; 