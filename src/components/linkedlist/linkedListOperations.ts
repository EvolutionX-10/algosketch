"use client";
import { BaseBarItem } from "@/lib/types";

export type LinkedListState =
	| "default"
	| "inserting"
	| "deleting"
	| "searching"
	| "head"
	| "tail"
	| "found"
	| "not-found";

export interface LinkedListItem extends BaseBarItem<LinkedListState> {
	next?: string; // ID of the next node
}

export const stateStyles: Record<LinkedListState, string> = {
	default: "bg-blue-500",
	inserting: "bg-green-500",
	deleting: "bg-red-500",
	searching: "bg-yellow-500",
	head: "bg-purple-500",
	tail: "bg-orange-500",
	found: "bg-emerald-500",
	"not-found": "bg-gray-500",
};

export interface LinkedListStep {
	nodes: LinkedListItem[];
	operation: "insert" | "delete" | "search" | "initial";
	operationValue?: number;
	message: string;
	headId?: string;
	tailId?: string;
	searchTarget?: number;
}

export function createLinkedListItem(value: number, state: LinkedListState = "default"): LinkedListItem {
	return {
		value,
		state,
		id: `linkedlist-item-${value}-${Date.now()}-${Math.random()}`,
	};
}

export function createInitialLinkedList(): LinkedListStep {
	return {
		nodes: [],
		operation: "initial",
		message: "Linked List is initially empty. Dynamic data structure with nodes connected via pointers.",
	};
}

export function insertAtHead(currentNodes: LinkedListItem[], value: number): LinkedListStep {
	const newNodes = [...currentNodes];
	const newNode = createLinkedListItem(value, "head");

	// Update previous head to default state
	if (newNodes.length > 0) {
		const prevHeadIndex = newNodes.findIndex((node) => node.state === "head");
		if (prevHeadIndex !== -1) {
			newNodes[prevHeadIndex].state = "default";
		}
	}

	// Connect new node to current head
	if (newNodes.length > 0) {
		newNode.next = newNodes[0].id;
	}

	newNodes.unshift(newNode);

	// Update tail if this is the first node
	let tailId = newNodes.length === 1 ? newNode.id : newNodes[newNodes.length - 1].id;
	if (newNodes.length > 1) {
		newNodes[newNodes.length - 1].state = "tail";
	}

	return {
		nodes: newNodes,
		operation: "insert",
		operationValue: value,
		message: `Inserted ${value} at the head. List size: ${newNodes.length}`,
		headId: newNode.id,
		tailId,
	};
}

export function insertAtTail(currentNodes: LinkedListItem[], value: number): LinkedListStep {
	const newNodes = [...currentNodes];
	const newNode = createLinkedListItem(value, "tail");

	if (newNodes.length === 0) {
		// First node - it's both head and tail
		newNode.state = "head";
		newNodes.push(newNode);
		return {
			nodes: newNodes,
			operation: "insert",
			operationValue: value,
			message: `Inserted ${value} as the first node (head and tail). List size: ${newNodes.length}`,
			headId: newNode.id,
			tailId: newNode.id,
		};
	}

	// Update previous tail to default state
	const prevTailIndex = newNodes.findIndex((node) => node.state === "tail");
	if (prevTailIndex !== -1) {
		newNodes[prevTailIndex].state = "default";
		newNodes[prevTailIndex].next = newNode.id;
	}

	newNodes.push(newNode);

	return {
		nodes: newNodes,
		operation: "insert",
		operationValue: value,
		message: `Inserted ${value} at the tail. List size: ${newNodes.length}`,
		headId: newNodes[0].id,
		tailId: newNode.id,
	};
}

export function deleteByValue(currentNodes: LinkedListItem[], value: number): LinkedListStep {
	const newNodes = [...currentNodes];
	const nodeIndex = newNodes.findIndex((node) => node.value === value);

	if (nodeIndex === -1) {
		return {
			nodes: newNodes,
			operation: "delete",
			operationValue: value,
			message: `Value ${value} not found in the list.`,
			headId: newNodes.length > 0 ? newNodes[0].id : undefined,
			tailId: newNodes.length > 0 ? newNodes[newNodes.length - 1].id : undefined,
		};
	}

	const nodeToDelete = newNodes[nodeIndex];

	// Handle connections
	if (nodeIndex > 0) {
		// Update previous node's next pointer
		newNodes[nodeIndex - 1].next = nodeToDelete.next;
	}

	// Remove the node
	newNodes.splice(nodeIndex, 1);

	// Update head and tail states
	if (newNodes.length > 0) {
		newNodes[0].state = "head";
		if (newNodes.length > 1) {
			newNodes[newNodes.length - 1].state = "tail";
		}
	}

	return {
		nodes: newNodes,
		operation: "delete",
		operationValue: value,
		message:
			newNodes.length > 0
				? `Deleted ${value} from the list. List size: ${newNodes.length}`
				: `Deleted ${value} from the list. List is now empty.`,
		headId: newNodes.length > 0 ? newNodes[0].id : undefined,
		tailId: newNodes.length > 0 ? newNodes[newNodes.length - 1].id : undefined,
	};
}

export function searchInList(currentNodes: LinkedListItem[], value: number): LinkedListStep {
	const newNodes = currentNodes.map((node) => ({ ...node }));
	const foundNode = newNodes.find((node) => node.value === value);

	if (foundNode) {
		// Reset all states first
		newNodes.forEach((node) => {
			if (node.state === "searching" || node.state === "found" || node.state === "not-found") {
				node.state = "default";
			}
		});

		// Mark head and tail
		if (newNodes.length > 0) {
			newNodes[0].state = "head";
			if (newNodes.length > 1) {
				newNodes[newNodes.length - 1].state = "tail";
			}
		}

		// Mark found node
		foundNode.state = "found";

		return {
			nodes: newNodes,
			operation: "search",
			operationValue: value,
			message: `Found ${value} in the list!`,
			headId: newNodes.length > 0 ? newNodes[0].id : undefined,
			tailId: newNodes.length > 0 ? newNodes[newNodes.length - 1].id : undefined,
			searchTarget: value,
		};
	} else {
		// Reset all nodes to default state first
		newNodes.forEach((node) => {
			if (node.state === "searching" || node.state === "found" || node.state === "not-found") {
				node.state = "not-found";
			}
		});

		// Mark head and tail
		if (newNodes.length > 0) {
			newNodes[0].state = "head";
			if (newNodes.length > 1) {
				newNodes[newNodes.length - 1].state = "tail";
			}
		}

		return {
			nodes: newNodes,
			operation: "search",
			operationValue: value,
			message: `Value ${value} not found in the list.`,
			headId: newNodes.length > 0 ? newNodes[0].id : undefined,
			tailId: newNodes.length > 0 ? newNodes[newNodes.length - 1].id : undefined,
			searchTarget: value,
		};
	}
}
