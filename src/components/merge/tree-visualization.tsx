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

export default function TreeVisualization({ data, title, subtitle }: TreeVisualizationProps) {
	const nodes = generateTreeNodes(data);
	const maxLevel = Math.max(...nodes.map((n) => n.level)); // Calculate positioning with better spacing
	const levelWidth = Math.pow(2, maxLevel);
	const svgHeight = Math.max(200, (maxLevel + 1) * 100 + 80);

	const getNodeX = (node: TreeNode) => {
		const levelNodes = Math.pow(2, node.level);
		const spacing = 90 / levelNodes; // Use 90% of width for better margins
		const offset = 5 + spacing / 2; // 5% margin on each side
		return offset + (node.position % levelNodes) * spacing;
	};

	const getNodeY = (level: number) => {
		return 40 + level * 80; // More vertical spacing
	};

	// Calculate node width based on content
	const getNodeWidth = (node: TreeNode) => {
		const content = node.value.length === 1 ? node.value[0].toString() : `[${node.value.join(", ")}]`;
		const baseWidth = Math.max(60, content.length * 8);
		return Math.min(baseWidth, 120); // Cap maximum width
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
			</div>{" "}
			<div className="relative overflow-x-auto overflow-y-hidden">
				<svg
					width="100%"
					height={svgHeight}
					viewBox={`0 0 100 ${svgHeight}`}
					className="w-full min-w-[600px]"
					preserveAspectRatio="xMidYMin meet"
				>
					{/* Draw connections between nodes */}
					{Object.entries(nodesByLevel).map(([level, levelNodes]) => {
						if (parseInt(level) === maxLevel) return null;
						return levelNodes.map((node, nodeIndex) => {
							const childLevel = parseInt(level) + 1;
							const childNodes = nodesByLevel[childLevel]?.filter(
								(child) => Math.floor(child.position / 2) === node.position,
							);
							return childNodes?.map((child, childIndex) => {
								const x1 = getNodeX(node);
								const y1 = getNodeY(parseInt(level)) + 20;
								const x2 = getNodeX(child);
								const y2 = getNodeY(childLevel) - 20;

								return (
									<line
										key={`${level}-${nodeIndex}-${childIndex}`}
										x1={`${x1}%`}
										y1={y1}
										x2={`${x2}%`}
										y2={y2}
										stroke="#9ca3af"
										strokeWidth="2"
										className="transition-colors dark:stroke-gray-500"
									/>
								);
							});
						});
					})}
					{/* Draw nodes */}{" "}
					{nodes.map((node, index) => {
						const x = getNodeX(node);
						const y = getNodeY(node.level);
						const nodeWidth = getNodeWidth(node);
						const displayValue = node.value.length === 1 ? node.value[0].toString() : `[${node.value.join(", ")}]`;
						const isLongValue = displayValue.length > 15;
						const finalDisplay = isLongValue && node.value.length > 6 ? `[${node.value.length} items]` : displayValue;

						return (
							<g key={index}>
								{/* Node shadow for depth */}
								<rect
									x={`${x - nodeWidth / 200 + 0.2}%`}
									y={y - 12 + 2}
									width={`${nodeWidth / 100}%`}
									height="24"
									rx="12"
									fill="rgba(0,0,0,0.1)"
								/>
								{/* Node background */}
								<rect
									x={`${x - nodeWidth / 200}%`}
									y={y - 12}
									width={`${nodeWidth / 100}%`}
									height="24"
									rx="12"
									fill={node.isSorted ? "#059669" : "#2563eb"}
									stroke="white"
									strokeWidth="2"
									className="transition-all duration-300 hover:brightness-110"
								/>
								{/* Node text */}
								<text
									x={`${x}%`}
									y={y + 4}
									textAnchor="middle"
									className="pointer-events-none fill-white text-xs font-semibold"
									style={{ fontSize: isLongValue ? "9px" : "11px" }}
								>
									{finalDisplay}
								</text>
							</g>
						);
					})}
				</svg>
			</div>
			<div className="mt-4 flex justify-center gap-4 text-xs">
				<div className="flex items-center gap-2">
					<div className="h-3 w-3 rounded bg-blue-500"></div>
					<span className="text-gray-600 dark:text-gray-400">Unsorted</span>
				</div>
				<div className="flex items-center gap-2">
					<div className="h-3 w-3 rounded bg-green-500"></div>
					<span className="text-gray-600 dark:text-gray-400">Sorted</span>
				</div>
			</div>
		</div>
	);
}
