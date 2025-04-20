import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            { protocol: "https", hostname: "medup.mohamed-emad.com", pathname: "/**" },
            {
                protocol: "https",
                hostname: "images.unsplash.com",
                pathname: "/**"
            }
        ]
    },
    eslint: {
        ignoreDuringBuilds: true
    },
    typescript: {
        ignoreBuildErrors: true
    }
};

export default withNextIntl(nextConfig);
