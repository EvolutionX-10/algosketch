import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import withSerwistInit from "@serwist/next";
import { randomUUID } from "node:crypto";

const withSerwist = withSerwistInit({
	swSrc: "src/app/sw.ts",
	swDest: "public/sw.js",
	cacheOnNavigation: true,
	reloadOnOnline: true,
	disable: process.env.NODE_ENV !== "production",
	// This HTML URL has no content hash; refresh its cached response for each build.
	additionalPrecacheEntries: [{ url: "/offline", revision: process.env.VERCEL_GIT_COMMIT_SHA ?? randomUUID() }],
});

const nextConfig: NextConfig = {
	devIndicators: false,
	pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
	reactStrictMode: false,
};

const withMDX = createMDX({
	extension: /\.(md|mdx)$/,
});

export default withSerwist(withMDX(nextConfig));
