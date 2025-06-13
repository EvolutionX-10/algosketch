"use client";

import { ThemedPrism } from "../themed-prism";

interface CodeSnippetProps {
	currentStep: number;
	isPartitioning: boolean;
	isSwapping: boolean;
	isComparing: boolean;
	hasPivot: boolean;
}

export default function CodeSnippet({
	currentStep,
	isPartitioning,
	isSwapping,
	isComparing,
	hasPivot,
}: CodeSnippetProps) {
	const getHighlightedLines = () => {
		if (currentStep === 0) return [1]; // Initial state
		if (hasPivot && !isPartitioning && !isComparing) return [8, 9]; // Pivot selection
		if (isComparing) return [11, 12, 13]; // Comparison
		if (isSwapping) return [15, 16, 17]; // Swapping
		if (isPartitioning) return [6, 7]; // Partitioning
		return [20, 21]; // Recursive calls
	};

	const codeString = `function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    // Partition the array and get pivot index
    const pivotIndex = partition(arr, low, high);
    
    // Recursively sort left and right partitions
    quickSort(arr, low, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, high);
  }
}

function partition(arr, low, high) {
  // Choose rightmost element as pivot
  const pivot = arr[high];
  let i = low - 1; // Index of smaller element
  
  for (let j = low; j < high; j++) {
    // If current element is smaller than or equal to pivot
    if (arr[j] <= pivot) {
      i++;
      // Swap elements
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  
  // Place pivot in correct position
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1; // Return pivot index
}`;
	return (
		<ThemedPrism
			language="javascript"
			showLineNumbers={true}
			wrapLines={true}
			lineProps={(lineNumber) => ({
				style: {
					display: "block",
					borderRadius: "0.25em",
					padding: "0.2em 0.5em",
					fontWeight: getHighlightedLines().includes(lineNumber) ? "600" : "normal",
					backgroundColor: getHighlightedLines().includes(lineNumber) ? "rgba(255, 255, 0, 0.2)" : "transparent",
				},
			})}
		>
			{codeString}
		</ThemedPrism>
	);
}
