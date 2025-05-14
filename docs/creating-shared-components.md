# Creating Shared Components

This guide provides strategies for creating shared components to reduce code redundancy across different algorithm visualizers in AlgoSketch.

## Why Create Shared Components?

Looking at the current visualizers in AlgoSketch, we can observe significant duplication of code and functionality across different algorithm implementations. By creating shared components, we can:

1. Reduce code duplication
2. Improve maintainability
3. Ensure consistent behavior and styling
4. Make it easier to create new visualizers

## Identifying Components to Share

Analyzing the current codebase, we can identify several components that could be shared:

### 1. Bar Component

The `Bar` component is almost identical across different algorithm visualizers.

### 2. Control Panel

The control panels have identical functionality: array generation, playback controls, speed slider.

### 3. InfoBox

Information displays follow a consistent pattern with minor variations in statistics.

### 4. Legend

Color legends have a consistent structure with algorithm-specific color codes.

### 5. Base Visualizer Logic

The core animation logic, state management, and step navigation is similar across visualizers.

## Implementation Strategy

### Step 1: Create a Shared Components Directory

Start by creating a dedicated directory for shared components:

```
src/components/shared/
```

### Step 2: Implement Generic Components

#### Generic Bar Component

```tsx
// src/components/shared/Bar.tsx
import { cn } from "@/lib/utils";

export interface SharedBarItem {
	value: number;
	state: string;
	id: string;
}

export interface SharedBarProps {
	item: SharedBarItem;
	maxValue: number;
	index: number;
	stateStyles?: Record<string, string>;
	showValue?: boolean;
	showIndex?: boolean;
}

const defaultStateStyles = {
	default: "bg-blue-500",
	comparing: "bg-yellow-500",
	swapping: "bg-red-500",
	sorted: "bg-green-500",
};

export default function Bar({
	item,
	maxValue,
	index,
	stateStyles = defaultStateStyles,
	showValue = true,
	showIndex = true,
}: SharedBarProps) {
	const heightPercentage = (item.value / maxValue) * 100;

	// Fallback to default style if the specific state isn't provided
	const stateStyle = stateStyles[item.state] || defaultStateStyles.default;

	return (
		<div className="justify-end-safe flex h-full w-full flex-col items-center">
			<div
				className={cn("w-full rounded-t-md transition-all duration-300 ease-in-out", stateStyle)}
				style={{
					height: `${Math.max(heightPercentage, 5)}%`,
				}}
				aria-label={`Value: ${item.value}`}
			/>
			{showValue && <span className="mt-1 text-xs">{item.value}</span>}
			{showIndex && <span className="text-muted-foreground text-xs">{index}</span>}
		</div>
	);
}
```

#### Generic Control Panel

