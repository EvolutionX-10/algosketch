"use client";

import { useId } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import ElasticSlider from "@/components/ui/elastic-slider";

export interface PlaybackControlProps {
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
}

export default function PlaybackControls({
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
}: PlaybackControlProps) {
	const id = useId();
	const lastStep = Math.max(0, totalSteps);
	return (
		<div role="group" aria-label="Playback controls" className="space-y-3">
			<div className="flex flex-wrap gap-2">
				<Button variant="outline" onClick={() => onSeekAction(0)} disabled={!canGoPrev || isPlaying}>
					First
				</Button>
				<Button variant="outline" onClick={onPrevAction} disabled={!canGoPrev || isPlaying}>
					Previous
				</Button>
				{isPlaying ? (
					<Button onClick={onPauseAction}>Pause</Button>
				) : (
					<Button onClick={onStartAction} disabled={!canGoNext}>
						{currentStep === 0 ? "Start" : "Resume"}
					</Button>
				)}
				<Button variant="outline" onClick={onNextAction} disabled={!canGoNext || isPlaying}>
					Next
				</Button>
				<Button variant="outline" onClick={() => onSeekAction(lastStep)} disabled={!canGoNext || isPlaying}>
					Last
				</Button>
				<Button variant="outline" onClick={onRestartAction} disabled={currentStep === 0 && !isPlaying}>
					Restart
				</Button>
			</div>
			<div className="space-y-1">
				<Label htmlFor={id}>Algorithm timeline</Label>
				<ElasticSlider
					id={id}
					aria-label="Algorithm timeline"
					min={0}
					max={Math.max(1, lastStep)}
					value={currentStep}
					disabled={lastStep === 0}
					onValueChange={onSeekAction}
				/>
				<p className="text-muted-foreground text-sm" aria-live={isPlaying ? "off" : "polite"}>
					Step {currentStep} of {lastStep}
				</p>
			</div>
		</div>
	);
}
