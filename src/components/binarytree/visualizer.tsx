"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
	BinaryTreeNode,
	BinaryTreeStep,
	createInitialBinaryTree,
	insertNode,
	deleteNode,
	searchNode,
	stateStyles,
} from "./binaryTreeOperations";
import InfoBox from "./infoBox";
import Legend from "./legend";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusIcon, MinusIcon, SearchIcon, RotateCcwIcon } from "lucide-react";

export default function Visualizer() {
	const [currentStep, setCurrentStep] = useState<BinaryTreeStep>(createInitialBinaryTree());
	const [operations, setOperations] = useState({ insertions: 0, deletions: 0, searches: 0 });
	const [inputValue, setInputValue] = useState<string>("42");

	const resetTree = () => {
		setCurrentStep(createInitialBinaryTree());
		setOperations({ insertions: 0, deletions: 0, searches: 0 });
	};

	const handleInsert = () => {
		const value = parseInt(inputValue);
		if (isNaN(value) || value < 1 || value > 999) {
			alert("Please enter a valid number between 1 and 999");
			return;
		}

		const newStep = insertNode(currentStep.nodes, value);
		setCurrentStep(newStep);
		setOperations((prev) => ({ ...prev, insertions: prev.insertions + 1 }));

		// Generate new random value for next insertion
		setInputValue(String(Math.floor(Math.random() * 95) + 5));
	};

	const handleDelete = () => {
		const value = parseInt(inputValue);
		if (isNaN(value) || value < 1 || value > 999) {
			alert("Please enter a valid number between 1 and 999");
			return;
		}

		if (currentStep.nodes.length === 0) {
			alert("Cannot delete from empty tree!");
			return;
		}

		const newStep = deleteNode(currentStep.nodes, value);
		setCurrentStep(newStep);
		setOperations((prev) => ({ ...prev, deletions: prev.deletions + 1 }));
	};

	const handleSearch = () => {
		const value = parseInt(inputValue);
		if (isNaN(value) || value < 1 || value > 999) {
			alert("Please enter a valid number between 1 and 999");
			return;
		}

		if (currentStep.nodes.length === 0) {
			alert("Cannot search in empty tree!");
			return;
		}

		const newStep = searchNode(currentStep.nodes, value);
		setCurrentStep(newStep);
		setOperations((prev) => ({ ...prev, searches: prev.searches + 1 }));
	};

	const calculateTreeHeight = (nodes: BinaryTreeNode[]): number => {
		if (nodes.length === 0) return 0;
		
		const levels = nodes.map(node => node.level || 0);
		return Math.max(...levels) + 1;
	};

	return (
		<div className="flex w-full flex-col gap-4">
			<h2 className="text-2xl font-bold">Binary Tree Visualizer</h2>

			<Legend />

			<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
				<div className="md:col-span-2">
					<div className="bg-card flex flex-col overflow-hidden rounded-lg border p-6">
						<div className="mb-4 text-center">
							<h3 className="mb-2 text-lg font-semibold">Binary Tree Structure</h3>
							<p className="text-muted-foreground text-sm">{currentStep.message}</p>
						</div>

						<div className="relative flex min-h-[400px] flex-col items-center justify-center overflow-auto">
							{currentStep.nodes.length === 0 ? (
								<motion.div
									key="tree-empty"
									className="bg-muted flex h-32 w-48 items-center justify-center rounded-lg border-2 border-dashed"
									initial={{ opacity: 0, scale: 0.8 }}
									animate={{ opacity: 1, scale: 1 }}
									transition={{ duration: 0.3 }}
								>
									<span className="text-muted-foreground text-sm font-medium">Empty Tree</span>
								</motion.div>
							) : (
								<div className="relative w-full min-w-max">
									<svg
										width="100%"
										height="400"
										viewBox="0 0 800 400"
										className="overflow-visible"
									>
										{/* Render connections first */}
										<AnimatePresence>
											{currentStep.nodes.map((node) => {
												const leftChild = currentStep.nodes.find(n => n.id === node.left);
												const rightChild = currentStep.nodes.find(n => n.id === node.right);
												
												return (
													<g key={`connections-${node.id}`}>
														{leftChild && (
															<motion.line
																x1={(node.x || 0) + 40}
																y1={(node.y || 0) + 40}
																x2={(leftChild.x || 0) + 40}
																y2={(leftChild.y || 0) + 40}
																stroke="#6b7280"
																strokeWidth="2"
																initial={{ opacity: 0 }}
																animate={{ opacity: 1 }}
																exit={{ opacity: 0 }}
															/>
														)}
														{rightChild && (
															<motion.line
																x1={(node.x || 0) + 40}
																y1={(node.y || 0) + 40}
																x2={(rightChild.x || 0) + 40}
																y2={(rightChild.y || 0) + 40}
																stroke="#6b7280"
																strokeWidth="2"
																initial={{ opacity: 0 }}
																animate={{ opacity: 1 }}
																exit={{ opacity: 0 }}
															/>
														)}
													</g>
												);
											})}
										</AnimatePresence>

										{/* Render nodes */}
										<AnimatePresence>
											{currentStep.nodes.map((node, index) => (
												<BinaryTreeNodeComponent key={node.id} node={node} />
											))}
										</AnimatePresence>
									</svg>
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

				<InfoBox
					currentStep={0}
					totalSteps={0}
					treeSize={currentStep.nodes.length}
					operations={operations}
					isEmpty={currentStep.nodes.length === 0}
					treeHeight={calculateTreeHeight(currentStep.nodes)}
				/>
			</div>

			<div className="bg-background flex flex-col gap-4 rounded-lg border p-4">
				<h3 className="text-lg font-semibold">Binary Tree Operations</h3>

				<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
					<div className="flex flex-col gap-2">
						<Label htmlFor="value-input">Value:</Label>
						<Input
							id="value-input"
							type="number"
							min="1"
							max="999"
							value={inputValue}
							onChange={(e) => setInputValue(e.target.value)}
							className="flex-1"
							placeholder="Enter value"
						/>
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
						</div>
					</div>

					<div className="flex flex-col gap-2">
						<Label>Actions:</Label>
						<div className="grid grid-cols-2 gap-2">
							<Button
								onClick={handleSearch}
								disabled={currentStep.nodes.length === 0}
								variant="outline"
								className="flex items-center gap-2"
							>
								<SearchIcon className="h-4 w-4" />
								Search
							</Button>
							<Button onClick={resetTree} variant="outline" className="flex items-center gap-2">
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

function BinaryTreeNodeComponent({ node }: { node: BinaryTreeNode }) {
	return (
		<motion.g
			initial={{ opacity: 0, scale: 0.8 }}
			animate={{ 
				opacity: 1, 
				scale: node.state === "inserting" ? [0.8, 1.1, 1] : 1 
			}}
			exit={{ 
				opacity: 0, 
				scale: 0.8,
				transition: { duration: 0.3 } 
			}}
			transition={{
				scale: { duration: 0.4 },
				opacity: { duration: 0.3 },
			}}
		>
			{/* Shadow */}
			<circle
				cx={(node.x || 0) + 43}
				cy={(node.y || 0) + 43}
				r="25"
				fill="rgba(0,0,0,0.15)"
			/>
			
			{/* Node circle */}
			<motion.circle
				cx={(node.x || 0) + 40}
				cy={(node.y || 0) + 40}
				r="25"
				className={`${stateStyles[node.state]} transition-colors duration-300`}
				animate={{
					stroke: node.state === "root" 
						? "#a855f7" 
						: node.state === "found" 
						? "#10b981" 
						: "#4b5563",
					strokeWidth: node.state === "root" || node.state === "found" ? 3 : 1,
				}}
			/>
			
			{/* Node value */}
			<text
				x={(node.x || 0) + 40}
				y={(node.y || 0) + 45}
				textAnchor="middle"
				className="fill-white text-sm font-bold"
			>
				{node.value}
			</text>
		</motion.g>
	);
}