```tsx
// src/components/shared/Control.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { PlayIcon, PauseIcon, StepBackIcon, StepForwardIcon, RefreshCcwIcon } from "lucide-react";

export interface ControlProps {
	onResetAction: (size: number) => void;
	onStartAction: () => void;
	onNextAction: () => void;
	onPrevAction: () => void;
	onPauseAction: () => void;
	isPlaying: boolean;
	canGoNext: boolean;
	canGoPrev: boolean;
	currentStep: number;
	totalSteps: number;
	speed: number;
	onSpeedChangeAction: (speed: number) => void;
	extraControls?: React.ReactNode;
}

export default function Control({
	onResetAction,
	onStartAction,
	onNextAction,
	onPrevAction,
	onPauseAction,
	isPlaying,
	canGoNext,
	canGoPrev,
	currentStep,
	totalSteps,
	speed,
	onSpeedChangeAction,
	extraControls,
}: ControlProps) {
	const [arraySize, setArraySize] = useState(10);

	const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const size = parseInt(e.target.value);
		if (!isNaN(size) && size > 0 && size <= 20) {
			setArraySize(size);
		}
	};

	const handleArrayReset = () => {
		onResetAction(arraySize);
	};

	const handleSliderChange = (value: number[]) => {
		onSpeedChangeAction(value[0]);
	};

	const progress = totalSteps > 0 ? (currentStep / totalSteps) * 100 : 0;

	return (
		<div className="bg-card grid grid-cols-1 gap-4 rounded-lg border p-4 md:grid-cols-2">
			<div className="flex items-center gap-2">
				<Input type="number" value={arraySize} onChange={handleSizeChange} min={3} max={20} className="w-20" />
				<Button onClick={handleArrayReset} variant="outline" size="sm">
					<RefreshCcwIcon className="mr-1 h-4 w-4" />
					New Array
				</Button>
			</div>

			<div className="flex items-center justify-between gap-2">
				<div className="flex gap-1">
					<Button onClick={onPrevAction} variant="outline" size="icon" disabled={!canGoPrev}>
						<StepBackIcon className="h-4 w-4" />
					</Button>

					{isPlaying ? (
						<Button onClick={onPauseAction} variant="outline" size="icon">
							<PauseIcon className="h-4 w-4" />
						</Button>
					) : (
						<Button onClick={onStartAction} variant="outline" size="icon" disabled={!canGoNext}>
							<PlayIcon className="h-4 w-4" />
						</Button>
					)}

					<Button onClick={onNextAction} variant="outline" size="icon" disabled={!canGoNext}>
						<StepForwardIcon className="h-4 w-4" />
					</Button>
				</div>

				<div className="text-xs">
					Step {currentStep} of {totalSteps}
				</div>
			</div>

			<div className="md:col-span-2">
				<div className="flex items-center gap-4">
					<span className="text-sm">Speed:</span>
					<Slider value={[speed]} min={1} max={10} step={1} onValueChange={handleSliderChange} />
				</div>
			</div>

			{extraControls && <div className="md:col-span-2">{extraControls}</div>}

			<div className="relative h-2 w-full overflow-hidden rounded bg-gray-200 md:col-span-2 dark:bg-gray-700">
				<div className="h-full bg-blue-500 transition-all duration-300" style={{ width: `${progress}%` }}></div>
			</div>
		</div>
	);
}
```

#### Generic InfoBox

```tsx
// src/components/shared/InfoBox.tsx
export interface InfoBoxProps {
	currentStep: number;
	statistics: {
		label: string;
		value: number | string;
	}[];
	status?: "default" | "sorting" | "sorted";
}

export default function InfoBox({ currentStep, statistics, status = "default" }: InfoBoxProps) {
	const statusText = {
		default: "Ready",
		sorting: "Sorting...",
		sorted: "Sorted",
	};

	const statusClass = {
		default: "text-blue-500",
		sorting: "text-yellow-500",
		sorted: "text-green-500",
	};

	return (
		<div className="bg-card flex h-full flex-col gap-3 rounded-lg border p-4">
			<h3 className="font-semibold">Information</h3>
			<div className="grid grid-cols-2 gap-2">
				<div className="text-muted-foreground text-sm">Step:</div>
				<div className="text-sm font-medium">{currentStep}</div>

				{statistics.map((stat, index) => (
					<React.Fragment key={index}>
						<div className="text-muted-foreground text-sm">{stat.label}:</div>
						<div className="text-sm font-medium">{stat.value}</div>
					</React.Fragment>
				))}

				<div className="text-muted-foreground text-sm">Status:</div>
				<div className={`text-sm font-medium ${statusClass[status]}`}>{statusText[status]}</div>
			</div>
		</div>
	);
}
```

#### Generic Legend

```tsx
// src/components/shared/Legend.tsx
export interface LegendItem {
	color: string;
	label: string;
}

export interface LegendProps {
	items: LegendItem[];
}

export default function Legend({ items }: LegendProps) {
	return (
		<div className="bg-card flex flex-wrap gap-4 rounded-lg border p-3">
			{items.map((item, index) => (
				<div key={index} className="flex items-center gap-2">
					<div className={`h-4 w-4 rounded ${item.color}`}></div>
					<span className="text-sm">{item.label}</span>
				</div>
			))}
		</div>
	);
}
```

### Step 3: Create a Base Visualizer Hook

To share the core visualization logic, we can create a custom hook:

