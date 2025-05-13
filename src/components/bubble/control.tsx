"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { toast } from "sonner";

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

	const handleArraySizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = Number(e.target.value);
		if (value >= 0 && value <= 15) {
			setArraySize(value);
		} else {
			toast.error("Array size must be between 5 and 15");
		}
	};

	return (
		<div className="bg-background flex flex-col flex-wrap gap-4 rounded-lg border p-4">
			<div className="grid w-full gap-4 md:grid-cols-2">
				<div className="flex flex-col gap-2">
					<Label htmlFor="array-size">Array Size</Label>
					<div className="flex items-center gap-2">
						<Input
							id="array-size"
							type="number"
							min={5}
							max={15}
							value={arraySize}
							onChange={handleArraySizeChange}
							disabled={isPlaying}
						/>
					</div>
					<Button variant="outline" onClick={() => onResetAction(arraySize)} disabled={isPlaying}>
						Generate
					</Button>
				</div>

				<div>
					<Label htmlFor="speed">Animation Speed</Label>
					<Input
						id="speed"
						type="range"
						min={1}
						max={10}
						value={speed}
						onChange={(e) => onSpeedChangeAction(Number(e.target.value))}
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
