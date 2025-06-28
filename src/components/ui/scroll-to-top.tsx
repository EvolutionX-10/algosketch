"use client";

import { useState, useEffect } from "react";
import { Button } from "./button";
import { ChevronUpIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ScrollToTopProps {
	scrollContainer?: HTMLElement | null;
	threshold?: number;
	className?: string;
}

export function ScrollToTop({ scrollContainer, threshold = 200, className }: ScrollToTopProps) {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const targetElement = scrollContainer || (document.querySelector('main[class*="overflow-auto"]') as HTMLElement);

		if (!targetElement) return;

		const toggleVisibility = () => {
			const scrollTop = targetElement.scrollTop;
			setIsVisible(scrollTop > threshold);
		};

		targetElement.addEventListener("scroll", toggleVisibility);
		toggleVisibility();

		return () => {
			targetElement.removeEventListener("scroll", toggleVisibility);
		};
	}, [scrollContainer, threshold]);

	const scrollToTop = () => {
		const targetElement = scrollContainer || (document.querySelector('main[class*="overflow-auto"]') as HTMLElement);

		if (targetElement) {
			targetElement.scrollTo({
				top: 0,
				behavior: "smooth",
			});
		}
	};

	if (!isVisible) {
		return null;
	}

	return (
		<Button
			onClick={scrollToTop}
			size="icon"
			className={cn(
				"fixed right-6 bottom-10 z-50 size-8 rounded-full shadow-lg",
				"bg-primary/80 hover:bg-primary text-primary-foreground",
				"border-primary/20 border backdrop-blur-md",
				"transition-all duration-300 ease-in-out",
				"active:scale-95",
				className,
			)}
			aria-label="Scroll to top"
		>
			<ChevronUpIcon className="size-5" />
		</Button>
	);
}
