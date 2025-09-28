import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import {
	ArrowRightIcon,
	ActivityIcon,
	DatabaseIcon,
	GraduationCapIcon,
	LayersIcon,
	PlayIcon,
	SparklesIcon,
	TrendingUpIcon,
} from "lucide-react";

export default function Structures() {
	const linearStructures = [
		{
			name: "Stack",
			description: "LIFO data structure with push, pop, and peek operations",
			difficulty: "Easy",
			timeComplexity: "O(1)",
			spaceComplexity: "O(n)",
			href: "/dashboard/structures/stack",
			color: "bg-blue-500",
			tags: ["LIFO", "Linear", "Simple"],
		},
		{
			name: "Queue",
			description: "FIFO data structure with enqueue and dequeue operations",
			difficulty: "Easy",
			timeComplexity: "O(1)",
			spaceComplexity: "O(n)",
			href: "/dashboard/structures/queue",
			color: "bg-green-500",
			tags: ["FIFO", "Linear", "Sequential"],
		},
		{
			name: "Linked List",
			description: "Dynamic data structure with nodes connected via pointers",
			difficulty: "Medium",
			timeComplexity: "O(n)",
			spaceComplexity: "O(n)",
			href: "/dashboard/structures/linkedlist",
			color: "bg-purple-500",
			tags: ["Dynamic", "Pointer-based", "Flexible"],
		},
	];

	const treeStructures = [
		{
			name: "Binary Tree",
			description: "Hierarchical structure where each node has at most two children",
			difficulty: "Medium",
			timeComplexity: "O(log n)",
			spaceComplexity: "O(n)",
			href: "/dashboard/structures/binarytree",
			color: "bg-orange-500",
			tags: ["Hierarchical", "Recursive", "Tree"],
		},
		// {
		// 	name: "Binary Search Tree",
		// 	description: "Ordered binary tree for efficient searching and sorting",
		// 	difficulty: "Medium",
		// 	timeComplexity: "O(log n)",
		// 	spaceComplexity: "O(n)",
		// 	href: "/dashboard/structures/bst",
		// 	color: "bg-red-500",
		// 	tags: ["Ordered", "Search", "Balanced"],
		// },
		// {
		// 	name: "Heap",
		// 	description: "Complete binary tree with heap property for priority operations",
		// 	difficulty: "Hard",
		// 	timeComplexity: "O(log n)",
		// 	spaceComplexity: "O(n)",
		// 	href: "/dashboard/structures/heap",
		// 	color: "bg-indigo-500",
		// 	tags: ["Priority", "Complete", "Heap Property"],
		// },
	];

	const getDifficultyColor = (difficulty: string) => {
		switch (difficulty) {
			case "Easy":
				return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
			case "Medium":
				return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
			case "Hard":
				return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
			default:
				return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
		}
	};

	const getComplexityColor = (complexity: string) => {
		if (complexity.includes("log n")) return "text-green-600 dark:text-green-400";
		if (complexity.includes("n²")) return "text-red-600 dark:text-red-400";
		if (complexity.includes("n")) return "text-blue-600 dark:text-blue-400";
		return "text-gray-600 dark:text-gray-400";
	};

	const structureStats = [
		{ label: "Total Structures", value: "3", icon: ActivityIcon },
		{ label: "Linear Structures", value: "3", icon: LayersIcon },
		{ label: "Tree Structures", value: "0", icon: DatabaseIcon },
		{ label: "Difficulty Levels", value: "2", icon: GraduationCapIcon },
	];

	return (
		<div className="w-full max-w-7xl space-y-8">
			{/* Header */}
			<div className="space-y-4">
				<div className="flex flex-col justify-between">
					<h1 className="font-heading text-4xl font-bold tracking-tight">
						Data Structure{" "}
						<span className="from-primary to-chart-1 bg-gradient-to-r bg-clip-text text-transparent">Gallery</span>
					</h1>
					<p className="font-body text-muted-foreground mt-2 text-lg">
						Explore and understand fundamental data structures through interactive visualizations
					</p>
				</div>

				{/* Quick Stats */}
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
					{structureStats.map((stat, index) => (
						<Card key={index} className="border-dashed">
							<CardContent className="flex items-center p-4">
								<div className="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-lg">
									<stat.icon className="h-5 w-5" />
								</div>
								<div className="ml-3">
									<p className="text-xl font-bold">{stat.value}</p>
									<p className="text-muted-foreground text-xs">{stat.label}</p>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			</div>

			{/* Linear Structures Section */}
			<section className="space-y-6">
				<div className="flex items-center justify-between">
					<div className="flex items-center space-x-3">
						<div className="bg-chart-1/10 text-chart-1 flex h-10 w-10 items-center justify-center rounded-lg">
							<LayersIcon className="h-5 w-5" />
						</div>
						<div>
							<h2 className="font-heading text-2xl font-semibold">Linear Data Structures</h2>
							<p className="text-muted-foreground text-sm">Sequential organization of data</p>
						</div>
					</div>
					<Badge variant="secondary" className="flex items-center gap-1">
						<SparklesIcon className="h-3 w-3" />
						{linearStructures.length} available
					</Badge>
				</div>

				<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
					{linearStructures.map((structure, index) => (
						<Card key={index} className="group transition-all hover:shadow-lg">
							<CardHeader className="pb-3">
								<div className="flex items-start justify-between">
									<div className="flex items-center space-x-3">
										<div className={`h-3 w-3 rounded-full ${structure.color}`}></div>
										<div>
											<CardTitle className="text-lg">{structure.name}</CardTitle>
											<CardDescription className="text-sm">{structure.description}</CardDescription>
										</div>
									</div>
								</div>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="flex flex-wrap gap-1">
									{structure.tags.map((tag, tagIndex) => (
										<Badge key={tagIndex} variant="outline" className="text-xs">
											{tag}
										</Badge>
									))}
								</div>

								<div className="space-y-2">
									<div className="flex items-center justify-between text-sm">
										<span className="text-muted-foreground">Time Complexity:</span>
										<span className={`font-mono font-medium ${getComplexityColor(structure.timeComplexity)}`}>
											{structure.timeComplexity}
										</span>
									</div>
									<div className="flex items-center justify-between text-sm">
										<span className="text-muted-foreground">Space Complexity:</span>
										<span className="text-muted-foreground font-mono font-medium">{structure.spaceComplexity}</span>
									</div>
									<div className="flex items-center justify-between text-sm">
										<span className="text-muted-foreground">Difficulty:</span>
										<Badge className={`text-xs ${getDifficultyColor(structure.difficulty)}`}>
											{structure.difficulty}
										</Badge>
									</div>
								</div>

								<Button asChild className="group w-full">
									<Link href={structure.href}>
										<PlayIcon className="mr-2 h-4 w-4" />
										Visualize Structure
										<ArrowRightIcon className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
									</Link>
								</Button>
							</CardContent>
						</Card>
					))}
				</div>
			</section>

			{/* Tree Structures Section */}
			<section className="space-y-6">
				<div className="flex items-center justify-between">
					<div className="flex items-center space-x-3">
						<div className="bg-chart-2/10 text-chart-2 flex h-10 w-10 items-center justify-center rounded-lg">
							<DatabaseIcon className="h-5 w-5" />
						</div>
						<div>
							<h2 className="font-heading text-2xl font-semibold">Tree Data Structures</h2>
							<p className="text-muted-foreground text-sm">Hierarchical organization of data</p>
						</div>
					</div>
					<Badge variant="secondary" className="flex items-center gap-1">
						<SparklesIcon className="h-3 w-3" />
						{treeStructures.length} available
					</Badge>
				</div>

				<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
					{treeStructures.map((structure, index) => (
						<Card key={index} className="group transition-all hover:shadow-lg">
							<CardHeader className="pb-3">
								<div className="flex items-start justify-between">
									<div className="flex items-center space-x-3">
										<div className={`h-3 w-3 rounded-full ${structure.color}`}></div>
										<div>
											<CardTitle className="text-lg">{structure.name}</CardTitle>
											<CardDescription className="text-sm">{structure.description}</CardDescription>
										</div>
									</div>
								</div>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="flex flex-wrap gap-1">
									{structure.tags.map((tag, tagIndex) => (
										<Badge key={tagIndex} variant="outline" className="text-xs">
											{tag}
										</Badge>
									))}
								</div>

								<div className="space-y-2">
									<div className="flex items-center justify-between text-sm">
										<span className="text-muted-foreground">Time Complexity:</span>
										<span className={`font-mono font-medium ${getComplexityColor(structure.timeComplexity)}`}>
											{structure.timeComplexity}
										</span>
									</div>
									<div className="flex items-center justify-between text-sm">
										<span className="text-muted-foreground">Space Complexity:</span>
										<span className="text-muted-foreground font-mono font-medium">{structure.spaceComplexity}</span>
									</div>
									<div className="flex items-center justify-between text-sm">
										<span className="text-muted-foreground">Difficulty:</span>
										<Badge className={`text-xs ${getDifficultyColor(structure.difficulty)}`}>
											{structure.difficulty}
										</Badge>
									</div>
								</div>

								<Button asChild className="group w-full">
									<Link href={structure.href}>
										<PlayIcon className="mr-2 h-4 w-4" />
										Visualize Structure
										<ArrowRightIcon className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
									</Link>
								</Button>
							</CardContent>
						</Card>
					))}
				</div>
			</section>

			{/* Learning Path */}
			<Card className="border-primary/20 from-primary/5 to-chart-1/5 bg-gradient-to-br">
				<CardHeader>
					<CardTitle className="flex items-center space-x-2">
						<TrendingUpIcon className="h-5 w-5" />
						<span>Recommended Learning Path</span>
					</CardTitle>
					<CardDescription>Master data structures step by step with our curated learning sequence</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
						{[
							{
								name: "Stack",
								step: "1",
								href: "/dashboard/structures/stack",
								color: "bg-blue-500",
							},
							{
								name: "Queue",
								step: "2",
								href: "/dashboard/structures/queue",
								color: "bg-green-500",
							},
							{
								name: "Linked List",
								step: "3",
								href: "/dashboard/structures/linkedlist",
								color: "bg-purple-500",
							},
							{
								name: "Binary Tree",
								step: "4",
								href: "/dashboard/structures/binarytree",
								color: "bg-orange-500",
							},
						].map((item, index) => (
							<Button key={index} asChild variant="outline" className="h-auto justify-start p-4">
								<Link href={item.href}>
									<div className="flex items-center space-x-3">
										<div
											className={`flex h-6 w-6 items-center justify-center rounded-full ${item.color} text-xs font-bold text-white`}
										>
											{item.step}
										</div>
										<div className="text-left">
											<p className="text-sm font-medium">{item.name}</p>
										</div>
									</div>
								</Link>
							</Button>
						))}
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
