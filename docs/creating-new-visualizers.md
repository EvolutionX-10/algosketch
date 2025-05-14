# Creating New Visualizers

This guide provides a step-by-step approach to creating new algorithm visualizers in AlgoSketch.

## Step 1: Create the Directory Structure

Start by creating a new directory for your algorithm under `src/components`:

```
src/components/[algorithm-name]/
├── visualizer.tsx
├── [algorithm-name]Sort.ts
├── bar.tsx
├── control.tsx
├── infoBox.tsx
├── legend.tsx
├── stepDescription.tsx
└── codeSnippet.tsx
```

Replace `[algorithm-name]` with the name of your algorithm (e.g., `quicksort`, `mergesort`, `heapsort`).

## Step 2: Implement the Algorithm

Create your algorithm implementation in the `[algorithm-name]Sort.ts` file.

### Define TypeScript Types

```typescript
// Types for the algorithm
export type SortingState = "default" | "comparing" | "swapping" | "sorted" | "pivot" | "merged";

export interface BarItem {
	value: number;
	state: SortingState;
	id: string;
}

export interface SortingStep {
	array: BarItem[];
	// Algorithm-specific properties, e.g.:
	pivotIndex?: number;
	comparingIndices?: number[];
	swappingIndices?: number[];
	sortedIndices: number[];
	// Additional properties specific to your algorithm:
	mergeRanges?: [number, number][];
	subArrayBoundaries?: [number, number][];
}
```

Add any additional properties to the `SortingStep` interface that are specific to your algorithm's visualization needs.

### Implement the Algorithm with Step Recording

```typescript
export function [algorithm-name]SortSteps(inputArray: BarItem[]): SortingStep[] {
    // Create a deep copy of the input array
    const array = inputArray.map(item => ({...item}));
    const steps: SortingStep[] = [];

    // Add initial state
    steps.push({
        array: array.map(item => ({...item, state: "default"})),
        sortedIndices: [],
        // Other initial properties
    });

    // Implement your algorithm, recording steps at each significant state change
    // ...

    return steps;
}
```

### Implement Helper Functions

```typescript
export function generateRandomArray(length: number): BarItem[] {
	const array: BarItem[] = [];

	for (let i = 0; i < length; i++) {
		array.push({
			value: Math.floor(Math.random() * 100) + 1,
			state: "default",
			id: crypto.randomUUID(),
		});
	}

	return array;
}
```

## Step 3: Create the Visualizer Component

Create the main visualizer component in `visualizer.tsx`:

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { BarItem, SortingStep, generateRandomArray, [algorithm-name]SortSteps } from "./[algorithm-name]Sort";
import Bar from "./bar";
import Control from "./control";
import Legend from "./legend";
import InfoBox from "./infoBox";
import SortStepDescription from "./stepDescription";
import CodeSnippet from "./codeSnippet";
import Banner from "@/components/banner";

