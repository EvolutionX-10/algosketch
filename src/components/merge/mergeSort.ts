"use client";
import { BaseBarItem } from "@/lib/types";

export type SortingState = "default" | "dividing" | "merging" | "comparing" | "sorted";
export interface BarItem extends BaseBarItem<SortingState> {}

export const stateStyles: Record<SortingState, string> = {
	default: "bg-blue-500",
	dividing: "bg-yellow-500", // Yellow for dividing phase
	merging: "bg-red-500", // Red for merging phase
	comparing: "bg-fuchsia-500", // Purple for comparing elements
	sorted: "bg-green-500", // Green for sorted elements
};

export interface SortingStep {
	array: BarItem[];
	comparing: number[]; // Indices being compared
	merged: boolean;
	sortedIndices: number[]; // Indices that are sorted
	dividing?: boolean; // Flag to indicate if we're in dividing phase
	subArrayBounds?: number[]; // Bounds of current subarray [start, end]
}

// Generate a random array of numbers
export function generateRandomArray(length: number, max: number = 94): BarItem[] {
	// Generate a timestamp once outside the loop to ensure uniqueness
	const timestamp = Date.now();

	// Use crypto for truly random IDs if available
	let getRandomValues: (arr: Uint8Array) => Uint8Array;
	if (typeof crypto !== "undefined" && crypto.getRandomValues) {
		getRandomValues = (arr) => crypto.getRandomValues(arr);
	} else {
		// Fallback for environments without crypto
		getRandomValues = (arr) => {
			for (let i = 0; i < arr.length; i++) {
				arr[i] = Math.floor(Math.random() * 256);
			}
			return arr;
		};
	}

	return Array.from({ length }, (_, i) => {
		// Generate a truly unique ID with crypto-based random bytes
		const arr = new Uint8Array(16);
		getRandomValues(arr);
		// Convert to hex string
		const uniqueId = Array.from(arr)
			.map((b) => b.toString(16).padStart(2, "0"))
			.join("");

		return {
			value: Math.floor(Math.random() * max) + 5, // Min value of 5 to ensure visibility
			state: "default" as SortingState,
			id: `item-${i}-${uniqueId}`,
		};
	});
}

// Helper function to properly clone items with their IDs preserved
function cloneItems(items: BarItem[]): BarItem[] {
	return items.map((item, index) => ({
		...item,
		id: `${item.id}-step-${Date.now()}-${index}`, // Create unique ID for each step
	}));
}

