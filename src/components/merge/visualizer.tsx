"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useAlgorithmPlayback } from "@/hooks/use-algorithm-playback";
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
		metrics: { comparisons, merges, divides },
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
			const newSteps = mergeSortSteps(newArray);
			resetSteps(newSteps);
		},
		[resetSteps],
	);

	useEffect(() => {
		resetArray(12);
	}, [resetArray]);
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
