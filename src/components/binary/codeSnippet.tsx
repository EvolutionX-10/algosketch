"use client";

import { SearchingStep } from "./binarySearch";
import { ThemedPrism } from "../themed-prism";

interface CodeSnippetProps {
	currentStep: SearchingStep | undefined;
}

export default function CodeSnippet({ currentStep }: CodeSnippetProps) {
	const getHighlightedLines = (): number[] => {
		if (!currentStep) return [];

		if (currentStep.left === 0 && currentStep.right >= 0 && currentStep.mid === -1) {
			// Initialization phase
			return [1, 2];
		}

		if (currentStep.finished) {
			if (currentStep.found) {
				return [8]; // return mid (found)
			} else {
				return [13]; // return -1 (not found)
			}
		}

		// Currently searching
		if (currentStep.comparison === "equal") {
			return [7, 8]; // comparison and return
		} else if (currentStep.comparison === "less") {
			return [7, 9, 10]; // comparison and left = mid + 1
		} else if (currentStep.comparison === "greater") {
			return [7, 11, 12]; // comparison and right = mid - 1
		}

		return [4, 5, 6]; // while loop and mid calculation
	};

	const code = `function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        
        if (arr[mid] === target) {
            return mid; // Found! Return the index
        } else if (arr[mid] < target) {
            left = mid + 1; // Search right half
        } else {
            right = mid - 1; // Search left half
        }
    }
    return -1; // Not found
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
					backgroundColor: getHighlightedLines().includes(lineNumber) ? "rgba(0, 100, 205, 0.2)" : "transparent",
				},
			})}
		>
			{code}
		</ThemedPrism>
	);
}
