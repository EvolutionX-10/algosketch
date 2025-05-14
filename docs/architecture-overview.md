# Architecture Overview

## Application Structure

AlgoSketch is a Next.js web application that visualizes algorithms through interactive animations. The architecture follows a modular approach, with each algorithm having its own isolated set of components.

## Directory Structure

```
src/
  components/
    [algorithm]/          # e.g., bubble, insertion
      visualizer.tsx      # Main container component
      [algorithm]Sort.ts  # Algorithm implementation
      bar.tsx             # Visual representation of array elements
      control.tsx         # Play/pause/step controls
      infoBox.tsx         # Algorithm statistics
      legend.tsx          # Color coding explanation
      stepDescription.tsx # Text explanation of current step
      codeSnippet.tsx     # Algorithm code with highlighting
    shared/               # Shared components across visualizers
    ui/                   # Basic UI components from shadcn/ui
```

## Core Architecture Principles

1. **Isolation**: Each algorithm has its own directory of components, allowing for easier maintenance and extension.

2. **Simulation-Based Approach**: Algorithms are implemented to generate a series of steps, each representing a state of the algorithm at a specific point in time.

3. **Reactive Visualization**: The UI reactively updates based on the current step in the algorithm, showing the algorithm's progress.

4. **Component-Based Design**: The application follows React's component-based design, with each visual element encapsulated in its own component.

## Data Flow

1. **Algorithm Implementation**: Generates an array of steps that represent the algorithm's execution.
2. **Visualizer Component**: Manages the state and controls the flow of steps.
3. **Sub-Components**: Render different aspects of the current step (bars, information, etc.).

## Key Technologies

- **Next.js**: The React framework for building the web application
- **React**: For building the user interface
- **Tailwind CSS**: For styling components
- **TypeScript**: For type-safe JavaScript code

## State Management

State is managed primarily through React's built-in state management (`useState` and `useEffect` hooks), with the main state living in the `Visualizer` component and being passed down to child components through props.

The primary states include:

- The array being sorted
- The steps of the algorithm
- The current step index
- Animation control (playing/paused, speed)
- Statistics (comparisons, swaps/shifts)

## Animation Control

Animations are handled using `setInterval` with React's `useRef` hook to ensure proper cleanup. The animation speed is configurable, and users can manually step through the algorithm or play/pause the animation as needed.
