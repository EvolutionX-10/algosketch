"use client";

interface SortStepDescriptionProps {
	currentStepIndex: number;
	totalSteps: number;
	isComparing: boolean;
	isInserting: boolean;
	currentIndex: number;
	comparingIndex: number;
	insertPosition: number;
	sortedIndices: number[];
	values: number[];
}

export default function SortStepDescription({
	currentStepIndex,
	totalSteps,
	isComparing,
	isInserting,
	currentIndex,
	comparingIndex,
	insertPosition,
	sortedIndices,
	values,
}: SortStepDescriptionProps) {
	if (currentStepIndex === 0) {
		return (
			<div className="space-y-2">
				<h3 className="font-medium">Initial Array with First Element Sorted</h3>
				<p>
					Insertion sort starts with the first element already considered sorted. The algorithm will begin by taking the
					second element and inserting it into its correct position in the sorted portion.
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

	if (isComparing && !isInserting) {
		return (
			<div className="space-y-2">
				<h3 className="font-medium text-yellow-600 dark:text-yellow-400">Comparing Elements</h3>
				<p>
					Comparing the current element ({values[currentIndex]}) with the element at position {comparingIndex} (
					{values[comparingIndex]}):
				</p>
				<ul className="list-disc space-y-1 pl-5 text-sm">
					<li>
						Current element being processed: {values[currentIndex]} (index {currentIndex})
					</li>
					<li>
						Comparing with: {values[comparingIndex]} (index {comparingIndex})
					</li>
					<li>
						{values[comparingIndex] > values[currentIndex]
							? `${values[comparingIndex]} > ${values[currentIndex]}, need to shift ${values[comparingIndex]} to the right`
							: `${values[comparingIndex]} ≤ ${values[currentIndex]}, found insertion position at index ${
									comparingIndex + 1
								}`}
					</li>
				</ul>
			</div>
		);
	}

	if (isInserting) {
		return (
			<div className="space-y-2">
				<h3 className="font-medium text-red-600 dark:text-red-400">Inserting Element</h3>
				<p>
					Inserting the element {values[currentIndex]} into position {insertPosition}
				</p>
				<ul className="list-disc space-y-1 pl-5 text-sm">
					<li>
						Current element: {values[currentIndex]} (from index {currentIndex})
					</li>
					<li>Element has been shifted to make space for insertion</li>
					<li>The sorted portion now includes elements at indices {sortedIndices.join(", ")}</li>
				</ul>
			</div>
		);
	}

	if (sortedIndices.length > 0) {
		return (
			<div className="space-y-2">
				<h3 className="font-medium text-green-600 dark:text-green-400">Element Inserted</h3>
				<p>
					The element has been inserted into its correct position. The sorted portion now includes indices{" "}
					{sortedIndices.join(", ")}.
				</p>
				<p className="text-sm">
					In insertion sort, after each iteration, one more element becomes part of the sorted portion of the array.
				</p>
			</div>
		);
	}

	return (
		<div className="space-y-2">
			<h3 className="font-medium">Sorting in Progress</h3>
			<p>
				The insertion sort algorithm is processing the array, selecting elements one by one and inserting them into
				their correct position in the sorted portion of the array.
			</p>
		</div>
	);
}
