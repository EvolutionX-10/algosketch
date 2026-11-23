export type AlgorithmOperation = "compare" | "swap" | "shift" | "divide" | "merge";

export interface OperationStep {
	/** One logical operation, independent of the colors/highlights used to render this frame. */
	operation?: AlgorithmOperation;
}

export interface AlgorithmMetrics {
	comparisons: number;
	swaps: number;
	shifts: number;
	divides: number;
	merges: number;
}

export const initialMetrics: Readonly<AlgorithmMetrics> = Object.freeze({
	comparisons: 0,
	swaps: 0,
	shifts: 0,
	divides: 0,
	merges: 0,
});

const metricForOperation = {
	compare: "comparisons",
	swap: "swaps",
	shift: "shifts",
	divide: "divides",
	merge: "merges",
} as const;

/** Store independent cumulative totals so visiting a step never changes its counts. */
export function getCumulativeMetrics(steps: readonly OperationStep[]): AlgorithmMetrics[] {
	let metrics = { ...initialMetrics };
	return steps.map(({ operation }) => {
		metrics = { ...metrics };
		if (operation) metrics[metricForOperation[operation]]++;
		return metrics;
	});
}
