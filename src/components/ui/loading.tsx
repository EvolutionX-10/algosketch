"use client";

import { cn } from "@/lib/utils";
import { Loader2Icon } from "lucide-react";

interface LoadingProps {
	size?: "sm" | "md" | "lg";
	text?: string;
	className?: string;
}

export function Loading({ size = "md", text, className }: LoadingProps) {
	const sizeClasses = {
		sm: "h-4 w-4",
		md: "h-6 w-6",
		lg: "h-8 w-8",
	};

	return (
		<div className={cn("flex flex-col items-center justify-center gap-2", className)}>
			<Loader2Icon className={cn("text-primary animate-spin", sizeClasses[size])} />
			{text && <p className="text-muted-foreground animate-pulse text-sm">{text}</p>}
		</div>
	);
}

export function LoadingOverlay({ text }: { text?: string }) {
	return (
		<div className="bg-background/80 fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
			<div className="bg-card rounded-lg border p-6 shadow-lg">
				<Loading size="lg" text={text || "Loading..."} />
			</div>
		</div>
	);
}

export function LoadingCard({ text, className }: { text?: string; className?: string }) {
	return (
		<div className={cn("bg-card flex items-center justify-center rounded-lg border p-8", className)}>
			<Loading text={text} />
		</div>
	);
}

export function LoadingButton({
	children,
	isLoading,
	...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { isLoading?: boolean }) {
	return (
		<button {...props} disabled={isLoading || props.disabled}>
			{isLoading ? (
				<div className="flex items-center gap-2">
					<Loader2Icon className="h-4 w-4 animate-spin" />
					Loading...
				</div>
			) : (
				children
			)}
		</button>
	);
}
