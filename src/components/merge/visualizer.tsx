"use client";

import { useEffect, useRef, useState } from "react";
import { BarItem, generateRandomArray, mergeSortSteps, SortingStep, stateStyles } from "./mergeSort";
import Banner from "../banner";
import Legend from "./legend";
import Bar from "../shared/bar";
import Node from "../shared/node";
import VisualizationSwitcher from "../shared/visualization-switcher";
import InfoBox from "./infoBox";
import Control from "./control";
import SortStepDescription from "./stepDescription";
import CodeSnippet from "./codeSnippet";

export default function Visualizer() {
	const [array, setArray] = useState<BarItem[]>([]);
	const [steps, setSteps] = useState<SortingStep[]>([]);
	const [currentStepIndex, setCurrentStepIndex] = useState(0);
	const [isPlaying, setIsPlaying] = useState(false);
	const [speed, setSpeed] = useState(5);
	const [visualizationMode, setVisualizationMode] = useState<"bar" | "node">("bar");
	const [comparisons, setComparisons] = useState(0);
	const [merges, setMerges] = useState(0);
	const [divides, setDivides] = useState(0);

	const intervalRef = useRef<NodeJS.Timeout | null>(null);
	const containerRef = useRef<HTMLDivElement | null>(null);

	const handleScroll = () => {
		if (containerRef.current) {
			containerRef.current.scrollIntoView({ behavior: "smooth" });
		}
	};

	useEffect(() => {
		resetArray(12);
	}, []);

	const resetArray = (size: number) => {
		const newArray = generateRandomArray(size);
		setArray(newArray);
		const newSteps = mergeSortSteps(newArray);
		setSteps(newSteps);
		setCurrentStepIndex(0);
		setIsPlaying(false);
		setComparisons(0);
		setMerges(0);
		setDivides(0);

		if (intervalRef.current) {
			clearInterval(intervalRef.current);
			intervalRef.current = null;
		}
	};

	const nextStep = () => {
		setCurrentStepIndex((prevIndex) => {
			if (prevIndex < steps.length - 1) {
				const nextStepData = steps[prevIndex + 1];
				if (nextStepData.comparing.length > 0) {
					setComparisons((prev) => prev + 1);
				}
				if (nextStepData.merged) {
					setMerges((prev) => prev + 1);
				}
				if (nextStepData.dividing) {
					setDivides((prev) => prev + 1);
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
						if (nextStepData.comparing.length > 0) {
							setComparisons((prev) => prev + 1);
						}
						if (nextStepData.merged) {
							setMerges((prev) => prev + 1);
						}
						if (nextStepData.dividing) {
							setDivides((prev) => prev + 1);
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
		comparing: [],
		merged: false,
		sortedIndices: [],
		dividing: false,
		subArrayBounds: [0, array.length - 1],
	};

	const maxValue = Math.max(...array.map((item) => item.value), 1);

	const isSorted = currentStep.sortedIndices.length === array.length;

	return (
		<>
			<Banner onClickAction={handleScroll} />
			<div className="flex w-full flex-col gap-4" ref={containerRef}>
				<div className="flex items-center justify-between">
					<h2 className="mb-2 text-2xl font-bold">Merge Sort Visualizer</h2>
					<VisualizationSwitcher mode={visualizationMode} onModeChangeAction={setVisualizationMode} />
				</div>

				<Legend />

				<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
					<div className="md:col-span-2">
						<div className="bg-card flex h-80 flex-col rounded-lg border p-4">
							{visualizationMode === "bar" ? (
								<div className="flex flex-1 items-end justify-center gap-2">
									{currentStep.array.map((item, index) => (
										<Bar key={item.id} item={item} maxValue={maxValue} index={index} stateStyles={stateStyles} />
									))}
								</div>
							) : (
								<div className="flex flex-1 items-center justify-center">
									<div className="flex max-w-full flex-wrap items-center justify-center gap-4">
										{currentStep.array.map((item, index) => (
											<Node key={item.id} item={item} index={index} stateStyles={stateStyles} />
										))}
									</div>
								</div>
							)}
						</div>
					</div>

					<div>
						<InfoBox
							currentStep={currentStepIndex}
							comparisons={comparisons}
							merges={merges}
							divides={divides}
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
						isComparing={currentStep.comparing.length > 0 && !currentStep.merged}
						isMerging={currentStep.merged}
						isDividing={currentStep.dividing}
						compareIndices={currentStep.comparing}
						mergedIndices={currentStep.sortedIndices}
						values={currentStep.array.map((item) => item.value)}
						subArrayBounds={currentStep.subArrayBounds}
					/>
				</div>
				<CodeSnippet
					currentStep={currentStepIndex}
					isComparing={currentStep.comparing.length > 0 && !currentStep.merged}
					isMerging={currentStep.merged}
				/>
			</div>
		</>
	);
}
