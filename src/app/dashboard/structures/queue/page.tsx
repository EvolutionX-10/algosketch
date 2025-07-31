import type { Metadata } from "next";
import Visualizer from "@/components/queue/visualizer";

export const metadata: Metadata = {
	title: "Queue",
	description:
		"Interactive queue data structure visualization with enqueue, dequeue, and peek operations. Learn FIFO principles with step-by-step animations.",
	keywords: ["queue", "data structure", "FIFO", "enqueue", "dequeue", "peek", "visualization"],
};

export default function QueuePage() {
	return <Visualizer />;
}
