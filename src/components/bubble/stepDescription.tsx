"use client";

interface SortStepDescriptionProps {
	currentStepIndex: number;
	totalSteps: number;
	isComparing: boolean;
	isSwapping: boolean;
	compareIndices: number[];
	sortedIndices: number[];
	values: number[];
}

export default function SortStepDescription({
	currentStepIndex,
	totalSteps,
	isComparing,
	isSwapping,
	compareIndices,
	sortedIndices,
	values,
}: SortStepDescriptionProps) {
	if (currentStepIndex === 0) {
		return (
			<div className="space-y-2">
				<h3 className="font-medium">Initial Unsorted Array</h3>
				<p>
					This is the starting array before any sorting operations. The bubble sort algorithm will begin by comparing
					adjacent elements and swapping them if needed.
				</p>
			</div>
		);
	}

	if (currentStepIndex === totalSteps) {
		return (
			<div className="space-y-2">
				<h3 className="font-medium text-green-600 dark:text-green-400">Array Sorted!</h3>
				<p>The sorting algorithm has completed. All elements are now in their correct positions in ascending order.</p>
				<ul className="list-disc space-y-1 pl-5 text-sm">
					<li>Total number of steps: {totalSteps}</li>
					<li>Sorted array is now stable and in order</li>
				</ul>
			</div>
		);
	}

	if (isComparing && !isSwapping) {
		const [i, j] = compareIndices;
		return (
			<div className="space-y-2">
				<h3 className="font-medium text-yellow-600 dark:text-yellow-400">Comparing Elements</h3>
				<p>
					Comparing elements at positions {i} and {j}:
				</p>
				<ul className="list-disc space-y-1 pl-5 text-sm">
					<li>
						Value at position {i}: {values[i]}
					</li>
					<li>
						Value at position {j}: {values[j]}
					</li>
					<li>
						Conclusion:{" "}
						{values[i] <= values[j]
							? `${values[i]} ≤ ${values[j]}, no swap needed`
							: `${values[i]} > ${values[j]}, swap needed`}
					</li>
				</ul>
			</div>
		);
	}

	if (isSwapping) {
		const [i, j] = compareIndices;
		return (
			<div className="space-y-2">
				<h3 className="font-medium text-red-600 dark:text-red-400">Swapping Elements</h3>
				<p>
					The elements at positions {i} and {j} need to be swapped because {values[i]} &gt; {values[j]}
				</p>
				<ul className="list-disc space-y-1 pl-5 text-sm">
					<li>
						Before swap: [{i}]={values[i]}, [{j}]={values[j]}
					</li>
					<li>
						After swap: [{i}]={values[j]}, [{j}]={values[i]}
					</li>
				</ul>
			</div>
		);
	}

	if (sortedIndices.length > 0) {
		return (
			<div className="space-y-2">
				<h3 className="font-medium text-green-600 dark:text-green-400">Elements Sorted</h3>
				<p>The element(s) at position(s) {sortedIndices.join(", ")} are now in their correct sorted position.</p>
				<p className="text-sm">
					In bubble sort, after each complete pass through the array, the largest remaining element "bubbles up" to its
					correct position at the end of the unsorted portion.
				</p>
			</div>
		);
	}

	return (
		<div className="space-y-2">
			<h3 className="font-medium">Sorting in Progress</h3>
			<p>
				The bubble sort algorithm is iterating through the array, comparing and swapping elements as needed to move
				larger values toward the end.
			</p>
		</div>
	);
}
