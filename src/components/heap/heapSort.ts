"use client";
import { BaseBarItem } from "@/lib/types";

export type SortingState = "default" | "comparing" | "heapifying" | "sorted" | "root";

export interface BarItem extends BaseBarItem<SortingState> {}

export const stateStyles: Record<SortingState, string> = {
	default: "bg-blue-500",
	comparing: "bg-yellow-500",
	heapifying: "bg-red-500",
	root: "bg-purple-500",
	sorted: "bg-green-500",
};

export interface SortingStep {
	array: BarItem[];
	heapSize: number; // Current heap size
	comparingIndices: number[]; // Indices being compared
	heapifyingIndex: number; // Index being heapified
	rootIndex: number; // Root element being extracted
	sortedIndices: number[]; // Indices that are sorted
	isBuilding: boolean; // Whether we're building initial heap
	isExtracting: boolean; // Whether we're extracting max elements
}

// Generate a random array of numbers
export function generateRandomArray(length: number, max: number = 94): BarItem[] {
	const timestamp = Date.now();
	return Array.from({ length }, (_, i) => ({
		value: Math.floor(Math.random() * max) + 5, // Min value of 5 to ensure visibility
		state: "default",
		id: `item-${i}-${timestamp}-${Math.random().toString(36).substr(2, 9)}`, // Truly unique keys
	}));
}

// Helper function to get parent index
function getParent(i: number): number {
	return Math.floor((i - 1) / 2);
}

// Helper function to get left child index
function getLeftChild(i: number): number {
	return 2 * i + 1;
}

// Helper function to get right child index
function getRightChild(i: number): number {
	return 2 * i + 2;
}

// Helper function to properly clone items with their IDs preserved
function cloneItems(items: BarItem[]): BarItem[] {
	return items.map((item) => ({ ...item }));
}

// Heapify function that maintains the max heap property
function heapifySteps(
	array: BarItem[],
	steps: SortingStep[],
	heapSize: number,
	i: number,
	sortedIndices: number[],
): void {
	const left = getLeftChild(i);
	const right = getRightChild(i);
	let largest = i;
	// Show comparison with left child
	if (left < heapSize) {
		const arrayWithComparing = cloneItems(array);
		for (let idx = 0; idx < arrayWithComparing.length; idx++) {
			if (idx === i || idx === left) {
				arrayWithComparing[idx].state = "comparing";
			} else if (sortedIndices.includes(idx)) {
				arrayWithComparing[idx].state = "sorted";
			} else {
				arrayWithComparing[idx].state = "default";
			}
		}

		steps.push({
			array: arrayWithComparing,
			heapSize,
			comparingIndices: [i, left],
			heapifyingIndex: i,
			rootIndex: -1,
			sortedIndices: [...sortedIndices],
			isBuilding: true,
			isExtracting: false,
		});

		if (array[left].value > array[largest].value) {
			largest = left;
		}
	}
	// Show comparison with right child
	if (right < heapSize) {
		const arrayWithComparing = cloneItems(array);
		for (let idx = 0; idx < arrayWithComparing.length; idx++) {
			if (idx === i || idx === right || idx === largest) {
				arrayWithComparing[idx].state = "comparing";
			} else if (sortedIndices.includes(idx)) {
				arrayWithComparing[idx].state = "sorted";
			} else {
				arrayWithComparing[idx].state = "default";
			}
		}

		steps.push({
			array: arrayWithComparing,
			heapSize,
			comparingIndices: [i, right, largest],
			heapifyingIndex: i,
			rootIndex: -1,
			sortedIndices: [...sortedIndices],
			isBuilding: true,
			isExtracting: false,
		});

		if (array[right].value > array[largest].value) {
			largest = right;
		}
	}
	// If largest is not root, swap and continue heapifying
	if (largest !== i) {
		// Show swap
		const arrayWithSwapping = cloneItems(array);
		for (let idx = 0; idx < arrayWithSwapping.length; idx++) {
			if (idx === i || idx === largest) {
				arrayWithSwapping[idx].state = "heapifying";
			} else if (sortedIndices.includes(idx)) {
				arrayWithSwapping[idx].state = "sorted";
			} else {
				arrayWithSwapping[idx].state = "default";
			}
		}

		steps.push({
			array: arrayWithSwapping,
			heapSize,
			comparingIndices: [i, largest],
			heapifyingIndex: i,
			rootIndex: -1,
			sortedIndices: [...sortedIndices],
			isBuilding: true,
			isExtracting: false,
		});

		// Perform swap
		const temp = array[i];
		array[i] = array[largest];
		array[largest] = temp;

		// Recursive heapify
		heapifySteps(array, steps, heapSize, largest, sortedIndices);
	}
}

