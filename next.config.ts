import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
	devIndicators: {
		position: "bottom-right",
	},
	pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
};

const withMDX = createMDX({
	extension: /\.(md|mdx)$/,
});

export default withMDX(nextConfig);
