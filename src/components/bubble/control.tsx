"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Slider } from "../ui/slider";

interface ControlProps {
	onResetAction: (arraySize: number) => void;
	onStartAction: () => void;
	onNextAction: () => void;
	onPrevAction: () => void;
	onPauseAction: () => void;
	isPlaying: boolean;
	canGoNext: boolean;
	canGoPrev: boolean;
	currentStep: number;
	totalSteps: number;
	speed: number;
	onSpeedChangeAction: (speed: number) => void;
}

export default function Control({
	onResetAction,
	onStartAction,
	onNextAction,
	onPrevAction,
	onPauseAction,
	isPlaying,
	canGoNext,
	canGoPrev,
	currentStep,
	totalSteps,
	speed,
	onSpeedChangeAction,
}: ControlProps) {
	const [arraySize, setArraySize] = useState(10);

	const handleArraySizeChange = (value: number[]) => {
		setArraySize(value[0]);
	};

	return (
		<div className="bg-background flex flex-col flex-wrap gap-4 rounded-lg border p-4">
			<div className="grid w-full gap-4 md:grid-cols-2">
				<div className="flex flex-col gap-2">
					<Label htmlFor="array-size">Array Size: {arraySize}</Label>
					<Slider
						id="array-size"
						min={5}
						max={15}
						step={1}
						value={[arraySize]}
						onValueChange={handleArraySizeChange}
						disabled={isPlaying}
						className="py-4"
					/>
					<Button variant="outline" onClick={() => onResetAction(arraySize)} disabled={isPlaying}>
						Generate
					</Button>
				</div>

				<div className="flex flex-col gap-2">
					<Label htmlFor="speed">Animation Speed</Label>
					<Slider
						id="speed"
						min={1}
						max={10}
						step={0.1}
						value={[speed]}
						onValueChange={(value) => onSpeedChangeAction(value[0])}
						className="py-4"
					/>
				</div>
			</div>

			<div className="flex flex-wrap items-center justify-between">
				<div className="flex w-full justify-center gap-2 md:w-auto">
					<Button variant="outline" onClick={onPrevAction} disabled={!canGoPrev || isPlaying}>
						Previous
					</Button>

					{isPlaying ? (
						<Button variant="outline" onClick={onPauseAction} disabled={!canGoNext}>
							Pause
						</Button>
					) : (
						<Button variant="default" onClick={onStartAction} disabled={!canGoNext}>
							{currentStep === 0 ? "Start" : "Resume"}
						</Button>
					)}

					<Button variant="outline" onClick={onNextAction} disabled={!canGoNext || isPlaying}>
						Next
					</Button>
				</div>

				<div className="md:text-muted-foreground flex w-full justify-center pt-4 text-sm md:w-fit md:p-0">
					Step {currentStep} of {totalSteps}
				</div>
			</div>
		</div>
	);
}
