"use client";

import { BarItem } from "./bubbleSort";
import { cn } from "@/lib/utils";

interface BarProps {
	item: BarItem;
	maxValue: number;
	index: number;
}

export default function Bar({ item, maxValue, index }: BarProps) {
	const heightPercentage = (item.value / maxValue) * 100;

	const stateStyles = {
		default: "bg-blue-500",
		comparing: "bg-yellow-500",
		swapping: "bg-red-500",
		sorted: "bg-green-500",
	};

	return (
		<div className="flex h-full flex-col items-center justify-end-safe w-full">
			<div
				className={cn("w-full rounded-t-md transition-all duration-300 ease-in-out", stateStyles[item.state])}
				style={{
					height: `${Math.max(heightPercentage, 5)}%`,
				}}
				aria-label={`Value: ${item.value}`}
			/>
			<span className="mt-1 text-xs">{item.value}</span>
			<span className="text-muted-foreground text-xs">{index}</span>
		</div>
	);
}
