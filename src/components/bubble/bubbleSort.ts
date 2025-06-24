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
	comparing: number[];
	swapped: boolean;
	sortedIndices: number[];
}

export function generateRandomArray(length: number, max: number = 94): BarItem[] {
	return Array.from({ length }, (_, i) => ({
		value: Math.floor(Math.random() * max) + 5,
		state: "default",
		id: `item-${i}-${Date.now()}`,
	}));
}

export function bubbleSortSteps(inputArray: BarItem[]): SortingStep[] {
	const steps: SortingStep[] = [];
	const array = [...inputArray.map((item) => ({ ...item }))];
	const n = array.length;
	const sortedIndices: number[] = [];

	for (let i = 0; i < n; i++) {
		let swapped = false;

		for (let j = 0; j < n - i - 1; j++) {
			const arrayBeforeComparison = array.map((item) => ({ ...item }));
			arrayBeforeComparison[j].state = "comparing";
			arrayBeforeComparison[j + 1].state = "comparing";

			steps.push({
				array: arrayBeforeComparison,
				comparing: [j, j + 1],
				swapped: false,
				sortedIndices: [...sortedIndices],
			});

			if (array[j].value > array[j + 1].value) {
				const arraySwapping = array.map((item) => ({ ...item }));
				arraySwapping[j].state = "swapping";
				arraySwapping[j + 1].state = "swapping";

				steps.push({
					array: arraySwapping,
					comparing: [j, j + 1],
					swapped: true,
					sortedIndices: [...sortedIndices],
				});

				[array[j], array[j + 1]] = [array[j + 1], array[j]];
				swapped = true;
			}

			array[j].state = "default";
			array[j + 1].state = "default";
		}

		sortedIndices.push(n - i - 1);
		array[n - i - 1].state = "sorted";

		steps.push({
			array: array.map((item) => ({ ...item })),
			comparing: [],
			swapped: swapped,
			sortedIndices: [...sortedIndices],
		});

		if (!swapped) {
			for (let k = 0; k < n - i - 1; k++) {
				if (!sortedIndices.includes(k)) {
					sortedIndices.push(k);
					array[k].state = "sorted";
				}
			}

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
