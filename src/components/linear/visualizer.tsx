"use client";

import { useRef, useState, useEffect } from "react";
import { BarItem, SearchingStep, linearSearchSteps, generateRandomArray, stateStyles } from "./linearSearch";
import SimpleBar from "../shared/simple-bar";
import Control from "./control";
import Legend from "./legend";
import InfoBox from "./infoBox";
import SearchStepDescription from "./stepDescription";
import CodeSnippet from "./codeSnippet";
import Banner from "../banner";
import { AnimatePresence } from "motion/react";

export default function Visualizer() {
	const [array, setArray] = useState<BarItem[]>([]);
	const [steps, setSteps] = useState<SearchingStep[]>([]);
	const [currentStepIndex, setCurrentStepIndex] = useState(0);
	const [isPlaying, setIsPlaying] = useState(false);
	const [speed, setSpeed] = useState(5);
	const [target, setTarget] = useState(0);
	const [comparisons, setComparisons] = useState(0);

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

		// Pick a random target from the array (50% chance) or a random value (50% chance)
		const randomTarget =
			Math.random() < 0.5 && newArray.length > 0
				? newArray[Math.floor(Math.random() * newArray.length)].value
				: Math.floor(Math.random() * 94) + 5;

		setTarget(randomTarget);
		const newSteps = linearSearchSteps(newArray, randomTarget);
		setSteps(newSteps);
		setCurrentStepIndex(0);
		setIsPlaying(false);
		setComparisons(0);

		if (intervalRef.current) {
			clearInterval(intervalRef.current);
			intervalRef.current = null;
		}
	};

	// Handle target change
	const handleTargetChange = (newTarget: number) => {
		setTarget(newTarget);
		const newSteps = linearSearchSteps(array, newTarget);
		setSteps(newSteps);
		setCurrentStepIndex(0);
		setIsPlaying(false);
		setComparisons(0);

		if (intervalRef.current) {
			clearInterval(intervalRef.current);
			intervalRef.current = null;
		}
	};

	// Go to the next step in the algorithm
	const nextStep = () => {
		if (currentStepIndex < steps.length - 1) {
			setCurrentStepIndex(currentStepIndex + 1);
		}
	};

	// Go to the previous step
	const prevStep = () => {
		if (currentStepIndex > 0) {
			setCurrentStepIndex(currentStepIndex - 1);
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
						return prevIndex + 1;
					} else {
						pauseAnimation();
						return prevIndex;
					}
				});
			}, intervalTime);
		}
	};

	const pauseAnimation = () => {
		setIsPlaying(false);
		if (intervalRef.current) {
			clearInterval(intervalRef.current);
			intervalRef.current = null;
		}
	};

	// Update comparisons count based on current step
	useEffect(() => {
		if (steps.length > 0 && currentStepIndex < steps.length) {
			const currentStep = steps[currentStepIndex];
			setComparisons(Math.max(0, currentStep.currentIndex));
		}
	}, [currentStepIndex, steps]);

	// Clean up interval on unmount
	useEffect(() => {
		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
			}
		};
	}, []);

	// Reset animation interval when speed changes during playback
	useEffect(() => {
		if (isPlaying && intervalRef.current) {
			startAnimation(); // This will clear the existing interval and create a new one with updated speed
		}
	}, [speed]);
	// Get the current step data to display
	const currentStep = steps[currentStepIndex] || {
		array: array,
		currentIndex: -1,
		found: false,
		finished: false,
	};
	const maxValue = array.length > 0 ? Math.max(...array.map((item) => item.value)) : 100;

	return (
		<>
			<Banner onClickAction={handleScroll} />
			<div className="flex w-full flex-col gap-4" ref={containerRef}>
				<h2 className="mb-2 text-2xl font-bold">Linear Search Visualizer</h2>

				<Legend />

				<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
					<div className="md:col-span-2">
						<div className="bg-card flex flex-col rounded-lg border p-4">
							<div className="flex flex-1 items-end justify-center gap-2">
								<AnimatePresence>
									{currentStep?.array.map((item, index) => (
										<SimpleBar
											key={item.id}
											value={item.value}
											height={(item.value / maxValue) * 250}
											color={stateStyles[item.state]}
											index={index}
											isTarget={item.value === target}
										/>
									))}
								</AnimatePresence>
							</div>
							{/* Target indicator */}
							<div className="mt-4 text-center">
								<span className="bg-muted rounded-md px-3 py-1 text-sm font-medium">
									Target: <span className="font-bold text-green-600">{target}</span>
								</span>
							</div>
						</div>
					</div>

					<InfoBox
						comparisons={comparisons}
						target={target}
						found={currentStep?.found || false}
						finished={currentStep?.finished || false}
						currentIndex={currentStep?.currentIndex ?? -1}
						arrayLength={array.length}
					/>
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
					target={target}
					onTargetChangeAction={handleTargetChange}
					arrayValues={array.map((item) => item.value)}
				/>

				<SearchStepDescription step={currentStep} stepIndex={currentStepIndex} />
				<CodeSnippet currentStep={currentStep} />
			</div>
		</>
	);
}
