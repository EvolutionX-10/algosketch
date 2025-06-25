import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import {
	ArrowRightIcon,
	BarChart3Icon,
	SearchIcon,
	PlayIcon,
	ActivityIcon,
	FilterIcon,
	GraduationCapIcon,
	TrendingUpIcon,
	SparklesIcon,
} from "lucide-react";

export default function Algorithms() {
	const sortingAlgorithms = [
		{
			name: "Bubble Sort",
			description: "Simple comparison-based sorting algorithm",
			difficulty: "Easy",
			timeComplexity: "O(n²)",
			spaceComplexity: "O(1)",
			stability: true,
			href: "/dashboard/algorithms/sorting/bubble",
			color: "bg-green-500",
			tags: ["Comparison", "In-place", "Stable"],
		},
		{
			name: "Selection Sort",
			description: "Finds minimum element and places it at beginning",
			difficulty: "Easy",
			timeComplexity: "O(n²)",
			spaceComplexity: "O(1)",
			stability: false,
			href: "/dashboard/algorithms/sorting/selection",
			color: "bg-blue-500",
			tags: ["Comparison", "In-place"],
		},
		{
			name: "Insertion Sort",
			description: "Builds sorted array one element at a time",
			difficulty: "Easy",
			timeComplexity: "O(n²)",
			spaceComplexity: "O(1)",
			stability: true,
			href: "/dashboard/algorithms/sorting/insertion",
			color: "bg-purple-500",
			tags: ["Comparison", "In-place", "Stable"],
		},
		{
			name: "Merge Sort",
			description: "Divide-and-conquer algorithm with guaranteed performance",
			difficulty: "Medium",
			timeComplexity: "O(n log n)",
			spaceComplexity: "O(n)",
			stability: true,
			href: "/dashboard/algorithms/sorting/merge",
			color: "bg-orange-500",
			tags: ["Divide & Conquer", "Stable"],
		},
		{
			name: "Quick Sort",
			description: "Efficient divide-and-conquer sorting algorithm",
			difficulty: "Medium",
			timeComplexity: "O(n log n)",
			spaceComplexity: "O(log n)",
			stability: false,
			href: "/dashboard/algorithms/sorting/quick",
			color: "bg-red-500",
			tags: ["Divide & Conquer", "In-place"],
		},
		{
			name: "Heap Sort",
			description: "Comparison-based sorting using binary heap data structure",
			difficulty: "Hard",
			timeComplexity: "O(n log n)",
			spaceComplexity: "O(1)",
			stability: false,
			href: "/dashboard/algorithms/sorting/heap",
			color: "bg-indigo-500",
			tags: ["Comparison", "In-place", "Heap"],
		},
	];

	const searchingAlgorithms = [
		{
			name: "Linear Search",
			description: "Sequential search through each element",
			difficulty: "Easy",
			timeComplexity: "O(n)",
			spaceComplexity: "O(1)",
			href: "/dashboard/algorithms/searching/linear",
			color: "bg-cyan-500",
			tags: ["Sequential", "Simple"],
		},
		{
			name: "Binary Search",
			description: "Efficient search in sorted arrays using divide-and-conquer",
			difficulty: "Easy",
			timeComplexity: "O(log n)",
			spaceComplexity: "O(1)",
			href: "/dashboard/algorithms/searching/binary",
			color: "bg-teal-500",
			tags: ["Divide & Conquer", "Sorted Array"],
		},
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

	const algorithmStats = [
		{ label: "Total Algorithms", value: "8", icon: ActivityIcon },
		{ label: "Sorting Algorithms", value: "6", icon: BarChart3Icon },
		{ label: "Searching Algorithms", value: "2", icon: SearchIcon },
		{ label: "Difficulty Levels", value: "3", icon: GraduationCapIcon },
	];

	return (
		<div className="w-full max-w-7xl space-y-8">
			{/* Header */}
			<div className="space-y-4">
				<div className="flex items-center justify-between">
					<div>
						<h1 className="font-heading text-4xl font-bold tracking-tight">
							Algorithm{" "}
							<span className="from-primary to-chart-1 bg-gradient-to-r bg-clip-text text-transparent">Gallery</span>
						</h1>
						<p className="font-body text-muted-foreground mt-2 text-lg">
							Discover and explore interactive algorithm visualizations
						</p>
					</div>
					<Button variant="outline" className="flex items-center gap-2">
						<FilterIcon className="h-4 w-4" />
						Filter & Sort
					</Button>
				</div>

				{/* Quick Stats */}
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
					{algorithmStats.map((stat, index) => (
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

			{/* Sorting Algorithms Section */}
			<section className="space-y-6">
				<div className="flex items-center justify-between">
					<div className="flex items-center space-x-3">
						<div className="bg-chart-1/10 text-chart-1 flex h-10 w-10 items-center justify-center rounded-lg">
							<BarChart3Icon className="h-5 w-5" />
						</div>
						<div>
							<h2 className="font-heading text-2xl font-semibold">Sorting Algorithms</h2>
							<p className="text-muted-foreground text-sm">Learn how data gets organized</p>
						</div>
					</div>
					<Badge variant="secondary" className="flex items-center gap-1">
						<SparklesIcon className="h-3 w-3" />
						{sortingAlgorithms.length} available
					</Badge>
				</div>

				<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
					{sortingAlgorithms.map((algorithm, index) => (
						<Card key={index} className="group transition-all hover:scale-[1.02] hover:shadow-lg">
							<CardHeader className="pb-3">
								<div className="flex items-start justify-between">
									<div className="flex items-center space-x-3">
										<div className={`h-3 w-3 rounded-full ${algorithm.color}`}></div>
										<div>
											<CardTitle className="text-lg">{algorithm.name}</CardTitle>
											<CardDescription className="text-sm">{algorithm.description}</CardDescription>
										</div>
									</div>
								</div>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="flex flex-wrap gap-1">
									{algorithm.tags.map((tag, tagIndex) => (
										<Badge key={tagIndex} variant="outline" className="text-xs">
											{tag}
										</Badge>
									))}
								</div>

								<div className="space-y-2">
									<div className="flex items-center justify-between text-sm">
										<span className="text-muted-foreground">Time Complexity:</span>
										<span className={`font-mono font-medium ${getComplexityColor(algorithm.timeComplexity)}`}>
											{algorithm.timeComplexity}
										</span>
									</div>
									<div className="flex items-center justify-between text-sm">
										<span className="text-muted-foreground">Space Complexity:</span>
										<span className="text-muted-foreground font-mono font-medium">{algorithm.spaceComplexity}</span>
									</div>
									<div className="flex items-center justify-between text-sm">
										<span className="text-muted-foreground">Difficulty:</span>
										<Badge className={`text-xs ${getDifficultyColor(algorithm.difficulty)}`}>
											{algorithm.difficulty}
										</Badge>
									</div>
									<div className="flex items-center justify-between text-sm">
										<span className="text-muted-foreground">Stable:</span>
										<span className={`text-xs ${algorithm.stability ? "text-green-600" : "text-red-600"}`}>
											{algorithm.stability ? "Yes" : "No"}
										</span>
									</div>
								</div>

								<Button asChild className="group w-full">
									<Link href={algorithm.href}>
										<PlayIcon className="mr-2 h-4 w-4" />
										Visualize Algorithm
										<ArrowRightIcon className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
									</Link>
								</Button>
							</CardContent>
						</Card>
					))}
				</div>
			</section>

			{/* Searching Algorithms Section */}
			<section className="space-y-6">
				<div className="flex items-center justify-between">
					<div className="flex items-center space-x-3">
						<div className="bg-chart-2/10 text-chart-2 flex h-10 w-10 items-center justify-center rounded-lg">
							<SearchIcon className="h-5 w-5" />
						</div>
						<div>
							<h2 className="font-heading text-2xl font-semibold">Searching Algorithms</h2>
							<p className="text-muted-foreground text-sm">Find elements efficiently</p>
						</div>
					</div>
					<Badge variant="secondary" className="flex items-center gap-1">
						<SparklesIcon className="h-3 w-3" />
						{searchingAlgorithms.length} available
					</Badge>
				</div>

				<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
					{searchingAlgorithms.map((algorithm, index) => (
						<Card key={index} className="group transition-all hover:scale-[1.02] hover:shadow-lg">
							<CardHeader className="pb-3">
								<div className="flex items-start justify-between">
									<div className="flex items-center space-x-3">
										<div className={`h-3 w-3 rounded-full ${algorithm.color}`}></div>
										<div>
											<CardTitle className="text-lg">{algorithm.name}</CardTitle>
											<CardDescription className="text-sm">{algorithm.description}</CardDescription>
										</div>
									</div>
								</div>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="flex flex-wrap gap-1">
									{algorithm.tags.map((tag, tagIndex) => (
										<Badge key={tagIndex} variant="outline" className="text-xs">
											{tag}
										</Badge>
									))}
								</div>

								<div className="space-y-2">
									<div className="flex items-center justify-between text-sm">
										<span className="text-muted-foreground">Time Complexity:</span>
										<span className={`font-mono font-medium ${getComplexityColor(algorithm.timeComplexity)}`}>
											{algorithm.timeComplexity}
										</span>
									</div>
									<div className="flex items-center justify-between text-sm">
										<span className="text-muted-foreground">Space Complexity:</span>
										<span className="text-muted-foreground font-mono font-medium">{algorithm.spaceComplexity}</span>
									</div>
									<div className="flex items-center justify-between text-sm">
										<span className="text-muted-foreground">Difficulty:</span>
										<Badge className={`text-xs ${getDifficultyColor(algorithm.difficulty)}`}>
											{algorithm.difficulty}
										</Badge>
									</div>
								</div>

								<Button asChild className="group w-full">
									<Link href={algorithm.href}>
										<PlayIcon className="mr-2 h-4 w-4" />
										Visualize Algorithm
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
					<CardDescription>Master algorithms step by step with our curated learning sequence</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
						{[
							{ name: "Bubble Sort", step: "1", href: "/dashboard/algorithms/sorting/bubble", color: "bg-green-500" },
							{
								name: "Linear Search",
								step: "2",
								href: "/dashboard/algorithms/searching/linear",
								color: "bg-blue-500",
							},
							{ name: "Merge Sort", step: "3", href: "/dashboard/algorithms/sorting/merge", color: "bg-purple-500" },
							{
								name: "Binary Search",
								step: "4",
								href: "/dashboard/algorithms/searching/binary",
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
