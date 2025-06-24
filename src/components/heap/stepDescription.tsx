"use client";

interface SortStepDescriptionProps {
	currentStepIndex: number;
	totalSteps: number;
	heapSize: number;
	comparingIndices: number[];
	heapifyingIndex: number;
	rootIndex: number;
	sortedIndices: number[];
	isBuilding: boolean;
	isExtracting: boolean;
	values: number[];
}

export default function SortStepDescription({
	currentStepIndex,
	totalSteps,
	heapSize,
	comparingIndices,
	heapifyingIndex,
	rootIndex,
	sortedIndices,
	isBuilding,
	isExtracting,
	values,
}: SortStepDescriptionProps) {
	if (currentStepIndex === 0) {
		return (
			<div className="space-y-2">
				<h3 className="font-medium text-blue-600 dark:text-blue-400">Initial State</h3>
				<p>Starting Heap Sort with an unsorted array.</p>
				<p className="text-sm">
					Heap Sort first builds a max heap from the array, then repeatedly extracts the maximum element to sort the
					array.
				</p>
			</div>
		);
	}

	if (currentStepIndex === totalSteps - 1) {
		return (
			<div className="space-y-2">
				<h3 className="font-medium text-green-600 dark:text-green-400">Sorting Complete!</h3>
				<p>The array has been successfully sorted using Heap Sort.</p>
				<p className="text-sm">
					All elements are now in their correct positions through the heap property and systematic extraction of maximum
					elements.
				</p>
			</div>
		);
	}

	if (isBuilding && heapifyingIndex !== -1) {
		return (
			<div className="space-y-2">
				<h3 className="font-medium text-red-600 dark:text-red-400">Building Max Heap</h3>
				<p>
					Heapifying subtree rooted at index {heapifyingIndex} (value: {values[heapifyingIndex]}).
				</p>
				{comparingIndices.length > 0 && (
					<p className="text-sm">Comparing with children to ensure the max heap property: parent ≥ children.</p>
				)}
				<p className="text-sm">Building a max heap ensures the largest element is always at the root (index 0).</p>
			</div>
		);
	}

	if (isBuilding && heapifyingIndex === -1 && comparingIndices.length === 0) {
		return (
			<div className="space-y-2">
				<h3 className="font-medium text-purple-600 dark:text-purple-400">Max Heap Built</h3>
				<p>The max heap has been successfully constructed.</p>
				<p className="text-sm">
					The largest element ({values[0]}) is now at the root. Ready to start extracting elements for sorting.
				</p>
			</div>
		);
	}

	if (isExtracting && rootIndex !== -1) {
		return (
			<div className="space-y-2">
				<h3 className="font-medium text-purple-600 dark:text-purple-400">Extracting Maximum</h3>
				<p>Extracting the maximum element ({values[rootIndex]}) from the heap.</p>
				<p className="text-sm">
					The root element will be moved to its final sorted position at the end of the unsorted portion.
				</p>
			</div>
		);
	}

	if (isExtracting && heapifyingIndex !== -1) {
		return (
			<div className="space-y-2">
				<h3 className="font-medium text-red-600 dark:text-red-400">Restoring Heap Property</h3>
				<p>Heapifying from root after extracting maximum element. Heap size: {heapSize}</p>
				{comparingIndices.length > 0 && (
					<p className="text-sm">Comparing elements to restore the max heap property in the reduced heap.</p>
				)}
			</div>
		);
	}

	if (comparingIndices.length > 0) {
		return (
			<div className="space-y-2">
				<h3 className="font-medium text-yellow-600 dark:text-yellow-400">Comparing Elements</h3>
				<p>Comparing elements at positions {comparingIndices.join(", ")} to maintain heap property.</p>
				<p className="text-sm">Finding the largest element among parent and children to ensure max heap property.</p>
			</div>
		);
	}

	if (sortedIndices.length > 0) {
		const recentlySorted = sortedIndices.slice(-1)[0];
		return (
			<div className="space-y-2">
				<h3 className="font-medium text-green-600 dark:text-green-400">Element Placed</h3>
				<p>
					Element at position {recentlySorted} (value: {values[recentlySorted]}) is now in its correct sorted position.
				</p>
				<p className="text-sm">
					{sortedIndices.length} of {values.length} elements have been sorted.
				</p>
			</div>
		);
	}

	return (
		<div className="space-y-2">
			<h3 className="font-medium">Heap Sort in Progress</h3>
			<p>Working on heap operations to sort the array.</p>
		</div>
	);
}
