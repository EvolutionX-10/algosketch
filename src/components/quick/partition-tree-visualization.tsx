"use client";

interface PartitionNode {
	value: number[];
	level: number;
	position: number;
	pivot?: number;
	leftPartition?: number[];
	rightPartition?: number[];
	isLeaf?: boolean;
}

interface PartitionTreeVisualizationProps {
	data: number[];
	title: string;
	subtitle?: string;
	pivotStrategy?: "first" | "last" | "middle" | "random";
}

function generatePartitionNodes(arr: number[], level = 0, position = 0): PartitionNode[] {
	const nodes: PartitionNode[] = [];

	if (arr.length <= 1) {
		nodes.push({ value: arr, level, position, isLeaf: true });
		return nodes;
	}

	// Use last element as pivot (Lomuto partition scheme)
	const pivot = arr[arr.length - 1];
	const leftPartition = arr.slice(0, -1).filter((x) => x < pivot);
	const rightPartition = arr.slice(0, -1).filter((x) => x > pivot);
	const equalElements = arr.slice(0, -1).filter((x) => x === pivot);

	// Current node with pivot
	nodes.push({
		value: arr,
		level,
		position,
		pivot,
		leftPartition,
		rightPartition,
	});

	// Recursively partition left and right (only if they have elements)
	if (leftPartition.length > 0) {
		const leftNodes = generatePartitionNodes(leftPartition, level + 1, position * 2);
		nodes.push(...leftNodes);
	}

	if (rightPartition.length > 0) {
		const rightNodes = generatePartitionNodes(rightPartition, level + 1, position * 2 + 1);
		nodes.push(...rightNodes);
	}

	return nodes;
}

