"use client";

export default function Legend() {
	const legendItems = [
		{ color: "bg-blue-500", label: "In Range" },
		{ color: "bg-yellow-500", label: "Checking Mid" },
		{ color: "bg-green-500", label: "Found" },
		{ color: "bg-gray-400", label: "Eliminated" },
		{ color: "bg-red-500", label: "Not Found" },
	];
	return (
		<div className="bg-background mt-2 flex flex-wrap items-center gap-4 rounded-lg border p-2">
			{legendItems.map((item, index) => (
				<div key={index} className="flex items-center gap-1">
					<div className={`h-4 w-4 ${item.color} rounded`}></div>
					<span className="text-sm">{item.label}</span>
				</div>
			))}
		</div>
	);
}
