"use client";
import { GeistMono } from "geist/font/mono";
import { ThemedPrism } from "../themed-prism";

interface CodeSnippetProps {
	currentStep: number;
	isComparing: boolean;
	isInserting: boolean;
}

export default function CodeSnippet({ currentStep, isComparing, isInserting }: CodeSnippetProps) {
	const code = `function insertionSort(arr) {
  const n = arr.length;
  
  for (let i = 1; i < n; i++) {
    // Current element to be inserted into sorted part
    let current = arr[i];
    
    // Index of the last element in the sorted part
    let j = i - 1;
    
    // Move elements of arr[0..i-1] that are greater than current
    // to one position ahead of their current position
    while (j >= 0 && arr[j] > current) {
      arr[j + 1] = arr[j];
      j--;
    }
    
    // Insert the current element into its correct position
    arr[j + 1] = current;
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
		highlightedLine = 13;
	} else if (isInserting) {
		// Inserting elements
		highlightedLine = 19;
	} else {
		// Moving to next iteration
		highlightedLine = 4;
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
