"use client";

import * as Slider from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";

interface ElasticSliderProps {
	id: string;
	"aria-label": string;
	defaultValue?: number;
	value?: number;
	min?: number;
	max?: number;
	className?: string;
	isStepped?: boolean;
	step?: number;
	disabled?: boolean;
	onValueChange?: (value: number) => void;
}

// Retain the existing API while providing keyboard and ARIA slider behavior.
export default function ElasticSlider({
	id,
	"aria-label": label,
	defaultValue = 50,
	value,
	min = 0,
	max = 100,
	className,
	step = 1,
	disabled = false,
	onValueChange,
}: ElasticSliderProps) {
	return (
		<Slider.Root
			className={cn(
				"relative flex min-h-8 w-full touch-none items-center select-none data-[disabled]:opacity-50",
				className,
			)}
			value={value === undefined ? undefined : [value]}
			defaultValue={[defaultValue]}
			min={min}
			max={max}
			step={step}
			disabled={disabled}
			onValueChange={([next]) => onValueChange?.(next)}
		>
			<Slider.Track className="bg-muted relative h-2 w-full grow overflow-hidden rounded-full">
				<Slider.Range className="bg-primary absolute h-full rounded-full" />
			</Slider.Track>
			<Slider.Thumb
				id={id}
				aria-label={label}
				className="border-primary bg-background focus-visible:ring-ring block size-5 rounded-full border-2 shadow-sm focus-visible:ring-4 focus-visible:outline-none disabled:pointer-events-none"
			/>
		</Slider.Root>
	);
}