```tsx
// src/hooks/use-algorithm-visualizer.ts
import { useState, useRef, useEffect } from "react";

export interface VisualizerHookOptions<T, S> {
	generateRandomArray: (size: number) => T[];
	generateSteps: (array: T[]) => S[];
	onStepChange?: (currentStep: S, nextStep: S) => void;
	initialSize?: number;
}

export function useAlgorithmVisualizer<T, S>({
	generateRandomArray,
	generateSteps,
	onStepChange,
	initialSize = 10,
}: VisualizerHookOptions<T, S>) {
	const [array, setArray] = useState<T[]>([]);
	const [steps, setSteps] = useState<S[]>([]);
	const [currentStepIndex, setCurrentStepIndex] = useState(0);
	const [isPlaying, setIsPlaying] = useState(false);
	const [speed, setSpeed] = useState(5);

	const intervalRef = useRef<NodeJS.Timeout | null>(null);

	// Initialize with random array
	useEffect(() => {
		resetArray(initialSize);
	}, [initialSize]);

	// Reset array and steps
	const resetArray = (size: number) => {
		const newArray = generateRandomArray(size);
		setArray(newArray);
		const newSteps = generateSteps(newArray);
		setSteps(newSteps);
		setCurrentStepIndex(0);
		setIsPlaying(false);

		// Clear any running animation
		if (intervalRef.current) {
			clearInterval(intervalRef.current);
			intervalRef.current = null;
		}
	};

	// Go to the next step
	const nextStep = () => {
		setCurrentStepIndex((prevIndex) => {
			if (prevIndex < steps.length - 1) {
				// Notify of step change if callback is provided
				if (onStepChange && steps[prevIndex] && steps[prevIndex + 1]) {
					onStepChange(steps[prevIndex], steps[prevIndex + 1]);
				}
				return prevIndex + 1;
			} else {
				pauseAnimation();
				return prevIndex;
			}
		});
	};

	// Go to the previous step
	const prevStep = () => {
		if (currentStepIndex > 0) {
			setCurrentStepIndex((prev) => prev - 1);
		}
	};

	// Start animation
	const startAnimation = () => {
		if (currentStepIndex < steps.length - 1) {
			setIsPlaying(true);

			if (intervalRef.current) {
				clearInterval(intervalRef.current);
			}

			// Convert speed (1-10) to milliseconds
			const intervalTime = 1100 - speed * 100;

			intervalRef.current = setInterval(() => {
				setCurrentStepIndex((prevIndex) => {
					if (prevIndex < steps.length - 1) {
						// Notify of step change if callback is provided
						if (onStepChange && steps[prevIndex] && steps[prevIndex + 1]) {
							onStepChange(steps[prevIndex], steps[prevIndex + 1]);
						}
						return prevIndex + 1;
					} else {
						pauseAnimation();
						return prevIndex;
					}
				});
			}, intervalTime);
		}
	};

	// Pause animation
	const pauseAnimation = () => {
		setIsPlaying(false);
		if (intervalRef.current) {
			clearInterval(intervalRef.current);
			intervalRef.current = null;
		}
	};

	// Cleanup on unmount
	useEffect(() => {
		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
			}
		};
	}, []);

	// Return current step, state, and controls
	return {
		array,
		steps,
		currentStepIndex,
		currentStep: steps[currentStepIndex],
		isPlaying,
		speed,
		setSpeed,
		resetArray,
		nextStep,
		prevStep,
		startAnimation,
		pauseAnimation,
		canGoNext: currentStepIndex < steps.length - 1,
		canGoPrev: currentStepIndex > 0,
		totalSteps: steps.length - 1,
	};
}
```

## Integration Strategy

### Option 1: Direct Replacement

The simplest approach is to directly replace the existing components with the shared ones:

