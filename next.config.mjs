// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   webpack: (config, { isServer }) => {
//     if (isServer) {
//       config.externals = [...(config.externals || []), '_http_common']
//       config.target = 'node'
//     }

//     return config
//   },
//   experimental: {
//     instrumentationHook: true
//   }
//   // reactStrictMode: false,
// }

// export default nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: ['app']
    // ignoreDuringBuilds: true
  },
  experimental: {
    ppr: 'incremental'
  }
}

export default nextConfig
