/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  experimental: {
    serverComponentsExternalPackages: ['mongoose', 'bcrypt'],
  },
};

export default nextConfig;
