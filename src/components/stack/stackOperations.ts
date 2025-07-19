"use client";
import { BaseBarItem } from "@/lib/types";

export type StackState = "default" | "pushing" | "popping" | "top" | "empty";

export interface StackItem extends BaseBarItem<StackState> {}

export const stateStyles: Record<StackState, string> = {
	default: "bg-blue-500",
	pushing: "bg-green-500",
	popping: "bg-red-500",
	top: "bg-yellow-500",
	empty: "bg-gray-300",
};

export interface StackStep {
	stack: StackItem[];
	operation: "push" | "pop" | "peek" | "initial";
	operationValue?: number;
	message: string;
}

export function createStackItem(value: number, state: StackState = "default"): StackItem {
	return {
		value,
		state,
		id: `stack-item-${value}-${Date.now()}-${Math.random()}`,
	};
}

export function createInitialStack(): StackStep {
	return {
		stack: [],
		operation: "initial",
		message: "Stack is initially empty. LIFO (Last In, First Out) principle applies.",
	};
}

export function pushToStack(currentStack: StackItem[], value: number): StackStep {
	const newStack = [...currentStack];

	// Mark previous top as default
	if (newStack.length > 0) {
		newStack[newStack.length - 1].state = "default";
	}

	// Add new item as top
	const newItem = createStackItem(value, "top");
	newStack.push(newItem);

	return {
		stack: newStack,
		operation: "push",
		operationValue: value,
		message: `Pushed ${value} onto the stack. Stack size: ${newStack.length}`,
	};
}

export function popFromStack(currentStack: StackItem[]): StackStep {
	if (currentStack.length === 0) {
		return {
			stack: [],
			operation: "pop",
			message: "Cannot pop from empty stack!",
		};
	}

	const newStack = [...currentStack];
	const poppedItem = newStack.pop()!;

	// Mark new top if exists
	if (newStack.length > 0) {
		newStack[newStack.length - 1].state = "top";
	}

	return {
		stack: newStack,
		operation: "pop",
		operationValue: poppedItem.value,
		message:
			newStack.length > 0
				? `Popped ${poppedItem.value} from the stack. Stack size: ${newStack.length}`
				: `Popped ${poppedItem.value} from the stack. Stack is now empty.`,
	};
}

export function peekAtStack(currentStack: StackItem[]): StackStep {
	if (currentStack.length === 0) {
		return {
			stack: [],
			operation: "peek",
			message: "Cannot peek at empty stack!",
		};
	}

	const peekStack = currentStack.map((item) => ({ ...item }));
	peekStack[peekStack.length - 1].state = "top";

	return {
		stack: peekStack,
		operation: "peek",
		message: `Peek: Top element is ${currentStack[currentStack.length - 1].value}`,
	};
}
