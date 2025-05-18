"use client";
import { BaseBarItem } from "@/lib/types";

export type SortingState = "default" | "comparing" | "swapping" | "sorted";

export interface BarItem extends BaseBarItem<SortingState> {}

export const stateStyles: Record<SortingState, string> = {
	default: "bg-blue-500",
	comparing: "bg-yellow-500",
	swapping: "bg-red-500",
	sorted: "bg-green-500",
};

export interface SortingStep {
	array: BarItem[];
	comparing: number[]; // Indices being compared
	swapped: boolean;
	sortedIndices: number[]; // Indices that are sorted
}

// Generate a random array of numbers
export function generateRandomArray(length: number, max: number = 94): BarItem[] {
	return Array.from({ length }, (_, i) => ({
		value: Math.floor(Math.random() * max) + 5, // Min value of 5 to ensure visibility
		state: "default",
		id: `item-${i}-${Date.now()}`, // Ensure unique keys
	}));
}

// Bubble sort algorithm that returns each step of the sorting process
export function bubbleSortSteps(inputArray: BarItem[]): SortingStep[] {
	const steps: SortingStep[] = [];
	const array = [...inputArray.map((item) => ({ ...item }))]; // Deep clone array
	const n = array.length;
	const sortedIndices: number[] = [];

	for (let i = 0; i < n; i++) {
		let swapped = false;

		// Last i elements are already in place
		for (let j = 0; j < n - i - 1; j++) {
			// Save the state before comparison
			const arrayBeforeComparison = array.map((item) => ({ ...item }));
			arrayBeforeComparison[j].state = "comparing";
			arrayBeforeComparison[j + 1].state = "comparing";

			steps.push({
				array: arrayBeforeComparison,
				comparing: [j, j + 1],
				swapped: false,
				sortedIndices: [...sortedIndices],
			});

			// Compare adjacent elements
			if (array[j].value > array[j + 1].value) {
				// Create a step for the swapping state
				const arraySwapping = array.map((item) => ({ ...item }));
				arraySwapping[j].state = "swapping";
				arraySwapping[j + 1].state = "swapping";

				steps.push({
					array: arraySwapping,
					comparing: [j, j + 1],
					swapped: true,
					sortedIndices: [...sortedIndices],
				});

				// Swap elements
				[array[j], array[j + 1]] = [array[j + 1], array[j]];
				swapped = true;
			}

			// Reset states after comparison or swap
			array[j].state = "default";
			array[j + 1].state = "default";
		}

		// Mark the last element in this pass as sorted
		sortedIndices.push(n - i - 1);
		array[n - i - 1].state = "sorted";

		// Show the array after each complete pass with sorted elements
		steps.push({
			array: array.map((item) => ({ ...item })),
			comparing: [],
			swapped: swapped,
			sortedIndices: [...sortedIndices],
		});

		// If no swapping occurred in this pass, array is sorted
		if (!swapped) {
			// Mark all remaining elements as sorted
			for (let k = 0; k < n - i - 1; k++) {
				if (!sortedIndices.includes(k)) {
					sortedIndices.push(k);
					array[k].state = "sorted";
				}
			}

			// Add the final sorted state
			steps.push({
				array: array.map((item) => ({ ...item })),
				comparing: [],
				swapped: false,
				sortedIndices: [...sortedIndices].sort((a, b) => a - b),
			});

			break;
		}
	}

	return steps;
}
