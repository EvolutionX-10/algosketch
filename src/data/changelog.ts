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
		version: "0.2.0",
		date: "2025-07-27",
		title: "New Visualizers",
		description: "Added new visualizers for sorting algorithms",
		changes: [
			{
				type: "feature",
				description: "Sorting Visualizer",
				details: "Added a new node visualizer for sorting algorithms with step-by-step execution.",
			},
		],
	},
	{
		version: "0.1.0",
		date: "2025-07-15",
		title: "Alpha Release",
		description: "Initial alpha version with basic algorithms and core functionality.",
		changes: [
			{
				type: "feature",
				description: "Basic sorting algorithms",
				details: "Implemented bubble sort, selection sort, and insertion sort.",
			},
			{
				type: "feature",
				description: "Basic searching algorithms",
				details: "Implemented linear search and binary search.",
			},
			{
				type: "improvement",
				description: "UI Enhancements",
				details: "Improved the user interface for better usability and aesthetics.",
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
