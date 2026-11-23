"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useAlgorithmPlayback } from "@/hooks/use-algorithm-playback";
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
		metrics: { comparisons },
	} = useAlgorithmPlayback<SearchingStep>();
	const [target, setTarget] = useState(0);

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

			const randomTarget =
				Math.random() < 0.5 && newArray.length > 0
					? newArray[Math.floor(Math.random() * newArray.length)].value
					: Math.floor(Math.random() * 94) + 5;

			setTarget(randomTarget);
			const newSteps = linearSearchSteps(newArray, randomTarget);
			resetSteps(newSteps);
		},
		[resetSteps],
	);

	useEffect(() => {
		resetArray(10);
	}, [resetArray]);
	const handleTargetChange = (newTarget: number) => {
		setTarget(newTarget);
		const newSteps = linearSearchSteps(array, newTarget);
		resetSteps(newSteps);
	};

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
