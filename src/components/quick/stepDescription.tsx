"use client";

interface SortStepDescriptionProps {
	currentStepIndex: number;
	totalSteps: number;
	pivotIndex: number;
	comparingIndices: number[];
	swappingIndices: number[];
	partitionIndices: [number, number];
	sortedIndices: number[];
	isPartitioning: boolean;
	isSwapping: boolean;
	values: number[];
}

export default function SortStepDescription({
	currentStepIndex,
	totalSteps,
	pivotIndex,
	comparingIndices,
	swappingIndices,
	partitionIndices,
	sortedIndices,
	isPartitioning,
	isSwapping,
	values,
}: SortStepDescriptionProps) {
	if (currentStepIndex === 0) {
		return (
			<div className="space-y-2">
				<h3 className="font-medium text-blue-600 dark:text-blue-400">Initial State</h3>
				<p>Starting Quick Sort with an unsorted array.</p>
				<p className="text-sm">
					Quick Sort uses a divide-and-conquer approach by selecting a pivot element and partitioning the array around
					it.
				</p>
			</div>
		);
	}

	if (currentStepIndex === totalSteps - 1) {
		return (
			<div className="space-y-2">
				<h3 className="font-medium text-green-600 dark:text-green-400">Sorting Complete!</h3>
				<p>The array has been successfully sorted using Quick Sort.</p>
				<p className="text-sm">
					All elements are now in their correct positions. Quick Sort achieved this through recursive partitioning.
				</p>
			</div>
		);
	}

	if (pivotIndex !== -1 && !isPartitioning && !isSwapping && comparingIndices.length === 0) {
		return (
			<div className="space-y-2">
				<h3 className="font-medium text-purple-600 dark:text-purple-400">Pivot Selected</h3>
				<p>
					Selected element at position {pivotIndex} (value: {values[pivotIndex]}) as the pivot.
				</p>
				<p className="text-sm">
					The pivot will be used to partition the array. Elements smaller than or equal to the pivot will go to the
					left, and larger elements will go to the right.
				</p>
			</div>
		);
	}

	if (comparingIndices.length > 0 && !isSwapping) {
		const [compareIndex] = comparingIndices;
		const compareValue = values[compareIndex];
		const pivotValue = values[pivotIndex];

		return (
			<div className="space-y-2">
				<h3 className="font-medium text-yellow-600 dark:text-yellow-400">Comparing Elements</h3>
				<p>
					Comparing element at position {compareIndex} (value: {compareValue}) with pivot (value: {pivotValue}).
				</p>
				<ul className="list-inside list-disc space-y-1 text-sm">
					<li>
						{compareValue <= pivotValue
							? `${compareValue} ≤ ${pivotValue}, so it belongs in the left partition`
							: `${compareValue} > ${pivotValue}, so it belongs in the right partition`}
					</li>
				</ul>
			</div>
		);
	}

	if (isSwapping && swappingIndices.length > 0) {
		const [i, j] = swappingIndices;
		return (
			<div className="space-y-2">
				<h3 className="font-medium text-red-600 dark:text-red-400">Swapping Elements</h3>
				<p>
					Swapping elements at positions {i} and {j}.
				</p>
				<ul className="list-inside list-disc space-y-1 text-sm">
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

	if (pivotIndex !== -1 && sortedIndices.includes(pivotIndex) && !isPartitioning) {
		return (
			<div className="space-y-2">
				<h3 className="font-medium text-green-600 dark:text-green-400">Partition Complete</h3>
				<p>
					Pivot element at position {pivotIndex} (value: {values[pivotIndex]}) is now in its correct sorted position.
				</p>
				<p className="text-sm">
					All elements to the left are smaller than or equal to the pivot, and all elements to the right are larger. The
					algorithm will now recursively sort the left and right partitions.
				</p>
			</div>
		);
	}

	if (isPartitioning) {
		const [low, high] = partitionIndices;
		return (
			<div className="space-y-2">
				<h3 className="font-medium text-orange-600 dark:text-orange-400">Partitioning Array</h3>
				<p>
					Partitioning elements from position {low} to {high} around pivot at position {pivotIndex}.
				</p>
				<p className="text-sm">
					Elements are being rearranged so that smaller values are on the left of the pivot and larger values are on the
					right.
				</p>
			</div>
		);
	}

	if (sortedIndices.length > 0) {
		return (
			<div className="space-y-2">
				<h3 className="font-medium text-green-600 dark:text-green-400">Elements Sorted</h3>
				<p>Elements at positions {sortedIndices.slice(-3).join(", ")} are now in their correct sorted positions.</p>
				<p className="text-sm">
					These elements have been placed correctly through the partitioning process and will not be moved again.
				</p>
			</div>
		);
	}

	return (
		<div className="space-y-2">
			<h3 className="font-medium">Quick Sort in Progress</h3>
			<p>Working on partitioning the array around selected pivots.</p>
		</div>
	);
}
