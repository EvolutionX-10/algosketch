"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface SimpleBarProps {
	value: number;
	height: number;
	color: string;
	index: number;
	isTarget?: boolean;
}

export default function SimpleBar({ value, height, color, index, isTarget = false }: SimpleBarProps) {
	return (
		<motion.div
			layout
			className="flex h-full w-full flex-col items-center justify-end-safe"
			initial={{ opacity: 1, scale: 1 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0 }}
			transition={{
				layout: {
					type: "spring",
					stiffness: 350,
					damping: 25,
				},
				duration: 0.25,
			}}
		>
			{/* Bar */}
			<motion.div
				layout="position"
				className={cn("w-full rounded-t-md rounded-b-sm transition-colors duration-300 ease-in-out", color)}
				style={{ height: `${height}px` }}
				aria-label={`Value: ${value}`}
			/>
			<span className="mt-1 text-xs">{value}</span>
			<span className="text-muted-foreground text-xs">{index}</span>
		</motion.div>
	);
}
