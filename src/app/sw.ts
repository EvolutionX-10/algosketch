import { defaultCache } from "@serwist/next/worker";
import type { PrecacheEntry, SerwistGlobalConfig } from "serwist";
import { ExpirationPlugin, NetworkFirst, Serwist } from "serwist";
import pkg from "../../package.json";

// This declares the value of `injectionPoint` to TypeScript.
// `injectionPoint` is the string that will be replaced by the
// actual precache manifest. By default, this string is set to
// `"self.__SW_MANIFEST"`.
declare global {
	interface WorkerGlobalScope extends SerwistGlobalConfig {
		__SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
	}
}

declare const self: ServiceWorkerGlobalScope;

const serwist = new Serwist({
	precacheEntries: self.__SW_MANIFEST,
	skipWaiting: true,
	clientsClaim: true,
	navigationPreload: true,
	cacheId: `algosketch-${pkg.version}`,
	runtimeCaching: [
		{
			// Match document navigations explicitly, independently of framework asset rules.
			matcher: ({ request }) => request.mode === "navigate",
			handler: new NetworkFirst({
				cacheName: "pages-html",
				plugins: [new ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 24 * 60 * 60 })],
			}),
		},
		...defaultCache,
	],
	fallbacks: {
		entries: [
			{
				url: "/offline",
				matcher({ request }: { request: Request }) {
					return request.destination === "document";
				},
			},
		],
	},
});

serwist.addEventListeners();
