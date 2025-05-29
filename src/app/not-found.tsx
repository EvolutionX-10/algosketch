import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HomeIcon, ArrowLeftIcon } from "lucide-react";

export default function NotFound() {
	return (
		<main className="grid-lines flex h-screen w-screen flex-1 items-center justify-center">
			<div className="flex flex-col items-center justify-center gap-8 text-center">
				{/* 404 Number */}
				<div className="relative">
					<h1 className="font-heading text-primary/20 z-10 text-9xl font-bold md:text-[18rem]">404</h1>
					<div className="absolute inset-0 flex items-center justify-center">
						<div className="font-fancy text-primary text-2xl font-bold md:text-5xl">Oops!</div>
					</div>
				</div>

				{/* Error Message */}
				<div className="max-w-md space-y-4">
					<h2 className="font-heading text-foreground text-2xl font-bold md:text-4xl">Page Not Found</h2>
					<p className="text-muted-foreground text-lg leading-relaxed">
						The page you're looking for seems to have wandered off our sketchbook. Let's get you back on track!
					</p>
				</div>

				{/* Action Buttons */}
				<div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
					<Button asChild size="lg" className="font-medium">
						<Link href="/" className="flex items-center gap-2">
							<HomeIcon className="size-4" />
							Go Home
						</Link>
					</Button>
					<Button asChild variant="outline" size="lg" className="font-medium">
						<Link href="/dashboard" className="flex items-center gap-2">
							<ArrowLeftIcon className="size-4" />
							Back to Dashboard
						</Link>
					</Button>
				</div>

				{/* Decorative Elements */}
				<div className="absolute top-1/4 left-1/4 opacity-10">
					<div className="border-primary h-24 w-24 rotate-12 rounded-lg border-2"></div>
				</div>
				<div className="absolute right-1/4 bottom-1/4 opacity-10">
					<div className="border-primary h-16 w-16 -rotate-12 rounded-full border-2"></div>
				</div>
				<div className="absolute top-1/3 right-1/3 opacity-10">
					<div className="border-primary h-8 w-8 rotate-45 border-2"></div>
				</div>
			</div>
		</main>
	);
}
