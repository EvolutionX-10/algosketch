"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { WifiOffIcon, RefreshCwIcon, HomeIcon } from "lucide-react";
import { redirect } from "next/navigation";

export default function OfflinePage() {
	return (
		<div className="grid-lines flex min-h-screen w-full flex-col items-center justify-center p-4">
			<div className="mx-auto max-w-md text-center">
				<div className="mb-6 flex justify-center">
					<div className="bg-muted flex h-20 w-20 items-center justify-center rounded-full">
						<WifiOffIcon className="text-muted-foreground h-10 w-10" />
					</div>
				</div>

				<h1 className="font-heading mb-4 text-4xl font-bold">You're Offline</h1>

				<p className="text-muted-foreground mb-6 text-lg">
					It looks like you've lost your internet connection. Don't worry, some parts of AlgoSketch are still available
					offline!
				</p>

				<div className="bg-card mb-6 rounded-lg border p-4">
					<h2 className="mb-2 font-semibold">What you can still do:</h2>
					<ul className="text-muted-foreground text-left text-sm">
						<li className="mb-1">• View previously loaded algorithm visualizations</li>
						<li className="mb-1">• Access cached documentation</li>
						<li className="mb-1">• Use basic functionality you've already visited</li>
					</ul>
				</div>

				<div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
					<Button
						onClick={() => redirect("/") && window.location.reload()}
						variant="default"
						className="flex items-center gap-2"
					>
						<RefreshCwIcon className="h-4 w-4" />
						Try Again
					</Button>

					<Button asChild variant="outline" className="flex items-center gap-2">
						<Link href="/">
							<HomeIcon className="h-4 w-4" />
							Go Home
						</Link>
					</Button>
				</div>

				<div className="text-muted-foreground mt-6 text-sm">
					<p>Once your connection is restored, all features will be available again.</p>
				</div>
			</div>
		</div>
	);
}
