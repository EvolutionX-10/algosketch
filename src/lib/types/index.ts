export type State<T extends string> = T;

export interface BaseBarItem<T extends State<string>> {
	value: number;
	state: T;
	id: string;
}

// Common types for all visualizers
export interface VisualizerControl {
	onResetAction: (size: number) => void;
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

export interface LegendItem {
	color: string;
	label: string;
	description: string;
}