```tsx
// Example of using shared components in a visualizer
import { useAlgorithmVisualizer } from "@/hooks/use-algorithm-visualizer";
import Bar from "@/components/shared/Bar";
import Control from "@/components/shared/Control";
import InfoBox from "@/components/shared/InfoBox";
import Legend from "@/components/shared/Legend";

export default function Visualizer() {
	const [comparisons, setComparisons] = useState(0);
	const [swaps, setSwaps] = useState(0);

	// Use the shared hook
	const {
		currentStep,
		isPlaying,
		speed,
		setSpeed,
		resetArray,
		nextStep,
		prevStep,
		startAnimation,
		pauseAnimation,
		canGoNext,
		canGoPrev,
		currentStepIndex,
		totalSteps,
	} = useAlgorithmVisualizer({
		generateRandomArray,
		generateSteps: bubbleSortSteps,
		onStepChange: (currentStep, nextStep) => {
			// Update statistics on step change
			if (nextStep.comparing.length > 0) {
				setComparisons((prev) => prev + 1);
			}
			if (nextStep.swapped) {
				setSwaps((prev) => prev + 1);
			}
		},
	});

	// Derived values
	const maxValue = Math.max(...currentStep.array.map((item) => item.value), 1);
	const isSorted = currentStep.sortedIndices.length === currentStep.array.length;

	// Configure legend items
	const legendItems = [
		{ color: "bg-blue-500", label: "Unsorted" },
		{ color: "bg-yellow-500", label: "Comparing" },
		{ color: "bg-red-500", label: "Swapping" },
		{ color: "bg-green-500", label: "Sorted" },
	];

	// Configure statistics
	const statistics = [
		{ label: "Comparisons", value: comparisons },
		{ label: "Swaps", value: swaps },
	];

	return (
		<div className="flex w-full flex-col gap-4">
			<h2 className="mb-2 text-2xl font-bold">Bubble Sort Visualizer</h2>

			<Legend items={legendItems} />

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
					<InfoBox currentStep={currentStepIndex} statistics={statistics} status={isSorted ? "sorted" : "sorting"} />
				</div>
			</div>

			<Control
				onResetAction={resetArray}
				onStartAction={startAnimation}
				onNextAction={nextStep}
				onPrevAction={prevStep}
				onPauseAction={pauseAnimation}
				isPlaying={isPlaying}
				canGoNext={canGoNext}
				canGoPrev={canGoPrev}
				currentStep={currentStepIndex}
				totalSteps={totalSteps}
				speed={speed}
				onSpeedChangeAction={setSpeed}
			/>

			{/* Algorithm-specific components */}
			<StepDescription /* ... */ />
			<CodeSnippet /* ... */ />
		</div>
	);
}
```

### Option 2: Higher-Order Components

For more complex scenarios, create higher-order components:

```tsx
// src/components/shared/AlgorithmVisualizer.tsx
import React from "react";
import { useAlgorithmVisualizer } from "@/hooks/use-algorithm-visualizer";
import SharedControl from "@/components/shared/Control";
import SharedInfoBox from "@/components/shared/InfoBox";
import SharedLegend from "@/components/shared/Legend";

export interface AlgorithmVisualizerProps<T, S> {
	title: string;
	generateRandomArray: (size: number) => T[];
	generateSteps: (array: T[]) => S[];
	renderBars: (currentStep: S, maxValue: number) => React.ReactNode;
	renderStepDescription: (currentStep: S, currentStepIndex: number, totalSteps: number) => React.ReactNode;
	renderCodeSnippet: (currentStep: S, currentStepIndex: number) => React.ReactNode;
	getStatistics: (currentStepIndex: number) => { label: string; value: number | string }[];
	getLegendItems: () => { color: string; label: string }[];
	isSorted: (currentStep: S) => boolean;
	onStepChange?: (currentStep: S, nextStep: S) => void;
}

export function AlgorithmVisualizer<T, S>({
	title,
	generateRandomArray,
	generateSteps,
	renderBars,
	renderStepDescription,
	renderCodeSnippet,
	getStatistics,
	getLegendItems,
	isSorted,
	onStepChange,
}: AlgorithmVisualizerProps<T, S>) {
	const {
		currentStep,
		isPlaying,
		speed,
		setSpeed,
		resetArray,
		nextStep,
		prevStep,
		startAnimation,
		pauseAnimation,
		canGoNext,
		canGoPrev,
		currentStepIndex,
		totalSteps,
	} = useAlgorithmVisualizer<T, S>({
		generateRandomArray,
		generateSteps,
		onStepChange,
	});

	if (!currentStep) return null;

	const maxValue =
		typeof currentStep === "object" && Array.isArray((currentStep as any).array)
			? Math.max(...(currentStep as any).array.map((item: any) => item.value), 1)
			: 100;

	const legendItems = getLegendItems();
	const statistics = getStatistics(currentStepIndex);
	const sorted = isSorted(currentStep);

	return (
		<div className="flex w-full flex-col gap-4">
			<h2 className="mb-2 text-2xl font-bold">{title}</h2>

			<SharedLegend items={legendItems} />

			<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
				<div className="md:col-span-2">
					<div className="bg-card flex h-80 flex-col rounded-lg border p-4">
						<div className="flex flex-1 items-end justify-center gap-2">{renderBars(currentStep, maxValue)}</div>
					</div>
				</div>

				<div>
					<SharedInfoBox
						currentStep={currentStepIndex}
						statistics={statistics}
						status={sorted ? "sorted" : "sorting"}
					/>
				</div>
			</div>

			<SharedControl
				onResetAction={resetArray}
				onStartAction={startAnimation}
				onNextAction={nextStep}
				onPrevAction={prevStep}
				onPauseAction={pauseAnimation}
				isPlaying={isPlaying}
				canGoNext={canGoNext}
				canGoPrev={canGoPrev}
				currentStep={currentStepIndex}
				totalSteps={totalSteps}
				speed={speed}
				onSpeedChangeAction={setSpeed}
			/>

			<div className="bg-background mt-6 rounded-lg border p-4">
				{renderStepDescription(currentStep, currentStepIndex, totalSteps)}
			</div>

			{renderCodeSnippet(currentStep, currentStepIndex)}
		</div>
	);
}
```

