"use client";

interface InfoBoxProps {
	comparisons: number;
	target: number;
	found: boolean;
	finished: boolean;
	left: number;
	right: number;
	mid: number;
	arrayLength: number;
}

export default function InfoBox({ comparisons, target, found, finished, left, right, mid, arrayLength }: InfoBoxProps) {
	const remainingElements = left >= 0 && right >= 0 ? right - left + 1 : arrayLength;
	return (
		<div className="rounded-lg border p-4">
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
					<span className="text-muted-foreground">Left Bound:</span>
					<span className="font-medium">{left >= 0 ? left : "—"}</span>
				</div>
				<div className="flex justify-between">
					<span className="text-muted-foreground">Right Bound:</span>
					<span className="font-medium">{right >= 0 ? right : "—"}</span>
				</div>
				<div className="flex justify-between">
					<span className="text-muted-foreground">Mid Index:</span>
					<span className="font-medium">{mid >= 0 ? mid : "—"}</span>
				</div>
				<div className="flex justify-between">
					<span className="text-muted-foreground">Remaining Elements:</span>
					<span className="font-medium">{finished ? 0 : remainingElements}</span>
				</div>
				<div className="flex justify-between">
					<span className="text-muted-foreground">Array Length:</span>
					<span className="font-medium">{arrayLength}</span>
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
