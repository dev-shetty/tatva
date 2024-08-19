/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "flagcdn.com",
        pathname: "/**",
        protocol: "https",
      },
      {
        hostname: "mainfacts.com",
        pathname: "/media/images/coats_of_arms/*",
        protocol: "https",
      },
    ],
  },
}

export default nextConfig
