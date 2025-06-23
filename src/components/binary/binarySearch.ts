"use client";
import { BaseBarItem } from "@/lib/types";

export type SearchingState = "default" | "searching" | "found" | "not-found" | "eliminated";

export interface BarItem extends BaseBarItem<SearchingState> {}

export const stateStyles: Record<SearchingState, string> = {
	default: "bg-blue-500",
	searching: "bg-yellow-500",
	found: "bg-green-500",
	"not-found": "bg-red-500",
	eliminated: "bg-gray-400",
};

export interface SearchingStep {
	array: BarItem[];
	left: number;
	right: number;
	mid: number;
	target: number;
	found: boolean;
	finished: boolean;
	comparison?: "less" | "greater" | "equal";
}

// Generate a sorted random array of numbers
export function generateRandomArray(length: number, max: number = 94): BarItem[] {
	const values = Array.from({ length }, () => Math.floor(Math.random() * max) + 5);
	values.sort((a, b) => a - b);

	return values.map((value, i) => ({
		value,
		state: "default",
		id: `item-${i}-${Date.now()}`, // Ensure unique keys
	}));
}

// Binary search algorithm that returns each step of the searching process
export function binarySearchSteps(inputArray: BarItem[], target: number): SearchingStep[] {
	const steps: SearchingStep[] = [];
	const array = [...inputArray.map((item) => ({ ...item }))]; // Deep clone array

	let left = 0;
	let right = array.length - 1;

	// Initial state
	steps.push({
		array: array.map((item) => ({ ...item })),
		left,
		right,
		mid: -1,
		target,
		found: false,
		finished: false,
	});

	while (left <= right) {
		const mid = Math.floor((left + right) / 2);

		// Show the current search space and mid element
		const searchingArray = array.map((item, index) => ({
			...item,
			state:
				index < left || index > right
					? ("eliminated" as SearchingState)
					: index === mid
						? ("searching" as SearchingState)
						: ("default" as SearchingState),
		}));

		const midValue = array[mid].value;
		let comparison: "less" | "greater" | "equal";

		if (midValue === target) {
			comparison = "equal";
			// Found the target
			const foundArray = array.map((item, index) => ({
				...item,
				state:
					index < left || index > right
						? ("eliminated" as SearchingState)
						: index === mid
							? ("found" as SearchingState)
							: ("default" as SearchingState),
			}));

			steps.push({
				array: foundArray,
				left,
				right,
				mid,
				target,
				found: true,
				finished: true,
				comparison,
			});
			return steps;
		} else if (midValue < target) {
			comparison = "less";
			// Target is in the right half
			steps.push({
				array: searchingArray,
				left,
				right,
				mid,
				target,
				found: false,
				finished: false,
				comparison,
			});

			left = mid + 1;
		} else {
			comparison = "greater";
			// Target is in the left half
			steps.push({
				array: searchingArray,
				left,
				right,
				mid,
				target,
				found: false,
				finished: false,
				comparison,
			});

			right = mid - 1;
		}
	}

	// Target not found
	const notFoundArray = array.map((item) => ({
		...item,
		state: "not-found" as SearchingState,
	}));

	steps.push({
		array: notFoundArray,
		left,
		right,
		mid: -1,
		target,
		found: false,
		finished: true,
	});

	return steps;
}
