import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatsGrid } from "@/components/ui/stats";
import { ArrowRightIcon, BarChart3Icon, SearchIcon, TrendingUpIcon, PlayIcon, CodeIcon } from "lucide-react";

export default function Dashboard() {
	const algorithmCategories = [
		{
			title: "Sorting Algorithms",
			description: "Learn how data gets organized",
			href: "/dashboard/algorithms/sorting",
			icon: BarChart3Icon,
			count: 6,
			algorithms: [
				{ name: "Bubble Sort", difficulty: "Easy", time: "O(n²)" },
				{ name: "Quick Sort", difficulty: "Medium", time: "O(n log n)" },
				{ name: "Merge Sort", difficulty: "Medium", time: "O(n log n)" },
				{ name: "Heap Sort", difficulty: "Hard", time: "O(n log n)" },
			],
		},
		{
			title: "Searching Algorithms",
			description: "Find elements efficiently",
			href: "/dashboard/algorithms/searching",
			icon: SearchIcon,
			count: 2,
			algorithms: [
				{ name: "Linear Search", difficulty: "Easy", time: "O(n)" },
				{ name: "Binary Search", difficulty: "Easy", time: "O(log n)" },
			],
		},
	];

	const quickStats = [
		{
			title: "Algorithms Available",
			value: "8",
			icon: "Activity",
			description: "Interactive visualizations",
		},
		{
			title: "Categories",
			value: "2",
			icon: "BookOpen",
			description: "Sorting & Searching",
		},
		{
			title: "Interactive Features",
			value: "∞",
			icon: "Star",
			description: "Unlimited possibilities",
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

	return (
		<div className="w-full max-w-7xl space-y-8">
			{/* Header */}
			<div className="space-y-2">
				<h1 className="font-heading text-4xl font-bold tracking-tight">
					Welcome to{" "}
					<span className="from-primary to-chart-1 bg-gradient-to-r bg-clip-text text-transparent">AlgoSketch</span>
				</h1>
				<p className="font-body text-muted-foreground text-lg">
					Explore interactive algorithm visualizations and learn how they work step by step.
				</p>
			</div>

			{/* Quick Stats */}
			<StatsGrid stats={quickStats} />

			{/* Algorithm Categories */}
			<div className="space-y-6">
				<div className="flex items-center justify-between">
					<h2 className="font-heading text-2xl font-semibold">Algorithm Categories</h2>
					<Button asChild variant="outline">
						<Link href="/dashboard/algorithms">
							View All
							<ArrowRightIcon className="ml-2 h-4 w-4" />
						</Link>
					</Button>
				</div>

				<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
					{algorithmCategories.map((category, index) => (
						<Card key={index} className="group transition-all hover:shadow-lg">
							<CardHeader>
								<div className="flex items-center justify-between">
									<div className="flex items-center space-x-3">
										<div className="bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground flex h-10 w-10 items-center justify-center rounded-lg transition-colors">
											<category.icon className="h-5 w-5" />
										</div>
										<div>
											<CardTitle className="text-xl">{category.title}</CardTitle>
											<CardDescription>{category.description}</CardDescription>
										</div>
									</div>
									<Badge variant="secondary">{category.count} algorithms</Badge>
								</div>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="space-y-2">
									{category.algorithms.map((algo, algoIndex) => (
										<div
											key={algoIndex}
											className="hover:bg-muted/50 flex items-center justify-between rounded-lg border p-3 transition-colors"
										>
											<div className="flex items-center space-x-3">
												<div className="bg-muted flex h-8 w-8 items-center justify-center rounded-md">
													<CodeIcon className="h-4 w-4" />
												</div>
												<span className="font-medium">{algo.name}</span>
											</div>
											<div className="flex items-center space-x-2">
												<Badge variant="outline" className="text-xs">
													{algo.time}
												</Badge>
												<Badge className={`text-xs ${getDifficultyColor(algo.difficulty)}`}>{algo.difficulty}</Badge>
											</div>
										</div>
									))}
								</div>
								<Button asChild className="group w-full">
									<Link href={category.href}>
										<PlayIcon className="mr-2 h-4 w-4" />
										Explore {category.title}
										<ArrowRightIcon className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
									</Link>
								</Button>
							</CardContent>
						</Card>
					))}
				</div>
			</div>

			{/* Getting Started */}
			<Card className="border-primary/20 from-primary/5 to-chart-1/5 bg-gradient-to-br">
				<CardHeader>
					<CardTitle className="flex items-center space-x-2">
						<TrendingUpIcon className="h-5 w-5" />
						<span>Getting Started</span>
					</CardTitle>
					<CardDescription>New to algorithm visualization? Start with these recommended algorithms.</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
						<Button asChild variant="outline" className="h-auto justify-start p-4">
							<Link href="/dashboard/algorithms/sorting/bubble">
								<div className="flex items-center space-x-3">
									<div className="flex h-8 w-8 items-center justify-center rounded-md bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400">
										<BarChart3Icon className="h-4 w-4" />
									</div>
									<div className="text-left">
										<p className="font-medium">Bubble Sort</p>
										<p className="text-muted-foreground text-sm">Perfect for beginners</p>
									</div>
								</div>
							</Link>
						</Button>
						<Button asChild variant="outline" className="h-auto justify-start p-4">
							<Link href="/dashboard/algorithms/searching/linear">
								<div className="flex items-center space-x-3">
									<div className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400">
										<SearchIcon className="h-4 w-4" />
									</div>
									<div className="text-left">
										<p className="font-medium">Linear Search</p>
										<p className="text-muted-foreground text-sm">Simple and intuitive</p>
									</div>
								</div>
							</Link>
						</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
