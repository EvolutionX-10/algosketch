"use client";

import { useEffect, useRef, useState } from "react";
import Bar from "../shared/bar";
import Node from "../shared/node";
import VisualizationSwitcher from "../shared/visualization-switcher";
import { BarItem, SortingStep, generateRandomArray, insertionSortSteps, stateStyles } from "./insertionSort";
import Control from "./control";
import CodeSnippet from "./codeSnippet";
import Legend from "./legend";
import InfoBox from "./infoBox";
import SortStepDescription from "./stepDescription";
import Banner from "@/components/banner";

export default function Visualizer() {
	const [array, setArray] = useState<BarItem[]>([]);
	const [steps, setSteps] = useState<SortingStep[]>([]);
	const [currentStepIndex, setCurrentStepIndex] = useState(0);
	const [isPlaying, setIsPlaying] = useState(false);
	const [speed, setSpeed] = useState(5);
	const [comparisons, setComparisons] = useState(0);
	const [shifts, setShifts] = useState(0);
	const [visualizationMode, setVisualizationMode] = useState<"bar" | "node">("bar");

	const intervalRef = useRef<NodeJS.Timeout | null>(null);
	const containerRef = useRef<HTMLDivElement | null>(null);

	const handleScroll = () => {
		if (containerRef.current) {
			containerRef.current.scrollIntoView({ behavior: "smooth" });
		}
	};

	useEffect(() => {
		resetArray(10);
	}, []);

	const resetArray = (size: number) => {
		const newArray = generateRandomArray(size);
		setArray(newArray);
		const newSteps = insertionSortSteps(newArray);
		setSteps(newSteps);
		setCurrentStepIndex(0);
		setIsPlaying(false);
		setComparisons(0);
		setShifts(0);

		if (intervalRef.current) {
			clearInterval(intervalRef.current);
			intervalRef.current = null;
		}
	};

	const nextStep = () => {
		setCurrentStepIndex((prevIndex) => {
			if (prevIndex < steps.length - 1) {
				const nextStepData = steps[prevIndex + 1];
				if (nextStepData.comparingIndex >= 0) {
					setComparisons((prev) => prev + 1);
				}
				if (nextStepData.insertPosition !== nextStepData.currentIndex) {
					setShifts((prev) => prev + 1);
				}
				return prevIndex + 1;
			} else {
				pauseAnimation();
				return prevIndex;
			}
		});
	};

	const prevStep = () => {
		if (currentStepIndex > 0) {
			setCurrentStepIndex((prev) => prev - 1);
		}
	};

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
						if (nextStepData.comparingIndex >= 0) {
							setComparisons((prev) => prev + 1);
						}
						if (nextStepData.insertPosition !== nextStepData.currentIndex) {
							setShifts((prev) => prev + 1);
						}
						return prevIndex + 1;
					} else {
						if (intervalRef.current) {
							clearInterval(intervalRef.current);
							intervalRef.current = null;
						}
						setIsPlaying(false);
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

	useEffect(() => {
		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
			}
		};
	}, []);

	useEffect(() => {
		if (isPlaying && intervalRef.current) {
			startAnimation();
		}
	}, [speed]);

	const currentStep = steps[currentStepIndex] || {
		array: array,
		currentIndex: 0,
		comparingIndex: -1,
		insertPosition: 0,
		sortedIndices: [],
	};

	const maxValue = Math.max(...array.map((item) => item.value), 1);

	const isSorted = currentStep.sortedIndices.length === array.length;
	const isComparing = currentStep.comparingIndex >= 0;
	const isInserting = currentStep.insertPosition !== currentStep.currentIndex && currentStep.currentIndex > 0;

	return (
		<>
			<Banner onClickAction={handleScroll} />
			<div className="flex w-full flex-col gap-4" ref={containerRef}>
				<div className="flex items-center justify-between">
					<h2 className="text-2xl font-bold">Insertion Sort Visualizer</h2>
					<VisualizationSwitcher
						mode={visualizationMode}
						onModeChangeAction={setVisualizationMode}
						disabled={isPlaying}
					/>
				</div>

				<Legend />

				<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
					<div className="md:col-span-2">
						<div className="bg-card flex h-80 flex-col rounded-lg border p-4">
							{visualizationMode === "bar" ? (
								<div className="flex flex-1 items-end justify-center gap-2">
									{currentStep.array.map((item, idx) => (
										<Bar
											key={`${item.id}-${idx}`}
											item={item}
											maxValue={maxValue}
											index={idx}
											stateStyles={stateStyles}
										/>
									))}
								</div>
							) : (
								<div className="flex flex-1 items-center justify-center">
									<div className="flex flex-wrap items-center gap-4">
										{currentStep.array.map((item, idx) => (
											<Node key={`${item.id}-${idx}`} item={item} index={idx} stateStyles={stateStyles} />
										))}
									</div>
								</div>
							)}
						</div>
					</div>

					<div>
						<InfoBox currentStep={currentStepIndex} comparisons={comparisons} shifts={shifts} isSorted={isSorted} />
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
						isComparing={isComparing}
						isInserting={isInserting}
						currentIndex={currentStep.currentIndex}
						comparingIndex={currentStep.comparingIndex}
						insertPosition={currentStep.insertPosition}
						sortedIndices={currentStep.sortedIndices}
						values={currentStep.array.map((item) => item.value)}
					/>
				</div>

				<CodeSnippet currentStep={currentStepIndex} isComparing={isComparing} isInserting={isInserting} />
			</div>
		</>
	);
}
