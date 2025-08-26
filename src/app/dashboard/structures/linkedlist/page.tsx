import type { Metadata } from "next";
import Visualizer from "@/components/linkedlist/visualizer";

export const metadata: Metadata = {
	title: "Linked List",
	description:
		"Interactive linked list data structure visualization with insert, delete, and search operations. Learn dynamic data structures with step-by-step animations.",
	keywords: ["linked list", "data structure", "dynamic", "insert", "delete", "search", "pointers", "visualization"],
};

export default function LinkedListPage() {
	return <Visualizer />;
}
