# Algorithm Implementations

This document explains how algorithms are implemented in AlgoSketch to enable step-by-step visualization.

## Core Concept: Step-Based Implementation

In AlgoSketch, algorithms are implemented to generate a series of steps that represent the algorithm's execution state at each important point. This approach enables the visualization to show the algorithm progressing one step at a time.

## Type Definitions

Each algorithm implementation defines specific types that represent:

1. **Array Items**: The elements being sorted/processed
2. **Algorithm Steps**: The state of the algorithm at each step

### Example from Bubble Sort

```typescript
// Type for array items
export interface BarItem {
	value: number; // The numerical value
	state: SortingState; // Visual state (default, comparing, swapping, sorted)
	id: string; // Unique identifier for React keys
}

// Possible states for array items
export type SortingState = "default" | "comparing" | "swapping" | "sorted";

// Type for each step of the algorithm
export interface SortingStep {
	array: BarItem[]; // Current state of the array
	comparing: number[]; // Indices being compared
	swapped: boolean; // Whether elements were swapped in this step
	sortedIndices: number[]; // Indices that are now sorted
}
```

### Example from Insertion Sort

```typescript
// Type for array items (same as bubble sort)
export interface BarItem {
	value: number;
	state: SortingState;
	id: string;
}

// Possible states for array items
export type SortingState = "default" | "comparing" | "swapping" | "sorted";

// Type for each step of the algorithm (different from bubble sort)
export interface SortingStep {
	array: BarItem[]; // Current state of the array
	currentIndex: number; // Index of the current element being inserted
	comparingIndex: number; // Index of the element being compared
	insertPosition: number; // Position where element will be inserted
	sortedIndices: number[]; // Indices that are now sorted
}
```

## Algorithm Implementation Functions

Each algorithm has a main implementation function that:

1. Takes an initial array as input
2. Generates and returns an array of steps
3. Updates element states at each step

### Example: Bubble Sort Implementation

```typescript
export function bubbleSortSteps(inputArray: BarItem[]): SortingStep[] {
	// Make a deep copy of the input array to avoid mutations
	const array = inputArray.map((item) => ({ ...item }));
	const steps: SortingStep[] = [];
	const n = array.length;

	// Add initial state as first step
	steps.push({
		array: array.map((item) => ({ ...item, state: "default" })),
		comparing: [],
		swapped: false,
		sortedIndices: [],
	});

	// Keep track of sorted elements
	const sortedIndices: number[] = [];

	// Bubble sort algorithm with step recording
	for (let i = 0; i < n - 1; i++) {
		let swapped = false;

		for (let j = 0; j < n - i - 1; j++) {
			// Set comparing state for the two elements
			const arrayWithComparing = array.map((item, idx) => ({
				...item,
				state: idx === j || idx === j + 1 ? "comparing" : sortedIndices.includes(idx) ? "sorted" : "default",
			}));

			// Add comparing step
			steps.push({
				array: arrayWithComparing,
				comparing: [j, j + 1],
				swapped: false,
				sortedIndices: [...sortedIndices],
			});

			// If elements are in wrong order, swap them
			if (array[j].value > array[j + 1].value) {
				// Swap the elements
				const temp = { ...array[j] };
				array[j] = { ...array[j + 1] };
				array[j + 1] = temp;
				swapped = true;

				// Set swapping state for the two elements
				const arrayWithSwapping = array.map((item, idx) => ({
					...item,
					state: idx === j || idx === j + 1 ? "swapping" : sortedIndices.includes(idx) ? "sorted" : "default",
				}));

				// Add swapping step
				steps.push({
					array: arrayWithSwapping,
					comparing: [j, j + 1],
					swapped: true,
					sortedIndices: [...sortedIndices],
				});
			}
		}

		// Mark the largest element as sorted
		sortedIndices.push(n - i - 1);

		// Update array with sorted state
		const arrayWithSorted = array.map((item, idx) => ({
			...item,
			state: sortedIndices.includes(idx) ? "sorted" : "default",
		}));

		// Add step with updated sorted indices
		steps.push({
			array: arrayWithSorted,
			comparing: [],
			swapped: false,
			sortedIndices: [...sortedIndices],
		});

		// If no swapping occurred, array is sorted
		if (!swapped) break;
	}

	// If all elements aren't already marked as sorted, mark them
	if (sortedIndices.length < n) {
		for (let i = 0; i < n; i++) {
			if (!sortedIndices.includes(i)) {
				sortedIndices.push(i);
			}
		}

		// Add final step with all elements sorted
		steps.push({
			array: array.map((item) => ({ ...item, state: "sorted" })),
			comparing: [],
			swapped: false,
			sortedIndices: sortedIndices,
		});
	}

	return steps;
}
```

