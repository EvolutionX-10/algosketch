"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { getCumulativeMetrics, initialMetrics, type OperationStep } from "@/lib/algorithm-metrics";

export function useAlgorithmPlayback<T extends OperationStep>() {
	const [player, setPlayer] = useState<{ steps: T[]; index: number; playing: boolean }>({
		steps: [],
		index: 0,
		playing: false,
	});
	const { steps, index: currentStepIndex, playing } = player;
	const [speed, setSpeed] = useState(5);
	const canGoNext = currentStepIndex < steps.length - 1;
	const totals = useMemo(() => getCumulativeMetrics(steps), [steps]);

	useEffect(() => {
		if (!playing) return;
		const timer = setInterval(
			() => {
				setPlayer((previous) => {
					if (!previous.playing) return previous;
					const index = Math.min(previous.index + 1, previous.steps.length - 1);
					return { ...previous, index, playing: index < previous.steps.length - 1 };
				});
			},
			1100 - speed * 100,
		);
		return () => clearInterval(timer);
	}, [playing, speed]);

	const resetSteps = useCallback((newSteps: T[]) => {
		setPlayer({ steps: newSteps, index: 0, playing: false });
	}, []);

	return {
		steps,
		resetSteps,
		currentStepIndex,
		isPlaying: playing && canGoNext,
		speed,
		setSpeed,
		metrics: totals[currentStepIndex] ?? initialMetrics,
		nextStep: () =>
			setPlayer((p) => ({ ...p, index: Math.min(p.index + 1, Math.max(0, p.steps.length - 1)), playing: false })),
		prevStep: () => setPlayer((p) => ({ ...p, index: Math.max(0, p.index - 1), playing: false })),
		startAnimation: () => setPlayer((p) => (p.index < p.steps.length - 1 ? { ...p, playing: true } : p)),
		pauseAnimation: () => setPlayer((p) => ({ ...p, playing: false })),
		seekStep: (index: number) => {
			if (!Number.isFinite(index)) return;
			setPlayer((p) => ({ ...p, playing: false, index: Math.max(0, Math.min(Math.round(index), p.steps.length - 1)) }));
		},
		restart: () => {
			setPlayer((p) => ({ ...p, playing: false, index: 0 }));
		},
	};
}
