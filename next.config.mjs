/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    qualities: [75, 80, 85, 90, 95, 100],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-2a9d4a31c20a4f95907132646baf0688.r2.dev",
      },
    ],
  },
}

export default nextConfig
