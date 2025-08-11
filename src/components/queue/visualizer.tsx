"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
	QueueItem,
	QueueStep,
	createInitialQueue,
	enqueueToQueue,
	dequeueFromQueue,
	peekAtQueue,
	stateStyles,
} from "./queueOperations";
import InfoBox from "./infoBox";
import Legend from "./legend";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusIcon, MinusIcon, EyeIcon, RotateCcwIcon } from "lucide-react";

export default function Visualizer() {
	const [currentStep, setCurrentStep] = useState<QueueStep>(createInitialQueue());
	const [operations, setOperations] = useState({ enqueues: 0, dequeues: 0, peeks: 0 });
	const [inputValue, setInputValue] = useState<string>("42");

	const resetQueue = () => {
		setCurrentStep(createInitialQueue());
		setOperations({ enqueues: 0, dequeues: 0, peeks: 0 });
	};

	const handleEnqueue = () => {
		const value = parseInt(inputValue);
		if (isNaN(value) || value < 1 || value > 99) {
			alert("Please enter a valid number between 1 and 99");
			return;
		}

		const newStep = enqueueToQueue(currentStep.queue, value);
		setCurrentStep(newStep);
		setOperations((prev) => ({ ...prev, enqueues: prev.enqueues + 1 }));

		setInputValue(String(Math.floor(Math.random() * 94) + 5));
	};

	const handleDequeue = () => {
		if (currentStep.queue.length === 0) {
			alert("Cannot dequeue from empty queue!");
			return;
		}

		const newStep = dequeueFromQueue(currentStep.queue);
		setCurrentStep(newStep);
		setOperations((prev) => ({ ...prev, dequeues: prev.dequeues + 1 }));
	};

	const handlePeek = () => {
		if (currentStep.queue.length === 0) {
			alert("Cannot peek at empty queue!");
			return;
		}

		const newStep = peekAtQueue(currentStep.queue);
		setCurrentStep(newStep);
		setOperations((prev) => ({ ...prev, peeks: prev.peeks + 1 }));
	};

	return (
		<div className="flex w-full flex-col gap-4">
			<h2 className="text-2xl font-bold">Queue Visualizer</h2>

			<Legend />

			<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
				<div className="md:col-span-2">
					<div className="bg-card flex flex-col overflow-hidden rounded-lg border p-6">
						<div className="mb-4 text-center">
							<h3 className="mb-2 text-lg font-semibold">Queue (FIFO - First In, First Out)</h3>
							<p className="text-muted-foreground text-sm">{currentStep.message}</p>
						</div>

						<div className="relative flex min-h-[200px] flex-col items-center justify-center">
							<div className="absolute top-0 left-0 z-10 flex h-full w-full select-none md:hidden">
								<div
									className="flex flex-1 -translate-x-20 -rotate-90 items-center justify-center opacity-40"
									onClick={handleDequeue}
								>
									DEQUEUE
								</div>
								<div
									className="flex flex-1 translate-x-20 rotate-90 items-center justify-center opacity-40"
									onClick={handleEnqueue}
								>
									ENQUEUE
								</div>
							</div>

							{/* Front and Rear indicators */}
							{currentStep.queue.length > 0 && (
								<div className="mb-4 flex w-full justify-between px-4">
									<div className="flex flex-col items-center">
										<span className="text-muted-foreground text-xs font-medium">FRONT</span>
										<motion.div
											className="h-3 w-3 rounded-full bg-yellow-500"
											animate={{ scale: [1, 1.1, 1] }}
											transition={{ duration: 1, repeat: Infinity }}
										/>
									</div>
									<div className="flex flex-col items-center">
										<span className="text-muted-foreground text-xs font-medium">REAR</span>
										<motion.div
											className="h-3 w-3 rounded-full bg-purple-500"
											animate={{ scale: [1, 1.1, 1] }}
											transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
										/>
									</div>
								</div>
							)}

							<div className="z-10 w-full max-w-full overflow-x-auto">
								<motion.div layout className="flex min-w-max items-center gap-4 px-4">
									<AnimatePresence mode="popLayout">
										{currentStep.queue.map((item, index) => (
											<QueueItemComponent key={item.id} item={item} index={index} />
										))}
										{currentStep.queue.length === 0 && (
											<motion.div
												key="queue-empty"
												className="bg-muted flex h-16 w-32 items-center justify-center rounded-lg border-2 border-dashed"
												initial={{ opacity: 0, scale: 0.8 }}
												animate={{ opacity: 1, scale: 1 }}
												exit={{ opacity: 0, scale: 0.8 }}
												transition={{ duration: 0.3 }}
											>
												<span className="text-muted-foreground text-sm font-medium">Empty Queue</span>
											</motion.div>
										)}
									</AnimatePresence>
								</motion.div>
							</div>

							{/* Direction arrow */}
							{currentStep.queue.length > 1 && (
								<div className="mt-4 flex items-center gap-2">
									<span className="text-muted-foreground text-xs">Front</span>
									<motion.div
										className="flex items-center"
										animate={{ x: [0, 5, 0] }}
										transition={{ duration: 2, repeat: Infinity }}
									>
										<div className="h-px w-8 bg-gray-400" />
										<div className="h-0 w-0 border-t-2 border-b-2 border-l-4 border-t-transparent border-b-transparent border-l-gray-400" />
									</motion.div>
									<span className="text-muted-foreground text-xs">Rear</span>
								</div>
							)}
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
					<h3 className="text-lg font-semibold">Queue Operations</h3>

					<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
						<div className="flex flex-col gap-2">
							<Label htmlFor="enqueue-value">Value to Enqueue:</Label>
							<div className="flex gap-2">
								<Input
									id="enqueue-value"
									type="number"
									min="1"
									max="99"
									value={inputValue}
									onChange={(e) => setInputValue(e.target.value)}
									className="flex-1"
									placeholder="Enter value"
								/>
								<Button onClick={handleEnqueue} className="flex items-center gap-2">
									<PlusIcon className="h-4 w-4" />
									Enqueue
								</Button>
							</div>
						</div>

						<div className="flex flex-col gap-2">
							<Label>Queue Operations:</Label>
							<div className="flex gap-2">
								<Button
									onClick={handleDequeue}
									disabled={currentStep.queue.length === 0}
									variant="outline"
									className="flex items-center gap-2"
								>
									<MinusIcon className="h-4 w-4" />
									Dequeue
								</Button>
								<Button
									onClick={handlePeek}
									disabled={currentStep.queue.length === 0}
									variant="outline"
									className="flex items-center gap-2"
								>
									<EyeIcon className="h-4 w-4" />
									Peek
								</Button>
								<Button onClick={resetQueue} variant="outline" className="flex items-center gap-2">
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
					queueSize={currentStep.queue.length}
					operations={operations}
					isEmpty={currentStep.queue.length === 0}
				/>
			</div>

			<div className="bg-background flex flex-col gap-4 rounded-lg border p-4 max-md:hidden">
				<h3 className="text-lg font-semibold">Queue Operations</h3>

				<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
					<div className="flex flex-col gap-2">
						<Label htmlFor="enqueue-value">Value to Enqueue:</Label>
						<div className="flex gap-2">
							<Input
								id="enqueue-value"
								type="number"
								min="1"
								max="99"
								value={inputValue}
								onChange={(e) => setInputValue(e.target.value)}
								className="flex-1"
								placeholder="Enter value"
							/>
							<Button onClick={handleEnqueue} className="flex items-center gap-2">
								<PlusIcon className="h-4 w-4" />
								Enqueue
							</Button>
						</div>
					</div>

					<div className="flex flex-col gap-2">
						<Label>Queue Operations:</Label>
						<div className="flex gap-2">
							<Button
								onClick={handleDequeue}
								disabled={currentStep.queue.length === 0}
								variant="outline"
								className="flex items-center gap-2"
							>
								<MinusIcon className="h-4 w-4" />
								Dequeue
							</Button>
							<Button
								onClick={handlePeek}
								disabled={currentStep.queue.length === 0}
								variant="outline"
								className="flex items-center gap-2"
							>
								<EyeIcon className="h-4 w-4" />
								Peek
							</Button>
							<Button onClick={resetQueue} variant="outline" className="flex items-center gap-2">
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

function QueueItemComponent({ item, index }: { item: QueueItem; index: number }) {
	return (
		<motion.div
			layout
			className="flex flex-col items-center justify-center"
			initial={{ opacity: 0, x: 20, scale: 0.8 }}
			animate={{
				opacity: 1,
				x: 0,
				scale: item.state === "enqueuing" ? [0.8, 1.1, 1] : 1,
			}}
			exit={{
				opacity: 0,
				x: item.state === "dequeuing" ? -30 : 20,
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
				className={`flex h-12 w-12 items-center justify-center rounded-lg text-sm font-bold text-white transition-colors duration-300 md:h-16 md:w-16 ${stateStyles[item.state]} `}
				animate={{
					borderColor: item.state === "front" ? "#fbbf24" : item.state === "rear" ? "#a855f7" : "#4b5563",
					boxShadow:
						item.state === "front"
							? "0 0 10px rgba(251, 191, 36, 0.5)"
							: item.state === "rear"
								? "0 0 10px rgba(168, 85, 247, 0.5)"
								: "none",
				}}
			>
				{item.value}
			</motion.div>
			<span className="text-muted-foreground mt-1 text-xs">
				{item.state === "front" ? "F" : item.state === "rear" ? "R" : ""}
			</span>
		</motion.div>
	);
}
