/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = nextConfig

// next.config.js
module.exports = {
    webpack: (config, { isServer }) => {
      if (!isServer) {
        config.node = {
          fs: 'empty' // Allow loading markdown files as modules
        };
      }
  
      return config;
    }
  };
  