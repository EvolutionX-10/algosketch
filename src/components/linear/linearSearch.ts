"use client";
import { BaseBarItem } from "@/lib/types";

export type SearchingState = "default" | "searching" | "found" | "not-found";

export interface BarItem extends BaseBarItem<SearchingState> {}

export const stateStyles: Record<SearchingState, string> = {
	default: "bg-blue-500",
	searching: "bg-yellow-500",
	found: "bg-green-500",
	"not-found": "bg-red-500",
};

export interface SearchingStep {
	array: BarItem[];
	currentIndex: number;
	target: number;
	found: boolean;
	finished: boolean;
}

// Generate a random array of numbers
export function generateRandomArray(length: number, max: number = 94): BarItem[] {
	return Array.from({ length }, (_, i) => ({
		value: Math.floor(Math.random() * max) + 5, // Min value of 5 to ensure visibility
		state: "default",
		id: `item-${i}-${Date.now()}`, // Ensure unique keys
	}));
}

// Linear search algorithm that returns each step of the searching process
export function linearSearchSteps(inputArray: BarItem[], target: number): SearchingStep[] {
	const steps: SearchingStep[] = [];
	const array = [...inputArray.map((item) => ({ ...item }))]; // Deep clone array

	// Initial state
	steps.push({
		array: array.map((item) => ({ ...item })),
		currentIndex: -1,
		target,
		found: false,
		finished: false,
	});

	// Search through each element
	for (let i = 0; i < array.length; i++) {
		// Set current element as searching
		const searchingArray = array.map((item, index) => ({
			...item,
			state: index === i ? ("searching" as SearchingState) : ("default" as SearchingState),
		}));

		steps.push({
			array: searchingArray,
			currentIndex: i,
			target,
			found: false,
			finished: false,
		});

		// Check if we found the target
		if (array[i].value === target) {
			// Mark as found
			const foundArray = array.map((item, index) => ({
				...item,
				state: index === i ? ("found" as SearchingState) : ("default" as SearchingState),
			}));

			steps.push({
				array: foundArray,
				currentIndex: i,
				target,
				found: true,
				finished: true,
			});
			return steps;
		}
	}

	// Target not found
	const notFoundArray = array.map((item) => ({
		...item,
		state: "not-found" as SearchingState,
	}));

	steps.push({
		array: notFoundArray,
		currentIndex: array.length,
		target,
		found: false,
		finished: true,
	});

	return steps;
}
