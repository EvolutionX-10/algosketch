"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useAlgorithmPlayback } from "@/hooks/use-algorithm-playback";
import { BarItem, SortingStep, bubbleSortSteps, generateRandomArray, stateStyles } from "./bubbleSort";
import Bar from "../shared/bar";
import Node from "../shared/node";
import VisualizationSwitcher from "../shared/visualization-switcher";
import Control from "./control";
import Legend from "./legend";
import InfoBox from "./infoBox";
import SortStepDescription from "./stepDescription";
import CodeSnippet from "./codeSnippet";
import Banner from "../banner";
import { AnimatePresence } from "motion/react";

export default function Visualizer() {
	const [array, setArray] = useState<BarItem[]>([]);
	const {
		steps,
		resetSteps,
		currentStepIndex,
		isPlaying,
		speed,
		setSpeed,
		nextStep,
		prevStep,
		startAnimation,
		pauseAnimation,
		metrics: { comparisons, swaps },
	} = useAlgorithmPlayback<SortingStep>();
	const [visualizationMode, setVisualizationMode] = useState<"bar" | "node">("bar");

	const containerRef = useRef<HTMLDivElement | null>(null);

	const handleScroll = () => {
		if (containerRef.current) {
			containerRef.current.scrollIntoView({ behavior: "smooth" });
		}
	};

	const resetArray = useCallback(
		(size: number) => {
			const newArray = generateRandomArray(size);
			setArray(newArray);
			const newSteps = bubbleSortSteps(newArray);
			resetSteps(newSteps);
		},
		[resetSteps],
	);

	useEffect(() => {
		resetArray(10);
	}, [resetArray]);
	const currentStep = steps[currentStepIndex] || {
		array: array,
		comparing: [],
		swapped: false,
		sortedIndices: [],
	};

	const maxValue = Math.max(...array.map((item) => item.value), 1);

	const isSorted = currentStep.sortedIndices.length === array.length;

	return (
		<>
			<Banner onClickAction={handleScroll} />
			<div className="flex w-full flex-col gap-4" ref={containerRef}>
				<div className="flex items-center justify-between">
					<h2 className="text-2xl font-bold">Bubble Sort Visualizer</h2>
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
									<AnimatePresence>
										{currentStep.array.map((item, index) => (
											<Bar key={item.id} item={item} maxValue={maxValue} index={index} stateStyles={stateStyles} />
										))}
									</AnimatePresence>
								</div>
							) : (
								<div className="flex flex-1 items-center justify-center">
									<div className="flex flex-wrap items-center gap-4">
										<AnimatePresence>
											{currentStep.array.map((item, index) => (
												<Node key={item.id} item={item} index={index} stateStyles={stateStyles} />
											))}
										</AnimatePresence>
									</div>
								</div>
							)}
						</div>
					</div>

					<div>
						<InfoBox currentStep={currentStepIndex} comparisons={comparisons} swaps={swaps} isSorted={isSorted} />
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
