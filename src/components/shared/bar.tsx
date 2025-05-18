"use client";

import { BaseBarItem } from "@/lib/types";
import { cn } from "@/lib/utils";

interface BarProps<T extends string> {
	item: BaseBarItem<T>;
	maxValue: number;
	index: number;
	stateStyles: Record<T, string>;
}

export default function Bar<T extends string>({ item, maxValue, index, stateStyles }: BarProps<T>) {
	const heightPercentage = (item.value / maxValue) * 100;

	return (
		<div className="flex h-full w-full flex-col items-center justify-end-safe">
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
