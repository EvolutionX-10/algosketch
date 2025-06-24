"use client";
import { BaseBarItem } from "@/lib/types";

export type SortingState = "default" | "comparing" | "inserting" | "sorted";

export interface BarItem extends BaseBarItem<SortingState> {}

export const stateStyles: Record<SortingState, string> = {
	default: "bg-blue-500",
	comparing: "bg-yellow-500",
	inserting: "bg-red-500",
	sorted: "bg-green-500",
};

export interface SortingStep {
	array: BarItem[];
	currentIndex: number;
	comparingIndex: number;
	insertPosition: number;
	sortedIndices: number[];
}

export function generateRandomArray(length: number, max: number = 94): BarItem[] {
	const timestamp = Date.now();
	return Array.from({ length }, (_, i) => ({
		value: Math.floor(Math.random() * max) + 5, // Min value of 5 to ensure visibility
		state: "default",
		id: `item-${i}-${timestamp}-${Math.random().toString(36).substr(2, 9)}`, // Truly unique keys
	}));
}

export function insertionSortSteps(inputArray: BarItem[]): SortingStep[] {
	const steps: SortingStep[] = [];
	const array = inputArray.map((item) => ({ ...item })); // Deep clone array
	const n = array.length;

	// Initial state - first element is considered sorted
	array[0].state = "sorted";
	steps.push({
		array: array.map((item) => ({ ...item })),
		currentIndex: 0,
		comparingIndex: -1,
		insertPosition: 0,
		sortedIndices: [0],
	});

	for (let i = 1; i < n; i++) {
		array[i].state = "comparing";
		steps.push({
			array: array.map((item) => ({ ...item })),
			currentIndex: i,
			comparingIndex: -1,
			insertPosition: i,
			sortedIndices: Array.from({ length: i }, (_, idx) => idx),
		});

		const current = { ...array[i] };
		let j = i - 1;

		while (j >= 0) {
			const arrayBeforeComparison = array.map((item) => ({ ...item }));
			arrayBeforeComparison[j].state = "comparing";
			arrayBeforeComparison[i].state = "inserting";

			steps.push({
				array: arrayBeforeComparison,
				currentIndex: i,
				comparingIndex: j,
				insertPosition: j + 1,
				sortedIndices: Array.from({ length: i }, (_, idx) => idx),
			});

			if (array[j].value > current.value) {
				array[j + 1] = { ...array[j] };

				const arrayAfterShift = array.map((item) => ({ ...item }));
				arrayAfterShift[j].state = "comparing";

				steps.push({
					array: arrayAfterShift,
					currentIndex: i,
					comparingIndex: j,
					insertPosition: j,
					sortedIndices: Array.from({ length: i }, (_, idx) => idx),
				});

				j--;
			} else {
				break;
			}
		}

		array[j + 1] = { ...current };
		array[j + 1].state = "sorted";

		for (let k = 0; k <= i; k++) {
			array[k].state = "sorted";
		}

		steps.push({
			array: array.map((item) => ({ ...item })),
			currentIndex: i,
			comparingIndex: -1,
			insertPosition: j + 1,
			sortedIndices: Array.from({ length: i + 1 }, (_, idx) => idx),
		});
	}

	steps.push({
		array: array.map((item) => ({ ...item, state: "sorted" })),
		currentIndex: -1,
		comparingIndex: -1,
		insertPosition: -1,
		sortedIndices: Array.from({ length: n }, (_, idx) => idx),
	});

	return steps;
}
