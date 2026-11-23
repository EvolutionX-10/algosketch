import type { BaseBarItem } from "@/lib/types";

export const arrayLimits = { minLength: 1, maxLength: 15, minValue: 1, maxValue: 99 } as const;
export type ParseResult = { values: number[]; error?: never } | { values?: never; error: string };

export function parseArrayInput(text: string): ParseResult {
	if (!text.trim()) return { error: "Enter 1 to 15 whole numbers from 1 to 99." };
	const segments = text.trim().split(",");
	if (segments.some((segment) => !segment.trim())) return { error: "Enter a number between each comma." };
	const tokens = segments.flatMap((segment) => segment.trim().split(/\s+/));
	if (tokens.length > arrayLimits.maxLength) return { error: "Use at most 15 numbers so each value stays readable." };
	if (tokens.some((token) => !/^\d+$/.test(token)))
		return { error: "Use whole numbers from 1 to 99, separated by commas or spaces." };
	const values = tokens.map(Number);
	if (values.some((value) => value < arrayLimits.minValue || value > arrayLimits.maxValue)) {
		return { error: "Every number must be between 1 and 99." };
	}
	return { values };
}

export function createArrayItems(values: readonly number[]): BaseBarItem<"default">[] {
	const runId = crypto.randomUUID();
	return values.map((value, index) => ({ id: `${runId}-${index}`, value, state: "default" }));
}

export type ArrayPreset = "sorted" | "reversed" | "nearly-sorted" | "duplicates" | "random";

/** Same size and seed yield the same dataset, without changing global randomness. */
export function createArrayPreset(preset: ArrayPreset, size: number, seed = 42): number[] {
	if (!Number.isInteger(size) || size < 1 || size > arrayLimits.maxLength) throw new RangeError("Invalid dataset size");
	if (!Number.isInteger(seed) || seed < 0 || seed > 0xffffffff) throw new RangeError("Invalid random seed");
	let state = seed;
	const random = () => {
		state = (Math.imul(1664525, state) + 1013904223) >>> 0;
		return state / 0x100000000;
	};
	if (preset === "random") return Array.from({ length: size }, () => 1 + Math.floor(random() * 99));
	if (preset === "duplicates") return Array.from({ length: size }, (_, index) => [25, 50, 25, 75][index % 4]);
	const sorted = Array.from({ length: size }, (_, index) => Math.round(((index + 1) * 99) / (size + 1)));
	if (preset === "reversed") return sorted.reverse();
	if (preset === "nearly-sorted" && size > 1) {
		const index = Math.floor(size / 2) - 1;
		[sorted[index], sorted[index + 1]] = [sorted[index + 1], sorted[index]];
	}
	return sorted;
}
