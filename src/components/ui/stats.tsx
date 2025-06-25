"use client";

import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon, Activity, BookOpen, Star, BarChart3, Search, Code, TrendingUp } from "lucide-react";

// Icon mapping for string-based icon names
const iconMap: Record<string, LucideIcon> = {
	Activity,
	BookOpen,
	Star,
	BarChart3,
	Search,
	Code,
	TrendingUp,
};

interface StatsCardProps {
	title: string;
	value: string | number;
	icon?: LucideIcon | string;
	description?: string;
	trend?: {
		value: number;
		isPositive: boolean;
	};
	className?: string;
}

export function StatsCard({ title, value, icon, description, trend, className }: StatsCardProps) {
	// Handle both icon component and string icon name
	const IconComponent = typeof icon === "string" ? iconMap[icon] : icon;

	return (
		<Card className={cn("border-dashed transition-all hover:shadow-md", className)}>
			<CardContent className="p-6">
				<div className="flex items-center justify-between">
					<div className="space-y-1">
						<p className="text-muted-foreground text-sm">{title}</p>
						<p className="text-2xl font-bold">{value}</p>
						{description && <p className="text-muted-foreground text-xs">{description}</p>}
					</div>
					{IconComponent && (
						<div className="bg-primary/10 text-primary flex h-12 w-12 items-center justify-center rounded-lg">
							<IconComponent className="h-6 w-6" />
						</div>
					)}
				</div>
				{trend && (
					<div className="mt-4 flex items-center gap-2">
						<div
							className={cn("flex items-center gap-1 text-xs", trend.isPositive ? "text-green-600" : "text-red-600")}
						>
							<span className="font-medium">
								{trend.isPositive ? "+" : ""}
								{trend.value}%
							</span>
						</div>
						<span className="text-muted-foreground text-xs">from last month</span>
					</div>
				)}
			</CardContent>
		</Card>
	);
}

interface StatsGridProps {
	stats: Array<Omit<StatsCardProps, "className">>;
	columns?: 2 | 3 | 4;
	className?: string;
}

export function StatsGrid({ stats, columns = 3, className }: StatsGridProps) {
	const gridCols = {
		2: "grid-cols-1 sm:grid-cols-2",
		3: "grid-cols-1 sm:grid-cols-3",
		4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
	};

	return (
		<div className={cn("grid gap-4", gridCols[columns], className)}>
			{stats.map((stat, index) => (
				<StatsCard key={index} {...stat} />
			))}
		</div>
	);
}
