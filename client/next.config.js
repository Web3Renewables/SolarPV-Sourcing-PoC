/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  webpack: (config, { isServer }) => {
    // it makes a WebAssembly modules async modules
    config.experiments = { syncWebAssembly: true, asyncWebAssembly: true, layers: true }
    config.resolve.fallback = { fs: false };
    // generate wasm module in ".next/server" for ssr & ssg
    if (isServer) {
      config.output.webassemblyModuleFilename = './../static/wasm/[modulehash].wasm'
    } else {
      config.output.webassemblyModuleFilename = 'static/wasm/[modulehash].wasm'
    }
    return config
    },
}

module.exports = nextConfig
