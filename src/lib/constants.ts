export const navData = [
	{
		title: "Algorithms",
		url: "/dashboard/algorithms",
		items: [
			{
				title: "Sorting Algorithms",
				url: "/sorting",
				items: [
					{
						title: "Bubble Sort",
						url: "/bubble",
					},
					{
						title: "Insertion Sort",
						url: "/insertion",
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
		url: "/dashboard/structures",
	},
] as NavItem[];

interface NavItem {
	title: string;
	url: string;
	items?: NavItem[];
	isActive?: boolean;
}
