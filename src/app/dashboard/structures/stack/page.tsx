import { Metadata } from "next";
import Visualizer from "@/components/stack/visualizer";

export const metadata: Metadata = {
	title: "Stack Data Structure Visualization",
	description:
		"Interactive stack data structure visualization with push, pop, and peek operations. Learn LIFO principles with step-by-step animations.",
	keywords: ["stack", "data structure", "LIFO", "push", "pop", "peek", "visualization"],
};

export default function StackPage() {
	return <Visualizer />;
}
