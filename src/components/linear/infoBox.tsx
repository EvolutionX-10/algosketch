"use client";

interface InfoBoxProps {
	comparisons: number;
	target: number;
	found: boolean;
	finished: boolean;
	currentIndex: number;
	arrayLength: number;
}

export default function InfoBox({ comparisons, target, found, finished, currentIndex, arrayLength }: InfoBoxProps) {
	return (
		<div className="rounded-lg border p-4 shadow-sm">
			<div className="space-y-3">
				<div className="flex justify-between">
					<span className="text-muted-foreground">Target:</span>
					<span className="font-medium">{target}</span>
				</div>
				<div className="flex justify-between">
					<span className="text-muted-foreground">Comparisons:</span>
					<span className="font-medium">{comparisons}</span>
				</div>
				<div className="flex justify-between">
					<span className="text-muted-foreground">Current Index:</span>
					<span className="font-medium">{currentIndex >= 0 ? currentIndex : "—"}</span>
				</div>
				<div className="flex justify-between">
					<span className="text-muted-foreground">Array Length:</span>
					<span className="font-medium">{arrayLength}</span>
				</div>
				<div className="flex justify-between">
					<span className="text-muted-foreground">Progress:</span>
					<span className="font-medium">
						{finished ? "100%" : `${Math.round((Math.max(0, currentIndex) / arrayLength) * 100)}%`}
					</span>
				</div>
				<div className="border-border border-t pt-3">
					<div className="flex justify-between">
						<span className="text-muted-foreground">Status:</span>
						<span
							className={`font-medium ${finished ? (found ? "text-green-600" : "text-red-600") : "text-yellow-600"}`}
						>
							{finished ? (found ? "Target Found!" : "Target Not Found") : "Searching..."}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}
