/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  // swcMinify: true,
  // experimental: {
  //   appDir: true,
  // },
  webpack: (config) => {
    // config.externals = [...config.externals, "bcrypt"];
    config.resolve.fallback = {
      "mongodb-client-encryption": false,
      aws4: false,
    };
    return config;
  },
};

export default nextConfig;
