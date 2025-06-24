import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon, SearchIcon, ClockIcon, ZapIcon } from "lucide-react";

const searchingAlgorithms = [
	{
		title: "Linear Search",
		url: "linear",
		description:
			"A simple search algorithm that sequentially checks each element until the target is found or the list ends.",
		timeComplexity: "O(n)",
		spaceComplexity: "O(1)",
		difficulty: "Beginner",
		icon: "📍",
		color: "from-green-500 to-emerald-500",
		features: ["Simple implementation", "Works on unsorted data", "Sequential access"],
	},
	{
		title: "Binary Search",
		url: "binary",
		description:
			"An efficient search algorithm that works on sorted arrays by repeatedly dividing the search interval in half.",
		timeComplexity: "O(log n)",
		spaceComplexity: "O(1)",
		difficulty: "Intermediate",
		icon: "🎯",
		color: "from-blue-500 to-purple-600",
		features: ["Logarithmic time", "Requires sorted data", "Divide & conquer"],
	},
];

export default function SearchingPage() {
	return (
		<div className="container mx-auto w-4/5 px-4 py-8 select-none max-md:w-[95vw]">
			<div className="mb-12 text-center">
				<div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-blue-600">
					<SearchIcon className="h-8 w-8 text-white" />
				</div>
				<h1 className="mb-4 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-4xl font-bold text-transparent dark:from-white dark:to-gray-300">
					Searching Algorithms
				</h1>
				<p className="text-muted-foreground mx-auto max-w-2xl text-lg leading-relaxed">
					Master the fundamental searching algorithms that help locate specific elements in data structures. Learn how
					different approaches optimize for various scenarios and data types.
				</p>
			</div>
			<div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-2">
				{searchingAlgorithms.map((algorithm) => (
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
								<Link href={`/dashboard/algorithms/searching/${algorithm.url}`}>
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
				<h2 className="mb-8 text-2xl font-semibold">Why Study Searching Algorithms?</h2>
				<div className="grid grid-cols-1 gap-8 text-left md:grid-cols-3">
					<div className="space-y-4">
						<div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/10">
							<SearchIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
						</div>
						<h3 className="text-lg font-medium">Data Retrieval</h3>
						<p className="text-muted-foreground leading-relaxed">
							Searching is fundamental to data retrieval systems, databases, and information processing applications.
						</p>
					</div>
					<div className="space-y-4">
						<div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10">
							<ZapIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
						</div>
						<h3 className="text-lg font-medium">Efficiency Analysis</h3>
						<p className="text-muted-foreground leading-relaxed">
							Learn to analyze trade-offs between time complexity, space requirements, and data structure prerequisites.
						</p>
					</div>
					<div className="space-y-4">
						<div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10">
							<ClockIcon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
						</div>
						<h3 className="text-lg font-medium">Real-World Applications</h3>
						<p className="text-muted-foreground leading-relaxed">
							Searching algorithms power everything from web search engines to database indexes and autocomplete
							features.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
