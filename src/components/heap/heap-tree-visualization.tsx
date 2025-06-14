"use client";

interface HeapNode {
	value: number;
	index: number;
	level: number;
	position: number;
	isMaxHeap?: boolean;
	isActive?: boolean;
	isRoot?: boolean;
}

interface HeapTreeVisualizationProps {
	data: number[];
	title: string;
	subtitle?: string;
	showPhase?: "building" | "extracting" | "complete";
}

function generateHeapNodes(arr: number[]): HeapNode[] {
	const nodes: HeapNode[] = [];

	for (let i = 0; i < arr.length; i++) {
		const level = Math.floor(Math.log2(i + 1));
		const position = i - (Math.pow(2, level) - 1);

		nodes.push({
			value: arr[i],
			index: i,
			level,
			position,
			isMaxHeap: isValidMaxHeap(arr, i),
			isRoot: i === 0,
		});
	}

	return nodes;
}

function isValidMaxHeap(arr: number[], index: number): boolean {
	const leftChild = 2 * index + 1;
	const rightChild = 2 * index + 2;

	// Check if current node satisfies max heap property with its children
	let isValid = true;

	if (leftChild < arr.length && arr[index] < arr[leftChild]) {
		isValid = false;
	}

	if (rightChild < arr.length && arr[index] < arr[rightChild]) {
		isValid = false;
	}

	return isValid;
}

function getNodeColor(node: HeapNode, isCompleteMaxHeap: boolean): string {
	if (node.isRoot) {
		return "#dc2626"; // Red for root
	} else if (node.isMaxHeap) {
		return "#10b981"; // Green for valid heap nodes
	} else {
		return "#f59e0b"; // Orange/yellow for invalid heap nodes
	}
}

