import type { MetadataRoute } from "next";
import { navData, baseUrl } from "@/lib/constants";
import { getLink } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
	const currentDate = new Date();

	const collectUrls = (items: typeof navData, priority: number = 0.7): MetadataRoute.Sitemap => {
		const urls: MetadataRoute.Sitemap = [];

		for (const item of items) {
			urls.push({
				url: `${baseUrl}${getLink(item.url)}`,
				lastModified: currentDate,
				changeFrequency: "monthly",
				priority: priority,
			});

			if (item.items) {
				urls.push(...collectUrls(item.items, Math.max(priority - 0.1, 0.5)));
			}
		}

		return urls;
	};

	return [
		{
			url: baseUrl,
			lastModified: currentDate,
			changeFrequency: "weekly",
			priority: 1,
		},
		{
			url: `${baseUrl}/dashboard`,
			lastModified: currentDate,
			changeFrequency: "weekly",
			priority: 0.9,
		},
		...collectUrls(navData, 0.8),
	];
}
