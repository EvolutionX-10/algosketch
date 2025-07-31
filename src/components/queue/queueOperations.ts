"use client";
import { BaseBarItem } from "@/lib/types";

export type QueueState = "default" | "enqueuing" | "dequeuing" | "front" | "rear" | "empty";

export interface QueueItem extends BaseBarItem<QueueState> {}

export const stateStyles: Record<QueueState, string> = {
	default: "bg-blue-500",
	enqueuing: "bg-green-500",
	dequeuing: "bg-red-500",
	front: "bg-yellow-500",
	rear: "bg-purple-500",
	empty: "bg-gray-300",
};

export interface QueueStep {
	queue: QueueItem[];
	operation: "enqueue" | "dequeue" | "peek" | "initial";
	operationValue?: number;
	message: string;
}

export function createQueueItem(value: number, state: QueueState = "default"): QueueItem {
	return {
		value,
		state,
		id: `queue-item-${value}-${Date.now()}-${Math.random()}`,
	};
}

export function createInitialQueue(): QueueStep {
	return {
		queue: [],
		operation: "initial",
		message: "Queue is initially empty. FIFO (First In, First Out) principle applies.",
	};
}

export function enqueueToQueue(currentQueue: QueueItem[], value: number): QueueStep {
	const newQueue = [...currentQueue];

	// Reset all states to default first
	newQueue.forEach((item) => (item.state = "default"));

	// Add new item as rear
	const newItem = createQueueItem(value, "rear");
	newQueue.push(newItem);

	// Mark front element
	if (newQueue.length > 1) {
		newQueue[0].state = "front";
	} else {
		// If this is the first item, it's both front and rear, but we'll show it as front
		newQueue[0].state = "front";
	}

	return {
		queue: newQueue,
		operation: "enqueue",
		operationValue: value,
		message: `Enqueued ${value} to the queue. Queue size: ${newQueue.length}`,
	};
}

export function dequeueFromQueue(currentQueue: QueueItem[]): QueueStep {
	if (currentQueue.length === 0) {
		return {
			queue: [],
			operation: "dequeue",
			message: "Cannot dequeue from empty queue!",
		};
	}

	const newQueue = [...currentQueue];
	const dequeuedItem = newQueue.shift()!;

	// Reset all states and mark front/rear correctly
	newQueue.forEach((item) => (item.state = "default"));

	if (newQueue.length > 0) {
		newQueue[0].state = "front";
		if (newQueue.length > 1) {
			newQueue[newQueue.length - 1].state = "rear";
		}
	}

	return {
		queue: newQueue,
		operation: "dequeue",
		operationValue: dequeuedItem.value,
		message:
			newQueue.length > 0
				? `Dequeued ${dequeuedItem.value} from the queue. Queue size: ${newQueue.length}`
				: `Dequeued ${dequeuedItem.value} from the queue. Queue is now empty.`,
	};
}

export function peekAtQueue(currentQueue: QueueItem[]): QueueStep {
	if (currentQueue.length === 0) {
		return {
			queue: [],
			operation: "peek",
			message: "Cannot peek at empty queue!",
		};
	}

	const peekQueue = currentQueue.map((item, index) => {
		if (index === 0) return { ...item, state: "front" as QueueState };
		if (index === currentQueue.length - 1) return { ...item, state: "rear" as QueueState };
		return { ...item };
	});

	return {
		queue: peekQueue,
		operation: "peek",
		message: `Peek: Front element is ${currentQueue[0].value}, Rear element is ${currentQueue[currentQueue.length - 1].value}`,
	};
}
