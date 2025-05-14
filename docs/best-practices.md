# Best Practices

This document outlines best practices for maintaining and extending AlgoSketch's visualizers.

## Code Structure and Organization

### Directory Structure

- **Keep algorithm components in separate directories**
  - Each algorithm should have its own directory under `src/components/`
  - Shared components should be placed in `src/components/shared/`

### Component Organization

- **Keep components focused on a single responsibility**

  - Bar component should only handle rendering a bar
  - Control component should only handle user interaction
  - Visualizer component should coordinate, not implement details

- **Consistent component naming**
  - Name components according to their function: `Bar`, `Control`, `InfoBox`, etc.
  - Use consistent naming across different algorithm implementations

## State Management

### Immutability

Always create new copies of objects when modifying state. This ensures React's reactivity works correctly and prevents hard-to-debug issues.

```typescript
// ✅ Good: Creating a new copy
setArray(array.map((item) => ({ ...item, state: "default" })));

// ❌ Bad: Mutating state directly
array[0].state = "comparing";
setArray(array);
```

### State Isolation

Keep related state together and isolate it from unrelated state:

```typescript
// ✅ Good: Grouping related state
const [sortStats, setSortStats] = useState({
	comparisons: 0,
	swaps: 0,
});

// Update together
setSortStats((prev) => ({
	...prev,
	comparisons: prev.comparisons + 1,
}));

// ❌ Bad: Scattered related state
const [comparisons, setComparisons] = useState(0);
const [swaps, setSwaps] = useState(0);
```

### Step-Based State Management

- Store complete state for each step, not just changes
- This makes it easier to navigate backward and forward in the visualization

## Animation and Timing

### Clean Up Intervals

Always clean up intervals to prevent memory leaks:

```typescript
useEffect(() => {
	const interval = setInterval(() => {
		// Animation logic
	}, 1000);

	// ✅ Good: Clean up on unmount or dependency change
	return () => {
		clearInterval(interval);
	};
}, [dependencies]);
```

### Animation Fluidity

- Use CSS transitions for smooth animations
- Keep track of animation state to prevent interrupted animations

```tsx
// Adding transitions to elements
<div className="transition-all duration-300 ease-in-out" style={{ height: `${heightPercentage}%` }} />
```

## Performance Optimization

### Component Memoization

Use `React.memo` for components that render frequently but don't change often:

```typescript
const Bar = React.memo(function Bar({ item, maxValue, index }: BarProps) {
	// Implementation
});
```

### Use Callback Functions

Use `useCallback` for functions passed as props to memoized components:

```typescript
const handleNextStep = useCallback(() => {
	// Implementation
}, [dependencies]);
```

### Optimize Rerenders

- Use `React.useMemo` for expensive calculations
- Use primitive values for props when possible
- Avoid creating new objects or arrays in render functions

```typescript
// ✅ Good: Memoize expensive calculations
const sortedIndices = useMemo(() => {
  return calculateSortedIndices(array);
}, [array]);

// ❌ Bad: Creating new arrays on every render
<Component items={[1, 2, 3]} />
```

## Type Safety

### Use TypeScript Interfaces

Define clear interfaces for all props and state:

```typescript
interface BarProps {
	item: BarItem;
	maxValue: number;
	index: number;
}

interface BarItem {
	value: number;
	state: SortingState;
	id: string;
}

type SortingState = "default" | "comparing" | "swapping" | "sorted";
```

### Generic Components

Use TypeScript generics for shared components that need to work with different data structures:

```typescript
function useAlgorithmVisualizer<T, S>({
	generateRandomArray,
	generateSteps,
}: {
	generateRandomArray: (size: number) => T[];
	generateSteps: (array: T[]) => S[];
}) {
	// Implementation
}
```

## Algorithm Implementation

### Separation of Algorithm and Visualization Logic

- Keep the core algorithm logic separate from visualization details
- Algorithm functions should return step data, not handle rendering

```typescript
// ✅ Good: Separation of concerns
function bubbleSortSteps(array) {
	// Returns step data for visualization
	return steps;
}

// In component:
const BubbleSortVisualizer = () => {
	// Rendering logic using step data
};
```

### Consistent Data Structures

Use consistent data structures across different algorithm implementations to make creating shared components easier:

```typescript
// Bubble Sort and Insertion Sort using compatible step structures
interface BaseSortingStep {
	array: BarItem[];
	sortedIndices: number[];
}

interface BubbleSortStep extends BaseSortingStep {
	comparing: number[];
	swapped: boolean;
}

interface InsertionSortStep extends BaseSortingStep {
	currentIndex: number;
	comparingIndex: number;
	insertPosition: number;
}
```

## Testing and Debugging

### Edge Cases

Test your visualizers with various input types:

- Empty arrays
- Single-element arrays
- Already sorted arrays
- Reverse-sorted arrays
- Arrays with duplicate values

### State Inspection

Add debugging aids during development:

```typescript
// During development
console.log("Current step:", currentStep);

// Or use React DevTools
useDebugValue(currentStep);
```

## Accessibility

### Semantic HTML

