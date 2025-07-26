"use client";

import { BarChart3, Circle } from "lucide-react";
import { motion } from "motion/react";

interface VisualizationSwitcherProps {
	mode: "bar" | "node";
	onModeChangeAction: (mode: "bar" | "node") => void;
	disabled?: boolean;
}

export default function VisualizationSwitcher({
	mode,
	onModeChangeAction,
	disabled = false,
}: VisualizationSwitcherProps) {
	return (
		<div className="bg-muted relative flex items-center rounded-lg p-1">
			<motion.div
				className="bg-background absolute inset-y-1 rounded-md border shadow-sm"
				initial={false}
				animate={{
					x: mode === "bar" ? 4 : "calc(100%)",
					width: mode === "bar" ? "calc(45%)" : "calc(50% - 5px)",
				}}
				transition={{
					type: "spring",
					stiffness: 300,
					damping: 30,
				}}
			/>

			<motion.button
				onClick={() => onModeChangeAction("bar")}
				disabled={disabled}
				className="relative z-10 flex h-8 flex-1 cursor-pointer items-center justify-center gap-1.5 px-3 text-sm font-medium"
				animate={{
					color: mode === "bar" ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground))",
				}}
				transition={{ duration: 0.2 }}
			>
				<BarChart3 className="h-4 w-4" />
				Bars
			</motion.button>

			<motion.button
				onClick={() => onModeChangeAction("node")}
				disabled={disabled}
				className="relative z-10 flex h-8 flex-1 cursor-pointer items-center justify-center gap-1.5 px-3 text-sm font-medium"
				animate={{
					color: mode === "node" ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground))",
				}}
				transition={{ duration: 0.2 }}
			>
				<Circle className="h-4 w-4" />
				Nodes
			</motion.button>
		</div>
	);
}
