"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import ElasticSlider from "@/components/ui/elastic-slider";
import { PlayIcon, PauseIcon, SkipBackIcon, SkipForwardIcon } from "lucide-react";

interface ControlProps {
	onResetAction: (stackSize: number) => void;
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
	const [stackSize, setStackSize] = useState(8);

	return (
		<div className="bg-background flex flex-col flex-wrap gap-4 rounded-lg border p-4">
			<div className="grid w-full gap-12 gap-y-4 md:grid-cols-2">
				<div className="flex flex-col gap-2">
					<Label htmlFor="stack-size">Number of Operations: </Label>
					<ElasticSlider
						min={5}
						max={12}
						isStepped
						step={1}
						defaultValue={stackSize}
						onValueChange={(value: number) => setStackSize(value)}
						disabled={isPlaying}
						className="py-2"
					/>
					<Button variant="outline" onClick={() => onResetAction(stackSize)} disabled={isPlaying}>
						Generate New Stack
					</Button>
				</div>

				<div className="flex flex-col gap-2">
					<Label htmlFor="speed">Animation Speed</Label>
					<ElasticSlider
						defaultValue={speed}
						min={1}
						max={10}
						onValueChange={(value: number) => onSpeedChangeAction(value)}
						className="py-2"
					/>
				</div>
			</div>

			<div className="flex flex-wrap items-center justify-between">
				<div className="flex w-full justify-center gap-2 md:w-auto">
					<Button variant="outline" onClick={onPrevAction} disabled={!canGoPrev || isPlaying}>
						<SkipBackIcon className="h-4 w-4" />
						Previous
					</Button>

					{isPlaying ? (
						<Button onClick={onPauseAction} className="flex items-center gap-2">
							<PauseIcon className="h-4 w-4" />
							Pause
						</Button>
					) : (
						<Button onClick={onStartAction} disabled={!canGoNext} className="flex items-center gap-2">
							<PlayIcon className="h-4 w-4" />
							Play
						</Button>
					)}

					<Button variant="outline" onClick={onNextAction} disabled={!canGoNext || isPlaying}>
						<SkipForwardIcon className="h-4 w-4" />
						Next
					</Button>
				</div>

				<div className="md:text-muted-foreground flex w-full justify-center pt-4 text-sm md:w-fit md:p-0">
					Step {currentStep + 1} of {totalSteps + 1}
				</div>
			</div>
		</div>
	);
}
