"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import ElasticSlider from "../ui/elastic-slider";
import { Shuffle } from "lucide-react";

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
	target: number;
	onTargetChangeAction: (target: number) => void;
	arrayValues: number[];
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
	target,
	onTargetChangeAction,
	arrayValues,
}: ControlProps) {
	const [arraySize, setArraySize] = useState(10);
	const [inputTarget, setInputTarget] = useState(target);

	const handleTargetSubmit = () => {
		onTargetChangeAction(inputTarget);
	};

	const handleRandomTarget = () => {
		if (arrayValues.length > 0) {
			const randomValue = arrayValues[Math.floor(Math.random() * arrayValues.length)];
			setInputTarget(randomValue);
			onTargetChangeAction(randomValue);
		}
	};

	return (
		<div className="flex flex-col gap-4 rounded-lg border p-4 shadow-sm">
			<div className="grid gap-4">
				<div className="space-y-2">
					<Label htmlFor="array-size">Array Size: {arraySize}</Label>
					<ElasticSlider
						min={5}
						max={20}
						step={1}
						isStepped
						defaultValue={arraySize}
						onValueChange={(value) => setArraySize(value)}
						disabled={isPlaying}
					/>
				</div>
				<Button onClick={() => onResetAction(arraySize)} disabled={isPlaying} variant="outline" className="w-full">
					<Shuffle className="mr-2 h-4 w-4" />
					Generate Sorted Array
				</Button>
			</div>
			<div className="space-y-2">
				<Label htmlFor="speed">Animation Speed</Label>
				<ElasticSlider
					defaultValue={speed}
					min={1}
					max={10}
					onValueChange={(value) => onSpeedChangeAction(value)}
					className="py-2"
				/>
			</div>
			<div className="space-y-2">
				<Label htmlFor="target">Search Target</Label>
				<div className="flex gap-2">
					<Input
						id="target"
						type="number"
						value={inputTarget}
						onChange={(e) => setInputTarget(Number(e.target.value))}
						onKeyDown={(e) => e.key === "Enter" && handleTargetSubmit()}
						disabled={isPlaying}
						min={1}
						max={99}
						className="flex-1"
					/>
					<Button onClick={handleTargetSubmit} disabled={isPlaying} variant="outline" size="sm">
						Set
					</Button>
				</div>
				<Button
					onClick={handleRandomTarget}
					disabled={isPlaying || arrayValues.length === 0}
					variant="outline"
					size="sm"
					className="w-full"
				>
					Random Target from Array
				</Button>
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
