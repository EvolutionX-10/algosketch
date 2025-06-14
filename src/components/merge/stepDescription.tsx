"use client";

interface SortStepDescriptionProps {
	currentStepIndex: number;
	totalSteps: number;
	isComparing: boolean;
	isMerging: boolean;
	compareIndices: number[];
	mergedIndices: number[];
	values: number[];
	isDividing?: boolean;
	subArrayBounds?: number[];
}

export default function SortStepDescription({
	currentStepIndex,
	totalSteps,
	isComparing,
	isMerging,
	compareIndices,
	mergedIndices,
	values,
	isDividing,
	subArrayBounds = [0, 0],
}: SortStepDescriptionProps) {
	const [start, end] = subArrayBounds;

	if (currentStepIndex === 0) {
		return (
			<div className="space-y-2">
				<h3 className="font-medium">Initial Unsorted Array</h3>
				<p>
					This is the starting array before any sorting operations. The merge sort algorithm will begin by dividing the
					array into smaller subarrays.
				</p>
				<p className="mt-2 text-sm italic">
					Merge Sort uses the divide-and-conquer paradigm:
					<br />
					1. Divide: Split the array into halves until you have subarrays of size 1
					<br />
					2. Conquer: Sort the subarrays
					<br />
					3. Combine: Merge the sorted subarrays back together
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
					<li>Merge Sort is efficient with O(n log n) time complexity</li>
				</ul>
			</div>
		);
	}

	if (isDividing) {
		return (
			<div className="space-y-2">
				<h3 className="font-medium text-yellow-600 dark:text-yellow-400">Dividing Phase</h3>
				<p>
					Dividing the subarray from index {start} to {end}.
				</p>
				<p className="mt-2 text-sm">
					This is the <strong>Divide</strong> step of divide-and-conquer. We're breaking the problem into smaller pieces
					by splitting the array into halves until we reach subarrays of size 1, which are inherently sorted.
				</p>
				<ul className="mt-1 list-disc space-y-1 pl-5 text-xs">
					<li>Current subarray length: {end - start + 1}</li>
					<li>Will be split at middle index: {Math.floor((start + end) / 2)}</li>
				</ul>
			</div>
		);
	}

	if (isComparing) {
		const [i, j] = compareIndices;
		return (
			<div className="space-y-2">
				<h3 className="font-medium text-fuchsia-600 dark:text-fuchsia-400">Comparing Elements</h3>
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
						{values[i] <= values[j]
							? `${values[i]} is smaller or equal, will be placed first`
							: `${values[j]} is smaller, will be placed first`}
					</li>
				</ul>
				<p className="mt-2 text-sm italic">
					We're in the <strong>Combine</strong> phase, merging smaller sorted arrays by comparing elements.
				</p>
			</div>
		);
	}

	if (isMerging) {
		return (
			<div className="space-y-2">
				<h3 className="font-medium text-red-600 dark:text-red-400">Merging Phase</h3>
				<p>
					Merging the sorted subarrays from index {start} to {end}.
				</p>
				<p className="mt-2 text-sm">
					This is the <strong>Combine</strong> step of divide-and-conquer. After both halves are sorted, we merge them
					back together to create a larger sorted array.
				</p>
				{mergedIndices.length > 0 && (
					<ul className="mt-1 list-disc space-y-1 pl-5 text-xs">
						<li>Indices being merged: [{mergedIndices.join(", ")}]</li>
						<li>Subarray size: {end - start + 1}</li>
					</ul>
				)}
			</div>
		);
	}

	return (
		<div className="space-y-2">
			<h3 className="font-medium">Sorting in Progress</h3>
			<p>The sorting algorithm is currently processing the array.</p>
			<p className="mt-2 text-sm italic">
				Merge Sort works by splitting the array (divide), sorting each part (conquer), and then combining them (merge).
			</p>
		</div>
	);
}
