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

export function generateRandomArray(length: number, max: number = 94): BarItem[] {
	return Array.from({ length }, (_, i) => ({
		value: Math.floor(Math.random() * max) + 5, // Min value of 5 to ensure visibility
		state: "default",
		id: `item-${i}-${Date.now()}`,
	}));
}

export function linearSearchSteps(inputArray: BarItem[], target: number): SearchingStep[] {
	const steps: SearchingStep[] = [];
	const array = [...inputArray.map((item) => ({ ...item }))]; // Deep clone array

	steps.push({
		array: array.map((item) => ({ ...item })),
		currentIndex: -1,
		target,
		found: false,
		finished: false,
	});

	for (let i = 0; i < array.length; i++) {
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

		if (array[i].value === target) {
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
