"use client";

import { useId, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createArrayPreset, parseArrayInput, type ArrayPreset } from "@/lib/array-input";

interface DatasetEditorProps {
	values: number[];
	disabled: boolean;
	onApplyAction: (values: number[]) => void;
}

export default function DatasetEditor({ values, disabled, onApplyAction }: DatasetEditorProps) {
	const id = useId();
	const [error, setError] = useState("");
	const [seed, setSeed] = useState("42");
	const [seedError, setSeedError] = useState("");
	const [revision, setRevision] = useState(0);
	const currentValues = values.join(", ");
	const applyPreset = (preset: ArrayPreset) => {
		if (preset === "random" && (!/^\d+$/.test(seed) || Number(seed) > 0xffffffff)) {
			setSeedError("Use a whole-number seed from 0 to 4294967295.");
			return;
		}
		setError("");
		setSeedError("");
		setRevision((value) => value + 1);
		onApplyAction(createArrayPreset(preset, Math.max(1, values.length), preset === "random" ? Number(seed) : 42));
	};
	const submit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const result = parseArrayInput(String(new FormData(event.currentTarget).get("values") ?? ""));
		if (result.error !== undefined) {
			setError(result.error);
			return;
		}
		setError("");
		setRevision((value) => value + 1);
		onApplyAction(result.values);
	};
	return (
		<section aria-label="Dataset" className="bg-card min-w-0 space-y-4 rounded-lg border p-4">
			<h3 className="text-lg font-medium">Try your own dataset</h3>
			<form key={`${currentValues}-${revision}`} onSubmit={submit} className="space-y-2">
				<Label htmlFor={`${id}-values`}>Custom array</Label>
				<div className="flex flex-wrap gap-2">
					<Input
						id={`${id}-values`}
						name="values"
						defaultValue={currentValues}
						maxLength={300}
						className="min-w-40 flex-1"
						disabled={disabled}
						autoComplete="off"
						aria-invalid={!!error}
						aria-describedby={`${id}-help${error ? ` ${id}-error` : ""}`}
						onChange={() => setError("")}
					/>
					<Button type="submit" disabled={disabled}>
						Apply array
					</Button>
				</div>
				<p id={`${id}-help`} className="text-muted-foreground text-sm">
					1–15 whole numbers from 1 to 99, separated by commas or spaces.
				</p>
				{error && (
					<p id={`${id}-error`} role="alert" className="text-sm text-red-600 dark:text-red-400">
						{error}
					</p>
				)}
			</form>
			<fieldset disabled={disabled} className="space-y-3">
				<legend className="mb-2 text-sm font-medium">Presets for the current array size</legend>
				<div className="flex flex-wrap gap-2">
					{(
						[
							["sorted", "Sorted"],
							["reversed", "Reversed"],
							["nearly-sorted", "Nearly sorted"],
							["duplicates", "Duplicates"],
						] as const
					).map(([preset, label]) => (
						<Button key={preset} type="button" variant="outline" size="sm" onClick={() => applyPreset(preset)}>
							{label}
						</Button>
					))}
				</div>
				<div className="space-y-2">
					<Label htmlFor={`${id}-seed`}>Random seed</Label>
					<div className="flex flex-wrap gap-2">
						<Input
							id={`${id}-seed`}
							value={seed}
							onChange={(e) => {
								setSeed(e.target.value);
								setSeedError("");
							}}
							inputMode="numeric"
							maxLength={10}
							className="w-36"
							aria-invalid={!!seedError}
							aria-describedby={`${id}-seed-help${seedError ? ` ${id}-seed-error` : ""}`}
						/>
						<Button type="button" variant="outline" onClick={() => applyPreset("random")}>
							Seeded random
						</Button>
					</div>
					<p id={`${id}-seed-help`} className="text-muted-foreground text-sm">
						Reuse a seed and array size to repeat the same random input.
					</p>
					{seedError && (
						<p id={`${id}-seed-error`} role="alert" className="text-sm text-red-600 dark:text-red-400">
							{seedError}
						</p>
					)}
				</div>
			</fieldset>
		</section>
	);
}
