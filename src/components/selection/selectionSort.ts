"use client";
import type { BaseBarItem } from "@/lib/types";

import type { OperationStep } from "@/lib/algorithm-metrics";

export type SortingState = "default" | "comparing" | "selecting" | "sorted";

export interface BarItem extends BaseBarItem<SortingState> {}

export const stateStyles: Record<SortingState, string> = {
	default: "bg-blue-500",
	comparing: "bg-yellow-500",
	selecting: "bg-red-500",
	sorted: "bg-green-500",
};

export interface SortingStep extends OperationStep {
	array: BarItem[];
	currentIndex: number;
	comparingIndex: number;
	minIndex: number;
	sortedIndices: number[];
}

// Generate a random array of numbers
export function generateRandomArray(length: number, max: number = 94): BarItem[] {
	const timestamp = Date.now();
	return Array.from({ length }, (_, i) => ({
		value: Math.floor(Math.random() * max) + 5,
		state: "default",
		id: `item-${i}-${timestamp}-${Math.random().toString(36).substr(2, 9)}`,
	}));
}

export function selectionSortSteps(inputArray: BarItem[]): SortingStep[] {
	const steps: SortingStep[] = [];
	const array = inputArray.map((item) => ({ ...item })); // Deep clone array
	const n = array.length;
	const sortedIndices: number[] = [];

	steps.push({
		array: array.map((item) => ({ ...item })),
		currentIndex: n > 0 ? 0 : -1,
		comparingIndex: -1,
		minIndex: n > 0 ? 0 : -1,
		sortedIndices: [...sortedIndices],
	});

	for (let i = 0; i < n - 1; i++) {
		array[i].state = "selecting";
		let minIndex = i;

		steps.push({
			array: array.map((item) => ({ ...item })),
			currentIndex: i,
			comparingIndex: -1,
			minIndex: minIndex,
			sortedIndices: [...sortedIndices],
		});

		for (let j = i + 1; j < n; j++) {
			const arrayBeforeComparison = array.map((item) => ({ ...item }));
			arrayBeforeComparison[j].state = "comparing";

			steps.push({
				array: arrayBeforeComparison,
				operation: "compare",
				currentIndex: i,
				comparingIndex: j,
				minIndex: minIndex,
				sortedIndices: [...sortedIndices],
			});

			if (array[j].value < array[minIndex].value) {
				if (minIndex !== i) {
					array[minIndex].state = "default";
				}

				minIndex = j;
				array[minIndex].state = "comparing";

				steps.push({
					array: array.map((item) => ({ ...item })),
					currentIndex: i,
					comparingIndex: j,
					minIndex: minIndex,
					sortedIndices: [...sortedIndices],
				});
			} else {
				array[j].state = "default";
			}
		}

		if (minIndex !== i) {
			const arrayBeforeSwap = array.map((item) => ({ ...item }));
			arrayBeforeSwap[i].state = "selecting";
			arrayBeforeSwap[minIndex].state = "selecting";

			steps.push({
				array: arrayBeforeSwap,
				operation: "swap",
				currentIndex: i,
				comparingIndex: -1,
				minIndex: minIndex,
				sortedIndices: [...sortedIndices],
			});

			[array[i], array[minIndex]] = [array[minIndex], array[i]];
		}

		array[i].state = "sorted";
		sortedIndices.push(i);

		for (let k = i + 1; k < n; k++) {
			if (k !== minIndex) {
				array[k].state = "default";
			}
		}

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

	if (n > 0) {
		array[n - 1].state = "sorted";
		sortedIndices.push(n - 1);
	}

	steps.push({
		array: array.map((item) => ({ ...item, state: "sorted" })),
		currentIndex: -1,
		comparingIndex: -1,
		minIndex: -1,
		sortedIndices: [...sortedIndices],
	});

	return steps;
}
