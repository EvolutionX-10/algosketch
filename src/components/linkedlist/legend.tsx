"use client";

export default function Legend() {
	return (
		<div className="bg-card flex flex-wrap gap-4 rounded-lg border p-3">
			<div className="flex items-center gap-2">
				<div className="h-4 w-4 rounded bg-purple-500"></div>
				<span className="text-sm">Head</span>
			</div>
			<div className="flex items-center gap-2">
				<div className="h-4 w-4 rounded bg-orange-500"></div>
				<span className="text-sm">Tail</span>
			</div>
			<div className="flex items-center gap-2">
				<div className="h-4 w-4 rounded bg-blue-500"></div>
				<span className="text-sm">Default</span>
			</div>
			<div className="flex items-center gap-2">
				<div className="h-4 w-4 rounded bg-green-500"></div>
				<span className="text-sm">Inserting</span>
			</div>
			<div className="flex items-center gap-2">
				<div className="h-4 w-4 rounded bg-red-500"></div>
				<span className="text-sm">Deleting</span>
			</div>
			<div className="flex items-center gap-2">
				<div className="h-4 w-4 rounded bg-yellow-500"></div>
				<span className="text-sm">Searching</span>
			</div>
			<div className="flex items-center gap-2">
				<div className="h-4 w-4 rounded bg-emerald-500"></div>
				<span className="text-sm">Found</span>
			</div>
		</div>
	);
}
