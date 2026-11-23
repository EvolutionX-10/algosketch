"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useAlgorithmPlayback } from "@/hooks/use-algorithm-playback";
import { SortingStep, heapSortSteps, generateRandomArray, stateStyles } from "./heapSort";
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
			const newSteps = heapSortSteps(newArray);
			resetSteps(newSteps);
		},
		[resetSteps],
	);

	useEffect(() => {
		resetArray(10);
	}, [resetArray]);
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
				<div className="flex items-center justify-between">
					<h2 className="text-2xl font-bold">Heap Sort Visualizer</h2>
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
					canGoNext={canGoNext}
					canGoPrev={canGoPrev}
					currentStep={currentStepIndex}
					totalSteps={steps.length - 1}
					speed={speed}
					onSpeedChangeAction={setSpeed}
				/>

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