## Best Practices for Shared Components

### 1. Use TypeScript Generics for Flexibility

Make your shared components and hooks generic to accommodate different algorithm-specific types:

```typescript
function useAlgorithmVisualizer<T, S>(...) {
    // T could be the array item type
    // S could be the step type
}
```

### 2. Provide Sensible Defaults

Always provide default values for optional props to ensure components work without extensive configuration:

```typescript
export default function Bar({
	item,
	maxValue,
	index,
	stateStyles = defaultStateStyles, // Default provided
	showValue = true, // Default provided
	showIndex = true, // Default provided
}: BarProps) {
	// ...
}
```

### 3. Use Composition Over Inheritance

Prefer composing components rather than extending them:

```tsx
// Better approach (composition)
<SharedControl {...controlProps} extraControls={<AlgorithmSpecificControls />} />;

// Avoid this approach (inheritance)
class BubbleSortControl extends SharedControl {
	// ...
}
```

### 4. Use Callback Props for Customization

Allow customization through callback props:

```tsx
<SharedInfoBox {...infoBoxProps} statistics={getStatistics(currentStepIndex)} />
```

### 5. Consider Using Context API for Deep Component Trees

For deeply nested components that need access to shared state:

```tsx
// Create a context for algorithm visualization
const AlgorithmContext = createContext<{
	currentStep: any;
	currentStepIndex: number;
	totalSteps: number;
	// more state...
} | null>(null);

// Provide context in the main visualizer
<AlgorithmContext.Provider value={{ currentStep, currentStepIndex, totalSteps }}>
	{/* Child components */}
</AlgorithmContext.Provider>;

// Use context in deeply nested components
function DeepComponent() {
	const context = useContext(AlgorithmContext);
	// Access context.currentStep, etc.
}
```

## Migration Strategy

When converting existing visualizers to use shared components:

1. **Start Small**: Begin with simpler components like `Bar` and `Legend`
2. **One Algorithm at a Time**: Fully convert one algorithm before moving to the next
3. **Test Thoroughly**: Ensure the new implementation maintains all original functionality
4. **Incremental Adoption**: Gradually adopt shared components rather than rewriting everything at once

## Example: Converting Bubble Sort to Use Shared Components

Here's how the Bubble Sort visualizer could be refactored to use shared components:

