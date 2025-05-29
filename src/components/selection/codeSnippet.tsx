"use client";

import { ThemedPrism } from "../themed-prism";

interface CodeSnippetProps {
	currentStep: number;
	isComparing: boolean;
	isSelecting: boolean;
}

export default function CodeSnippet({ currentStep, isComparing, isSelecting }: CodeSnippetProps) {
	const code = `function selectionSort(arr) {
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    // Find the minimum element in unsorted part
    let minIndex = i;
    
    for (let j = i + 1; j < n; j++) {
      // Compare with current minimum
      if (arr[j] < arr[minIndex]) {
        // Update minimum index if found
        minIndex = j;
      }
    }
    
    // Swap the found minimum with the first unsorted element
    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
    
    // i-th element is now in the correct place
  }

  return arr;
}`;

	// Determine which line should be highlighted based on the current step
	let highlightedLine = 0;

	if (currentStep === 0) {
		// Initial array state
		highlightedLine = 2;
	} else if (isComparing) {
		// Comparing elements to find minimum
		highlightedLine = 10;
	} else if (isSelecting) {
		// Swapping the minimum to the correct position
		highlightedLine = 18;
	} else {
		// Moving to next position
		highlightedLine = 21;
	}

	return (
		<ThemedPrism
			language="javascript"
			customStyle={{ fontFamily: "var(--font-mono)" }}
			showLineNumbers={true}
			wrapLines={true}
			lineProps={(lineNumber) => {
				if (lineNumber === highlightedLine) {
					return {
						className: "bg-blue-300/50 font-medium rounded-sm dark:bg-blue-200/20 block",
					};
				}
				return {};
			}}
		>
			{code}
		</ThemedPrism>
	);
}