export default function HeapTreeVisualization({
	data,
	title,
	subtitle,
	showPhase = "complete",
}: HeapTreeVisualizationProps) {
	const nodes = generateHeapNodes(data);
	const maxLevel = Math.max(...nodes.map((n) => n.level));

	// SVG dimensions - heap trees are typically more compact than merge sort trees
	const svgWidth = Math.max(500, Math.pow(2, maxLevel) * 100);
	const svgHeight = Math.max(250, (maxLevel + 1) * 80 + 100);
	const nodeRadius = 20;
	const levelSpacing = 70;

	const getNodeX = (node: HeapNode) => {
		const levelNodes = Math.pow(2, node.level);
		const totalWidth = svgWidth - 100;
		const nodeSpacing = totalWidth / Math.max(levelNodes, 1);
		const startX = 50 + nodeSpacing / 2;
		return startX + node.position * nodeSpacing;
	};

	const getNodeY = (level: number) => {
		return 60 + level * levelSpacing;
	};

	// Group nodes by level for better rendering
	const nodesByLevel = nodes.reduce(
		(acc, node) => {
			if (!acc[node.level]) acc[node.level] = [];
			acc[node.level].push(node);
			return acc;
		},
		{} as Record<number, HeapNode[]>,
	);

	// Check if the entire array forms a valid max heap
	const isCompleteMaxHeap = nodes.every((node) => node.isMaxHeap);

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
					<span>Max Heap: {isCompleteMaxHeap ? "✓" : "✗"}</span>
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
						))}{" "}
						{/* Draw connections between parent and child nodes */}
						{nodes.map((node) => {
							const leftChildIndex = 2 * node.index + 1;
							const rightChildIndex = 2 * node.index + 2;
							const connections = [];

							// Left child connection
							if (leftChildIndex < nodes.length) {
								const childNode = nodes[leftChildIndex];
								const x1 = getNodeX(node);
								const y1 = getNodeY(node.level) + nodeRadius;
								const x2 = getNodeX(childNode);
								const y2 = getNodeY(childNode.level) - nodeRadius;

								// Highlight violating connections in red
								const isViolation = data[node.index] < data[leftChildIndex];

								connections.push(
									<line
										key={`${node.index}-${leftChildIndex}`}
										x1={x1}
										y1={y1}
										x2={x2}
										y2={y2}
										stroke={isViolation ? "#dc2626" : "#9ca3af"}
										strokeWidth={isViolation ? "3" : "2"}
										className="transition-colors dark:stroke-gray-400"
										strokeDasharray={isViolation ? "5,5" : "none"}
									/>,
								);
							}

							// Right child connection
							if (rightChildIndex < nodes.length) {
								const childNode = nodes[rightChildIndex];
								const x1 = getNodeX(node);
								const y1 = getNodeY(node.level) + nodeRadius;
								const x2 = getNodeX(childNode);
								const y2 = getNodeY(childNode.level) - nodeRadius;

								// Highlight violating connections in red
								const isViolation = data[node.index] < data[rightChildIndex];

								connections.push(
									<line
										key={`${node.index}-${rightChildIndex}`}
										x1={x1}
										y1={y1}
										x2={x2}
										y2={y2}
										stroke={isViolation ? "#dc2626" : "#9ca3af"}
										strokeWidth={isViolation ? "3" : "2"}
										className="transition-colors dark:stroke-gray-400"
										strokeDasharray={isViolation ? "5,5" : "none"}
									/>,
								);
							}

							return connections;
						})}
						{/* Draw nodes */}
						{nodes.map((node) => {
							const x = getNodeX(node);
							const y = getNodeY(node.level);

							return (
								<g key={node.index}>
									{/* Node shadow for depth */}
									<circle cx={x + 2} cy={y + 2} r={nodeRadius} fill="rgba(0,0,0,0.15)" /> {/* Node background */}
									<circle
										cx={x}
										cy={y}
										r={nodeRadius}
										fill={getNodeColor(node, isCompleteMaxHeap)}
										stroke="white"
										strokeWidth="2"
										className="cursor-default transition-all duration-300 hover:brightness-110"
									/>
									{/* Node text */}
									<text
										x={x}
										y={y + 5}
										textAnchor="middle"
										className="pointer-events-none fill-white font-bold select-none"
										style={{ fontSize: "14px" }}
									>
										{node.value}
									</text>
									{/* Array index indicator */}
									<text
										x={x}
										y={y + nodeRadius + 15}
										textAnchor="middle"
										className="pointer-events-none fill-gray-500 text-xs font-medium select-none dark:fill-gray-400"
									>
										[{node.index}]
									</text>
									{/* Root indicator */}
									{node.isRoot && (
										<text
											x={x}
											y={y - nodeRadius - 8}
											textAnchor="middle"
											className="pointer-events-none fill-gray-600 text-xs font-medium select-none dark:fill-gray-400"
										>
											Root
										</text>
									)}
								</g>
							);
						})}
						{/* Array representation at the bottom */}
						<g>
							<text
								x={svgWidth / 2}
								y={svgHeight - 40}
								textAnchor="middle"
								className="fill-gray-700 text-sm font-semibold dark:fill-gray-300"
							>
								Array: [{data.join(", ")}]
							</text>
							<text
								x={svgWidth / 2}
								y={svgHeight - 20}
								textAnchor="middle"
								className="fill-gray-500 text-xs dark:fill-gray-400"
							>
								Index: {data.map((_, i) => i).join("   ")}
							</text>
						</g>
					</svg>
				</div>
			</div>
			<div className="mt-6 flex flex-wrap justify-center gap-6 text-sm">
				<div className="flex items-center gap-2">
					<div className="h-4 w-4 rounded-full bg-red-600 shadow-sm"></div>
					<span className="text-gray-700 dark:text-gray-300">Root Node</span>
				</div>
				<div className="flex items-center gap-2">
					<div className="h-4 w-4 rounded-full bg-green-500 shadow-sm"></div>
					<span className="text-gray-700 dark:text-gray-300">Valid Max Heap Node</span>
				</div>
				<div className="flex items-center gap-2">
					<div className="h-4 w-4 rounded-full bg-yellow-500 shadow-sm"></div>
					<span className="text-gray-700 dark:text-gray-300">Invalid Heap Node</span>
				</div>
				<div className="flex items-center gap-2">
					<div className="h-1 w-6 bg-red-600" style={{ borderRadius: "1px" }}></div>
					<span className="text-gray-700 dark:text-gray-300">Heap Violation</span>
				</div>
			</div>
			{/* Heap properties explanation */}
			<div className="mt-4 rounded-lg bg-gray-50 p-4 text-sm dark:bg-gray-800">
				<h4 className="mb-2 font-semibold text-gray-800 dark:text-gray-200">Heap Properties:</h4>
				<ul className="space-y-1 text-gray-600 dark:text-gray-400">
					<li>
						• <strong>Complete Binary Tree:</strong> All levels filled except possibly the last
					</li>
					<li>
						• <strong>Max Heap Property:</strong> Parent ≥ Children for every node
					</li>
					<li>
						• <strong>Array Mapping:</strong> Node at index i has children at 2i+1 and 2i+2
					</li>
					<li>
						• <strong>Height:</strong> O(log n) - enables efficient operations
					</li>
				</ul>
				{!isCompleteMaxHeap && (
					<div className="mt-3 rounded border-l-4 border-red-500 bg-red-50 p-2 dark:bg-red-900/20">
						<p className="text-xs font-medium text-red-700 dark:text-red-400">
							⚠️ This array violates the max heap property. Red dashed lines indicate parent &lt; child violations.
						</p>
					</div>
				)}
				{isCompleteMaxHeap && (
					<div className="mt-3 rounded border-l-4 border-green-500 bg-green-50 p-2 dark:bg-green-900/20">
						<p className="text-xs font-medium text-green-700 dark:text-green-400">
							✅ This array satisfies the max heap property! All parents are ≥ their children.
						</p>
					</div>
				)}
			</div>
		</div>
	);
}