// Build initial max heap
function buildMaxHeapSteps(array: BarItem[], steps: SortingStep[]): void {
	const n = array.length;

	// Start from last non-leaf node and heapify each node
	for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
		heapifySteps(array, steps, n, i, []);
	}
	// Show completed heap
	const arrayWithHeap = cloneItems(array);
	for (let idx = 0; idx < arrayWithHeap.length; idx++) {
		if (idx === 0) {
			arrayWithHeap[idx].state = "root";
		} else {
			arrayWithHeap[idx].state = "default";
		}
	}

	steps.push({
		array: arrayWithHeap,
		heapSize: n,
		comparingIndices: [],
		heapifyingIndex: -1,
		rootIndex: 0,
		sortedIndices: [],
		isBuilding: false,
		isExtracting: false,
	});
}

// Heap sort algorithm that returns each step of the sorting process
export function heapSortSteps(inputArray: BarItem[]): SortingStep[] {
	// Create a deep copy of the input array
	const array = cloneItems(inputArray);
	const steps: SortingStep[] = [];
	const n = array.length;
	// Add initial state
	const initialArray = cloneItems(array);
	for (let item of initialArray) {
		item.state = "default";
	}

	steps.push({
		array: initialArray,
		heapSize: n,
		comparingIndices: [],
		heapifyingIndex: -1,
		rootIndex: -1,
		sortedIndices: [],
		isBuilding: true,
		isExtracting: false,
	});

	// Step 1: Build max heap
	buildMaxHeapSteps(array, steps);

	// Step 2: Extract elements one by one
	const sortedIndices: number[] = [];
	for (let i = n - 1; i > 0; i--) {
		// Show root being extracted
		const arrayWithRoot = cloneItems(array);
		for (let idx = 0; idx < arrayWithRoot.length; idx++) {
			if (idx === 0) {
				arrayWithRoot[idx].state = "root";
			} else if (sortedIndices.includes(idx)) {
				arrayWithRoot[idx].state = "sorted";
			} else {
				arrayWithRoot[idx].state = "default";
			}
		}

		steps.push({
			array: arrayWithRoot,
			heapSize: i + 1,
			comparingIndices: [],
			heapifyingIndex: -1,
			rootIndex: 0,
			sortedIndices: [...sortedIndices],
			isBuilding: false,
			isExtracting: true,
		});

		// Move current root to end (swap with last element)
		const temp = array[0];
		array[0] = array[i];
		array[i] = temp;
		// Show swap
		const arrayWithSwap = cloneItems(array);
		for (let idx = 0; idx < arrayWithSwap.length; idx++) {
			if (idx === 0 || idx === i) {
				arrayWithSwap[idx].state = "heapifying";
			} else if (sortedIndices.includes(idx)) {
				arrayWithSwap[idx].state = "sorted";
			} else {
				arrayWithSwap[idx].state = "default";
			}
		}

		steps.push({
			array: arrayWithSwap,
			heapSize: i,
			comparingIndices: [0, i],
			heapifyingIndex: 0,
			rootIndex: -1,
			sortedIndices: [...sortedIndices],
			isBuilding: false,
			isExtracting: true,
		});

		// Mark as sorted
		sortedIndices.push(i);

		// Reduce heap size and heapify root
		if (i > 0) {
			heapifySteps(array, steps, i, 0, sortedIndices);
		}
	}

	// Mark first element as sorted
	sortedIndices.push(0);
	// Add final step with all elements sorted
	const finalArray = cloneItems(array);
	for (let item of finalArray) {
		item.state = "sorted";
	}

	steps.push({
		array: finalArray,
		heapSize: 0,
		comparingIndices: [],
		heapifyingIndex: -1,
		rootIndex: -1,
		sortedIndices: sortedIndices,
		isBuilding: false,
		isExtracting: false,
	});

	return steps;
}
