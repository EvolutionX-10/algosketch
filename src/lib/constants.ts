export const baseUrl = "https://algosketch.vercel.app";

export const navData = [
	{
		title: "Algorithms",
		url: "algorithms",
		items: [
			{
				title: "Sorting Algorithms",
				url: "sorting",
				items: [
					{
						title: "Bubble Sort",
						url: "bubble",
					},
					{
						title: "Insertion Sort",
						url: "insertion",
					},
					{
						title: "Selection Sort",
						url: "selection",
					},
					{
						title: "Merge Sort",
						url: "merge",
					},
					{
						title: "Quick Sort",
						url: "quick",
					},
					{
						title: "Heap Sort",
						url: "heap",
					},
				],
			},
			{
				title: "Searching Algorithms",
				url: "searching",
				items: [
					{
						title: "Linear Search",
						url: "linear",
					},
					{
						title: "Binary Search",
						url: "binary",
					},
				],
			},
		],
	},
	{
		title: "Data Structures",
		url: "structures",
		items: [
			{
				title: "Stack",
				url: "stack",
			},
			{
				title: "Queue",
				url: "queue",
			},
		],
	},
] as NavItem[];

interface NavItem {
	title: string;
	url: string;
	items?: NavItem[];
	isActive?: boolean;
}
