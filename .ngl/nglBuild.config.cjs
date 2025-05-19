// nglBuild.config.default.js
const path = require('path');

module.exports = {
  common: {
    // Common settings for both web and server if any
    // e.g., sourceRoot: 'src',
    // tsconfig: 'tsconfig.json', // Path to your tsconfig.json
  },
  web: {
    entryPoints: [path.resolve(process.cwd(), 'src/ads.ts')], // Entry point for web
    outfile: path.resolve(process.cwd(), 'dist/ads.min.js'),   // Output bundle
    target: 'es2020', // esbuild target (browser compatibility)
    format: 'esm',    // esbuild format (ES Module)
    bundle: true,     // esbuild option
    minify: true,     // esbuild option
    sourcemap: true,  // esbuild option
    platform: 'browser', // esbuild option
    //tsconfig: 'tsconfig.web.json', // Optional: specific tsconfig for web
    // external: ['react', 'react-dom'], // Example: for external libraries not to be bundled
    // copyAssets: [ // Optional: for copying static assets
    //   { from: 'public', to: 'dist/web/public' }
    // ]
  },
};