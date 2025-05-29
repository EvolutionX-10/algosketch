"use client";
import { ThemedPrism } from "../themed-prism";

interface CodeSnippetProps {
	currentStep: number;
	isComparing: boolean;
	isMerging: boolean;
}

export default function CodeSnippet({ currentStep, isComparing, isMerging }: CodeSnippetProps) {
	const code = `// Merge Sort implementation using divide and conquer
function mergeSort(arr) {
  // Base case: single item arrays are already sorted
  if (arr.length <= 1) return arr;

  // Divide: Split the array into halves
  const mid = Math.floor(arr.length / 2);
  
  // Conquer: Recursively sort both halves
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  
  // Combine: Merge the sorted halves
  return merge(left, right);
}

function merge(left, right) {
  const merged = [];
  let i = 0; // Index for left array
  let j = 0; // Index for right array
  
  // Compare elements from both arrays and merge in sorted order
  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      merged.push(left[i]);
      i++;
    } else {
      merged.push(right[j]);
      j++;
    }
  }
  
  // Add any remaining elements
  merged.push(...left.slice(i));
  merged.push(...right.slice(j));
  
  return merged;
}`;

	// Determine which part of the code to highlight based on the current step
	let highlightRange = [0, 0];
	if (currentStep === 0) {
		highlightRange = [1, 3]; // Initial array state
	} else if (isComparing) {
		highlightRange = [21, 28]; // Comparing elements
	} else if (isMerging) {
		highlightRange = [15, 17]; // Merging phase
	} else {
		// Determine if we're more likely in dividing or combining phase based on step
		if (currentStep < 5) {
			highlightRange = [5, 8]; // Dividing phase (early steps)
		} else if (currentStep > 15) {
			highlightRange = [30, 32]; // Final merging steps
		} else {
			highlightRange = [9, 11]; // Somewhere in recursive calls
		}
	}

	return (
		<ThemedPrism
			language="javascript"
			customStyle={{ fontFamily: "var(--font-mono)" }}
			showLineNumbers={true}
			wrapLines={true}
			lineProps={(lineNumber) => {
				if (lineNumber >= highlightRange[0] && lineNumber <= highlightRange[1]) {
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
