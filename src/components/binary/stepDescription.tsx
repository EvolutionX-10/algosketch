"use client";

import { SearchingStep } from "./binarySearch";

interface SearchStepDescriptionProps {
	step: SearchingStep | undefined;
	stepIndex: number;
}

export default function SearchStepDescription({ step, stepIndex }: SearchStepDescriptionProps) {
	if (!step) {
		return (
			<div className="rounded-lg border p-4 shadow-sm">
				<h3 className="mb-3 text-lg font-semibold">Step Description</h3>
				<p className="text-muted-foreground">Initializing binary search...</p>
			</div>
		);
	}

	const getStepDescription = () => {
		if (stepIndex === 0) {
			return {
				title: "Search Initialization",
				description: `Starting binary search for target value ${step.target} in sorted array. Initial search range: [${step.left}, ${step.right}] with ${step.right - step.left + 1} elements.`,
			};
		}

		if (step.finished) {
			if (step.found) {
				return {
					title: "Target Found!",
					description: `Success! Found target value ${step.target} at index ${step.mid}. Binary search completed in ${stepIndex} comparison${stepIndex === 1 ? "" : "s"}.`,
				};
			} else {
				return {
					title: "Target Not Found",
					description: `Search completed. Target value ${step.target} is not present in the array. Exhausted all possibilities in ${stepIndex} comparison${stepIndex === 1 ? "" : "s"}.`,
				};
			}
		}

		const midValue = step.array[step.mid]?.value;
		const searchSpaceSize = step.right - step.left + 1;

		let comparisonText = "";
		let nextStepText = "";

		if (step.comparison === "equal") {
			comparisonText = `Perfect match! arr[${step.mid}] = ${midValue} equals target ${step.target}.`;
			nextStepText = "Target found!";
		} else if (step.comparison === "less") {
			comparisonText = `arr[${step.mid}] = ${midValue} < ${step.target} (target).`;
			nextStepText = `Target must be in right half. New search range: [${step.mid + 1}, ${step.right}].`;
		} else if (step.comparison === "greater") {
			comparisonText = `arr[${step.mid}] = ${midValue} > ${step.target} (target).`;
			nextStepText = `Target must be in left half. New search range: [${step.left}, ${step.mid - 1}].`;
		}

		return {
			title: `Step ${stepIndex}: Check Middle Element`,
			description: `Examining middle element at index ${step.mid} in range [${step.left}, ${step.right}] (${searchSpaceSize} elements). ${comparisonText} ${nextStepText}`,
		};
	};
	const { title, description } = getStepDescription();

	return (
		<div className="rounded-lg border p-4 shadow-sm">
			<div className="space-y-2">
				<h3 className="font-medium">{title}</h3>
				<p className="text-muted-foreground text-sm leading-relaxed">{description}</p>

				{step.left >= 0 && step.right >= 0 && !step.finished && (
					<div className="bg-muted/50 rounded-md p-3">
						<div className="text-sm">
							<span className="font-medium">Search Space:</span> {step.right - step.left + 1} elements remaining
						</div>
						<div className="bg-background mt-2 h-2 overflow-hidden rounded-full">
							<div
								className="h-full bg-blue-500 transition-all duration-300"
								style={{
									width: `${100 - ((step.right - step.left + 1) / step.array.length) * 100}%`,
								}}
							/>
						</div>
						<div className="text-muted-foreground mt-1 text-xs">
							Eliminated {step.array.length - (step.right - step.left + 1)} of {step.array.length} elements
						</div>
					</div>
				)}

				{step.mid >= 0 && !step.finished && (
					<div className="mt-3 rounded-md border border-blue-200 bg-blue-50 p-3 dark:border-blue-800 dark:bg-blue-950/30">
						<div className="text-sm text-blue-800 dark:text-blue-200">
							<span className="font-medium">Divide & Conquer:</span> Each comparison eliminates half of the remaining
							search space.{" "}
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
