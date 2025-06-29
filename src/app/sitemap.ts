import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{
			url: "https://algosketch.vercel.app",
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 1,
		},
	];
}
