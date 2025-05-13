"use client";

import { useRef } from "react";
import Banner from "../banner";

export default function Visualizer() {
	const ref = useRef<HTMLDivElement | null>(null);
	const handleClick = () => {
		if (ref && ref.current) {
			ref.current.scrollIntoView({ behavior: "smooth" });
		}
	};

	return (
		<>
			<Banner onClickAction={handleClick} />
			<h2 ref={ref}>Interactive Visualizer</h2>
		</>
	);
}