### Example: Insertion Sort Implementation

```typescript
export function insertionSortSteps(inputArray: BarItem[]): SortingStep[] {
	// Create a deep copy of the input array
	const array = inputArray.map((item) => ({ ...item }));
	const steps: SortingStep[] = [];
	const n = array.length;

	// Add initial state
	steps.push({
		array: array.map((item) => ({ ...item, state: "default" })),
		currentIndex: 0,
		comparingIndex: -1,
		insertPosition: 0,
		sortedIndices: [0], // First element is already "sorted"
	});

	// Track sorted indices
	const sortedIndices = [0];

	// Insertion sort algorithm with step recording
	for (let i = 1; i < n; i++) {
		// Current element to be inserted
		const current = { ...array[i] };
		let j = i - 1;

		// Show current element as selected
		const arrayWithCurrent = array.map((item, idx) => ({
			...item,
			state: idx === i ? "comparing" : sortedIndices.includes(idx) ? "sorted" : "default",
		}));

		// Add step for selecting current element
		steps.push({
			array: arrayWithCurrent,
			currentIndex: i,
			comparingIndex: -1,
			insertPosition: i,
			sortedIndices: [...sortedIndices],
		});

		// Compare with each element in sorted array
		while (j >= 0) {
			// Show comparison
			const arrayWithComparing = array.map((item, idx) => ({
				...item,
				state: idx === i ? "comparing" : idx === j ? "comparing" : sortedIndices.includes(idx) ? "sorted" : "default",
			}));

			// Add comparison step
			steps.push({
				array: arrayWithComparing,
				currentIndex: i,
				comparingIndex: j,
				insertPosition: j + 1,
				sortedIndices: [...sortedIndices],
			});

			// If current element is smaller, shift larger element right
			if (array[j].value > current.value) {
				array[j + 1] = { ...array[j] };

				// Show shift
				const arrayWithShift = array.map((item, idx) => {
					if (idx === j + 1) return { ...item, state: "swapping" };
					if (idx === i) return { ...item, state: "comparing" };
					if (sortedIndices.includes(idx)) return { ...item, state: "sorted" };
					return { ...item, state: "default" };
				});

				// Add shift step
				steps.push({
					array: arrayWithShift,
					currentIndex: i,
					comparingIndex: j,
					insertPosition: j,
					sortedIndices: [...sortedIndices],
				});

				j--;
			} else {
				break;
			}
		}

		// Insert the current element in its correct position
		array[j + 1] = current;

		// Mark current index as sorted
		sortedIndices.push(i);

		// Show array with new element inserted and sorted
		const arrayWithInserted = array.map((item, idx) => ({
			...item,
			state: sortedIndices.includes(idx) ? "sorted" : "default",
		}));

		// Add insertion step
		steps.push({
			array: arrayWithInserted,
			currentIndex: i,
			comparingIndex: -1,
			insertPosition: j + 1,
			sortedIndices: [...sortedIndices],
		});
	}

	return steps;
}
```

## Helper Functions

Most algorithm implementations also include helper functions like:

### Random Array Generation

```typescript
export function generateRandomArray(length: number): BarItem[] {
	const array: BarItem[] = [];

	for (let i = 0; i < length; i++) {
		array.push({
			value: Math.floor(Math.random() * 100) + 1, // Random value between 1-100
			state: "default",
			id: crypto.randomUUID(), // Unique ID for React keys
		});
	}

	return array;
}
```

## Key Implementation Patterns

1. **Immutability**: Always create new copies of objects and arrays to ensure React's reactivity works correctly.

2. **Step Recording**: Record every meaningful state change as a separate step.

3. **State Tracking**: Keep track of element states (comparing, swapping, sorted) at each step.

4. **Progress Tracking**: Track sorted elements and algorithm progress.

5. **Deep Copying**: Use deep copies to prevent unintended mutations between steps.
