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
	heapSize: number;
	comparingIndices: number[];
	heapifyingIndex: number;
	rootIndex: number;
	sortedIndices: number[];
	isBuilding: boolean;
	isExtracting: boolean;
}

export function generateRandomArray(length: number, max: number = 94): BarItem[] {
	const timestamp = Date.now();
	return Array.from({ length }, (_, i) => ({
		value: Math.floor(Math.random() * max) + 5, // Min value of 5 to ensure visibility
		state: "default",
		id: `item-${i}-${timestamp}-${Math.random().toString(36).substr(2, 9)}`,
	}));
}

function getLeftChild(i: number): number {
	return 2 * i + 1;
}

function getRightChild(i: number): number {
	return 2 * i + 2;
}

function cloneItems(items: BarItem[]): BarItem[] {
	return items.map((item) => ({ ...item }));
}

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

	if (largest !== i) {
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

		const temp = array[i];
		array[i] = array[largest];
		array[largest] = temp;

		heapifySteps(array, steps, heapSize, largest, sortedIndices);
	}
}

function buildMaxHeapSteps(array: BarItem[], steps: SortingStep[]): void {
	const n = array.length;

	for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
		heapifySteps(array, steps, n, i, []);
	}
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

export function heapSortSteps(inputArray: BarItem[]): SortingStep[] {
	const array = cloneItems(inputArray);
	const steps: SortingStep[] = [];
	const n = array.length;
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

	buildMaxHeapSteps(array, steps);

	const sortedIndices: number[] = [];
	for (let i = n - 1; i > 0; i--) {
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

		const temp = array[0];
		array[0] = array[i];
		array[i] = temp;
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

		sortedIndices.push(i);

		if (i > 0) {
			heapifySteps(array, steps, i, 0, sortedIndices);
		}
	}

	sortedIndices.push(0);
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
