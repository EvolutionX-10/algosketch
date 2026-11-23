import { describe, expect, test } from "bun:test";
import { bubbleSortSteps } from "../../src/components/bubble/bubbleSort";
import { insertionSortSteps } from "../../src/components/insertion/insertionSort";
import { selectionSortSteps } from "../../src/components/selection/selectionSort";
import { mergeSortSteps } from "../../src/components/merge/mergeSort";
import { quickSortSteps } from "../../src/components/quick/quickSort";
import { heapSortSteps } from "../../src/components/heap/heapSort";
import { linearSearchSteps } from "../../src/components/linear/linearSearch";
import { binarySearchSteps } from "../../src/components/binary/binarySearch";
import { getCumulativeMetrics } from "../../src/lib/algorithm-metrics";

const items = (values: number[]) => values.map((value, i) => ({ id: `item-${i}`, value, state: "default" as const }));
const freezeInput = (values: number[]) => {
	const input = items(values);
	input.forEach(Object.freeze);
	Object.freeze(input);
	return input;
};

const cases = [[], [5], [1, 2, 3, 4], [4, 3, 2, 1], [3, 1, 3, 2, 1], [0, -4, 9, -4, 2]];
const sorters = {
	bubble: bubbleSortSteps,
	insertion: insertionSortSteps,
	selection: selectionSortSteps,
	merge: mergeSortSteps,
	quick: quickSortSteps,
	heap: heapSortSteps,
};

for (const [name, sort] of Object.entries(sorters)) {
	describe(name, () => {
		for (const values of cases) {
			test(`sorts ${JSON.stringify(values)} without mutating its input`, () => {
				const input = freezeInput(values);
				const steps = sort(input);
				expect(steps.length).toBeGreaterThan(0);
				expect(input).toEqual(items(values));
				expect(steps[0].array.map((item) => item.value)).toEqual(values);
				const final = steps.at(-1)!;
				expect(final.array.map((item) => item.value)).toEqual([...values].sort((a, b) => a - b));
				expect([...final.sortedIndices].sort((a, b) => a - b)).toEqual(values.map((_, i) => i));
				for (const step of steps) {
					expect(step.array).toHaveLength(values.length);
					for (const index of step.sortedIndices) expect(index >= 0 && index < values.length).toBe(true);
				}
				// Mutating one returned frame must not affect the input or another frame.
				const before = JSON.stringify(steps.slice(1));
				if (steps[0].array[0]) steps[0].array[0].value = 123456;
				expect(JSON.stringify(steps.slice(1))).toBe(before);
				expect(input).toEqual(items(values));
			});
		}

		test("keeps cumulative statistics independent of navigation history", () => {
			const steps = sort(items([3, 1, 2]));
			const totals = getCumulativeMetrics(steps);
			expect(totals[0].comparisons).toBe(0);
			expect(totals[0].swaps).toBe(0);
			// Independent counts for this known input, not inferred from display flags.
			const expected = {
				bubble: { comparisons: 3, swaps: 2 },
				insertion: { comparisons: 3, shifts: 2 },
				selection: { comparisons: 3, swaps: 2 },
				merge: { comparisons: 3, divides: 2, merges: 2 },
				quick: { comparisons: 2, swaps: 2 },
				heap: { comparisons: 3, swaps: 2 },
			}[name]!;
			expect(totals.at(-1)).toMatchObject(expected);
			for (let i = 1; i < totals.length; i++) {
				const prior = { ...totals[i - 1] };
				expect(totals[i]).not.toBe(totals[i - 1]);
				expect(getCumulativeMetrics(steps)[i - 1]).toEqual(prior);
			}
		});

		test("counts no operations for empty and singleton arrays", () => {
			for (const values of [[], [5]]) {
				const totals = getCumulativeMetrics(sort(items(values)));
				expect(totals.at(-1)).toEqual({ comparisons: 0, swaps: 0, shifts: 0, divides: 0, merges: 0 });
			}
		});
	});
}

for (const [name, search] of Object.entries({ linear: linearSearchSteps, binary: binarySearchSteps })) {
	describe(`${name} search`, () => {
		for (const values of cases) {
			for (const target of [-999, values[0] ?? 5, values.at(-1) ?? 5]) {
				test(`${JSON.stringify(values)}, target ${target}`, () => {
					const ordered = name === "binary" ? [...values].sort((a, b) => a - b) : values;
					const input = freezeInput(ordered);
					const steps = search(input, target);
					expect(input).toEqual(items(ordered));
					expect(steps.at(-1)).toMatchObject({ finished: true, found: values.includes(target) });
					expect(getCumulativeMetrics(steps)[0].comparisons).toBe(0);
				});
			}
		}
		test("counts actual element probes and ignores completion frames", () => {
			const input = items([1, 2, 3, 4]);
			const expected = name === "linear" ? [1, 4, 4] : [2, 3, 3];
			for (const [i, target] of [1, 4, 9].entries()) {
				expect(getCumulativeMetrics(search(input, target)).at(-1)!.comparisons).toBe(expected[i]);
			}
		});
	});
}
