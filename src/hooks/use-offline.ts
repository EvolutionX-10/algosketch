"use client";

import { useEffect, useState } from "react";

interface UseOfflineOptions {
	onOnline?: () => void;
	onOffline?: () => void;
}

export function useOffline(options: UseOfflineOptions = {}) {
	const [isOnline, setIsOnline] = useState(true);
	const [wasOffline, setWasOffline] = useState(false);

	useEffect(() => {
		const updateOnlineStatus = () => {
			const online = navigator.onLine;
			const previouslyOnline = isOnline;

			setIsOnline(online);

			if (!online && previouslyOnline) {
				setWasOffline(true);
				options.onOffline?.();
			} else if (online && !previouslyOnline) {
				options.onOnline?.();
			}
		};

		// Initial check
		setIsOnline(navigator.onLine);

		window.addEventListener("online", updateOnlineStatus);
		window.addEventListener("offline", updateOnlineStatus);

		return () => {
			window.removeEventListener("online", updateOnlineStatus);
			window.removeEventListener("offline", updateOnlineStatus);
		};
	}, [isOnline, options]);

	const clearOfflineFlag = () => setWasOffline(false);

	return {
		isOnline,
		isOffline: !isOnline,
		wasOffline,
		clearOfflineFlag,
	};
}

// Hook to check if data is cached
export function useCacheStatus(key: string) {
	const [isCached, setIsCached] = useState(false);

	useEffect(() => {
		const checkCache = async () => {
			if ("caches" in window) {
				try {
					const cache = await caches.open("algosketch-data");
					const cachedResponse = await cache.match(key);
					setIsCached(!!cachedResponse);
				} catch (error) {
					console.warn("Cache check failed:", error);
					setIsCached(false);
				}
			}
		};

		checkCache();
	}, [key]);

	return isCached;
}

// Hook to cache algorithm data
export function useAlgorithmCache() {
	const cacheAlgorithmData = async (key: string, data: any) => {
		if ("caches" in window) {
			try {
				const cache = await caches.open("algosketch-data");
				const response = new Response(JSON.stringify(data), {
					headers: { "Content-Type": "application/json" },
				});
				await cache.put(key, response);
				console.log(`Cached algorithm data: ${key}`);
			} catch (error) {
				console.warn("Failed to cache algorithm data:", error);
			}
		}
	};

	const getCachedAlgorithmData = async (key: string) => {
		if ("caches" in window) {
			try {
				const cache = await caches.open("algosketch-data");
				const cachedResponse = await cache.match(key);
				if (cachedResponse) {
					return await cachedResponse.json();
				}
			} catch (error) {
				console.warn("Failed to get cached algorithm data:", error);
			}
		}
		return null;
	};

	return {
		cacheAlgorithmData,
		getCachedAlgorithmData,
	};
}
