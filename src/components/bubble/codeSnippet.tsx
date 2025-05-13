"use client";
import { GeistMono } from "geist/font/mono";

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

	const codeLines = code.split("\n");

	return (
		<div className="overflow-x-auto rounded-lg p-4">
			<h2 className="mb-2 text-lg font-medium">Bubble Sort Implementation</h2>
			<pre className={"border bg-slate-50 text-sm dark:bg-slate-900 " + GeistMono.className}>
				{codeLines.map((line, index) => (
					<div
						key={index}
						className={`${index === highlightedLine - 1 ? "rounded-sm bg-blue-100 font-semibold dark:bg-blue-700/50" : ""} px-2 py-0.5`}
					>
						<span className="mr-4 text-gray-500 dark:text-gray-400">{index + 1}</span>
						<span className="text-slate-800 dark:text-gray-200">{line}</span>
					</div>
				))}
			</pre>
		</div>
	);
}
