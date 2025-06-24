"use client";
import { BaseBarItem } from "@/lib/types";

export type SortingState = "default" | "comparing" | "pivot" | "swapping" | "sorted" | "partitioning";

export interface BarItem extends BaseBarItem<SortingState> {}

export const stateStyles: Record<SortingState, string> = {
	default: "bg-blue-500",
	comparing: "bg-yellow-500",
	pivot: "bg-purple-500",
	swapping: "bg-red-500",
	partitioning: "bg-orange-500",
	sorted: "bg-green-500",
};

export interface SortingStep {
	array: BarItem[];
	pivotIndex: number;
	comparingIndices: number[];
	swappingIndices: number[];
	partitionIndices: [number, number];
	sortedIndices: number[];
	isPartitioning: boolean;
	isSwapping: boolean;
}

export function generateRandomArray(length: number, max: number = 94): BarItem[] {
	const timestamp = Date.now();
	return Array.from({ length }, (_, i) => ({
		value: Math.floor(Math.random() * max) + 5, // Min value of 5 to ensure visibility
		state: "default",
		id: `item-${i}-${timestamp}-${Math.random().toString(36).substr(2, 9)}`,
	}));
}

function cloneItems(array: BarItem[]): BarItem[] {
	return array.map((item) => ({ ...item }));
}

function partitionSteps(
	array: BarItem[],
	steps: SortingStep[],
	low: number,
	high: number,
	sortedIndices: number[],
): number {
	const pivotIndex = high;
	const pivotValue = array[pivotIndex].value;

	const arrayWithPivot = cloneItems(array);
	for (let idx = 0; idx < arrayWithPivot.length; idx++) {
		if (idx === pivotIndex) {
			arrayWithPivot[idx].state = "pivot";
		} else if (sortedIndices.includes(idx)) {
			arrayWithPivot[idx].state = "sorted";
		} else {
			arrayWithPivot[idx].state = "default";
		}
	}

	steps.push({
		array: arrayWithPivot,
		pivotIndex,
		comparingIndices: [],
		swappingIndices: [],
		partitionIndices: [low, high],
		sortedIndices: [...sortedIndices],
		isPartitioning: true,
		isSwapping: false,
	});

	let i = low - 1;
	for (let j = low; j < high; j++) {
		const arrayWithComparing = cloneItems(array);
		for (let idx = 0; idx < arrayWithComparing.length; idx++) {
			if (idx === pivotIndex) {
				arrayWithComparing[idx].state = "pivot";
			} else if (idx === j) {
				arrayWithComparing[idx].state = "comparing";
			} else if (idx >= low && idx <= high && idx !== pivotIndex) {
				arrayWithComparing[idx].state = "partitioning";
			} else if (sortedIndices.includes(idx)) {
				arrayWithComparing[idx].state = "sorted";
			} else {
				arrayWithComparing[idx].state = "default";
			}
		}

		steps.push({
			array: arrayWithComparing,
			pivotIndex,
			comparingIndices: [j],
			swappingIndices: [],
			partitionIndices: [low, high],
			sortedIndices: [...sortedIndices],
			isPartitioning: true,
			isSwapping: false,
		});

		if (array[j].value <= pivotValue) {
			i++;
			if (i !== j) {
				const arrayWithSwapping = cloneItems(array);
				for (let idx = 0; idx < arrayWithSwapping.length; idx++) {
					if (idx === pivotIndex) {
						arrayWithSwapping[idx].state = "pivot";
					} else if (idx === i || idx === j) {
						arrayWithSwapping[idx].state = "swapping";
					} else if (idx >= low && idx <= high && idx !== pivotIndex) {
						arrayWithSwapping[idx].state = "partitioning";
					} else if (sortedIndices.includes(idx)) {
						arrayWithSwapping[idx].state = "sorted";
					} else {
						arrayWithSwapping[idx].state = "default";
					}
				}

				steps.push({
					array: arrayWithSwapping,
					pivotIndex,
					comparingIndices: [],
					swappingIndices: [i, j],
					partitionIndices: [low, high],
					sortedIndices: [...sortedIndices],
					isPartitioning: true,
					isSwapping: true,
				});

				const temp = array[i];
				array[i] = array[j];
				array[j] = temp;
			}
		}
	}

	if (i + 1 !== pivotIndex) {
		const arrayWithFinalSwap = cloneItems(array);
		for (let idx = 0; idx < arrayWithFinalSwap.length; idx++) {
			if (idx === pivotIndex || idx === i + 1) {
				arrayWithFinalSwap[idx].state = "swapping";
			} else if (idx >= low && idx <= high) {
				arrayWithFinalSwap[idx].state = "partitioning";
			} else if (sortedIndices.includes(idx)) {
				arrayWithFinalSwap[idx].state = "sorted";
			} else {
				arrayWithFinalSwap[idx].state = "default";
			}
		}

		steps.push({
			array: arrayWithFinalSwap,
			pivotIndex,
			comparingIndices: [],
			swappingIndices: [i + 1, pivotIndex],
			partitionIndices: [low, high],
			sortedIndices: [...sortedIndices],
			isPartitioning: true,
			isSwapping: true,
		});

		const temp = array[i + 1];
		array[i + 1] = array[pivotIndex];
		array[pivotIndex] = temp;
	}

	const finalPivotIndex = i + 1;
	sortedIndices.push(finalPivotIndex);

	const arrayWithPartitioned = cloneItems(array);
	for (let idx = 0; idx < arrayWithPartitioned.length; idx++) {
		if (idx === finalPivotIndex || sortedIndices.includes(idx)) {
			arrayWithPartitioned[idx].state = "sorted";
		} else {
			arrayWithPartitioned[idx].state = "default";
		}
	}

	steps.push({
		array: arrayWithPartitioned,
		pivotIndex: finalPivotIndex,
		comparingIndices: [],
		swappingIndices: [],
		partitionIndices: [low, high],
		sortedIndices: [...sortedIndices],
		isPartitioning: false,
		isSwapping: false,
	});

	return finalPivotIndex;
}