export default function Visualizer() {
    // State declarations
    const [array, setArray] = useState<BarItem[]>([]);
    const [steps, setSteps] = useState<SortingStep[]>([]);
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [speed, setSpeed] = useState(5);
    // Algorithm-specific statistics
    const [comparisons, setComparisons] = useState(0);
    const [operations, setOperations] = useState(0);

    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);

    // Scroll handling
    const handleScroll = () => {
        if (containerRef.current) {
            containerRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    // Initialize on mount
    useEffect(() => {
        resetArray(10);
    }, []);

    // Array reset and initialization
    const resetArray = (size: number) => {
        const newArray = generateRandomArray(size);
        setArray(newArray);
        const newSteps = [algorithm-name]SortSteps(newArray);
        setSteps(newSteps);
        setCurrentStepIndex(0);
        setIsPlaying(false);
        setComparisons(0);
        setOperations(0);

        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };

    // Navigation methods
    const nextStep = () => {
        // Implementation
    };

    const prevStep = () => {
        // Implementation
    };

    // Animation control
    const startAnimation = () => {
        // Implementation
    };

    const pauseAnimation = () => {
        // Implementation
    };

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    // Current step data
    const currentStep = steps[currentStepIndex] || {
        array: array,
        // Default values for algorithm-specific properties
        sortedIndices: [],
    };

    // Derived values
    const maxValue = Math.max(...array.map((item) => item.value), 1);
    const isSorted = currentStep.sortedIndices.length === array.length;

    return (
        <>
            <Banner onClickAction={handleScroll} />
            <div className="flex w-full flex-col gap-4" ref={containerRef}>
                <h2 className="mb-2 text-2xl font-bold">[Algorithm Name] Sort Visualizer</h2>

                <Legend />

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="md:col-span-2">
                        <div className="bg-card flex h-80 flex-col rounded-lg border p-4">
                            <div className="flex flex-1 items-end justify-center gap-2">
                                {currentStep.array.map((item, index) => (
                                    <Bar key={item.id} item={item} maxValue={maxValue} index={index} />
                                ))}
                            </div>
                        </div>
                    </div>

                    <div>
                        <InfoBox
                            currentStep={currentStepIndex}
                            comparisons={comparisons}
                            operations={operations}
                            isSorted={isSorted}
                        />
                    </div>
                </div>

                <Control
                    onResetAction={resetArray}
                    onStartAction={startAnimation}
                    onNextAction={nextStep}
                    onPrevAction={prevStep}
                    onPauseAction={pauseAnimation}
                    isPlaying={isPlaying}
                    canGoNext={currentStepIndex < steps.length - 1}
                    canGoPrev={currentStepIndex > 0}
                    currentStep={currentStepIndex}
                    totalSteps={steps.length - 1}
                    speed={speed}
                    onSpeedChangeAction={setSpeed}
                />

                <div className="bg-background mt-6 rounded-lg border p-4">
                    <SortStepDescription
                        currentStepIndex={currentStepIndex}
                        totalSteps={steps.length - 1}
                        // Algorithm-specific props
                        currentStep={currentStep}
                        values={currentStep.array.map((item) => item.value)}
                    />
                </div>

                <CodeSnippet
                    currentStep={currentStepIndex}
                    // Algorithm-specific props
                />
            </div>
        </>
    );
}
```

## Step 4: Implement Supporting Components

### Bar Component

```tsx
export default function Bar({ item, maxValue, index }: BarProps) {
	const heightPercentage = (item.value / maxValue) * 100;

	// Define state-based styling
	const stateStyles = {
		default: "bg-blue-500",
		comparing: "bg-yellow-500",
		swapping: "bg-red-500",
		sorted: "bg-green-500",
		// Add algorithm-specific states:
		pivot: "bg-purple-500",
		merged: "bg-teal-500",
	};

	return (
		<div className="justify-end-safe flex h-full w-full flex-col items-center">
			<div
				className={cn("w-full rounded-t-md transition-all duration-300 ease-in-out", stateStyles[item.state])}
				style={{
					height: `${Math.max(heightPercentage, 5)}%`,
				}}
				aria-label={`Value: ${item.value}`}
			/>
			<span className="mt-1 text-xs">{item.value}</span>
			<span className="text-muted-foreground text-xs">{index}</span>
		</div>
	);
}
```

### Legend Component

```tsx
export default function Legend() {
	return (
		<div className="bg-card flex flex-wrap gap-4 rounded-lg border p-3">
			<div className="flex items-center gap-2">
				<div className="h-4 w-4 rounded bg-blue-500"></div>
				<span className="text-sm">Unsorted</span>
			</div>
			<div className="flex items-center gap-2">
				<div className="h-4 w-4 rounded bg-yellow-500"></div>
				<span className="text-sm">Comparing</span>
			</div>
			<div className="flex items-center gap-2">
				<div className="h-4 w-4 rounded bg-red-500"></div>
				<span className="text-sm">Swapping</span>
			</div>
			<div className="flex items-center gap-2">
				<div className="h-4 w-4 rounded bg-green-500"></div>
				<span className="text-sm">Sorted</span>
			</div>
			{/* Add algorithm-specific legend items */}
			<div className="flex items-center gap-2">
				<div className="h-4 w-4 rounded bg-purple-500"></div>
				<span className="text-sm">Pivot</span>
			</div>
		</div>
	);
}
```

### InfoBox Component

```tsx
export default function InfoBox({ currentStep, comparisons, operations, isSorted }: InfoBoxProps) {
	return (
		<div className="bg-card flex h-full flex-col gap-3 rounded-lg border p-4">
			<h3 className="font-semibold">Information</h3>
			<div className="grid grid-cols-2 gap-2">
				<div className="text-muted-foreground text-sm">Step:</div>
				<div className="text-sm font-medium">{currentStep}</div>

				<div className="text-muted-foreground text-sm">Comparisons:</div>
				<div className="text-sm font-medium">{comparisons}</div>

				<div className="text-muted-foreground text-sm">Operations:</div>
				<div className="text-sm font-medium">{operations}</div>

				<div className="text-muted-foreground text-sm">Status:</div>
				<div className="text-sm font-medium">
					{isSorted ? (
						<span className="text-green-500">Sorted</span>
					) : (
						<span className="text-yellow-500">Sorting...</span>
					)}
				</div>

				{/* Add algorithm-specific statistics */}
			</div>
		</div>
	);
}
```

### StepDescription Component

This component will need to be customized for your specific algorithm:

```tsx
export default function SortStepDescription({
	currentStepIndex,
	totalSteps,
	currentStep,
	values,
}: StepDescriptionProps) {
	const description = useMemo(() => {
		// Generate a description based on the current step
		if (currentStepIndex === 0) {
			return "Initial array.";
		}

		if (currentStepIndex === totalSteps) {
			return "Array is sorted!";
		}

		// Algorithm-specific descriptions based on currentStep properties
		// ...

		return "Processing...";
	}, [currentStepIndex, totalSteps, currentStep, values]);

	return (
		<div className="flex flex-col gap-2">
			<h3 className="text-lg font-semibold">Step Description</h3>
			<p>{description}</p>
		</div>
	);
}
```

### CodeSnippet Component

```tsx
export default function CodeSnippet({ currentStep /* algorithm-specific props */ }: CodeSnippetProps) {
	// Determine which line to highlight based on the current step
	const highlightedLineIndex = useMemo(() => {
		// Algorithm-specific logic to determine which line of code to highlight
		// ...
		return 0;
	}, [currentStep]);

	// The algorithm code to display
	const code = `// [Algorithm Name] Sort Implementation
function [algorithmName]Sort(array) {
    // Line 0: Initial setup
    if (array.length <= 1) return array;
    
    // Line 1: Algorithm-specific step 1
    
    // Line 2: Algorithm-specific step 2
    
    // Additional lines...
}`;

	// Split code into lines for highlighting
	const codeLines = code.split("\n");

	return (
		<div className="bg-card mt-6 rounded-lg border p-4">
			<h3 className="mb-3 text-lg font-semibold">Algorithm Code</h3>
			<pre className="overflow-x-auto rounded bg-gray-100 p-4 dark:bg-gray-800">
				<code>
					{codeLines.map((line, index) => (
						<div
							key={index}
							className={cn(
								"font-mono text-sm",
								highlightedLineIndex === index ? "bg-yellow-100 dark:bg-yellow-900" : "",
							)}
						>
							{line}
						</div>
					))}
				</code>
			</pre>
		</div>
	);
}
```

## Step 5: Create a Page for the Visualizer

Create a new page file in `src/app/dashboard/algorithms/sorting/[algorithm-name]/page.mdx`:

```mdx
# [Algorithm Name] Sort

Brief explanation of the algorithm, its time complexity, and characteristics.

## How it Works

Explain the key steps of the algorithm:

1. Step 1
2. Step 2
3. ...

## Visualization

<Visualizer />
```

## Step 6: Add Navigation

Update the relevant navigation components to include your new algorithm.

## Tips for Specific Algorithm Types

### Divide and Conquer Algorithms (QuickSort, MergeSort)

For algorithms that use divide and conquer:

1. **Tracking Subarrays**: Add properties to track subarray boundaries.
2. **Recursion Visualization**: Show the recursive calls visually.
3. **Merging Steps**: For merge sort, show the merging process clearly.
4. **Pivot Selection**: For quicksort, highlight pivot elements.

### In-Place vs. Out-of-Place Algorithms

For algorithms that use auxiliary space:

1. **Auxiliary Array Visualization**: Show additional arrays used during sorting.
2. **Space Complexity Tracking**: Track auxiliary space usage.

### Non-Comparison Based Algorithms (Radix Sort, Counting Sort)

For algorithms that don't use direct comparisons:

1. **Bucket Visualization**: Show buckets or counting arrays.
2. **Digit/Key Highlighting**: Highlight the current digit being processed.

## Testing Your Visualizer

When implementing your visualizer, test it with:

1. **Various Array Sizes**: Test with small (3-5 elements) to medium (10-20 elements) arrays.
2. **Edge Cases**: Test with already sorted arrays, reverse sorted arrays, and arrays with duplicate values.
3. **Animation Speed**: Test different animation speeds to ensure smooth transitions.

Remember that visualizations are meant to be educational, so prioritize clarity over perfectly optimized code.