Use semantic HTML elements for better accessibility:

```tsx
<button onClick={handleNext} aria-label="Next step">
  Next
</button>

<div aria-label={`Value: ${item.value}`} role="img">
  {/* Bar content */}
</div>
```

### Keyboard Navigation

Ensure all interactive elements are keyboard accessible:

```tsx
<button
	onClick={handleNext}
	onKeyDown={(e) => {
		if (e.key === "Enter" || e.key === " ") {
			handleNext();
		}
	}}
	tabIndex={0}
>
	Next
</button>
```

### Color Contrast

Ensure sufficient color contrast for text and UI elements:

- Use the Tailwind color palette, which is designed with accessibility in mind
- Test with a color contrast checker for custom colors

## Code Reusability

### Extract Utility Functions

Move common functionality to utility functions:

```typescript
// In utils.ts
export function generateRandomArray(length, maxValue = 100) {
	// Implementation
}

// In component
import { generateRandomArray } from "@/utils";
```

### Component Composition

Use component composition to build complex UIs from simpler components:

```tsx
// ✅ Good: Composition
<Visualizer>
	<VisualizerDisplay>
		<BarsContainer>
			{bars.map((bar) => (
				<Bar {...bar} />
			))}
		</BarsContainer>
	</VisualizerDisplay>
	<ControlPanel>
		<PlayControls />
		<SpeedControl />
	</ControlPanel>
</Visualizer>
```

## Documentation

### Code Comments

Add meaningful comments for complex logic:

```typescript
// Calculate the insertion position for the current element
// by comparing it with each element in the sorted portion
// and finding the first element that is greater
let insertPos = j;
while (insertPos > 0 && array[insertPos - 1].value > currentValue) {
	// Shift elements to the right
	array[insertPos] = array[insertPos - 1];
	insertPos--;
}
```

### JSDoc Comments

Use JSDoc comments for functions and components:

```typescript
/**
 * Generates the steps for bubble sort visualization.
 *
 * @param inputArray - The array to sort
 * @returns An array of steps, each representing a state in the sorting process
 */
export function bubbleSortSteps(inputArray: BarItem[]): SortingStep[] {
	// Implementation
}
```

### Type Documentation

Document complex types with JSDoc:

```typescript
/**
 * Represents a single step in the sorting algorithm.
 * @property array - The current state of the array
 * @property comparing - Indices of elements being compared
 * @property swapped - Whether elements were swapped in this step
 * @property sortedIndices - Indices of elements that are in their final sorted position
 */
export interface SortingStep {
	array: BarItem[];
	comparing: number[];
	swapped: boolean;
	sortedIndices: number[];
}
```

## Error Handling

### Graceful Degradation

Handle errors gracefully to prevent the UI from breaking:

```tsx
try {
	// Code that might fail
	const steps = generateSteps(array);
	setSteps(steps);
} catch (error) {
	console.error("Failed to generate steps:", error);
	// Set fallback or display error message
	setSteps([{ array, sortedIndices: [] }]);
	setError("Failed to generate visualization steps");
}
```

### Input Validation

Validate inputs to prevent errors:

```typescript
function resetArray(size: number) {
	// Validate input
	if (size <= 0 || size > MAX_ARRAY_SIZE) {
		console.warn(`Invalid array size: ${size}. Using default size of 10.`);
		size = 10;
	}

	// Continue with valid size
	const newArray = generateRandomArray(size);
	// ...
}
```

## Responsive Design

### Flexible Layouts

Design components to work on different screen sizes:

```tsx
<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
	<div className="md:col-span-2">{/* Main visualization */}</div>
	<div>{/* Info panel */}</div>
</div>
```

### Mobile Considerations

- Use appropriate touch targets for mobile devices
- Consider touch interactions vs. mouse interactions
- Test on various screen sizes

## Extensibility

### Plugin Architecture

Consider a plugin architecture for adding new algorithms:

```typescript
// Register a new algorithm
registerAlgorithm({
	name: "quicksort",
	title: "Quick Sort",
	description: "A divide-and-conquer algorithm...",
	generateSteps: quickSortSteps,
	components: {
		StepDescription: QuickSortStepDescription,
		CodeSnippet: QuickSortCodeSnippet,
	},
});
```

### Configuration Options

Make components configurable through props:

```tsx
<Bar
	item={item}
	maxValue={maxValue}
	index={index}
	showValue={true}
	showIndex={true}
	stateStyles={{
		default: "bg-blue-500",
		comparing: "bg-yellow-500",
		// Custom colors
	}}
/>
```

## Version Control Best Practices

### Commit Messages

Use descriptive commit messages:

```
feat: Add merge sort visualization
fix: Fix animation timing issue in insertion sort
refactor: Extract shared bar component
docs: Update algorithm documentation
```

### Feature Branches

Use feature branches for new algorithms or major changes:

```
feature/merge-sort
feature/shared-components
fix/animation-timing
```

### Code Reviews

Conduct thorough code reviews:

- Check for consistent styling
- Ensure proper error handling
- Verify performance considerations
- Test on different browsers and devices
