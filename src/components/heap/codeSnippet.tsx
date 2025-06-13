"use client";

import { ThemedPrism } from "../themed-prism";

interface CodeSnippetProps {
	currentStep: number;
	isBuilding: boolean;
	isExtracting: boolean;
	isHeapifying: boolean;
	isComparing: boolean;
}

export default function CodeSnippet({
	currentStep,
	isBuilding,
	isExtracting,
	isHeapifying,
	isComparing,
}: CodeSnippetProps) {
	const getHighlightedLines = () => {
		if (currentStep === 0) return [1]; // Initial state
		if (isBuilding && !isHeapifying) return [4, 5]; // Building heap
		if (isHeapifying || isComparing) return [15, 16, 17, 18, 19]; // Heapify function
		if (isExtracting) return [8, 9, 10]; // Extracting max
		return [11]; // Heapify call after extraction
	};

	const codeString = `function heapSort(arr) {
  const n = arr.length;
  
  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }
  
  // Extract elements one by one
  for (let i = n - 1; i > 0; i--) {
    // Move current root to end
    [arr[0], arr[i]] = [arr[i], arr[0]];
    
    // Heapify reduced heap
    heapify(arr, i, 0);
  }
}

function heapify(arr, heapSize, rootIndex) {
  let largest = rootIndex;
  const left = 2 * rootIndex + 1;
  const right = 2 * rootIndex + 2;
  
  // Check if left child is larger than root
  if (left < heapSize && arr[left] > arr[largest]) {
    largest = left;
  }
  
  // Check if right child is larger than current largest
  if (right < heapSize && arr[right] > arr[largest]) {
    largest = right;
  }
  
  // If largest is not root, swap and continue heapifying
  if (largest !== rootIndex) {
    [arr[rootIndex], arr[largest]] = [arr[largest], arr[rootIndex]];
    heapify(arr, heapSize, largest);
  }
}`;
	return (
		<ThemedPrism
			language="javascript"
			showLineNumbers={true}
			wrapLines={true}
			lineProps={(lineNumber) => ({
				style: {
					display: "block",
					backgroundColor: getHighlightedLines().includes(lineNumber) ? "rgba(255, 255, 0, 0.2)" : "transparent",
				},
			})}
		>
			{codeString}
		</ThemedPrism>
	);
}
