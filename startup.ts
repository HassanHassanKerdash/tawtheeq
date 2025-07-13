import { networkInterfaces } from 'os';

// Function to get the actual network IP
function getNetworkIP(): string {
  const interfaces = networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    const iface = interfaces[name];
    if (iface) {
      for (const alias of iface) {
        if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
          return alias.address;
        }
      }
    }
  }
  return '0.0.0.0'; // fallback
}

export interface CustomMessages {
  startup: {
    title: (name?: string) => string;
    subtitle: (env?: string) => string;
    local: (port?: number) => string;
    network: (port?: number) => string;
    ready: () => string;
  };
  nodemon: {
    start: (server?: string) => string;
    restart: (server?: string) => string;
    crash: (error?: string) => string;
    exit: (server?: string) => string;
    watching: (files?: string) => string;
  };
  vite: {
    configLoaded: (config?: string) => string;
    buildStart: (process?: string) => string;
    buildEnd: (result?: string) => string;
    serverReady: (server?: string) => string;
    hmr: (type?: string) => string;
  };
  errors: {
    buildFailed: (reason?: string) => string;
    serverError: (error?: string) => string;
    fileNotFound: (file?: string) => string;
  };
  success: {
    buildComplete: (result?: string) => string;
    serverRunning: (server?: string) => string;
    filesGenerated: (count?: string) => string;
  };
}

export const customMessages: CustomMessages = {
  startup: {
    title: (name = 'Kawkab') => `🚀 ${name} - Development System`,
    subtitle: (env = 'Development Environment') => `👋 Welcome to the ${env}`,
    local: (port = 3000) => `📍 Local Address: http://localhost:${port}/`,
    network: (port = 3000) => `🌐 Network Address: http://${getNetworkIP()}:${port}/`,
    ready: () => '⚡ Ready for Development!'
  },
  
  nodemon: {
    start: (server = 'Server') => `🚀 Starting ${server}...`,
    restart: (server = 'Server') => `🔄 Restarting ${server}...`,
    crash: (error = 'Error') => `💥 ${error} Occurred!`,
    exit: (server = 'Server') => `👋 Shutting Down ${server}`,
    watching: (files = 'File Changes') => `👁️ Watching for ${files}...`
  },
  
  vite: {
    configLoaded: (config = 'Vite Configuration') => `🎯 ${config} Loaded Successfully!`,
    buildStart: (process = 'Build Process') => `🔨 Starting ${process}...`,
    buildEnd: (result = 'Build') => `✅ ${result} Completed Successfully!`,
    serverReady: (server = 'Development Server') => `🌟 ${server} Started Successfully!`,
    hmr: (type = 'Hot Module Replacement') => `🔄 ${type}...`
  },
  
  errors: {
    buildFailed: (reason = 'Build Failed') => `❌ ${reason}`,
    serverError: (error = 'Server Error') => `💥 ${error}`,
    fileNotFound: (file = 'File Not Found') => `📁 ${file}`
  },
  
  success: {
    buildComplete: (result = 'Build') => `🎉 ${result} Completed Successfully!`,
    serverRunning: (server = 'Server') => `✅ ${server} Running Normally`,
    filesGenerated: (count = 'Files') => `📝 ${count} Generated Successfully`
  }
};

export function printWelcomeMessage(projectName: string = 'Kawkab', port?: number): void {
  const actualPort = port || parseInt(process.env.KAWKAB_APP_PORT || '8080');
  console.log('\n' + '='.repeat(50));
  console.log(customMessages.startup.title(projectName));
  console.log(customMessages.startup.subtitle());
  console.log(customMessages.startup.local(actualPort));
  console.log(customMessages.startup.network(actualPort));
  console.log(customMessages.startup.ready());
  console.log('='.repeat(50) + '\n');
}

export function printStatusMessage(type: string, message: string, timestamp: string | null = null): void {
  const time = timestamp || new Date().toLocaleTimeString('en-US');
  console.log(`[${time}] ${message}`);
}

export interface SystemInfo {
  platform: string;
  nodeVersion: string;
  workingDir: string;
  memory: NodeJS.MemoryUsage;
  uptime: number;
}

export function getSystemInfo(): SystemInfo {
  return {
    platform: process.platform,
    nodeVersion: process.version,
    workingDir: process.cwd(),
    memory: process.memoryUsage(),
    uptime: process.uptime()
  };
}

export function printSystemInfo(): void {
  const info = getSystemInfo();
  console.log('📊 System Information:');
  console.log(`   Operating System: ${info.platform}`);
  console.log(`   Node.js Version: ${info.nodeVersion}`);
  console.log(`   Working Directory: ${info.workingDir}`);
  console.log(`   Memory Usage: ${Math.round(info.memory.heapUsed / 1024 / 1024)}MB`);
  console.log(`   Uptime: ${Math.round(info.uptime)}s`);
  console.log('');
} 