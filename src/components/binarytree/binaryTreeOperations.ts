"use client";
import { BaseBarItem } from "@/lib/types";

export type BinaryTreeState =
	| "default"
	| "inserting"
	| "deleting"
	| "searching"
	| "found"
	| "not-found"
	| "root"
	| "highlighting";

export interface BinaryTreeNode extends BaseBarItem<BinaryTreeState> {
	left?: string; // ID of the left child
	right?: string; // ID of the right child
	parent?: string; // ID of the parent node
	x?: number; // Position for rendering
	y?: number; // Position for rendering
	level?: number; // Tree level for positioning
}

export const stateStyles: Record<BinaryTreeState, string> = {
	default: "bg-blue-500",
	inserting: "bg-green-500",
	deleting: "bg-red-500",
	searching: "bg-yellow-500",
	found: "bg-emerald-500",
	"not-found": "bg-gray-500",
	root: "bg-purple-500",
	highlighting: "bg-orange-500",
};

export interface BinaryTreeStep {
	nodes: BinaryTreeNode[];
	operation: "insert" | "delete" | "search" | "initial";
	operationValue?: number;
	message: string;
	rootId?: string;
	searchTarget?: number;
}

export function createBinaryTreeNode(value: number, state: BinaryTreeState = "default"): BinaryTreeNode {
	return {
		value,
		state,
		id: `binarytree-node-${value}-${Date.now()}-${Math.random()}`,
	};
}

export function createInitialBinaryTree(): BinaryTreeStep {
	return {
		nodes: [],
		operation: "initial",
		message: "Binary Tree is initially empty. Each node can have at most two children (left and right).",
	};
}

export function insertNode(currentNodes: BinaryTreeNode[], value: number): BinaryTreeStep {
	const newNodes = [...currentNodes];
	const newNode = createBinaryTreeNode(value, "inserting");

	if (newNodes.length === 0) {
		// First node becomes root
		newNode.state = "root";
		newNode.level = 0;
		newNodes.push(newNode);
		return {
			nodes: calculateNodePositions(newNodes),
			operation: "insert",
			operationValue: value,
			message: `Inserted ${value} as the root node.`,
			rootId: newNode.id,
		};
	}

	// Find position to insert using BST logic (but allowing duplicates)
	let current = newNodes.find((node) => node.state === "root" || (!node.parent && newNodes[0]));
	if (!current) current = newNodes[0];

	let parent: BinaryTreeNode | undefined;
	let isLeftChild = false;

	// Traverse to find insertion point
	while (current) {
		parent = current;
		if (value <= current.value) {
			// Go left
			const leftChild = newNodes.find((node) => node.id === current!.left);
			if (!leftChild) {
				isLeftChild = true;
				break;
			}
			current = leftChild;
		} else {
			// Go right
			const rightChild = newNodes.find((node) => node.id === current!.right);
			if (!rightChild) {
				isLeftChild = false;
				break;
			}
			current = rightChild;
		}
	}

	if (parent) {
		newNode.parent = parent.id;
		newNode.level = (parent.level || 0) + 1;
		
		if (isLeftChild) {
			parent.left = newNode.id;
		} else {
			parent.right = newNode.id;
		}
	}

	// Reset states
	newNodes.forEach((node) => {
		if (node.state === "inserting") node.state = "default";
	});
	newNodes[0].state = "root"; // Ensure root stays highlighted

	newNodes.push(newNode);

	return {
		nodes: calculateNodePositions(newNodes),
		operation: "insert",
		operationValue: value,
		message: `Inserted ${value} into the binary tree. Tree size: ${newNodes.length}`,
		rootId: newNodes[0].id,
	};
}

export function searchNode(currentNodes: BinaryTreeNode[], value: number): BinaryTreeStep {
	const newNodes = currentNodes.map((node) => ({ ...node }));
	
	// Reset all search states
	newNodes.forEach((node) => {
		if (node.state === "searching" || node.state === "found" || node.state === "not-found") {
			node.state = "default";
		}
	});

	// Ensure root is highlighted
	if (newNodes.length > 0) {
		newNodes[0].state = "root";
	}

	// Find the node
	const foundNode = newNodes.find((node) => node.value === value);
	
	if (foundNode) {
		foundNode.state = "found";
		return {
			nodes: calculateNodePositions(newNodes),
			operation: "search",
			operationValue: value,
			message: `Found ${value} in the binary tree!`,
			rootId: newNodes[0]?.id,
			searchTarget: value,
		};
	} else {
		// Mark all nodes as not found for visual feedback
		newNodes.forEach((node) => {
			if (node.state !== "root") {
				node.state = "not-found";
			}
		});
		
		return {
			nodes: calculateNodePositions(newNodes),
			operation: "search",
			operationValue: value,
			message: `Value ${value} not found in the binary tree.`,
			rootId: newNodes[0]?.id,
			searchTarget: value,
		};
	}
}

