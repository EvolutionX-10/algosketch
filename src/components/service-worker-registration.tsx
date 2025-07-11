"use client";

import { useEffect } from "react";

export default function ServiceWorkerRegistration() {
	useEffect(() => {
		const registerServiceWorker = async () => {
			if ("serviceWorker" in navigator && process.env.NODE_ENV === "production") {
				try {
					const registration = await navigator.serviceWorker.register("/sw.js", {
						scope: "/",
					});

					if (registration.waiting) {
						registration.waiting.postMessage({ type: "SKIP_WAITING" });
					}

					registration.addEventListener("updatefound", () => {
						const newWorker = registration.installing;
						if (newWorker) {
							newWorker.addEventListener("statechange", () => {
								if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
									if (window.confirm("A new version is available. Refresh to update?")) {
										window.location.reload();
									}
								}
							});
						}
					});

					console.log("Service Worker registered successfully");
				} catch (error) {
					console.log("Service Worker registration failed:", error);
				}
			}
		};

		registerServiceWorker();

		const handleOnline = () => {
			console.log("App is now online");
		};

		const handleOffline = () => {
			console.log("App is now offline");
		};

		window.addEventListener("online", handleOnline);
		window.addEventListener("offline", handleOffline);

		return () => {
			window.removeEventListener("online", handleOnline);
			window.removeEventListener("offline", handleOffline);
		};
	}, []);

	return null;
}
