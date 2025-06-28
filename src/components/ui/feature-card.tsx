"use client";

import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
	title: string;
	description: string;
	icon: LucideIcon;
	color?: string;
	features?: string[];
	complexity?: {
		time: string;
		space: string;
	};
	difficulty?: "Easy" | "Medium" | "Hard";
	className?: string;
}

export function FeatureCard({
	title,
	description,
	icon: Icon,
	color = "bg-primary",
	features,
	complexity,
	difficulty,
	className,
}: FeatureCardProps) {
	const getDifficultyColor = (diff: string) => {
		switch (diff) {
			case "Easy":
				return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
			case "Medium":
				return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
			case "Hard":
				return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
			default:
				return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
		}
	};

	return (
		<Card className={cn("group transition-all hover:scale-[1.02] hover:shadow-lg", className)}>
			<CardContent className="p-6">
				<div className="flex items-start gap-4">
					<div className={cn("flex h-12 w-12 items-center justify-center rounded-lg text-white", color)}>
						<Icon className="h-6 w-6" />
					</div>
					<div className="flex-1 space-y-3">
						<div>
							<h3 className="font-heading text-lg font-semibold">{title}</h3>
							<p className="text-muted-foreground text-sm">{description}</p>
						</div>

						{features && (
							<div className="flex flex-wrap gap-1">
								{features.map((feature, index) => (
									<Badge key={index} variant="outline" className="text-xs">
										{feature}
									</Badge>
								))}
							</div>
						)}

						{complexity && (
							<div className="grid grid-cols-2 gap-4 text-sm">
								<div>
									<span className="text-muted-foreground">Time: </span>
									<span className="font-mono font-medium">{complexity.time}</span>
								</div>
								<div>
									<span className="text-muted-foreground">Space: </span>
									<span className="font-mono font-medium">{complexity.space}</span>
								</div>
							</div>
						)}

						{difficulty && (
							<div className="flex justify-end">
								<Badge className={`text-xs ${getDifficultyColor(difficulty)}`}>{difficulty}</Badge>
							</div>
						)}
					</div>
				</div>
			</CardContent>
		</Card>
	);
}

interface FeatureGridProps {
	features: Array<FeatureCardProps>;
	columns?: 1 | 2 | 3;
	className?: string;
}

export function FeatureGrid({ features, columns = 2, className }: FeatureGridProps) {
	const gridCols = {
		1: "grid-cols-1",
		2: "grid-cols-1 md:grid-cols-2",
		3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
	};

	return (
		<div className={cn("grid gap-6", gridCols[columns], className)}>
			{features.map((feature, index) => (
				<FeatureCard key={index} {...feature} />
			))}
		</div>
	);
}
