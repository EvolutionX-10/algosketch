import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon, BarChart3Icon, ClockIcon, ZapIcon } from "lucide-react";

const sortingAlgorithms = [
	{
		title: "Bubble Sort",
		url: "bubble",
		description:
			"A simple comparison-based algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.",
		timeComplexity: "O(n²)",
		spaceComplexity: "O(1)",
		difficulty: "Beginner",
		icon: "🫧",
		color: "from-blue-500 to-cyan-500",
		features: ["Easy to understand", "In-place sorting", "Stable algorithm"],
	},
	{
		title: "Insertion Sort",
		url: "insertion",
		description:
			"Builds the final sorted array one item at a time. It's efficient for small datasets and nearly sorted arrays.",
		timeComplexity: "O(n²)",
		spaceComplexity: "O(1)",
		difficulty: "Beginner",
		icon: "📥",
		color: "from-green-500 to-emerald-500",
		features: ["Adaptive", "Online algorithm", "Stable sorting"],
	},
	{
		title: "Selection Sort",
		url: "selection",
		description:
			"Divides the input list into sorted and unsorted regions, repeatedly selecting the smallest element from the unsorted region.",
		timeComplexity: "O(n²)",
		spaceComplexity: "O(1)",
		difficulty: "Beginner",
		icon: "🎯",
		color: "from-yellow-500 to-orange-500",
		features: ["Simple implementation", "In-place sorting", "Minimum swaps"],
	},
	{
		title: "Merge Sort",
		url: "merge",
		description:
			"A divide-and-conquer algorithm that divides the array into halves, sorts them, and then merges them back together.",
		timeComplexity: "O(n log n)",
		spaceComplexity: "O(n)",
		difficulty: "Intermediate",
		icon: "🔀",
		color: "from-purple-500 to-pink-500",
		features: ["Stable sorting", "Guaranteed performance", "Divide & conquer"],
	},
	{
		title: "Quick Sort",
		url: "quick",
		description:
			"A highly efficient divide-and-conquer algorithm that picks a pivot element and partitions the array around it.",
		timeComplexity: "O(n log n)",
		spaceComplexity: "O(log n)",
		difficulty: "Intermediate",
		icon: "⚡",
		color: "from-red-500 to-rose-500",
		features: ["Fast average case", "In-place sorting", "Cache efficient"],
	},
	{
		title: "Heap Sort",
		url: "heap",
		description:
			"Uses a binary heap data structure to sort elements. It's an in-place algorithm with guaranteed O(n log n) performance.",
		timeComplexity: "O(n log n)",
		spaceComplexity: "O(1)",
		difficulty: "Advanced",
		icon: "🏔️",
		color: "from-indigo-500 to-blue-500",
		features: ["Guaranteed performance", "In-place sorting", "Not stable"],
	},
];

export default function SortingPage() {
	return (
		<div className="container mx-auto w-4/5 px-4 py-8 select-none max-md:w-[95vw]">
			<div className="mb-12 text-center">
				<div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600">
					<BarChart3Icon className="h-8 w-8 text-white" />
				</div>
				<h1 className="mb-4 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-4xl font-bold text-transparent dark:from-white dark:to-gray-300">
					Sorting Algorithms
				</h1>
				<p className="text-muted-foreground mx-auto max-w-2xl text-lg leading-relaxed">
					Explore the fundamental sorting algorithms that form the backbone of computer science. Visualize how different
					approaches tackle the challenge of organizing data efficiently.
				</p>
			</div>
			<div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
				{sortingAlgorithms.map((algorithm) => (
					<div
						key={algorithm.url}
						className="group bg-card border-border hover:border-ring/20 relative flex h-full min-h-[520px] flex-col overflow-hidden rounded-xl border transition-all duration-300"
					>
						<div
							className={`absolute inset-0 bg-gradient-to-br ${algorithm.color} opacity-5 transition-opacity duration-300 group-hover:opacity-10`}
						/>
						<div className="relative flex flex-1 flex-col p-8">
							<div className="mb-6 flex items-start justify-between">
								<div className="flex items-start gap-4">
									<div className="text-3xl">{algorithm.icon}</div>
									<div className="space-y-2">
										<h3 className="text-foreground group-hover:text-primary text-xl font-semibold transition-colors">
											{algorithm.title}
										</h3>
										<span
											className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
												algorithm.difficulty === "Beginner"
													? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
													: algorithm.difficulty === "Intermediate"
														? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
														: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
											}`}
										>
											{algorithm.difficulty}
										</span>
									</div>
								</div>
							</div>
							<p className="text-muted-foreground mb-6 text-sm leading-relaxed">{algorithm.description}</p>
							<div className="mb-6 flex flex-wrap items-center gap-4">
								<div className="flex items-center gap-2">
									<ClockIcon className="text-muted-foreground h-4 w-4" />
									<span className="text-muted-foreground text-sm">Time:</span>
									<code className="bg-muted rounded-md px-2 py-1 font-mono text-sm font-medium">
										{algorithm.timeComplexity}
									</code>
								</div>
								<div className="flex items-center gap-2">
									<ZapIcon className="text-muted-foreground h-4 w-4" />
									<span className="text-muted-foreground text-sm">Space:</span>
									<code className="bg-muted rounded-md px-2 py-1 font-mono text-sm font-medium">
										{algorithm.spaceComplexity}
									</code>
								</div>
							</div>
							<div className="mb-8 flex-1">
								<div className="flex flex-wrap gap-2">
									{algorithm.features.map((feature, idx) => (
										<span
											key={idx}
											className="bg-muted text-muted-foreground inline-block rounded-md px-3 py-1.5 text-xs font-medium"
										>
											{feature}
										</span>
									))}
								</div>
							</div>
							<div className="mt-auto">
								<Link href={`/dashboard/algorithms/sorting/${algorithm.url}`}>
									<Button className="group/btn w-full cursor-pointer" variant="outline" size="lg">
										<span>Explore Visualization</span>
										<ArrowRightIcon className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
									</Button>
								</Link>
							</div>
						</div>
					</div>
				))}
			</div>
			<div className="bg-muted/30 rounded-xl p-10 text-center">
				<h2 className="mb-8 text-2xl font-semibold">Why Study Sorting Algorithms?</h2>
				<div className="grid grid-cols-1 gap-8 text-left md:grid-cols-3">
					<div className="space-y-4">
						<div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10">
							<BarChart3Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
						</div>
						<h3 className="text-lg font-medium">Fundamental Understanding</h3>
						<p className="text-muted-foreground leading-relaxed">
							Sorting algorithms teach core computer science concepts like time complexity, space efficiency, and
							algorithm design patterns.
						</p>
					</div>
					<div className="space-y-4">
						<div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/10">
							<ZapIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
						</div>
						<h3 className="text-lg font-medium">Performance Analysis</h3>
						<p className="text-muted-foreground leading-relaxed">
							Learn to analyze and compare different approaches, understanding trade-offs between time and space
							complexity.
						</p>
					</div>
					<div className="space-y-4">
						<div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10">
							<ClockIcon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
						</div>
						<h3 className="text-lg font-medium">Real-World Applications</h3>
						<p className="text-muted-foreground leading-relaxed">
							Sorting is everywhere: databases, search engines, data processing, and forms the foundation for many other
							algorithms.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
