"use client";

import { useEffect, useState } from "react";
import { WifiOffIcon, WifiIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export default function OfflineIndicator() {
	const [isOnline, setIsOnline] = useState(true);
	const [showIndicator, setShowIndicator] = useState(false);
	const [hasBeenOffline, setHasBeenOffline] = useState(false);

	useEffect(() => {
		setIsOnline(navigator.onLine);

		const updateOnlineStatus = () => {
			const online = navigator.onLine;
			const wasOnline = isOnline;

			setIsOnline(online);

			if (!online && wasOnline) {
				setHasBeenOffline(true);
				setShowIndicator(true);
			} else if (online && !wasOnline && hasBeenOffline) {
				setShowIndicator(true);
				setTimeout(() => setShowIndicator(false), 3000);
			}
		};

		window.addEventListener("online", updateOnlineStatus);
		window.addEventListener("offline", updateOnlineStatus);

		return () => {
			window.removeEventListener("online", updateOnlineStatus);
			window.removeEventListener("offline", updateOnlineStatus);
		};
	}, [isOnline, hasBeenOffline]);

	if (!showIndicator) return null;

	return (
		<div
			className={cn(
				"fixed top-4 right-4 z-50 flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium shadow-lg transition-all duration-300",
				isOnline ? "bg-green-500 text-white" : "bg-red-500 text-white",
			)}
		>
			{isOnline ? (
				<>
					<WifiIcon className="h-4 w-4" />
					Back online!
				</>
			) : (
				<>
					<WifiOffIcon className="h-4 w-4" />
					You're offline
				</>
			)}
		</div>
	);
}