function quickSortRecursive(
	array: BarItem[],
	steps: SortingStep[],
	low: number,
	high: number,
	sortedIndices: number[],
): void {
	if (low < high) {
		const pivotIndex = partitionSteps(array, steps, low, high, sortedIndices);

		quickSortRecursive(array, steps, low, pivotIndex - 1, sortedIndices);
		quickSortRecursive(array, steps, pivotIndex + 1, high, sortedIndices);
	} else if (low === high && !sortedIndices.includes(low)) {
		sortedIndices.push(low);
		const arrayWithSorted = cloneItems(array);
		for (let idx = 0; idx < arrayWithSorted.length; idx++) {
			if (sortedIndices.includes(idx)) {
				arrayWithSorted[idx].state = "sorted";
			} else {
				arrayWithSorted[idx].state = "default";
			}
		}

		steps.push({
			array: arrayWithSorted,
			pivotIndex: -1,
			comparingIndices: [],
			swappingIndices: [],
			partitionIndices: [low, high],
			sortedIndices: [...sortedIndices],
			isPartitioning: false,
			isSwapping: false,
		});
	}
}

export function quickSortSteps(inputArray: BarItem[]): SortingStep[] {
	const array = cloneItems(inputArray);
	const steps: SortingStep[] = [];
	const n = array.length;

	const initialArray = cloneItems(array);
	for (let item of initialArray) {
		item.state = "default";
	}

	steps.push({
		array: initialArray,
		pivotIndex: -1,
		comparingIndices: [],
		swappingIndices: [],
		partitionIndices: [0, n - 1],
		sortedIndices: [],
		isPartitioning: false,
		isSwapping: false,
	});

	const sortedIndices: number[] = [];
	quickSortRecursive(array, steps, 0, n - 1, sortedIndices);

	const finalArray = cloneItems(array);
	for (let item of finalArray) {
		item.state = "sorted";
	}

	steps.push({
		array: finalArray,
		pivotIndex: -1,
		comparingIndices: [],
		swappingIndices: [],
		partitionIndices: [0, n - 1],
		sortedIndices: Array.from({ length: n }, (_, i) => i),
		isPartitioning: false,
		isSwapping: false,
	});

	return steps;
}
