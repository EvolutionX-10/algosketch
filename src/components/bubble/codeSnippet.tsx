"use client";
import { GeistMono } from "geist/font/mono";
import { ThemedPrism } from "../themed-prism";

interface CodeSnippetProps {
	currentStep: number;
	isComparing: boolean;
	isSwapping: boolean;
}

export default function CodeSnippet({ currentStep, isComparing, isSwapping }: CodeSnippetProps) {
	const code = `function bubbleSort(arr) {
  const n = arr.length;
  let swapped;

  for (let i = 0; i < n; i++) {
    swapped = false;

    // Last i elements are already in place
    for (let j = 0; j < n - i - 1; j++) {
      // Compare adjacent elements
      if (arr[j] > arr[j + 1]) {
        // Swap them if they are in wrong order
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }

    // If no swapping occurred in this pass, array is sorted
    if (!swapped) break;
  }

  return arr;
}`;

	// Determine which line should be highlighted based on the current step
	let highlightedLine = 0;

	if (currentStep === 0) {
		// Initial array state
		highlightedLine = 2;
	} else if (isComparing) {
		// Comparing elements
		highlightedLine = 11;
	} else if (isSwapping) {
		// Swapping elements
		highlightedLine = 13;
	} else {
		// Checking if sorted or moving to next iteration
		highlightedLine = 19;
	}

	return (
		<ThemedPrism
			language="javascript"
			customStyle={{ fontFamily: GeistMono.className }}
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
