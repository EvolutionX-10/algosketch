"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import GithubIcon from "./icons/github";
import pkg from "../../package.json";

export function Footer({ className }: { className?: string }) {
	const year = new Date().getFullYear();
	return (
		<footer
			className={cn("bg-background/95 supports-[backdrop-filter]:bg-background/60 border-t backdrop-blur", className)}
		>
			<div className="container mx-auto px-4 py-4">
				<div className="text-muted-foreground flex flex-col items-center justify-between gap-3 text-sm sm:flex-row sm:gap-0">
					<div className="flex items-center gap-1">
						<span>Made with</span>
						<Heart className="h-3 w-3 fill-red-500 text-red-500" />
						<span>by</span>
						<span className="text-foreground font-medium">Aakhyan</span>
					</div>

					<div className="hidden sm:block">
						<span>&copy; {year} AlgoSketch. All rights reserved.</span>
					</div>

					<div className="flex items-center gap-4">
						<Link
							href="https://github.com/EvolutionX-10/AlgoSketch"
							target="_blank"
							aria-label="GitHub repository"
							rel="noopener noreferrer"
							className="hover:text-foreground inline-flex items-center gap-1 transition-colors"
						>
							<GithubIcon />
							<span className="hidden sm:inline">GitHub</span>
						</Link>
						<div className="bg-border h-4 w-px" />
						<span className="text-xs">v{pkg.version}</span>
					</div>
				</div>
				<div className="text-muted-foreground mt-2 text-center text-xs sm:hidden">
					&copy; {year} AlgoSketch. All rights reserved.
				</div>
			</div>
		</footer>
	);
}
