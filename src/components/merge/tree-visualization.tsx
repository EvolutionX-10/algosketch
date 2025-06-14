"use client";

interface TreeNode {
	value: number[];
	level: number;
	position: number;
	isSorted?: boolean;
	isActive?: boolean;
}

interface TreeVisualizationProps {
	data: number[];
	title: string;
	subtitle?: string;
	showPhase?: "divide" | "merge" | "both";
}

function generateTreeNodes(arr: number[], level = 0, position = 0): TreeNode[] {
	const nodes: TreeNode[] = [{ value: arr, level, position, isSorted: arr.length === 1 }];

	if (arr.length <= 1) {
		return nodes;
	}

	const mid = Math.floor(arr.length / 2);
	const left = arr.slice(0, mid);
	const right = arr.slice(mid);

	// Add left subtree
	if (left.length > 0) {
		const leftNodes = generateTreeNodes(left, level + 1, position * 2);
		nodes.push(...leftNodes);
	}

	// Add right subtree
	if (right.length > 0) {
		const rightNodes = generateTreeNodes(right, level + 1, position * 2 + 1);
		nodes.push(...rightNodes);
	}

	return nodes;
}

export default function TreeVisualization({ data, title, subtitle, showPhase = "both" }: TreeVisualizationProps) {
	const nodes = generateTreeNodes(data);
	const maxLevel = Math.max(...nodes.map((n) => n.level));

	// SVG dimensions - using fixed width for better control
	const svgWidth = Math.max(600, Math.pow(2, maxLevel) * 120); // Dynamic width based on tree width
	const svgHeight = Math.max(300, (maxLevel + 1) * 100);
	const nodeHeight = 32;
	const levelSpacing = 90;

	const getNodeX = (node: TreeNode) => {
		const levelNodes = Math.pow(2, node.level);
		const totalWidth = svgWidth - 100; // Leave margins
		const nodeSpacing = totalWidth / Math.max(levelNodes, 1);
		const startX = 50 + nodeSpacing / 2; // Center the first node
		return startX + (node.position % levelNodes) * nodeSpacing;
	};

	const getNodeY = (level: number) => {
		return 70 + level * levelSpacing;
	};

	// Calculate node width based on content
	const getNodeWidth = (node: TreeNode) => {
		const content = node.value.length === 1 ? node.value[0].toString() : `[${node.value.join(", ")}]`;
		const baseWidth = Math.max(80, content.length * 8 + 20);
		return Math.min(baseWidth, 180); // Cap maximum width
	};

	// Group nodes by level for better rendering
	const nodesByLevel = nodes.reduce(
		(acc, node) => {
			if (!acc[node.level]) acc[node.level] = [];
			acc[node.level].push(node);
			return acc;
		},
		{} as Record<number, TreeNode[]>,
	);
	return (
		<div className="bg-card my-6 rounded-lg border p-6">
			<div className="mb-4 text-center">
				<h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{title}</h3>
				{subtitle && <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{subtitle}</p>}
				<div className="mt-2 flex justify-center gap-4 text-xs text-gray-500 dark:text-gray-400">
					<span>Levels: {maxLevel + 1}</span>
					<span>•</span>
					<span>Nodes: {nodes.length}</span>
					<span>•</span>
					<span>Height: O(log n)</span>
				</div>{" "}
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
									r={12}
									fill="none"
									stroke="#e5e7eb"
									strokeWidth="1"
									className="dark:stroke-gray-600"
								/>
							</g>
						))}

						{/* Draw connections between nodes */}
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

									return (
										<line
											key={`${level}-${nodeIndex}-${childIndex}`}
											x1={x1}
											y1={y1}
											x2={x2}
											y2={y2}
											stroke="#9ca3af"
											strokeWidth="2"
											className="transition-colors dark:stroke-gray-400"
										/>
									);
								});
							});
						})}
						{/* Draw nodes */}
						{nodes.map((node, index) => {
							const x = getNodeX(node);
							const y = getNodeY(node.level);
							const nodeWidth = getNodeWidth(node);
							const displayValue = node.value.length === 1 ? node.value[0].toString() : `[${node.value.join(", ")}]`;
							const isLongValue = displayValue.length > 20;
							const finalDisplay = isLongValue && node.value.length > 8 ? `[${node.value.length} items]` : displayValue;
							const isLeaf = node.value.length === 1;

							return (
								<g key={index}>
									{/* Node shadow for depth */}
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
										fill={node.isSorted ? "#10b981" : "#3b82f6"}
										stroke={isLeaf ? "#fbbf24" : "white"}
										strokeWidth={isLeaf ? "3" : "2"}
										className="cursor-default transition-all duration-300 hover:brightness-110"
									/>
									{/* Node text */}
									<text
										x={x}
										y={y + 5}
										textAnchor="middle"
										className="pointer-events-none fill-white font-semibold select-none"
										style={{ fontSize: isLongValue ? "11px" : "13px" }}
									>
										{finalDisplay}
									</text>
									{/* Level indicator for root node */}
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
			</div>{" "}
			<div className="mt-6 flex flex-wrap justify-center gap-6 text-sm">
				<div className="flex items-center gap-2">
					<div className="h-4 w-4 rounded bg-blue-500 shadow-sm"></div>
					<span className="text-gray-700 dark:text-gray-300">Unsorted Arrays</span>
				</div>
				<div className="flex items-center gap-2">
					<div className="h-4 w-4 rounded bg-green-500 shadow-sm"></div>
					<span className="text-gray-700 dark:text-gray-300">Sorted Arrays</span>
				</div>
				<div className="flex items-center gap-2">
					<div className="h-4 w-4 rounded border-2 border-yellow-400 bg-blue-500 shadow-sm"></div>
					<span className="text-gray-700 dark:text-gray-300">Single Elements</span>
				</div>
			</div>
		</div>
	);
}