```tsx
// src/components/bubble/visualizer.tsx
"use client";

import { useState, useRef } from "react";
import { useAlgorithmVisualizer } from "@/hooks/use-algorithm-visualizer";
import { BarItem, SortingStep, bubbleSortSteps, generateRandomArray } from "./bubbleSort";
import SharedBar from "@/components/shared/Bar";
import SharedControl from "@/components/shared/Control";
import SharedLegend from "@/components/shared/Legend";
import SharedInfoBox from "@/components/shared/InfoBox";
import SortStepDescription from "./stepDescription";
import CodeSnippet from "./codeSnippet";
import Banner from "../banner";

export default function Visualizer() {
	const [comparisons, setComparisons] = useState(0);
	const [swaps, setSwaps] = useState(0);
	const containerRef = useRef<HTMLDivElement | null>(null);

	const handleStepChange = (currentStep: SortingStep, nextStep: SortingStep) => {
		if (nextStep.comparing.length > 0) {
			setComparisons((prev) => prev + 1);
		}
		if (nextStep.swapped) {
			setSwaps((prev) => prev + 1);
		}
	};

	const {
		currentStep,
		isPlaying,
		speed,
		setSpeed,
		resetArray,
		nextStep,
		prevStep,
		startAnimation,
		pauseAnimation,
		canGoNext,
		canGoPrev,
		currentStepIndex,
		totalSteps,
	} = useAlgorithmVisualizer<BarItem, SortingStep>({
		generateRandomArray,
		generateSteps: bubbleSortSteps,
		onStepChange: handleStepChange,
	});

	const handleScroll = () => {
		if (containerRef.current) {
			containerRef.current.scrollIntoView({ behavior: "smooth" });
		}
	};

	// Ensure currentStep is available
	if (!currentStep) return null;

	const maxValue = Math.max(...currentStep.array.map((item) => item.value), 1);
	const isSorted = currentStep.sortedIndices.length === currentStep.array.length;

	const legendItems = [
		{ color: "bg-blue-500", label: "Unsorted" },
		{ color: "bg-yellow-500", label: "Comparing" },
		{ color: "bg-red-500", label: "Swapping" },
		{ color: "bg-green-500", label: "Sorted" },
	];

	const statistics = [
		{ label: "Comparisons", value: comparisons },
		{ label: "Swaps", value: swaps },
	];

	return (
		<>
			<Banner onClickAction={handleScroll} />
			<div className="flex w-full flex-col gap-4" ref={containerRef}>
				<h2 className="mb-2 text-2xl font-bold">Bubble Sort Visualizer</h2>

				<SharedLegend items={legendItems} />

				<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
					<div className="md:col-span-2">
						<div className="bg-card flex h-80 flex-col rounded-lg border p-4">
							<div className="flex flex-1 items-end justify-center gap-2">
								{currentStep.array.map((item, index) => (
									<SharedBar key={item.id} item={item} maxValue={maxValue} index={index} />
								))}
							</div>
						</div>
					</div>

					<div>
						<SharedInfoBox
							currentStep={currentStepIndex}
							statistics={statistics}
							status={isSorted ? "sorted" : "sorting"}
						/>
					</div>
				</div>

				<SharedControl
					onResetAction={resetArray}
					onStartAction={startAnimation}
					onNextAction={nextStep}
					onPrevAction={prevStep}
					onPauseAction={pauseAnimation}
					isPlaying={isPlaying}
					canGoNext={canGoNext}
					canGoPrev={canGoPrev}
					currentStep={currentStepIndex}
					totalSteps={totalSteps}
					speed={speed}
					onSpeedChangeAction={setSpeed}
				/>

				<div className="bg-background mt-6 rounded-lg border p-4">
					<SortStepDescription
						currentStepIndex={currentStepIndex}
						totalSteps={totalSteps}
						isComparing={currentStep.comparing.length > 0 && !currentStep.swapped}
						isSwapping={currentStep.swapped}
						compareIndices={currentStep.comparing}
						sortedIndices={currentStep.sortedIndices}
						values={currentStep.array.map((item) => item.value)}
					/>
				</div>

				<CodeSnippet
					currentStep={currentStepIndex}
					isComparing={currentStep.comparing.length > 0 && !currentStep.swapped}
					isSwapping={currentStep.swapped}
				/>
			</div>
		</>
	);
}
```

This approach maintains the existing algorithm-specific components (`SortStepDescription` and `CodeSnippet`) while using shared components for the common UI elements.