export default function PartitionTreeVisualization({
	data,
	title,
	subtitle,
	pivotStrategy = "last",
}: PartitionTreeVisualizationProps) {
	const nodes = generatePartitionNodes(data);
	const maxLevel = Math.max(...nodes.map((n) => n.level));

	// SVG dimensions
	const svgWidth = Math.max(600, Math.pow(2, maxLevel) * 140);
	const svgHeight = Math.max(300, (maxLevel + 1) * 100);
	const nodeHeight = 40;
	const levelSpacing = 90;

	const getNodeX = (node: PartitionNode) => {
		const levelNodes = Math.pow(2, node.level);
		const totalWidth = svgWidth - 100;
		const nodeSpacing = totalWidth / Math.max(levelNodes, 1);
		const startX = 50 + nodeSpacing / 2;
		return startX + (node.position % levelNodes) * nodeSpacing;
	};

	const getNodeY = (level: number) => {
		return 70 + level * levelSpacing;
	};

	const getNodeWidth = (node: PartitionNode) => {
		const content = `[${node.value.join(", ")}]`;
		const baseWidth = Math.max(100, content.length * 8 + 20);
		return Math.min(baseWidth, 200);
	};

	// Group nodes by level
	const nodesByLevel = nodes.reduce(
		(acc, node) => {
			if (!acc[node.level]) acc[node.level] = [];
			acc[node.level].push(node);
			return acc;
		},
		{} as Record<number, PartitionNode[]>,
	);

	return (
		<div className="bg-card my-6 rounded-lg border p-6">
			<div className="mb-4 text-center">
				<h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{title}</h3>
				{subtitle && <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{subtitle}</p>}
				<div className="mt-2 flex justify-center gap-4 text-xs text-gray-500 dark:text-gray-400">
					<span>Levels: {maxLevel + 1}</span>
					<span>•</span>
					<span>Partitions: {nodes.length}</span>
					<span>•</span>
					<span>Strategy: {pivotStrategy} element</span>
				</div>
			</div>

			<div className="flex justify-center overflow-x-auto pb-4">
				<div className="inline-block min-w-fit">
					<svg
						width={svgWidth}
						height={svgHeight}
						viewBox={`0 0 ${svgWidth} ${svgHeight}`}
						className="h-auto max-w-full"
						preserveAspectRatio="xMidYMin meet"
					>
						{/* Draw level indicators */}
						{Array.from({ length: maxLevel + 1 }, (_, level) => (
							<g key={`level-${level}`}>
								<text
									x={25}
									y={getNodeY(level) + 5}
									textAnchor="middle"
									className="fill-gray-500 text-xs font-medium select-none dark:fill-gray-400"
								>
									L{level}
								</text>
								<circle
									cx={25}
									cy={getNodeY(level)}
									r={10}
									fill="none"
									stroke="#e5e7eb"
									strokeWidth="1"
									className="dark:stroke-gray-600"
								/>
							</g>
						))}

						{/* Draw connections between parent and child partitions */}
						{Object.entries(nodesByLevel).map(([level, levelNodes]) => {
							const currentLevel = parseInt(level);
							if (currentLevel === maxLevel) return null;

							return levelNodes.map((node, nodeIndex) => {
								const childLevel = currentLevel + 1;
								const childNodes = nodesByLevel[childLevel]?.filter(
									(child) => Math.floor(child.position / 2) === node.position,
								);

								return childNodes?.map((child, childIndex) => {
									const x1 = getNodeX(node);
									const y1 = getNodeY(currentLevel) + nodeHeight / 2;
									const x2 = getNodeX(child);
									const y2 = getNodeY(childLevel) - nodeHeight / 2;

									// Determine if this is left or right partition
									const isLeftPartition = child.position % 2 === 0;

									return (
										<g key={`${level}-${nodeIndex}-${childIndex}`}>
											<line
												x1={x1}
												y1={y1}
												x2={x2}
												y2={y2}
												stroke={isLeftPartition ? "#3b82f6" : "#ef4444"}
												strokeWidth="2"
												className="transition-colors"
											/>
											{/* Partition label */}
											<text
												x={(x1 + x2) / 2}
												y={(y1 + y2) / 2 - 5}
												textAnchor="middle"
												className="fill-gray-800 opacity-60 text-xs dark:fill-gray-400"
											>
												{isLeftPartition ? "≤ pivot" : "> pivot"}
											</text>
										</g>
									);
								});
							});
						})}

						{/* Draw nodes */}
						{nodes.map((node, index) => {
							const x = getNodeX(node);
							const y = getNodeY(node.level);
							const nodeWidth = getNodeWidth(node);
							const displayValue = `[${node.value.join(", ")}]`;

							return (
								<g key={index}>
									{/* Node shadow */}
									<rect
										x={x - nodeWidth / 2 + 3}
										y={y - nodeHeight / 2 + 3}
										width={nodeWidth}
										height={nodeHeight}
										rx="8"
										fill="rgba(0,0,0,0.15)"
									/>
									{/* Node background */}
									<rect
										x={x - nodeWidth / 2}
										y={y - nodeHeight / 2}
										width={nodeWidth}
										height={nodeHeight}
										rx="8"
										fill={node.isLeaf ? "#10b981" : "#3b82f6"}
										stroke="white"
										strokeWidth="2"
										className="cursor-default transition-all duration-300 hover:brightness-110"
									/>
									{/* Node text */}
									<text
										x={x}
										y={y}
										textAnchor="middle"
										className="pointer-events-none fill-white font-semibold select-none"
										style={{ fontSize: "11px" }}
									>
										{displayValue}
									</text>
									{/* Pivot indicator */}
									{node.pivot !== undefined && (
										<text
											x={x}
											y={y + 15}
											textAnchor="middle"
											className="pointer-events-none fill-yellow-300 text-xs font-bold select-none"
										>
											Pivot: {node.pivot}
										</text>
									)}
									{/* Level indicator for root */}
									{node.level === 0 && (
										<text
											x={x}
											y={y - nodeHeight / 2 - 8}
											textAnchor="middle"
											className="pointer-events-none fill-gray-600 text-xs font-medium select-none dark:fill-gray-400"
										>
											Original Array
										</text>
									)}
								</g>
							);
						})}
					</svg>
				</div>
			</div>

			<div className="mt-6 flex flex-wrap justify-center gap-6 text-sm">
				<div className="flex items-center gap-2">
					<div className="h-4 w-4 rounded bg-blue-500 shadow-sm"></div>
					<span className="text-gray-700 dark:text-gray-300">Unsorted Partitions</span>
				</div>
				<div className="flex items-center gap-2">
					<div className="h-4 w-4 rounded bg-green-500 shadow-sm"></div>
					<span className="text-gray-700 dark:text-gray-300">Sorted (≤1 element)</span>
				</div>
				<div className="flex items-center gap-2">
					<div className="h-1 w-6 bg-blue-500" style={{ borderRadius: "1px" }}></div>
					<span className="text-gray-700 dark:text-gray-300">Left Partition (≤ pivot)</span>
				</div>{" "}
				<div className="flex items-center gap-2">
					<div className="h-1 w-6 bg-red-500" style={{ borderRadius: "1px" }}></div>
					<span className="text-gray-700 dark:text-gray-300">Right Partition (&gt; pivot)</span>
				</div>
			</div>

			<div className="mt-4 rounded-lg bg-gray-50 p-4 text-sm dark:bg-gray-800">
				<h4 className="mb-2 font-semibold text-gray-800 dark:text-gray-200">Quick Sort Partitioning:</h4>
				<ul className="space-y-1 text-gray-600 dark:text-gray-400">
					<li>
						• <strong>Divide:</strong> Choose a pivot and partition around it
					</li>
					<li>
						• <strong>Conquer:</strong> Recursively sort left and right partitions
					</li>
					<li>
						• <strong>Combine:</strong> No merge needed - elements are in correct relative positions
					</li>
					<li>
						• <strong>Time Complexity:</strong> O(n log n) average, O(n²) worst case
					</li>
				</ul>
			</div>
		</div>
	);
}
