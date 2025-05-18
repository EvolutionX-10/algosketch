import React, { useEffect, useRef, useState } from "react";
import { animate, motion, useMotionValue, useMotionValueEvent, useTransform } from "motion/react";

import "./elastic-slider.css";

const MAX_OVERFLOW = 50;

interface ElasticSliderProps {
	defaultValue?: number;
	min?: number;
	max?: number;
	className?: string;
	isStepped?: boolean;
	step?: number;
	disabled?: boolean;
	onValueChange?: (value: number) => void;
}

const ElasticSlider: React.FC<ElasticSliderProps> = ({
	defaultValue = 50,
	min = 0,
	max = 100,
	className = "",
	isStepped = false,
	step = 1,
	disabled = false,
	onValueChange,
}) => {
	return (
		<div className={`slider-container ${className}`}>
			<Slider
				defaultValue={defaultValue}
				min={min}
				max={max}
				isStepped={isStepped}
				step={step}
				disabled={disabled}
				onValueChange={onValueChange}
			/>
		</div>
	);
};

interface SliderProps {
	defaultValue: number;
	min: number;
	max: number;
	isStepped: boolean;
	step: number;
	disabled?: boolean;
	onValueChange?: (value: number) => void;
}

const Slider: React.FC<SliderProps> = ({
	defaultValue,
	min,
	max,
	isStepped,
	step,
	onValueChange,
	disabled,
}) => {
	const [value, setValue] = useState<number>(defaultValue);
	const sliderRef = useRef<HTMLDivElement>(null);
	const [region, setRegion] = useState<"left" | "middle" | "right">("middle");
	const clientX = useMotionValue(0);
	const overflow = useMotionValue(0);
	const scale = useMotionValue(1);

	useEffect(() => {
		setValue(defaultValue);
	}, [defaultValue]);

	useMotionValueEvent(clientX, "change", (latest: number) => {
		if (sliderRef.current) {
			const { left, right } = sliderRef.current.getBoundingClientRect();
			let newValue: number;
			if (latest < left) {
				setRegion("left");
				newValue = left - latest;
			} else if (latest > right) {
				setRegion("right");
				newValue = latest - right;
			} else {
				setRegion("middle");
				newValue = 0;
			}
			overflow.jump(decay(newValue, MAX_OVERFLOW));
		}
	});
	const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
		if (disabled) return;

		if (e.buttons > 0 && sliderRef.current) {
			const { left, width } = sliderRef.current.getBoundingClientRect();
			let newValue = min + ((e.clientX - left) / width) * (max - min);
			if (isStepped) {
				newValue = Math.round(newValue / step) * step;
			}
			newValue = Math.min(Math.max(newValue, min), max);
			setValue(newValue);
			if (onValueChange) {
				onValueChange(newValue);
			}
			clientX.jump(e.clientX);
		}
	};

	const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
		if (disabled) return;

		handlePointerMove(e);
		e.currentTarget.setPointerCapture(e.pointerId);
	};
	const handlePointerUp = () => {
		if (disabled) return;

		animate(overflow, 0, { type: "spring", bounce: 0.5 });
	};

	const getRangePercentage = (): number => {
		const totalRange = max - min;
		if (totalRange === 0) return 0;
		return ((value - min) / totalRange) * 100;
	};
	return (
		<motion.div
			onHoverStart={() => !disabled && animate(scale, 1.05)}
			onHoverEnd={() => !disabled && animate(scale, 1)}
			onTouchStart={() => !disabled && animate(scale, 1.05)}
			onTouchEnd={() => !disabled && animate(scale, 1)}
			style={{
				scale,
				opacity: useTransform(scale, [1, 1.05], [disabled ? 0.5 : 0.9, 1]),
			}}
			className={`slider-wrapper ${disabled ? "disabled" : ""}`}
		>
			{" "}
			<div
				ref={sliderRef}
				className={`slider-root ${disabled ? "disabled" : ""}`}
				onPointerMove={handlePointerMove}
				onPointerDown={handlePointerDown}
				onPointerUp={handlePointerUp}
			>
				{" "}
				<motion.div
					style={{
						scaleX: useTransform(() => {
							if (disabled) return 1;
							if (sliderRef.current) {
								const { width } = sliderRef.current.getBoundingClientRect();
								return 1 + overflow.get() / width;
							}
							return 1;
						}),
						scaleY: useTransform(overflow, [0, MAX_OVERFLOW], [1, disabled ? 1 : 0.8]),
						transformOrigin: useTransform(() => {
							if (sliderRef.current) {
								const { left, width } = sliderRef.current.getBoundingClientRect();
								return clientX.get() < left + width / 2 ? "right" : "left";
							}
							return "center";
						}),
						height: useTransform(scale, [1, 1.2], [6, 12]),
						marginTop: useTransform(scale, [1, 1.2], [0, -3]),
						marginBottom: useTransform(scale, [1, 1.2], [0, -3]),
					}}
					className={`slider-track-wrapper ${disabled ? "disabled" : ""}`}
				>
					<div className="slider-track">
						<div className="slider-range" style={{ width: `${getRangePercentage()}%` }} />
					</div>
				</motion.div>
			</div>
		</motion.div>
	);
};

function decay(value: number, max: number): number {
	if (max === 0) {
		return 0;
	}
	const entry = value / max;
	const sigmoid = 2 * (1 / (1 + Math.exp(-entry)) - 0.5);
	return sigmoid * max;
}

export default ElasticSlider;
