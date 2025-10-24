import { Card, CardContent } from "@/components/ui/card";

export default function Legend() {
	const legendItems = [
		{ color: "bg-purple-500", label: "Root", description: "Root node of the tree" },
		{ color: "bg-blue-500", label: "Default", description: "Regular tree nodes" },
		{ color: "bg-green-500", label: "Inserting", description: "Node being inserted" },
		{ color: "bg-red-500", label: "Deleting", description: "Node being deleted" },
		{ color: "bg-yellow-500", label: "Searching", description: "Node being searched" },
		{ color: "bg-emerald-500", label: "Found", description: "Search result found" },
		{ color: "bg-gray-500", label: "Not Found", description: "Search unsuccessful" },
	];

	return (
		<Card className="w-full">
			<CardContent className="p-3">
				<div className="flex flex-wrap items-center gap-4">
					<span className="text-sm font-medium">Legend:</span>
					{legendItems.map((item, index) => (
						<div key={index} className="flex items-center gap-2">
							<div className={`h-3 w-3 rounded ${item.color}`}></div>
							<span className="text-xs text-muted-foreground">{item.label}</span>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
}