export function deleteNode(currentNodes: BinaryTreeNode[], value: number): BinaryTreeStep {
	const newNodes = [...currentNodes];
	const nodeToDelete = newNodes.find((node) => node.value === value);

	if (!nodeToDelete) {
		return {
			nodes: calculateNodePositions(newNodes),
			operation: "delete",
			operationValue: value,
			message: `Value ${value} not found in the tree.`,
			rootId: newNodes[0]?.id,
		};
	}

	// Find children
	const leftChild = newNodes.find((node) => node.id === nodeToDelete.left);
	const rightChild = newNodes.find((node) => node.id === nodeToDelete.right);
	const parent = newNodes.find((node) => node.id === nodeToDelete.parent);

	// Case 1: Node has no children (leaf node)
	if (!leftChild && !rightChild) {
		if (parent) {
			if (parent.left === nodeToDelete.id) {
				parent.left = undefined;
			} else {
				parent.right = undefined;
			}
		}
		
		const index = newNodes.findIndex((node) => node.id === nodeToDelete.id);
		newNodes.splice(index, 1);
	}
	// Case 2: Node has one child
	else if (!leftChild || !rightChild) {
		const child = leftChild || rightChild;
		if (child) {
			child.parent = nodeToDelete.parent;
			if (parent) {
				if (parent.left === nodeToDelete.id) {
					parent.left = child.id;
				} else {
					parent.right = child.id;
				}
			}
		}
		
		const index = newNodes.findIndex((node) => node.id === nodeToDelete.id);
		newNodes.splice(index, 1);
	}
	// Case 3: Node has two children
	else {
		// Find inorder successor (smallest node in right subtree)
		let successor = rightChild;
		while (successor) {
			const leftChild = newNodes.find((node) => node.id === successor!.left);
			if (!leftChild) break;
			successor = leftChild;
		}
		
		if (successor) {
			// Replace node's value with successor's value
			nodeToDelete.value = successor.value;
			
			// Delete the successor (which will have at most one child)
			return deleteNode(newNodes, successor.value);
		}
	}

	// Update root if necessary
	if (newNodes.length > 0) {
		const root = newNodes.find((node) => !node.parent);
		if (root) {
			root.state = "root";
		}
	}

	return {
		nodes: calculateNodePositions(newNodes),
		operation: "delete",
		operationValue: value,
		message: newNodes.length > 0 
			? `Deleted ${value} from the tree. Tree size: ${newNodes.length}`
			: `Deleted ${value} from the tree. Tree is now empty.`,
		rootId: newNodes.find((node) => !node.parent)?.id,
	};
}

function calculateNodePositions(nodes: BinaryTreeNode[]): BinaryTreeNode[] {
	if (nodes.length === 0) return nodes;

	// Find root
	const root = nodes.find((node) => !node.parent);
	if (!root) return nodes;

	// Calculate levels first
	const calculateLevels = (nodeId: string, level: number) => {
		const node = nodes.find((n) => n.id === nodeId);
		if (!node) return;
		
		node.level = level;
		
		if (node.left) calculateLevels(node.left, level + 1);
		if (node.right) calculateLevels(node.right, level + 1);
	};

	calculateLevels(root.id, 0);

	// Calculate positions based on in-order traversal
	let position = 0;
	const setPositions = (nodeId: string | undefined): number => {
		if (!nodeId) return position;
		
		const node = nodes.find((n) => n.id === nodeId);
		if (!node) return position;

		// Traverse left subtree
		position = setPositions(node.left);
		
		// Set current node position
		node.x = position * 80; // Horizontal spacing
		node.y = (node.level || 0) * 80; // Vertical spacing
		position++;
		
		// Traverse right subtree
		position = setPositions(node.right);
		
		return position;
	};

	setPositions(root.id);

	return nodes;
}