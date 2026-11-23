import { expect, test } from "bun:test";
import { pushToStack, popFromStack, peekAtStack, type StackItem } from "../../src/components/stack/stackOperations";
import {
	enqueueToQueue,
	dequeueFromQueue,
	peekAtQueue,
	type QueueItem,
} from "../../src/components/queue/queueOperations";
import {
	insertAtHead,
	insertAtTail,
	deleteByValue,
	searchInList,
	type LinkedListStep,
} from "../../src/components/linkedlist/linkedListOperations";

function frozen<T extends object>(items: T[]): T[] {
	items.forEach(Object.freeze);
	return Object.freeze(items) as T[];
}

test("stack operations preserve earlier snapshots and LIFO order", () => {
	let stack: StackItem[] = [];
	const history = [];
	for (const value of [10, 20, 30]) {
		stack = pushToStack(frozen(stack), value).stack;
		history.push({ stack, json: JSON.stringify(stack) });
	}
	expect(peekAtStack(frozen(stack)).stack.at(-1)?.value).toBe(30);
	for (const value of [30, 20, 10]) {
		const popped = popFromStack(frozen(stack));
		expect(popped.operationValue).toBe(value);
		stack = popped.stack;
	}
	expect(popFromStack(stack).stack).toEqual([]);
	expect(peekAtStack(stack).stack).toEqual([]);
	for (const entry of history) expect(JSON.stringify(entry.stack)).toBe(entry.json);
});

test("queue operations preserve earlier snapshots and FIFO order", () => {
	let queue: QueueItem[] = [];
	const history = [];
	for (const value of [10, 20, 30]) {
		queue = enqueueToQueue(frozen(queue), value).queue;
		history.push({ queue, json: JSON.stringify(queue) });
	}
	expect(peekAtQueue(frozen(queue)).queue[0].value).toBe(10);
	for (const value of [10, 20, 30]) {
		const removed = dequeueFromQueue(frozen(queue));
		expect(removed.operationValue).toBe(value);
		queue = removed.queue;
	}
	expect(dequeueFromQueue(queue).queue).toEqual([]);
	expect(peekAtQueue(queue).queue).toEqual([]);
	for (const entry of history) expect(JSON.stringify(entry.queue)).toBe(entry.json);
});

function checkLinks(step: LinkedListStep, expected: number[]) {
	expect(step.nodes.map((n) => n.value)).toEqual(expected);
	expect(step.headId).toBe(step.nodes[0]?.id);
	expect(step.tailId).toBe(step.nodes.at(-1)?.id);
	step.nodes.forEach((node, index) => expect(node.next).toBe(step.nodes[index + 1]?.id));
}

test("linked-list append connects a singleton even when search changes its highlight", () => {
	for (const firstInsert of [insertAtHead, insertAtTail]) {
		const first = firstInsert([], 10);
		const found = searchInList(frozen(first.nodes), 10);
		const second = insertAtTail(frozen(found.nodes), 20);
		checkLinks(second, [10, 20]);
		expect(second.nodes.map((n) => n.state)).toEqual(["head", "tail"]);
		checkLinks(first, [10]);
	}
});

test("linked-list edits preserve snapshots and repair head, middle, tail, and empty links", () => {
	const first = insertAtTail([], 20);
	const second = insertAtHead(frozen(first.nodes), 10);
	const third = insertAtTail(frozen(second.nodes), 30);
	const searched = searchInList(frozen(third.nodes), 30);
	const appended = insertAtTail(frozen(searched.nodes), 40);
	checkLinks(first, [20]);
	checkLinks(second, [10, 20]);
	checkLinks(third, [10, 20, 30]);
	checkLinks(appended, [10, 20, 30, 40]);
	const withoutMiddle = deleteByValue(frozen(appended.nodes), 20);
	checkLinks(withoutMiddle, [10, 30, 40]);
	const withoutHead = deleteByValue(frozen(withoutMiddle.nodes), 10);
	checkLinks(withoutHead, [30, 40]);
	const withoutTail = deleteByValue(frozen(withoutHead.nodes), 40);
	checkLinks(withoutTail, [30]);
	checkLinks(deleteByValue(frozen(withoutTail.nodes), 30), []);
	checkLinks(deleteByValue(frozen(third.nodes), 999), [10, 20, 30]);
	checkLinks(searchInList(frozen(third.nodes), 999), [10, 20, 30]);
});
