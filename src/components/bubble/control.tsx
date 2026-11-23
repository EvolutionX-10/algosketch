"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import ElasticSlider from "../ui/elastic-slider";
import PlaybackControls from "../shared/playback-controls";

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
}: ControlProps) {
	const [arraySize, setArraySize] = useState(10);

	return (
		<div className="bg-background flex flex-col flex-wrap gap-4 rounded-lg border p-4">
			<div className="grid w-full gap-12 gap-y-4 md:grid-cols-2">
				<div className="flex flex-col gap-2">
					<Label htmlFor="array-size">Generated array size: {arraySize}</Label>
					<ElasticSlider
						id="array-size"
						aria-label="Array size"
						min={5}
						max={15}
						isStepped
						step={1}
						value={arraySize}
						onValueChange={(value) => setArraySize(value)}
						disabled={isPlaying}
						className="py-2"
					/>
					<Button variant="outline" onClick={() => onResetAction(arraySize)} disabled={isPlaying}>
						Generate
					</Button>
				</div>

				<div className="flex flex-col gap-2">
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
