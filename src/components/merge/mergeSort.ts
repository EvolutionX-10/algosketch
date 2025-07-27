"use client";
import { BaseBarItem } from "@/lib/types";

export type SortingState = "default" | "dividing" | "merging" | "comparing" | "sorted";
export interface BarItem extends BaseBarItem<SortingState> {}

export const stateStyles: Record<SortingState, string> = {
	default: "bg-blue-400",
	dividing: "bg-amber-400",
	merging: "bg-rose-400",
	comparing: "bg-purple-400",
	sorted: "bg-emerald-400",
};

export interface SortingStep {
	array: BarItem[];
	comparing: number[];
	merged: boolean;
	sortedIndices: number[];
	dividing?: boolean;
	subArrayBounds?: number[];
}

export function generateRandomArray(length: number, max: number = 94): BarItem[] {
	let getRandomValues: (arr: Uint8Array) => Uint8Array;
	if (typeof crypto !== "undefined" && crypto.getRandomValues) {
		getRandomValues = (arr) => crypto.getRandomValues(arr);
	} else {
		getRandomValues = (arr) => {
			for (let i = 0; i < arr.length; i++) {
				arr[i] = Math.floor(Math.random() * 256);
			}
			return arr;
		};
	}

	return Array.from({ length }, (_, i) => {
		const arr = new Uint8Array(16);
		getRandomValues(arr);
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

function cloneItems(items: BarItem[]): BarItem[] {
	return items.map((item, index) => ({
		...item,
		id: `${item.id}-step-${Date.now()}-${index}`, // Create unique ID for each step
	}));
}

export function mergeSortSteps(inputArray: BarItem[]): SortingStep[] {
	const steps: SortingStep[] = [];
	const workingArray = cloneItems(inputArray); // Deep clone array with preserved IDs
	const n = workingArray.length;

	const recordStep = (
		array: BarItem[],
		comparing: number[] = [],
		merged: boolean = false,
		sortedIndices: number[] = [],
		dividing: boolean = false,
		subArrayBounds: number[] = [],
	) => {
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

	recordStep(workingArray, [], false, [], false, [0, n - 1]);

	const mergeSort = (start: number, end: number, sortedIndices: number[] = []): void => {
		if (start >= end) {
			return;
		}
		const tempArray = cloneItems(workingArray);
		for (let i = start; i <= end; i++) {
			tempArray[i].state = "dividing";
		}
		recordStep(tempArray, [], false, sortedIndices, true, [start, end]);

		const mid = Math.floor((start + end) / 2);

		mergeSort(start, mid, sortedIndices);
		mergeSort(mid + 1, end, sortedIndices);
		merge(start, mid, end, sortedIndices);
	};

	const merge = (start: number, mid: number, end: number, sortedIndices: number[]): void => {
		const leftSize = mid - start + 1;
		const rightSize = end - mid;

		const leftArray: BarItem[] = [];
		const rightArray: BarItem[] = [];
		for (let i = 0; i < leftSize; i++) {
			leftArray[i] = {
				...workingArray[start + i],
				id: workingArray[start + i].id,
			};
		}

		for (let j = 0; j < rightSize; j++) {
			rightArray[j] = {
				...workingArray[mid + 1 + j],
				id: workingArray[mid + 1 + j].id,
			};
		}

		const mergingArray = cloneItems(workingArray);
		for (let i = start; i <= end; i++) {
			mergingArray[i].state = "merging";
		}
		recordStep(mergingArray, [], false, sortedIndices, false, [start, end]);

		let i = 0;
		let j = 0;
		let k = start;

		while (i < leftSize && j < rightSize) {
			const comparingArray = cloneItems(workingArray);
			for (let idx = start; idx <= end; idx++) {
				comparingArray[idx].state = "merging";
			}

			comparingArray[start + i].state = "comparing";
			comparingArray[mid + 1 + j].state = "comparing";

			recordStep(comparingArray, [start + i, mid + 1 + j], false, sortedIndices, false, [start, end]);
			if (leftArray[i].value <= rightArray[j].value) {
				workingArray[k] = {
					...leftArray[i],
					state: "default",
					id: leftArray[i].id,
				};
				i++;
			} else {
				workingArray[k] = {
					...rightArray[j],
					state: "default",
					id: rightArray[j].id,
				};
				j++;
			}
			k++;
		}

		while (i < leftSize) {
			const copyLeftArray = cloneItems(workingArray);
			for (let idx = start; idx <= end; idx++) {
				copyLeftArray[idx].state = "merging";
			}
			copyLeftArray[start + i].state = "comparing";

			recordStep(copyLeftArray, [start + i], false, sortedIndices, false, [start, end]);
			workingArray[k] = {
				...leftArray[i],
				state: "default",
				id: leftArray[i].id,
			};
			i++;
			k++;
		}

		while (j < rightSize) {
			const copyRightArray = cloneItems(workingArray);
			for (let idx = start; idx <= end; idx++) {
				copyRightArray[idx].state = "merging";
			}
			copyRightArray[mid + 1 + j].state = "comparing";

			recordStep(copyRightArray, [mid + 1 + j], false, sortedIndices, false, [start, end]);
			workingArray[k] = {
				...rightArray[j],
				state: "default",
				id: rightArray[j].id,
			};
			j++;
			k++;
		}
		const sortedArray = cloneItems(workingArray);
		for (let i = start; i <= end; i++) {
			sortedArray[i].state = "sorted";
			if (!sortedIndices.includes(i)) {
				sortedIndices.push(i);
			}
		}
		recordStep(sortedArray, [], true, sortedIndices, false, [start, end]);
	};

	mergeSort(0, n - 1);
	const finalArray = cloneItems(workingArray).map((item) => ({
		...item,
		state: "sorted" as SortingState,
	}));

	const finalSortedIndices = Array.from({ length: n }, (_, i) => i);
	recordStep(finalArray, [], true, finalSortedIndices, false, [0, n - 1]);

	return steps;
}
