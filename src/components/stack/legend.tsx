"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InfoIcon } from "lucide-react";

const legendItems = [
	{
		color: "bg-blue-500",
		label: "Default",
		description: "Element in stack",
	},
	{
		color: "bg-green-500",
		label: "Pushing",
		description: "Element being added",
	},
	{
		color: "bg-red-500",
		label: "Popping",
		description: "Element being removed",
	},
	{
		color: "bg-yellow-500",
		label: "Top",
		description: "Top element (current focus)",
	},
	{
		color: "bg-gray-300",
		label: "Empty",
		description: "Stack is empty",
	},
];

export default function Legend() {
	return (
		<Card className="bg-card/50 backdrop-blur-sm">
			<CardHeader className="pb-3">
				<CardTitle className="flex items-center gap-2 text-sm">
					<InfoIcon className="text-primary h-4 w-4" />
					Legend
				</CardTitle>
			</CardHeader>
			<CardContent className="pt-0">
				<div className="grid grid-cols-2 gap-2 md:grid-cols-5">
					{legendItems.map((item, index) => (
						<div key={index} className="flex items-center gap-2">
							<div className={`h-3 w-3 rounded ${item.color} border border-gray-600`} />
							<div className="flex flex-col">
								<span className="text-xs font-medium">{item.label}</span>
								<span className="text-muted-foreground hidden text-xs lg:block">{item.description}</span>
							</div>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
}
