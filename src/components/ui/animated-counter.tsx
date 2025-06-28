"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface AnimatedCounterProps {
	from?: number;
	to: number;
	duration?: number;
	className?: string;
	suffix?: string;
	prefix?: string;
}

export function AnimatedCounter({
	from = 0,
	to,
	duration = 2000,
	className,
	suffix = "",
	prefix = "",
}: AnimatedCounterProps) {
	const [count, setCount] = useState(from);

	useEffect(() => {
		const startTime = Date.now();
		const timer = setInterval(() => {
			const now = Date.now();
			const elapsed = now - startTime;
			const progress = Math.min(elapsed / duration, 1);

			// Easing function for smooth animation
			const easeOutCubic = 1 - Math.pow(1 - progress, 3);
			const currentCount = from + (to - from) * easeOutCubic;

			setCount(Math.floor(currentCount));

			if (progress >= 1) {
				clearInterval(timer);
				setCount(to);
			}
		}, 16); // ~60fps

		return () => clearInterval(timer);
	}, [from, to, duration]);

	return (
		<span className={cn("font-bold tabular-nums", className)}>
			{prefix}
			{count === to && to === Infinity ? "∞" : count}
			{suffix}
		</span>
	);
}

interface AnimatedStatsProps {
	stats: Array<{
		label: string;
		value: number | string;
		suffix?: string;
		prefix?: string;
		delay?: number;
	}>;
	className?: string;
}

export function AnimatedStats({ stats, className }: AnimatedStatsProps) {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => setIsVisible(true), 100);
		return () => clearTimeout(timer);
	}, []);

	return (
		<div className={cn("grid grid-cols-1 gap-8 sm:grid-cols-3", className)}>
			{stats.map((stat, index) => (
				<div
					key={index}
					className="text-center"
					style={{
						animationDelay: `${(stat.delay || 0) + index * 200}ms`,
						opacity: isVisible ? 1 : 0,
						animation: isVisible ? "fadeInUp 0.6s ease-out forwards" : "none",
					}}
				>
					<div className="text-gradient-animated text-3xl font-bold">
						{typeof stat.value === "number" && isVisible ? (
							<AnimatedCounter to={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
						) : (
							<span>
								{stat.prefix}
								{stat.value}
								{stat.suffix}
							</span>
						)}
					</div>
					<div className="text-muted-foreground text-sm">{stat.label}</div>
				</div>
			))}
		</div>
	);
}

interface AnimatedProgressProps {
	value: number;
	max?: number;
	className?: string;
	showValue?: boolean;
	animated?: boolean;
}

export function AnimatedProgress({
	value,
	max = 100,
	className,
	showValue = true,
	animated = true,
}: AnimatedProgressProps) {
	const [currentValue, setCurrentValue] = useState(0);
	const percentage = Math.min((value / max) * 100, 100);

	useEffect(() => {
		if (!animated) {
			setCurrentValue(percentage);
			return;
		}

		const timer = setTimeout(() => {
			setCurrentValue(percentage);
		}, 100);

		return () => clearTimeout(timer);
	}, [percentage, animated]);

	return (
		<div className={cn("space-y-2", className)}>
			{showValue && (
				<div className="flex justify-between text-sm">
					<span className="text-muted-foreground">Progress</span>
					<span className="font-medium">{Math.round(currentValue)}%</span>
				</div>
			)}
			<div className="bg-muted h-2 overflow-hidden rounded-full">
				<div
					className="from-primary to-primary/80 h-full bg-gradient-to-r transition-all duration-1000 ease-out"
					style={{ width: `${currentValue}%` }}
				/>
			</div>
		</div>
	);
}
