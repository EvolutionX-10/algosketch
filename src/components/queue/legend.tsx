"use client";

import { Card, CardContent } from "@/components/ui/card";

const legendItems = [
	{
		color: "bg-blue-500",
		label: "Default",
		description: "Element in queue",
	},
	{
		color: "bg-green-500",
		label: "Enqueuing",
		description: "Element being added",
	},
	{
		color: "bg-yellow-500",
		label: "Front",
		description: "Front element (first out)",
	},
	{
		color: "bg-purple-500",
		label: "Rear",
		description: "Rear element (last in)",
	},
	{
		color: "bg-gray-300",
		label: "Empty",
		description: "Queue is empty",
	},
];

export default function Legend() {
	return (
		<Card className="bg-card/50 backdrop-blur-sm">
			<CardContent className="pt-0">
				<div className="grid grid-cols-2 gap-2 md:grid-cols-5">
					{legendItems.map((item, index) => (
						<div
							key={index}
							className="flex items-start justify-center gap-2 max-md:grid max-md:grid-cols-[auto_1fr] max-md:items-center max-md:gap-x-2 max-md:gap-y-0"
						>
							<div className={`mt-1 h-4 w-4 rounded ${item.color} border border-gray-600/30`} />
							<div className="flex flex-col">
								<span className="text-sm font-medium">{item.label}</span>
								<span className="text-muted-foreground hidden text-xs lg:block">{item.description}</span>
							</div>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
}
