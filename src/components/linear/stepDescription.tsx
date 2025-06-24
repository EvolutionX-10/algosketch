"use client";

import { SearchingStep } from "./linearSearch";

interface SearchStepDescriptionProps {
	step: SearchingStep | undefined;
	stepIndex: number;
}

export default function SearchStepDescription({ step, stepIndex }: SearchStepDescriptionProps) {
	if (!step) {
		return (
			<div className="rounded-lg border p-4 shadow-sm">
				<h3 className="mb-3 text-lg font-semibold">Step Description</h3>
				<p className="text-muted-foreground">Initializing search...</p>
			</div>
		);
	}

	const getStepDescription = () => {
		if (stepIndex === 0) {
			return {
				title: "Search Initialization",
				description: `Starting linear search for target value ${step.target}. We'll check each element sequentially from left to right.`,
			};
		}

		if (step.finished) {
			if (step.found) {
				return {
					title: "Target Found!",
					description: `Success! Found target value ${step.target} at index ${step.currentIndex}. Linear search completed in ${step.currentIndex + 1} comparison${step.currentIndex === 0 ? "" : "s"}.`,
				};
			} else {
				return {
					title: "Target Not Found",
					description: `Search completed. Target value ${step.target} is not present in the array. Checked all ${step.array.length} elements.`,
				};
			}
		}

		const currentValue = step.array[step.currentIndex]?.value;
		return {
			title: `Step ${stepIndex}: Checking Index ${step.currentIndex}`,
			description: `Comparing element at index ${step.currentIndex} (value: ${currentValue}) with target ${step.target}. ${
				currentValue === step.target
					? "Match found! This is our target."
					: `No match (${currentValue} ≠ ${step.target}). Continue to next element.`
			}`,
		};
	};

	const { title, description } = getStepDescription();

	return (
		<div className="rounded-lg border p-4 shadow-sm">
			<div className="space-y-2">
				<h3 className="font-medium">{title}</h3>
				<p className="text-muted-foreground text-sm leading-relaxed">{description}</p>

				{step.currentIndex >= 0 && !step.finished && (
					<div className="bg-muted/50 mt-3 rounded-md p-3">
						<p className="text-sm">
							<span className="font-medium">Algorithm Progress:</span> Examining element {step.currentIndex + 1} of{" "}
							{step.array.length}
						</p>
						<div className="bg-background mt-2 h-2 overflow-hidden rounded-full">
							<div
								className="h-full bg-blue-500 transition-all duration-300"
								style={{ width: `${((step.currentIndex + 1) / step.array.length) * 100}%` }}
							/>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
