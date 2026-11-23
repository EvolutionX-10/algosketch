"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { getCumulativeMetrics, initialMetrics, type OperationStep } from "@/lib/algorithm-metrics";

export function useAlgorithmPlayback<T extends OperationStep>() {
	const [steps, setSteps] = useState<T[]>([]);
	const [currentStepIndex, setCurrentStepIndex] = useState(0);
	const [playing, setPlaying] = useState(false);
	const [speed, setSpeed] = useState(5);
	const canGoNext = currentStepIndex < steps.length - 1;
	const totals = useMemo(() => getCumulativeMetrics(steps), [steps]);

	useEffect(() => {
		if (!playing) return;
		if (!canGoNext) {
			setPlaying(false);
			return;
		}
		const timer = setInterval(
			() => {
				setCurrentStepIndex((index) => Math.min(index + 1, steps.length - 1));
			},
			1100 - speed * 100,
		);
		return () => clearInterval(timer);
	}, [playing, canGoNext, speed, steps.length]);

	const resetSteps = useCallback((newSteps: T[]) => {
		setPlaying(false);
		setSteps(newSteps);
		setCurrentStepIndex(0);
	}, []);

	return {
		steps,
		resetSteps,
		currentStepIndex,
		isPlaying: playing && canGoNext,
		speed,
		setSpeed,
		metrics: totals[currentStepIndex] ?? initialMetrics,
		nextStep: () => setCurrentStepIndex((index) => Math.min(index + 1, Math.max(0, steps.length - 1))),
		prevStep: () => setCurrentStepIndex((index) => Math.max(0, index - 1)),
		startAnimation: () => canGoNext && setPlaying(true),
		pauseAnimation: () => setPlaying(false),
	};
}
