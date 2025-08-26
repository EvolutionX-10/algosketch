"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
	LinkedListItem,
	LinkedListStep,
	createInitialLinkedList,
	insertAtHead,
	insertAtTail,
	deleteByValue,
	searchInList,
	stateStyles,
} from "./linkedListOperations";
import InfoBox from "./infoBox";
import Legend from "./legend";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusIcon, MinusIcon, SearchIcon, RotateCcwIcon, ArrowRightIcon } from "lucide-react";

export default function Visualizer() {
	const [currentStep, setCurrentStep] = useState<LinkedListStep>(createInitialLinkedList());
	const [operations, setOperations] = useState({ insertions: 0, deletions: 0, searches: 0 });
	const [inputValue, setInputValue] = useState<string>("42");
	const [insertPosition, setInsertPosition] = useState<"head" | "tail">("head");

	const resetList = () => {
		setCurrentStep(createInitialLinkedList());
		setOperations({ insertions: 0, deletions: 0, searches: 0 });
	};

	const handleInsert = () => {
		const value = parseInt(inputValue);
		if (isNaN(value) || value < 1 || value > 99) {
			alert("Please enter a valid number between 1 and 99");
			return;
		}

		let newStep: LinkedListStep;
		if (insertPosition === "head") {
			newStep = insertAtHead(currentStep.nodes, value);
		} else {
			newStep = insertAtTail(currentStep.nodes, value);
		}

		setCurrentStep(newStep);
		setOperations((prev) => ({ ...prev, insertions: prev.insertions + 1 }));

		// Generate new random value for next insertion
		setInputValue(String(Math.floor(Math.random() * 94) + 5));
	};

	const handleDelete = () => {
		const value = parseInt(inputValue);
		if (isNaN(value) || value < 1 || value > 99) {
			alert("Please enter a valid number between 1 and 99");
			return;
		}

		if (currentStep.nodes.length === 0) {
			alert("Cannot delete from empty list!");
			return;
		}

		const newStep = deleteByValue(currentStep.nodes, value);
		setCurrentStep(newStep);
		setOperations((prev) => ({ ...prev, deletions: prev.deletions + 1 }));
	};

	const handleSearch = () => {
		const value = parseInt(inputValue);
		if (isNaN(value) || value < 1 || value > 99) {
			alert("Please enter a valid number between 1 and 99");
			return;
		}

		if (currentStep.nodes.length === 0) {
			alert("Cannot search in empty list!");
			return;
		}

		const newStep = searchInList(currentStep.nodes, value);
		setCurrentStep(newStep);
		setOperations((prev) => ({ ...prev, searches: prev.searches + 1 }));
	};

	return (
		<div className="flex w-full flex-col gap-4">
			<h2 className="text-2xl font-bold">Linked List Visualizer</h2>

			<Legend />

			<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
				<div className="md:col-span-2">
					<div className="bg-card flex flex-col overflow-hidden rounded-lg border p-6">
						<div className="mb-4 text-center">
							<h3 className="mb-2 text-lg font-semibold">Singly Linked List</h3>
							<p className="text-muted-foreground text-sm">{currentStep.message}</p>
						</div>

						<div className="relative flex min-h-[200px] flex-col items-center justify-center">
							{/* Head and Tail indicators */}
							{currentStep.nodes.length > 0 && (
								<div className="mb-4 flex w-full justify-between px-4">
									<div className="flex flex-col items-center">
										<span className="text-muted-foreground text-xs font-medium">HEAD</span>
										<motion.div
											className="h-3 w-3 rounded-full bg-purple-500"
											animate={{ scale: [1, 1.1, 1] }}
											transition={{ duration: 1, repeat: Infinity }}
										/>
									</div>
									{currentStep.nodes.length > 1 && (
										<div className="flex flex-col items-center">
											<span className="text-muted-foreground text-xs font-medium">TAIL</span>
											<motion.div
												className="h-3 w-3 rounded-full bg-orange-500"
												animate={{ scale: [1, 1.1, 1] }}
												transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
											/>
										</div>
									)}
								</div>
							)}

							<div className="z-10 w-full max-w-full overflow-x-auto">
								<motion.div layout className="flex min-w-max items-center gap-4 px-4">
									<AnimatePresence mode="popLayout">
										{currentStep.nodes.map((node, index) => (
											<LinkedListNodeComponent
												key={node.id}
												node={node}
												index={index}
												isLast={index === currentStep.nodes.length - 1}
											/>
										))}
										{currentStep.nodes.length === 0 && (
											<motion.div
												key="list-empty"
												className="bg-muted flex h-16 w-32 items-center justify-center rounded-lg border-2 border-dashed"
												initial={{ opacity: 0, scale: 0.8 }}
												animate={{ opacity: 1, scale: 1 }}
												exit={{ opacity: 0, scale: 0.8 }}
												transition={{ duration: 0.3 }}
											>
												<span className="text-muted-foreground text-sm font-medium">Empty List</span>
											</motion.div>
										)}
									</AnimatePresence>
								</motion.div>
							</div>
						</div>

						<div className="mt-4 text-center">
							<div className="bg-muted rounded-md px-4 py-2">
								<span className="text-sm font-medium">
									Last Operation:
									<span className="text-primary ml-2 font-bold capitalize">
										{currentStep.operation}
										{currentStep.operationValue !== undefined && ` (${currentStep.operationValue})`}
									</span>
								</span>
							</div>
						</div>
					</div>
				</div>

				<div className="bg-background flex flex-col gap-4 rounded-lg border p-4 md:hidden">
					<h3 className="text-lg font-semibold">Linked List Operations</h3>

					<div className="grid grid-cols-1 gap-4">
						<div className="flex flex-col gap-2">
							<Label htmlFor="value-input">Value:</Label>
							<Input
								id="value-input"
								type="number"
								min="1"
								max="99"
								value={inputValue}
								onChange={(e) => setInputValue(e.target.value)}
								className="flex-1"
								placeholder="Enter value"
							/>
						</div>

						<div className="flex flex-col gap-2">
							<Label>Insert Position:</Label>
							<div className="flex gap-2">
								<Button
									variant={insertPosition === "head" ? "default" : "outline"}
									onClick={() => setInsertPosition("head")}
									className="flex-1"
								>
									At Head
								</Button>
								<Button
									variant={insertPosition === "tail" ? "default" : "outline"}
									onClick={() => setInsertPosition("tail")}
									className="flex-1"
								>
									At Tail
								</Button>
							</div>
						</div>

						<div className="flex flex-col gap-2">
							<Label>Operations:</Label>
							<div className="grid grid-cols-2 gap-2">
								<Button onClick={handleInsert} className="flex items-center gap-2">
									<PlusIcon className="h-4 w-4" />
									Insert
								</Button>
								<Button
									onClick={handleDelete}
									disabled={currentStep.nodes.length === 0}
									variant="outline"
									className="flex items-center gap-2"
								>
									<MinusIcon className="h-4 w-4" />
									Delete
								</Button>
								<Button
									onClick={handleSearch}
									disabled={currentStep.nodes.length === 0}
									variant="outline"
									className="flex items-center gap-2"
								>
									<SearchIcon className="h-4 w-4" />
									Search
								</Button>
								<Button onClick={resetList} variant="outline" className="flex items-center gap-2">
									<RotateCcwIcon className="h-4 w-4" />
									Reset
								</Button>
							</div>
						</div>
					</div>
				</div>

				<InfoBox
					currentStep={0}
					totalSteps={0}
					listSize={currentStep.nodes.length}
					operations={operations}
					isEmpty={currentStep.nodes.length === 0}
				/>
			</div>

			<div className="bg-background flex flex-col gap-4 rounded-lg border p-4 max-md:hidden">
				<h3 className="text-lg font-semibold">Linked List Operations</h3>

				<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
					<div className="flex flex-col gap-2">
						<Label htmlFor="value-input-desktop">Value:</Label>
						<Input
							id="value-input-desktop"
							type="number"
							min="1"
							max="99"
							value={inputValue}
							onChange={(e) => setInputValue(e.target.value)}
							className="flex-1"
							placeholder="Enter value"
						/>
					</div>

					<div className="flex flex-col gap-2">
						<Label>Insert Position:</Label>
						<div className="flex gap-2">
							<Button
								variant={insertPosition === "head" ? "default" : "outline"}
								onClick={() => setInsertPosition("head")}
								className="flex-1"
							>
								At Head
							</Button>
							<Button
								variant={insertPosition === "tail" ? "default" : "outline"}
								onClick={() => setInsertPosition("tail")}
								className="flex-1"
							>
								At Tail
							</Button>
						</div>
					</div>

					<div className="flex flex-col gap-2">
						<Label>Operations:</Label>
						<div className="grid grid-cols-2 gap-2">
							<Button onClick={handleInsert} className="flex items-center gap-2">
								<PlusIcon className="h-4 w-4" />
								Insert
							</Button>
							<Button
								onClick={handleDelete}
								disabled={currentStep.nodes.length === 0}
								variant="outline"
								className="flex items-center gap-2"
							>
								<MinusIcon className="h-4 w-4" />
								Delete
							</Button>
							<Button
								onClick={handleSearch}
								disabled={currentStep.nodes.length === 0}
								variant="outline"
								className="flex items-center gap-2"
							>
								<SearchIcon className="h-4 w-4" />
								Search
							</Button>
							<Button onClick={resetList} variant="outline" className="flex items-center gap-2">
								<RotateCcwIcon className="h-4 w-4" />
								Reset
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

function LinkedListNodeComponent({ node, index, isLast }: { node: LinkedListItem; index: number; isLast: boolean }) {
	return (
		<div className="flex items-center gap-2">
			<motion.div
				layout
				className="flex flex-col items-center justify-center"
				initial={{ opacity: 0, x: 20, scale: 0.8 }}
				animate={{
					opacity: 1,
					x: 0,
					scale: node.state === "inserting" ? [0.8, 1.1, 1] : 1,
				}}
				exit={{
					opacity: 0,
					x: node.state === "deleting" ? -30 : 20,
					scale: 0.8,
					transition: { duration: 0.3 },
				}}
				transition={{
					layout: {
						type: "spring",
						stiffness: 300,
						damping: 25,
					},
					scale: {
						duration: 0.4,
					},
					opacity: {
						duration: 0.3,
					},
				}}
			>
				<motion.div
					className={`flex h-12 w-16 items-center justify-center rounded-lg text-sm font-bold text-white transition-colors duration-300 md:h-16 md:w-20 ${stateStyles[node.state]}`}
					animate={{
						borderColor:
							node.state === "head"
								? "#a855f7"
								: node.state === "tail"
									? "#f97316"
									: node.state === "found"
										? "#10b981"
										: "#4b5563",
						boxShadow:
							node.state === "head"
								? "0 0 10px rgba(168, 85, 247, 0.5)"
								: node.state === "tail"
									? "0 0 10px rgba(249, 115, 22, 0.5)"
									: node.state === "found"
										? "0 0 10px rgba(16, 185, 129, 0.5)"
										: "none",
					}}
				>
					{node.value}
				</motion.div>
				<span className="text-muted-foreground mt-1 text-xs">
					{node.state === "head" ? "H" : node.state === "tail" ? "T" : ""}
				</span>
			</motion.div>

			{/* Arrow to next node */}
			{!isLast && (
				<motion.div
					layout
					className="flex items-center"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
				>
					<ArrowRightIcon className="h-4 w-4 text-gray-500" />
				</motion.div>
			)}

			{/* NULL indicator for last node */}
			{isLast && (
				<motion.div
					layout
					className="flex items-center gap-2"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
				>
					<ArrowRightIcon className="h-4 w-4 text-gray-500" />
					<div className="flex h-8 w-12 items-center justify-center rounded bg-gray-200 text-xs font-bold text-gray-600">
						NULL
					</div>
				</motion.div>
			)}
		</div>
	);
}
