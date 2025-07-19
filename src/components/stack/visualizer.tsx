"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
	StackItem,
	StackStep,
	createInitialStack,
	pushToStack,
	popFromStack,
	peekAtStack,
	stateStyles,
} from "./stackOperations";
import InfoBox from "./infoBox";
import Legend from "./legend";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusIcon, MinusIcon, EyeIcon, RotateCcwIcon } from "lucide-react";

export default function Visualizer() {
	const [currentStep, setCurrentStep] = useState<StackStep>(createInitialStack());
	const [operations, setOperations] = useState({ pushes: 0, pops: 0, peeks: 0 });
	const [inputValue, setInputValue] = useState<string>("42");

	const resetStack = () => {
		setCurrentStep(createInitialStack());
		setOperations({ pushes: 0, pops: 0, peeks: 0 });
	};

	const handlePush = () => {
		const value = parseInt(inputValue);
		if (isNaN(value) || value < 1 || value > 99) {
			alert("Please enter a valid number between 1 and 99");
			return;
		}

		const newStep = pushToStack(currentStep.stack, value);
		setCurrentStep(newStep);
		setOperations((prev) => ({ ...prev, pushes: prev.pushes + 1 }));

		setInputValue(String(Math.floor(Math.random() * 94) + 5));
	};

	const handlePop = () => {
		if (currentStep.stack.length === 0) {
			alert("Cannot pop from empty stack!");
			return;
		}

		const newStep = popFromStack(currentStep.stack);
		setCurrentStep(newStep);
		setOperations((prev) => ({ ...prev, pops: prev.pops + 1 }));
	};

	const handlePeek = () => {
		if (currentStep.stack.length === 0) {
			alert("Cannot peek at empty stack!");
			return;
		}

		const newStep = peekAtStack(currentStep.stack);
		setCurrentStep(newStep);
		setOperations((prev) => ({ ...prev, peeks: prev.peeks + 1 }));
	};

	return (
		<div className="flex w-full flex-col gap-4">
			<h2 className="mb-2 text-2xl font-bold">Stack Visualizer</h2>

			<Legend />

			<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
				<div className="md:col-span-2">
					<div className="bg-card flex flex-col rounded-lg border p-6">
						<div className="mb-4 text-center">
							<h3 className="mb-2 text-lg font-semibold">Stack (LIFO - Last In, First Out)</h3>
							<p className="text-muted-foreground text-sm">{currentStep.message}</p>
						</div>

						<div className="relative flex min-h-[400px] flex-col items-center justify-end">
							<div
								className={`mb-1 h-4 w-40 bg-gray-400 ${currentStep.stack.length === 0 ? "rounded-b-lg" : "rounded-t-lg rounded-b-xs"}`}
							></div>

							<div className="flex flex-col-reverse items-center gap-1">
								<AnimatePresence mode="popLayout">
									{currentStep.stack.map((item, index) => (
										<StackItemComponent key={item.id} item={item} index={index} />
									))}
								</AnimatePresence>
							</div>

							{currentStep.stack.length > 0 && (
								<motion.div
									className="absolute right-0 flex items-center"
									style={{
										bottom: `${currentStep.stack.length * 45 + 20}px`,
									}}
									initial={{ opacity: 0, x: 20 }}
									animate={{ opacity: 1, x: 0 }}
									exit={{ opacity: 0, x: 20 }}
								>
									<div className="mr-2 rounded bg-yellow-500 px-2 py-1 text-sm font-bold text-black">TOP</div>
									<div className="h-0 w-0 border-t-4 border-r-8 border-b-4 border-transparent border-r-yellow-500"></div>
								</motion.div>
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

				<InfoBox
					currentStep={0}
					totalSteps={0}
					stackSize={currentStep.stack.length}
					operations={operations}
					isEmpty={currentStep.stack.length === 0}
				/>
			</div>

			<div className="bg-background flex flex-col gap-4 rounded-lg border p-4">
				<h3 className="text-lg font-semibold">Stack Operations</h3>

				<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
					<div className="flex flex-col gap-2">
						<Label htmlFor="push-value">Value to Push:</Label>
						<div className="flex gap-2">
							<Input
								id="push-value"
								type="number"
								min="1"
								max="99"
								value={inputValue}
								onChange={(e) => setInputValue(e.target.value)}
								className="flex-1"
								placeholder="Enter value"
							/>
							<Button onClick={handlePush} className="flex items-center gap-2">
								<PlusIcon className="h-4 w-4" />
								Push
							</Button>
						</div>
					</div>

					<div className="flex flex-col gap-2">
						<Label>Stack Operations:</Label>
						<div className="flex gap-2">
							<Button
								onClick={handlePop}
								disabled={currentStep.stack.length === 0}
								variant="outline"
								className="flex items-center gap-2"
							>
								<MinusIcon className="h-4 w-4" />
								Pop
							</Button>
							<Button
								onClick={handlePeek}
								disabled={currentStep.stack.length === 0}
								variant="outline"
								className="flex items-center gap-2"
							>
								<EyeIcon className="h-4 w-4" />
								Peek
							</Button>
							<Button onClick={resetStack} variant="outline" className="flex items-center gap-2">
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

function StackItemComponent({ item, index }: { item: StackItem; index: number }) {
	return (
		<motion.div
			layout
			className="flex flex-col items-center justify-center"
			initial={{ opacity: 0, y: -20, scale: 0.8 }}
			animate={{
				opacity: 1,
				y: 0,
				scale: item.state === "pushing" ? [0.8, 1.1, 1] : 1,
			}}
			exit={{
				opacity: 0,
				y: item.state === "popping" ? -30 : 20,
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
				className={`flex h-10 w-40 items-center justify-center ${item.state === "top" ? "rounded-t-sm rounded-b-lg" : "rounded-lg"} text-sm font-bold text-white transition-colors duration-300 ${stateStyles[item.state]} `}
				animate={{
					borderColor: item.state === "top" ? "#fbbf24" : "#4b5563",
					boxShadow: item.state === "top" ? "0 0 10px rgba(251, 191, 36, 0.5)" : "none",
				}}
			>
				{item.value}
			</motion.div>
			{/* <span className="text-muted-foreground mt-1 text-xs">{index}</span> */}
		</motion.div>
	);
}
