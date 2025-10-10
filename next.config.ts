import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import withSerwistInit from "@serwist/next";

const withSerwist = withSerwistInit({
	swSrc: "src/app/sw.ts",
	swDest: "public/sw.js",
	cacheOnNavigation: true,
	reloadOnOnline: true,
	disable: process.env.NODE_ENV !== "production",
	additionalPrecacheEntries: ["/offline"],
});

const nextConfig: NextConfig = {
	devIndicators: false,
	pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
	reactStrictMode: false
};

const withMDX = createMDX({
	extension: /\.(md|mdx)$/,
});

export default withSerwist(withMDX(nextConfig));
