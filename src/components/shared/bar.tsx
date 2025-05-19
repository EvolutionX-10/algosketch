"use client";

import { BaseBarItem } from "@/lib/types";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

interface BarProps<T extends string> {
	item: BaseBarItem<T>;
	maxValue: number;
	index: number;
	stateStyles: Record<T, string>;
}

export default function Bar<T extends string>({ item, maxValue, index, stateStyles }: BarProps<T>) {
	const heightPercentage = (item.value / maxValue) * 100;

	return (
		<motion.div
			layout
			className="flex h-full w-full flex-col items-center justify-end-safe"
			initial={{ opacity: 1, scale: 1 }}
			animate={{
				opacity: 1,
				scale: item.state === "swapping" ? [1, 1.05, 1] : 1,
				y: item.state === "swapping" ? [0, -5, 0] : 0,
			}}
			exit={{ opacity: 0 }}
			transition={{
				layout: {
					type: "spring",
					stiffness: 350,
					damping: 25,
				},
				scale: {
					duration: 0.3,
				},
				y: {
					duration: 0.3,
				},
				duration: 0.25,
			}}
			key={item.id}
		>
			<motion.div
				layout="position"
				className={cn("w-full rounded-t-md transition-colors duration-300 ease-in-out", stateStyles[item.state])}
				style={{
					height: `${Math.max(heightPercentage, 5)}%`,
				}}
				aria-label={`Value: ${item.value}`}
			/>
			<span className="mt-1 text-xs">{item.value}</span>
			<span className="text-muted-foreground text-xs">{index}</span>
		</motion.div>
	);
}
