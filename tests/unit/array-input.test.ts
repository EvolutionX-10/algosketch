import { describe, expect, test } from "bun:test";
import { createArrayItems, createArrayPreset, parseArrayInput } from "../../src/lib/array-input";

describe("custom array validation", () => {
	for (const text of ["1, 99, 1", "1 99 1", " 1,\n99 1 "]) {
		test(`accepts ${JSON.stringify(text)} and preserves order and duplicates`, () => {
			expect(parseArrayInput(text)).toEqual({ values: [1, 99, 1] });
		});
	}
	for (const text of [
		"",
		" ",
		"1,,2",
		",1",
		"1,",
		"1.5,2",
		"1e1",
		"0x10",
		"NaN",
		"Infinity",
		"-1,5",
		"0",
		"100",
		Array(16).fill("5").join(","),
	]) {
		test(`rejects ${JSON.stringify(text)}`, () => {
			expect(parseArrayInput(text).error).toBeString();
		});
	}
	test("accepts the maximum array length", () => {
		expect(parseArrayInput(Array(15).fill("99").join(" ")).values).toHaveLength(15);
	});
	test("assigns distinct identities to duplicate values and successive datasets", () => {
		const first = createArrayItems([5, 5, 5]);
		const second = createArrayItems([5, 5, 5]);
		expect(new Set([...first, ...second].map((item) => item.id)).size).toBe(6);
		expect(first.map((item) => item.value)).toEqual([5, 5, 5]);
	});
});

describe("reproducible presets", () => {
	test("creates ordered, reversed, nearly sorted, and duplicate datasets", () => {
		expect(createArrayPreset("sorted", 5)).toEqual([17, 33, 50, 66, 83]);
		expect(createArrayPreset("reversed", 5)).toEqual([83, 66, 50, 33, 17]);
		expect(createArrayPreset("nearly-sorted", 5)).toEqual([17, 50, 33, 66, 83]);
		expect(createArrayPreset("duplicates", 5)).toEqual([25, 50, 25, 75, 25]);
	});
	test("repeats seeded input without depending on other random calls", () => {
		const first = createArrayPreset("random", 15, 7);
		createArrayPreset("random", 15, 123);
		expect(createArrayPreset("random", 15, 7)).toEqual(first);
		expect(createArrayPreset("random", 15, 8)).not.toEqual(first);
		for (const seed of [0, 42, 0xffffffff]) {
			const values = createArrayPreset("random", 15, seed);
			expect(values).toHaveLength(15);
			expect(values.every((value) => Number.isInteger(value) && value >= 1 && value <= 99)).toBe(true);
		}
	});
	test("handles singleton presets without adding or removing values", () => {
		for (const preset of ["sorted", "reversed", "nearly-sorted", "duplicates", "random"] as const) {
			expect(createArrayPreset(preset, 1)).toHaveLength(1);
		}
	});
	test("rejects unsupported sizes and seeds", () => {
		for (const size of [0, 16, 2.5, NaN]) expect(() => createArrayPreset("sorted", size)).toThrow();
		for (const seed of [-1, 0x100000000, 1.5, NaN]) expect(() => createArrayPreset("random", 5, seed)).toThrow();
	});
});
