# Visualizer Components

This document details the various components that make up the algorithm visualizers in AlgoSketch.

## Main Visualizer Component

The `Visualizer` component (`visualizer.tsx`) is the central component for each algorithm visualization. It serves as a container and controller for the entire visualization process.

### Key Responsibilities

- Manages the state of the visualization
- Controls animation timing
- Handles user interactions
- Coordinates between sub-components
- Tracks algorithm statistics

### Example Implementation

```tsx
export default function Visualizer() {
	const [array, setArray] = useState<BarItem[]>([]);
	const [steps, setSteps] = useState<SortingStep[]>([]);
	const [currentStepIndex, setCurrentStepIndex] = useState(0);
	const [isPlaying, setIsPlaying] = useState(false);
	const [speed, setSpeed] = useState(5);
	// Statistics tracking
	const [comparisons, setComparisons] = useState(0);
	const [swaps, setSwaps] = useState(0);

	const intervalRef = useRef<NodeJS.Timeout | null>(null);

	// Initialize with random array
	useEffect(() => {
		resetArray(10);
	}, []);

	// Methods for controlling visualization
	const resetArray = (size: number) => {
		/* ... */
	};
	const nextStep = () => {
		/* ... */
	};
	const prevStep = () => {
		/* ... */
	};
	const startAnimation = () => {
		/* ... */
	};
	const pauseAnimation = () => {
		/* ... */
	};

	// Rendering the visualization
	return <div className="flex w-full flex-col gap-4">{/* Sub-components */}</div>;
}
```

### Common State Variables

| State Variable     | Type            | Purpose                             |
| ------------------ | --------------- | ----------------------------------- |
| `array`            | `BarItem[]`     | The array being visualized          |
| `steps`            | `SortingStep[]` | All steps in the algorithm          |
| `currentStepIndex` | `number`        | Current position in the steps array |
| `isPlaying`        | `boolean`       | Whether animation is active         |
| `speed`            | `number`        | Animation speed (1-10)              |
| `comparisons`      | `number`        | Count of comparisons performed      |
| `swaps`/`shifts`   | `number`        | Count of swaps or shifts performed  |

### Animation Control

The visualization uses `setInterval` for continuous animation:

```tsx
const startAnimation = () => {
	if (currentStepIndex < steps.length - 1) {
		setIsPlaying(true);

		if (intervalRef.current) {
			clearInterval(intervalRef.current);
		}

		// Convert speed (1-10) to milliseconds
		const intervalTime = 1100 - speed * 100; // 1000ms to 100ms

		intervalRef.current = setInterval(() => {
			setCurrentStepIndex((prevIndex) => {
				// Logic to advance to next step
			});
		}, intervalTime);
	}
};
```

## Bar Component

The `Bar` component (`bar.tsx`) renders a single element in the array being sorted.

### Key Features

- Height proportional to the element's value
- Color coding based on the element's state
- Shows both value and index

### Example Implementation

```tsx
export default function Bar({ item, maxValue, index }: BarProps) {
	const heightPercentage = (item.value / maxValue) * 100;

	const stateStyles = {
		default: "bg-blue-500",
		comparing: "bg-yellow-500",
		swapping: "bg-red-500",
		sorted: "bg-green-500",
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

## Control Component

The `Control` component (`control.tsx`) provides the user interface for controlling the visualization.

### Features

- Array size control
- Play/Pause button
- Next/Previous step buttons
- Animation speed slider
- Progress indicator

### Example Implementation

```tsx
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
}: ControlProps) {
	const [arraySize, setArraySize] = useState(10);

	return (
		<div className="bg-card grid grid-cols-1 gap-4 rounded-lg border p-4 md:grid-cols-2">
			{/* Array controls */}
			{/* Playback controls */}
			{/* Speed controls */}
			{/* Progress indicator */}
		</div>
	);
}
```

## InfoBox Component

The `InfoBox` component (`infoBox.tsx`) displays algorithm statistics.

### Information Displayed

- Current step number
- Number of comparisons
- Number of swaps/shifts
- Algorithm status (sorted/unsorted)

## Legend Component

The `Legend` component (`legend.tsx`) explains the color coding used in the visualization.

### Typical Color Codes

- **Blue**: Default/unsorted elements
- **Yellow**: Elements being compared
- **Red**: Elements being swapped/shifted
- **Green**: Sorted elements

## StepDescription Component

The `StepDescription` component (`stepDescription.tsx`) provides a textual explanation of the current step in the algorithm.

### Types of Descriptions

- Initial state description
- Comparison explanation
- Swapping/insertion explanation
- Final state description

## CodeSnippet Component

The `CodeSnippet` component (`codeSnippet.tsx`) displays the algorithm's code with the current line highlighted.

### Features

- Syntax highlighting
- Line highlighting based on current step
- Readable code formatting
