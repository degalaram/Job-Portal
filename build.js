#!/usr/bin/env node

import { build } from 'vite';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function buildApp() {
  try {
    console.log('🏗️ Starting build process...');

    // Ensure client directory structure
    const clientDir = resolve(__dirname, 'client');
    if (!fs.existsSync(clientDir)) {
      console.log('📁 Creating client directory...');
      fs.mkdirSync(clientDir, { recursive: true });
    }

    // Check if we have package.json
    const packagePath = resolve(__dirname, 'package.json');
    if (!fs.existsSync(packagePath)) {
      console.error('❌ package.json not found');
      process.exit(1);
    }

    // Step 1: Install dependencies
    console.log('📦 Installing dependencies...');

    // Step 2: Build the frontend with Vite
    console.log('🔨 Building frontend with Vite...');
    await build({
      // Use the existing vite config
      configFile: resolve(__dirname, 'vite.config.ts'),
      mode: 'production',
      logLevel: 'info',
      build: {
        outDir: resolve(__dirname, 'dist'),
        emptyOutDir: true,
        sourcemap: false,
        rollupOptions: {
          output: {
            manualChunks: {
              vendor: ['react', 'react-dom'],
              router: ['wouter'],
              ui: ['lucide-react']
            }
          }
        }
      }
    });

    console.log('✅ Frontend build completed successfully!');
    console.log('📁 Build output location: dist');

  } catch (error) {
    console.error('❌ Frontend build failed:', error);
    process.exit(1);
  }
}

buildApp();
