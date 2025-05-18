"use client";
import { BaseBarItem } from "@/lib/types";

export type SortingState = "default" | "comparing" | "selecting" | "sorted";

export interface BarItem extends BaseBarItem<SortingState> {}

export const stateStyles: Record<SortingState, string> = {
	default: "bg-blue-500",
	comparing: "bg-yellow-500",
	selecting: "bg-red-500",
	sorted: "bg-green-500",
};

export interface SortingStep {
	array: BarItem[];
	currentIndex: number; // Current position being filled
	comparingIndex: number; // Index being compared
	minIndex: number; // Current minimum element index
	sortedIndices: number[]; // Indices that are sorted
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

// Selection sort algorithm that returns each step of the sorting process
export function selectionSortSteps(inputArray: BarItem[]): SortingStep[] {
	const steps: SortingStep[] = [];
	const array = inputArray.map((item) => ({ ...item })); // Deep clone array
	const n = array.length;
	const sortedIndices: number[] = [];

	// Initial state
	steps.push({
		array: array.map((item) => ({ ...item })),
		currentIndex: 0,
		comparingIndex: -1,
		minIndex: 0,
		sortedIndices: [...sortedIndices],
	});

	// Selection sort
	for (let i = 0; i < n - 1; i++) {
		// Mark the current position we're trying to fill
		array[i].state = "selecting";
		let minIndex = i;

		steps.push({
			array: array.map((item) => ({ ...item })),
			currentIndex: i,
			comparingIndex: -1,
			minIndex: minIndex,
			sortedIndices: [...sortedIndices],
		});

		// Find the minimum element in the unsorted part of the array
		for (let j = i + 1; j < n; j++) {
			// Visual step for comparison
			const arrayBeforeComparison = array.map((item) => ({ ...item }));
			arrayBeforeComparison[j].state = "comparing";

			steps.push({
				array: arrayBeforeComparison,
				currentIndex: i,
				comparingIndex: j,
				minIndex: minIndex,
				sortedIndices: [...sortedIndices],
			});

			// Check if current element is smaller than the current minimum
			if (array[j].value < array[minIndex].value) {
				// Reset previous minimum's state if it's not the current position
				if (minIndex !== i) {
					array[minIndex].state = "default";
				}

				minIndex = j;
				array[minIndex].state = "comparing"; // Highlight new minimum

				steps.push({
					array: array.map((item) => ({ ...item })),
					currentIndex: i,
					comparingIndex: j,
					minIndex: minIndex,
					sortedIndices: [...sortedIndices],
				});
			} else {
				// Reset the comparing state
				array[j].state = "default";
			}
		}

		// Swap the found minimum with the current position if they are different
		if (minIndex !== i) {
			// Visual step for swapping
			const arrayBeforeSwap = array.map((item) => ({ ...item }));
			arrayBeforeSwap[i].state = "selecting";
			arrayBeforeSwap[minIndex].state = "selecting";

			steps.push({
				array: arrayBeforeSwap,
				currentIndex: i,
				comparingIndex: -1,
				minIndex: minIndex,
				sortedIndices: [...sortedIndices],
			});

			// Perform the swap
			[array[i], array[minIndex]] = [array[minIndex], array[i]];
		}

		// Mark current position as sorted
		array[i].state = "sorted";
		sortedIndices.push(i);

		// Reset states for the rest of the array
		for (let k = i + 1; k < n; k++) {
			if (k !== minIndex) {
				array[k].state = "default";
			}
		}

		// If it was the minimum, reset its state too
		if (minIndex !== i) {
			array[minIndex].state = "default";
		}

		steps.push({
			array: array.map((item) => ({ ...item })),
			currentIndex: i,
			comparingIndex: -1,
			minIndex: -1,
			sortedIndices: [...sortedIndices],
		});
	}

	// Mark the last element as sorted (it's automatically in the right place)
	array[n - 1].state = "sorted";
	sortedIndices.push(n - 1);

	// Final state - all elements sorted
	steps.push({
		array: array.map((item) => ({ ...item, state: "sorted" })),
		currentIndex: -1,
		comparingIndex: -1,
		minIndex: -1,
		sortedIndices: [...sortedIndices],
	});

	return steps;
}
