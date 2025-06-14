"use client";

interface InfoBoxProps {
	currentStep: number;
	comparisons: number;
	merges: number;
	divides: number;
	isSorted: boolean;
}

export default function InfoBox({ currentStep, comparisons, merges, divides, isSorted }: InfoBoxProps) {
	return (
		<div className="bg-background flex h-full flex-col gap-2 rounded-lg border p-4">
			<h3 className="text-lg font-medium">Algorithm Stats</h3>
			<div className="grid grid-cols-2 gap-2">
				<div className="flex flex-col">
					<span className="text-muted-foreground text-sm">Step</span>
					<span className="font-medium">{currentStep}</span>
				</div>
				<div className="flex flex-col">
					<span className="text-muted-foreground text-sm">Comparisons</span>
					<span className="font-medium">{comparisons}</span>
				</div>
				<div className="flex flex-col">
					<span className="text-muted-foreground text-sm">Divides</span>
					<span className="font-medium">{divides}</span>
				</div>
				<div className="flex flex-col">
					<span className="text-muted-foreground text-sm">Merges</span>
					<span className="font-medium">{merges}</span>
				</div>
				<div className="col-span-2 flex flex-col">
					<span className="text-muted-foreground text-sm">Status</span>
					<span
						className={`font-medium ${
							isSorted ? "text-green-500" : currentStep === 0 ? "text-blue-400" : "text-blue-500"
						}`}
					>
						{isSorted
							? "Sorted"
							: currentStep === 0
								? "Unsorted"
								: divides > merges
									? "Dividing phase"
									: "Merging phase"}
					</span>
				</div>
			</div>
		</div>
	);
}
