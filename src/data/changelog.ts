export interface ChangelogEntry {
	version: string;
	date: string;
	title: string;
	description?: string;
	changes: {
		type: "feature" | "improvement" | "bugfix" | "breaking" | "security";
		description: string;
		details?: string;
	}[];
}

export const changelog: ChangelogEntry[] = [
	{
		version: "1.1.0",
		date: "2025-08-11",
		title: "Data Structures Expansion",
		description: "Enhanced data structures support with queue implementation and improved visualization experience.",
		changes: [
			{
				type: "feature",
				description: "Queue Data Structure",
				details:
					"Complete queue implementation with FIFO operations (enqueue, dequeue, peek) featuring horizontal visualization layout and interactive controls.",
			},
			{
				type: "improvement",
				description: "Enhanced Data Structure Visualizations",
				details:
					"Added scrolling behavior for both queue (horizontal) and stack (vertical) visualizers to handle large datasets effectively.",
			},
			{
				type: "improvement",
				description: "Consistent Design Language",
				details:
					"Unified design patterns across all data structures with consistent operation controls, legends, and information displays.",
			},
		],
	},
	{
		version: "1.0.0",
		date: "2025-07-27",
		title: "Production Release",
		description: "First stable release with complete algorithm visualization suite and enhanced user experience.",
		changes: [
			{
				type: "feature",
				description: "Complete Algorithm Suite",
				details:
					"Full implementation of sorting (bubble, selection, insertion, merge, quick, heap) and searching (linear, binary) algorithms with interactive visualizations.",
			},
			{
				type: "feature",
				description: "Dual Visualization Modes",
				details:
					"Added both bar chart and node-based visualizations for better learning experience and visual preference options.",
			},
			{
				type: "feature",
				description: "Multi-language Code Examples",
				details:
					"Comprehensive code implementations in JavaScript, Python, C, C++, and Java with syntax highlighting and copy functionality.",
			},
			{
				type: "feature",
				description: "Progressive Web App Support",
				details:
					"Full PWA capabilities with service worker, offline support, and app manifest for mobile installation.",
			},
			{
				type: "feature",
				description: "Advanced UI Components",
				details:
					"Professional dashboard with collapsible sidebar, breadcrumb navigation, dark mode support, and responsive design.",
			},
			{
				type: "improvement",
				description: "Performance Optimizations",
				details:
					"Smooth animations using Motion library, optimized rendering, and improved user interaction responsiveness.",
			},
		],
	},
	{
		version: "0.3.0",
		date: "2025-07-20",
		title: "Enhanced Visualizations",
		description: "Major improvements to visualization system with new modes and data structure support.",
		changes: [
			{
				type: "feature",
				description: "Visualization Mode Switcher",
				details: "Added ability to switch between bar and node visualizations for all sorting algorithms.",
			},
			{
				type: "feature",
				description: "Data Structures Support",
				details: "Initial implementation of stack data structure with interactive push, pop, and peek operations.",
			},
			{
				type: "feature",
				description: "Enhanced Code Blocks",
				details: "Multi-language support with responsive design and improved syntax highlighting.",
			},
			{
				type: "improvement",
				description: "Animation System",
				details: "Refined animation timings and visual feedback for better algorithm understanding.",
			},
		],
	},
	{
		version: "0.2.0",
		date: "2025-07-15",
		title: "Core Algorithm Implementation",
		description: "Complete sorting and searching algorithm implementations with interactive features.",
		changes: [
			{
				type: "feature",
				description: "Advanced Sorting Algorithms",
				details:
					"Added merge sort, quick sort, and heap sort with detailed step-by-step visualizations and algorithm explanations.",
			},
			{
				type: "feature",
				description: "Interactive Controls",
				details: "Granular speed control, array size adjustment, and real-time algorithm state management.",
			},
			{
				type: "feature",
				description: "Analytics Integration",
				details: "Added Vercel Analytics for usage tracking and performance monitoring.",
			},
			{
				type: "improvement",
				description: "Code Highlighting",
				details: "Enhanced syntax highlighting with step-by-step code execution visualization.",
			},
		],
	},
	{
		version: "0.1.0",
		date: "2025-06-25",
		title: "Foundation Release",
		description: "Initial release with core platform architecture and basic algorithm implementations.",
		changes: [
			{
				type: "feature",
				description: "Core Platform",
				details:
					"Built Next.js-based platform with MDX support for algorithm documentation and TypeScript implementation.",
			},
			{
				type: "feature",
				description: "Basic Sorting Algorithms",
				details: "Implemented bubble sort, selection sort, and insertion sort with visual animations.",
			},
			{
				type: "feature",
				description: "Searching Algorithms",
				details: "Added linear search and binary search with interactive step-by-step execution.",
			},
			{
				type: "feature",
				description: "Dashboard Interface",
				details: "Professional dashboard with sidebar navigation, algorithm categories, and responsive design.",
			},
			{
				type: "feature",
				description: "Theme System",
				details: "Complete dark/light mode support with system preference detection.",
			},
			{
				type: "improvement",
				description: "Developer Experience",
				details: "Integrated Prettier for code formatting, shadcn/ui components, and Tailwind CSS for styling.",
			},
		],
	},
];

export const getLatestVersion = (): string => {
	return changelog[0]?.version || "1.0.0";
};

export const getChangelogByVersion = (version: string): ChangelogEntry | undefined => {
	return changelog.find((entry) => entry.version === version);
};
