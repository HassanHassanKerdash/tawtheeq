import { env } from 'kawkab';

/**
 * Full application configuration
 */
const configuration = {
  server: {
    port: env.get("KAWKAB_APP_PORT", "8080"),
  },
  
  // API settings
  api: {
    baseUrl: env.get("API_BASE_URL", "http://localhost:3000"),
  },
  
  // WebSocket settings
  socket: {
    url: env.get("SOCKET_URL", "ws://localhost:3000"),
  },
  
  // Storage settings
  storage: {
    type: env.get("STORAGE_TYPE", "localStorage"),
  },
  
  // Authentication settings
  auth: {
    tokenKey: env.get("TOKEN_KEY", "token"),
  },
  
  // Translation settings
  translation: {
    defaultLang: env.get("DEFAULT_LANG", "en"),
  },
  
  // General app settings
  app: {
    name: env.get("APP_NAME", "Kawkab App"),
    version: env.get("APP_VERSION", "1.0.0"),
    description: env.get("APP_DESCRIPTION", "Application built with Kawkab Framework"),
    author: env.get("APP_AUTHOR", "Kawkab Team"),
  },
};

export default configuration;
