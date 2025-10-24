import type { Metadata } from "next";
import Visualizer from "@/components/binarytree/visualizer";

export const metadata: Metadata = {
	title: "Binary Tree",
	description:
		"Interactive binary tree data structure visualization with insert, delete, and search operations. Learn hierarchical tree structures with step-by-step animations.",
	keywords: ["binary tree", "data structure", "tree", "insert", "delete", "search", "hierarchical", "visualization"],
};

export default function BinaryTreePage() {
	return <Visualizer />;
}