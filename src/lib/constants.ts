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
				url: "#",
			},
		],
	},
	{
		title: "Data Structures",
		url: "structures",
	},
] as NavItem[];

interface NavItem {
	title: string;
	url: string;
	items?: NavItem[];
	isActive?: boolean;
}
