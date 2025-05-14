"use client";
import { GeistMono } from "geist/font/mono";

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

	const codeLines = code.split("\n");

	return (
		<div className="overflow-x-auto rounded-lg p-4">
			<h2 className="mb-2 text-lg font-medium">Insertion Sort Implementation</h2>
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
