#!/usr/bin/env node

import { build } from 'vite'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'
import { copyFileSync, existsSync } from 'fs'
import { execSync } from 'child_process'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

console.log('🚀 Starting frontend build process for Cloudflare Pages...')

try {
  // Step 1: Setup frontend package.json for Cloudflare Pages
  console.log('📦 Setting up frontend dependencies...')
  
  // Copy frontend package.json to package.json
  const frontendPackagePath = resolve(__dirname, 'package.frontend.json')
  const packagePath = resolve(__dirname, 'package.json')
  const packageLockPath = resolve(__dirname, 'package-lock.json')
  
  if (existsSync(frontendPackagePath)) {
    console.log('   Copying package.frontend.json to package.json...')
    copyFileSync(frontendPackagePath, packagePath)
    
    // Remove existing package-lock.json to avoid conflicts
    if (existsSync(packageLockPath)) {
      console.log('   Removing old package-lock.json...')
      execSync('rm package-lock.json', { cwd: __dirname })
    }
    
    // Generate new package-lock.json that matches frontend dependencies
    console.log('   Generating package-lock.json for frontend dependencies...')
    execSync('npm install --package-lock-only --no-fund --no-audit', { 
      cwd: __dirname,
      stdio: 'inherit'
    })
    
    console.log('✅ Frontend dependencies configured successfully!')
  } else {
    console.warn('⚠️  package.frontend.json not found, using existing package.json')
  }

  // Step 2: Build the frontend with Vite
  console.log('🔨 Building frontend with Vite...')
  await build({
    // Use the existing vite config
    configFile: resolve(__dirname, 'vite.config.ts'),
    mode: 'production',
    logLevel: 'info'
  })
  
  console.log('✅ Frontend build completed successfully!')
  console.log('📁 Build output location: client/dist')
  
} catch (error) {
  console.error('❌ Frontend build failed:', error)
  process.exit(1)
}