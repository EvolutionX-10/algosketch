"use client";

interface SortStepDescriptionProps {
	currentStepIndex: number;
	totalSteps: number;
	currentIndex: number;
	comparingIndex: number;
	minIndex: number;
	sortedIndices: number[];
	values: number[];
}

export default function SortStepDescription({
	currentStepIndex,
	totalSteps,
	currentIndex,
	comparingIndex,
	minIndex,
	sortedIndices,
	values,
}: SortStepDescriptionProps) {
	if (currentStepIndex === 0) {
		return (
			<div className="space-y-2">
				<h3 className="font-medium">Initial Unsorted Array</h3>
				<p>
					This is the starting array before any sorting operations. The selection sort algorithm will begin by finding
					the smallest element in the unsorted portion and placing it at the beginning.
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
	if (comparingIndex !== -1) {
		return (
			<div className="space-y-2">
				<h3 className="font-medium text-yellow-600 dark:text-yellow-400">Finding Minimum</h3>
				<p>
					Comparing elements at position {comparingIndex} (value: {values[comparingIndex]}) and the current minimum at
					position {minIndex} (value: {values[minIndex]}).
				</p>
				{minIndex === currentIndex && (
					<p className="text-sm">
						Starting the search - position {currentIndex} is temporarily considered the minimum.
					</p>
				)}
				<ul className="list-disc space-y-1 pl-5 text-sm">
					<li>
						Value at position {comparingIndex}: {values[comparingIndex]}
					</li>
					<li>
						Current minimum at position {minIndex}: {values[minIndex]}
					</li>
					<li>
						Conclusion:{" "}
						{values[comparingIndex] < values[minIndex]
							? `${values[comparingIndex]} < ${values[minIndex]}, found a new minimum`
							: `${values[comparingIndex]} ≥ ${values[minIndex]}, minimum unchanged`}
					</li>
				</ul>
			</div>
		);
	}

	if (currentIndex !== -1 && minIndex !== -1 && minIndex !== currentIndex) {
		return (
			<div className="space-y-2">
				<h3 className="font-medium text-red-600 dark:text-red-400">Swapping Elements</h3>
				<p>
					The minimum value in the unsorted portion is {values[minIndex]} at position {minIndex}.
				</p>
				<ul className="list-disc space-y-1 pl-5 text-sm">
					<li>
						Before swap: [{currentIndex}]={values[currentIndex]}, [{minIndex}]={values[minIndex]}
					</li>
					<li>
						After swap: [{currentIndex}]={values[minIndex]}, [{minIndex}]={values[currentIndex]}
					</li>
				</ul>
			</div>
		);
	}

	if (sortedIndices.length > 0 && currentIndex !== -1) {
		return (
			<div className="space-y-2">
				<h3 className="font-medium text-green-600 dark:text-green-400">Position Fixed</h3>
				<p>The element at position {sortedIndices[sortedIndices.length - 1]} is now in its correct sorted position.</p>
				<p className="text-sm">
					In selection sort, after each iteration, the smallest element from the unsorted portion is placed at the
					beginning of the unsorted part.
				</p>
				<p className="text-sm">Sorted positions: {sortedIndices.join(", ")}</p>
			</div>
		);
	}

	return (
		<div className="space-y-2">
			<h3 className="font-medium">Selection Sort in Progress</h3>
			<p>The algorithm is searching for the smallest element in the unsorted part of the array.</p>
			<p className="text-sm">Current sorted portion: {sortedIndices.length > 0 ? sortedIndices.join(", ") : "None"}</p>
		</div>
	);
}
