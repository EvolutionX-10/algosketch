"use client";

import { useRef, useState, useEffect } from "react";
import { BarItem, SortingStep, heapSortSteps, generateRandomArray, stateStyles } from "./heapSort";
import Bar from "../shared/bar";
import Control from "./control";
import Legend from "./legend";
import InfoBox from "./infoBox";
import SortStepDescription from "./stepDescription";
import CodeSnippet from "./codeSnippet";
import Banner from "../banner";
import { AnimatePresence } from "motion/react";

export default function Visualizer() {
	const [array, setArray] = useState<BarItem[]>([]);
	const [steps, setSteps] = useState<SortingStep[]>([]);
	const [currentStepIndex, setCurrentStepIndex] = useState(0);
	const [isPlaying, setIsPlaying] = useState(false);
	const [speed, setSpeed] = useState(5);
	const [comparisons, setComparisons] = useState(0);
	const [swaps, setSwaps] = useState(0);

	const intervalRef = useRef<NodeJS.Timeout | null>(null);
	const containerRef = useRef<HTMLDivElement | null>(null);

	const handleScroll = () => {
		if (containerRef.current) {
			containerRef.current.scrollIntoView({ behavior: "smooth" });
		}
	};

	// Initialize with random array
	useEffect(() => {
		resetArray(10);
	}, []);

	// Generate a new random array and reset the visualization
	const resetArray = (size: number) => {
		const newArray = generateRandomArray(size);
		setArray(newArray);
		const newSteps = heapSortSteps(newArray);
		setSteps(newSteps);
		setCurrentStepIndex(0);
		setIsPlaying(false);
		setComparisons(0);
		setSwaps(0);

		if (intervalRef.current) {
			clearInterval(intervalRef.current);
			intervalRef.current = null;
		}
	}; // Go to the next step in the algorithm
	const nextStep = () => {
		setCurrentStepIndex((prevIndex) => {
			if (prevIndex < steps.length - 1) {
				// Update stats for the next step
				const nextStepData = steps[prevIndex + 1];
				if (nextStepData.comparingIndices.length > 0) {
					setComparisons((prev) => prev + 1);
				}
				if (nextStepData.heapifyingIndex !== -1 || nextStepData.rootIndex !== -1) {
					setSwaps((prev) => prev + 1);
				}
				return prevIndex + 1;
			} else {
				pauseAnimation();
				return prevIndex; // Stay at the current index if it's the last step
			}
		});
	};

	// Go to the previous step
	const prevStep = () => {
		if (currentStepIndex > 0) {
			setCurrentStepIndex((prev) => prev - 1);
		}
	};

	// Start/resume the animation
	const startAnimation = () => {
		if (currentStepIndex < steps.length - 1) {
			setIsPlaying(true);

			if (intervalRef.current) {
				clearInterval(intervalRef.current);
			}

			// Convert speed (1-10) to milliseconds (slower = more milliseconds)
			const intervalTime = 1100 - speed * 100; // 1000ms to 100ms

			intervalRef.current = setInterval(() => {
				setCurrentStepIndex((prevIndex) => {
					if (prevIndex < steps.length - 1) {
						const nextStepData = steps[prevIndex + 1];
						if (nextStepData.comparingIndices.length > 0) {
							setComparisons((prev) => prev + 1);
						}
						if (nextStepData.heapifyingIndex !== -1 || nextStepData.rootIndex !== -1) {
							setSwaps((prev) => prev + 1);
						}
						return prevIndex + 1;
					} else {
						setIsPlaying(false);
						if (intervalRef.current) {
							clearInterval(intervalRef.current);
							intervalRef.current = null;
						}
						return prevIndex;
					}
				});
			}, intervalTime);
		}
	};

	// Pause the animation
	const pauseAnimation = () => {
		setIsPlaying(false);
		if (intervalRef.current) {
			clearInterval(intervalRef.current);
			intervalRef.current = null;
		}
	};

	// Cleanup interval on component unmount
	useEffect(() => {
		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
			}
		};
	}, []);
	// Update interval timing when speed changes
	useEffect(() => {
		if (isPlaying && intervalRef.current) {
			clearInterval(intervalRef.current);
			const intervalTime = 1100 - speed * 100;
			intervalRef.current = setInterval(() => {
				setCurrentStepIndex((prevIndex) => {
					if (prevIndex < steps.length - 1) {
						const nextStepData = steps[prevIndex + 1];
						if (nextStepData.comparingIndices.length > 0) {
							setComparisons((prev) => prev + 1);
						}
						// Count swaps when heapifying or extracting root
						if (nextStepData.heapifyingIndex !== -1 && prevIndex > 0) {
							const prevStep = steps[prevIndex];
							// Only count as swap if the values actually changed positions
							if (prevStep.heapifyingIndex !== nextStepData.heapifyingIndex) {
								setSwaps((prev) => prev + 1);
							}
						}
						return prevIndex + 1;
					} else {
						setIsPlaying(false);
						if (intervalRef.current) {
							clearInterval(intervalRef.current);
							intervalRef.current = null;
						}
						return prevIndex;
					}
				});
			}, intervalTime);
		}
	}, [speed, isPlaying, steps]);

	// Early return if no steps are available
	if (steps.length === 0) {
		return <div>Loading...</div>;
	}

	const currentStep = steps[currentStepIndex];
	const maxValue = Math.max(...currentStep.array.map((item) => item.value), 1);
	const canGoNext = currentStepIndex < steps.length - 1;
	const canGoPrev = currentStepIndex > 0;
	const isSorted = currentStep.sortedIndices.length === currentStep.array.length;
	return (
		<>
			<Banner onClickAction={handleScroll} />
			<div ref={containerRef} className="flex w-full flex-col gap-4">
				<h2 className="mb-2 text-2xl font-bold">Heap Sort Visualizer</h2>
				<Legend />
				<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
					<div className="md:col-span-2">
						<div className="bg-card flex h-80 flex-col rounded-lg border p-4">
							<div className="flex flex-1 items-end justify-center gap-2">
								<AnimatePresence>
									{currentStep.array.map((item, index) => (
										<Bar key={item.id} item={item} maxValue={maxValue} index={index} stateStyles={stateStyles} />
									))}
								</AnimatePresence>
							</div>
						</div>
					</div>{" "}
					<div>
						<InfoBox currentStep={currentStepIndex} comparisons={comparisons} swaps={swaps} isSorted={isSorted} />
					</div>
				</div>{" "}
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
					totalSteps={steps.length - 1}
					speed={speed}
					onSpeedChangeAction={setSpeed}
				/>{" "}
				<div className="bg-background mt-6 rounded-lg border p-4">
					<SortStepDescription
						currentStepIndex={currentStepIndex}
						totalSteps={steps.length - 1}
						heapSize={currentStep.heapSize}
						comparingIndices={currentStep.comparingIndices}
						heapifyingIndex={currentStep.heapifyingIndex}
						rootIndex={currentStep.rootIndex}
						sortedIndices={currentStep.sortedIndices}
						isBuilding={currentStep.isBuilding}
						isExtracting={currentStep.isExtracting}
						values={currentStep.array.map((item) => item.value)}
					/>
				</div>
				<CodeSnippet
					currentStep={currentStepIndex}
					isBuilding={currentStep.isBuilding}
					isExtracting={currentStep.isExtracting}
					isHeapifying={currentStep.heapifyingIndex !== -1}
					isComparing={currentStep.comparingIndices.length > 0}
				/>
			</div>
		</>
	);
}
