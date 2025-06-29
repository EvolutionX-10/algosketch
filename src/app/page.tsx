import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon, CodeIcon, ZapIcon, BookOpenIcon, SparklesIcon, TrendingUpIcon } from "lucide-react";
import { AnimatedStats } from "@/components/ui/animated-counter";
import { Footer } from "@/components/footer";

export default function Home() {
	const algorithmStats = [
		{
			label: "Algorithms",
			value: 8,
			suffix: "+",
			delay: 2000,
		},
		{
			label: "Possibilities",
			value: "∞",
			delay: 2200,
		},
		{
			label: "Interactive",
			value: 100,
			suffix: "%",
			delay: 2400,
		},
	];

	return (
		<div className="relative flex min-h-screen w-full flex-col">
			{/* Background pattern */}
			<div className="grid-lines absolute inset-0 opacity-30"></div>

			{/* Animated gradient overlay */}
			<div className="from-primary/5 to-accent/5 absolute inset-0 animate-pulse bg-gradient-to-br via-transparent"></div>

			{/* Floating geometric shapes */}
			<div className="bg-primary/5 animate-float absolute top-36 left-12 h-16 w-16 rounded-full"></div>
			<div className="bg-primary/5 animate-float absolute top-8 right-20 h-16 w-16 rounded-full"></div>
			<div
				className="bg-chart-1/10 absolute top-40 right-32 h-12 w-12 rotate-45 animate-pulse"
				style={{ animationDelay: "1s" }}
			></div>
			<div
				className="bg-chart-2/10 absolute bottom-32 left-1/4 h-8 w-8 animate-pulse rounded-full"
				style={{ animationDelay: "2s" }}
			></div>

			<main className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 py-8 text-center select-none">
				<div className="mb-8 flex items-center gap-3">
					<h1 className="font-heading text-5xl font-bold tracking-tight md:text-7xl lg:text-8xl">
						<span className="text-gradient-animated">Algo</span>
						<span className="text-foreground">Sketch</span>
					</h1>
				</div>

				<p
					className="font-body text-muted-foreground animate-fade-in mb-8 max-w-2xl text-base md:text-lg lg:text-xl"
					style={{ animationDelay: "0.5s" }}
				>
					Interactive algorithm visualizations that make complex concepts simple. Watch sorting and searching algorithms
					come to life with beautiful animations.
				</p>

				<div className="mb-8 flex flex-col gap-4 sm:flex-row lg:mb-12" style={{ animationDelay: "1s" }}>
					<Button asChild size="lg" className="group relative overflow-hidden">
						<Link href="/dashboard">
							<span className="relative z-10 flex items-center">
								<SparklesIcon className="mr-2 h-4 w-4" />
								Start Exploring
								<ArrowRightIcon className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
							</span>
						</Link>
					</Button>
					<Button asChild variant="outline" size="lg" className="group">
						<Link href="/dashboard/algorithms">
							<TrendingUpIcon className="mr-2 h-4 w-4" />
							View Algorithms
						</Link>
					</Button>
				</div>

				<div className="grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-3" style={{ animationDelay: "1.5s" }}>
					<div className="group card-hover bg-card/50 hover:bg-card/80 rounded-lg border p-6 backdrop-blur-sm transition-all">
						<div className="mb-2 flex items-center justify-between">
							<div className="bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground flex min-h-12 min-w-12 items-center justify-center rounded-lg transition-all duration-300">
								<ZapIcon className="h-6 w-6" />
							</div>
							<h2 className="font-heading w-full text-2xl font-semibold">Interactive</h2>
						</div>
						<p className="text-muted-foreground text-sm">
							Step through algorithms at your own pace with intuitive controls and real-time visualization.
						</p>
					</div>

					<div className="group card-hover bg-card/50 hover:bg-card/80 rounded-lg border p-6 backdrop-blur-sm transition-all">
						<div className="mb-2 flex items-center justify-between">
							<div className="bg-chart-1/10 text-chart-1 group-hover:bg-chart-1 flex min-h-12 min-w-12 items-center justify-center rounded-lg transition-all duration-300 group-hover:text-white">
								<CodeIcon className="h-6 w-6" />
							</div>
							<h2 className="font-heading w-full text-2xl font-semibold">Educational</h2>
						</div>
						<p className="text-muted-foreground text-sm">
							Learn how algorithms work with detailed explanations and code snippets alongside visualizations.
						</p>
					</div>

					<div className="group card-hover bg-card/50 hover:bg-card/80 rounded-lg border p-6 backdrop-blur-sm transition-all">
						<div className="mb-2 flex items-center justify-between">
							<div className="bg-chart-2/10 text-chart-2 group-hover:bg-chart-2 flex min-h-12 min-w-12 items-center justify-center rounded-lg transition-all duration-300 group-hover:text-white">
								<BookOpenIcon className="h-6 w-6" />
							</div>
							<h2 className="font-heading w-full text-2xl font-semibold">Comprehensive</h2>
						</div>
						<p className="text-muted-foreground text-sm">
							Explore a wide range of sorting and searching algorithms with detailed performance analysis.
						</p>
					</div>
				</div>

				<AnimatedStats stats={algorithmStats} className="mt-12 max-w-2xl" />
			</main>
			<Footer />
		</div>
	);
}
