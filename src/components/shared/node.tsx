"use client";

import { BaseBarItem } from "@/lib/types";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

interface NodeProps<T extends string> {
	item: BaseBarItem<T>;
	index: number;
	stateStyles: Record<T, string>;
}

export default function Node<T extends string>({ item, index, stateStyles }: NodeProps<T>) {
	return (
		<motion.div
			layout
			className="flex flex-col items-center justify-center"
			initial={{ opacity: 1, scale: 1 }}
			animate={{
				opacity: 1,
				scale: item.state === "swapping" ? [1, 1.2, 1] : 1,
				y: item.state === "swapping" ? [0, -8, 0] : 0,
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
				className={cn(
					"flex h-14 w-14 items-center justify-center rounded-full border-2 border-white text-lg font-bold text-white shadow-lg transition-colors duration-300 ease-in-out",
					stateStyles[item.state],
				)}
				aria-label={`Value: ${item.value}`}
			>
				{item.value}
			</motion.div>
			<span className="text-muted-foreground mt-2 text-sm font-medium">{index}</span>
		</motion.div>
	);
}
