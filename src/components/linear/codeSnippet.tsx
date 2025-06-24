"use client";

import { SearchingStep } from "./linearSearch";
import { ThemedPrism } from "../themed-prism";

interface CodeSnippetProps {
	currentStep: SearchingStep | undefined;
}

export default function CodeSnippet({ currentStep }: CodeSnippetProps) {
	const getHighlightedLines = (): number[] => {
		if (!currentStep) return [];

		if (currentStep.currentIndex === -1) {
			// Initialization phase
			return [1, 2];
		}

		if (currentStep.finished) {
			if (currentStep.found) {
				return [6]; // return i (found)
			} else {
				return [9]; // return -1 (not found)
			}
		}

		// Currently searching
		return [4, 5]; // the comparison and potential return
	};

	const code = `function linearSearch(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        // Check if current element matches target
        if (arr[i] === target) {
            return i; // Found! Return the index
        }
    }
    return -1; // Not found
}`;
	return (
		<ThemedPrism
			language="javascript"
			showLineNumbers={true}
			wrapLines={true}
			lineProps={(lineNumber) => {
				if (getHighlightedLines().includes(lineNumber)) {
					return {
						className: "bg-blue-300/50 font-medium rounded-sm dark:bg-blue-200/20 block",
						style: {
							padding: "0.2em 0.5em",
						},
					};
				}
				return { style: { display: "block", padding: "0.2em 0.5em" } };
			}}
		>
			{code}
		</ThemedPrism>
	);
}