// Merge sort algorithm that returns each step of the sorting process
export function mergeSortSteps(inputArray: BarItem[]): SortingStep[] {
	const steps: SortingStep[] = [];
	const workingArray = cloneItems(inputArray); // Deep clone array with preserved IDs
	const n = workingArray.length;
	// Helper function to record a step
	const recordStep = (
		array: BarItem[],
		comparing: number[] = [],
		merged: boolean = false,
		sortedIndices: number[] = [],
		dividing: boolean = false,
		subArrayBounds: number[] = [],
	) => {
		// Create a deep copy while explicitly preserving each item's ID
		const arrayCopy = cloneItems(array);

		steps.push({
			array: arrayCopy,
			comparing,
			merged,
			sortedIndices: [...sortedIndices],
			dividing,
			subArrayBounds: [...subArrayBounds],
		});
	};

	// Initial array state
	recordStep(workingArray, [], false, [], false, [0, n - 1]);

	const mergeSort = (start: number, end: number, sortedIndices: number[] = []): void => {
		if (start >= end) {
			return;
		} // Dividing step - highlight the current subarray being divided
		const tempArray = cloneItems(workingArray);
		for (let i = start; i <= end; i++) {
			tempArray[i].state = "dividing";
		}
		recordStep(tempArray, [], false, sortedIndices, true, [start, end]);

		const mid = Math.floor((start + end) / 2);

		// Recursively sort the left half
		mergeSort(start, mid, sortedIndices);

		// Recursively sort the right half
		mergeSort(mid + 1, end, sortedIndices);

		// Merge the sorted halves
		merge(start, mid, end, sortedIndices);
	};

	const merge = (start: number, mid: number, end: number, sortedIndices: number[]): void => {
		// Create temporary arrays for the left and right portions
		const leftSize = mid - start + 1;
		const rightSize = end - mid;

		const leftArray: BarItem[] = [];
		const rightArray: BarItem[] = [];
		// Copy data to temporary arrays - retain original IDs
		for (let i = 0; i < leftSize; i++) {
			leftArray[i] = {
				...workingArray[start + i],
				id: workingArray[start + i].id, // Ensure ID is preserved
			};
		}

		for (let j = 0; j < rightSize; j++) {
			rightArray[j] = {
				...workingArray[mid + 1 + j],
				id: workingArray[mid + 1 + j].id, // Ensure ID is preserved
			};
		} // Merging step - highlight the arrays being merged
		const mergingArray = cloneItems(workingArray);
		for (let i = start; i <= end; i++) {
			mergingArray[i].state = "merging";
		}
		recordStep(mergingArray, [], false, sortedIndices, false, [start, end]);

		// Merge the arrays
		let i = 0; // Index for leftArray
		let j = 0; // Index for rightArray
		let k = start; // Index for workingArray

		while (i < leftSize && j < rightSize) {
			// Comparing step - highlight the elements being compared
			const comparingArray = cloneItems(workingArray);
			for (let idx = start; idx <= end; idx++) {
				comparingArray[idx].state = "merging";
			}
			// Special highlight for the two elements being compared
			comparingArray[start + i].state = "comparing";
			comparingArray[mid + 1 + j].state = "comparing";

			recordStep(comparingArray, [start + i, mid + 1 + j], false, sortedIndices, false, [start, end]);
			if (leftArray[i].value <= rightArray[j].value) {
				workingArray[k] = {
					...leftArray[i],
					state: "default",
					id: leftArray[i].id, // Preserve ID
				};
				i++;
			} else {
				workingArray[k] = {
					...rightArray[j],
					state: "default",
					id: rightArray[j].id, // Preserve ID
				};
				j++;
			}
			k++;
		}
		// Copy remaining elements of leftArray if any
		while (i < leftSize) {
			// Visualize copying remaining elements from left array
			const copyLeftArray = cloneItems(workingArray);
			for (let idx = start; idx <= end; idx++) {
				copyLeftArray[idx].state = "merging";
			}
			copyLeftArray[start + i].state = "comparing";

			recordStep(copyLeftArray, [start + i], false, sortedIndices, false, [start, end]);
			workingArray[k] = {
				...leftArray[i],
				state: "default",
				id: leftArray[i].id, // Preserve ID
			};
			i++;
			k++;
		}
		// Copy remaining elements of rightArray if any
		while (j < rightSize) {
			// Visualize copying remaining elements from right array
			const copyRightArray = cloneItems(workingArray);
			for (let idx = start; idx <= end; idx++) {
				copyRightArray[idx].state = "merging";
			}
			copyRightArray[mid + 1 + j].state = "comparing";

			recordStep(copyRightArray, [mid + 1 + j], false, sortedIndices, false, [start, end]);
			workingArray[k] = {
				...rightArray[j],
				state: "default",
				id: rightArray[j].id, // Preserve ID
			};
			j++;
			k++;
		} // Mark the subarray as sorted
		const sortedArray = cloneItems(workingArray);
		for (let i = start; i <= end; i++) {
			sortedArray[i].state = "sorted";
			if (!sortedIndices.includes(i)) {
				sortedIndices.push(i);
			}
		}
		recordStep(sortedArray, [], true, sortedIndices, false, [start, end]);
	};

	// Start the merge sort algorithm
	mergeSort(0, n - 1); // Ensure the final state shows the entire array as sorted
	const finalArray = cloneItems(workingArray).map((item) => ({
		...item,
		state: "sorted" as SortingState,
	}));
	const finalSortedIndices = Array.from({ length: n }, (_, i) => i);
	recordStep(finalArray, [], true, finalSortedIndices, false, [0, n - 1]);

	return steps;
}
