"use client";

import { useState, type FormEvent } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import ElasticSlider from "../ui/elastic-slider";
import PlaybackControls from "../shared/playback-controls";
import { Shuffle } from "lucide-react";

interface ControlProps {
	onResetAction: (arraySize: number) => void;
	onStartAction: () => void;
	onNextAction: () => void;
	onPrevAction: () => void;
	onPauseAction: () => void;
	onRestartAction: () => void;
	onSeekAction: (index: number) => void;
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
	onRestartAction,
	onSeekAction,
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
	const [targetError, setTargetError] = useState("");
	const handleTargetSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const text = String(new FormData(event.currentTarget).get("target") ?? "");
		if (!/^\d+$/.test(text) || Number(text) < 1 || Number(text) > 99) {
			setTargetError("Enter a whole-number target from 1 to 99.");
			return;
		}
		setTargetError("");
		onTargetChangeAction(Number(text));
	};

	const handleRandomTarget = () => {
		if (arrayValues.length > 0) {
			const randomValue = arrayValues[Math.floor(Math.random() * arrayValues.length)];
			setTargetError("");
			onTargetChangeAction(randomValue);
		}
	};

	return (
		<div className="flex flex-col gap-4 rounded-lg border p-4 shadow-sm">
			<div className="grid gap-4">
				<div className="space-y-2">
					<Label htmlFor="array-size">Generated array size: {arraySize}</Label>
					<ElasticSlider
						id="array-size"
						aria-label="Array size"
						min={5}
						max={15}
						step={1}
						isStepped
						value={arraySize}
						onValueChange={(value) => setArraySize(value)}
						disabled={isPlaying}
					/>
				</div>
				<Button onClick={() => onResetAction(arraySize)} disabled={isPlaying} variant="outline" className="w-full">
					<Shuffle className="mr-2 h-4 w-4" />
					Generate New Array
				</Button>
			</div>

			<div className="space-y-2">
				<Label htmlFor="speed">Animation Speed: {speed}</Label>
				<ElasticSlider
					id="speed"
					aria-label="Animation speed"
					value={speed}
					min={1}
					max={10}
					onValueChange={(value) => onSpeedChangeAction(value)}
					className="py-2"
				/>
			</div>

			<div className="space-y-2">
				<form key={target} onSubmit={handleTargetSubmit} noValidate className="space-y-2">
					<Label htmlFor="target">Search Target</Label>
					<div className="flex gap-2">
						<Input
							id="target"
							name="target"
							type="number"
							min={1}
							max={99}
							step={1}
							defaultValue={target}
							onChange={() => setTargetError("")}
							disabled={isPlaying}
							aria-invalid={!!targetError}
							aria-describedby={targetError ? "target-error" : undefined}
							className="flex-1"
						/>
						<Button type="submit" disabled={isPlaying} variant="outline" size="sm">
							Set
						</Button>
					</div>
					{targetError && (
						<p id="target-error" role="alert" className="text-sm text-red-600 dark:text-red-400">
							{targetError}
						</p>
					)}
				</form>
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

			<PlaybackControls
				onStartAction={onStartAction}
				onNextAction={onNextAction}
				onPrevAction={onPrevAction}
				onPauseAction={onPauseAction}
				onRestartAction={onRestartAction}
				onSeekAction={onSeekAction}
				isPlaying={isPlaying}
				canGoNext={canGoNext}
				canGoPrev={canGoPrev}
				currentStep={currentStep}
				totalSteps={totalSteps}
			/>
		</div>
	);
}
