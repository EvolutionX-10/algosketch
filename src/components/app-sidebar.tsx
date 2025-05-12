import * as React from "react";
import { ChevronRight } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";
import ThemedImage from "./themed-image";

const navData = [
	{
		title: "Sorting Algorithms",
		url: "/sorting",
		items: [
			{
				title: "Bubble Sort",
				url: "/sorting/bubble",
			},
			{
				title: "Selection Sort",
				url: "#",
			},
		],
	},
] as NavItem[];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar {...props}>
			<SidebarHeader className="font-heading flex flex-row items-center gap-0 text-2xl">
				<ThemedImage
					srcLight="/images/icon-light.png"
					srcDark="/images/icon-dark.png"
					alt="AlgoSketch Logo"
					width={64}
					height={64}
					className="h-6 w-6"
				/>
				<span className="ml-0.5 tracking-wide">lgoSketch</span>
			</SidebarHeader>
			<SidebarContent className="gap-0">
				{navData.map((item) => (
					<Collapsible key={item.title} title={item.title} className="group/collapsible">
						<SidebarGroup>
							<SidebarGroupLabel
								asChild
								className="group/label text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sm"
							>
								<CollapsibleTrigger>
									{item.title}{" "}
									<ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
								</CollapsibleTrigger>
							</SidebarGroupLabel>
							<CollapsibleContent>
								<SidebarGroupContent>
									<SidebarMenu>
										{item.items &&
											item.items.map((item) => (
												<SidebarMenuItem key={item.title}>
													<SidebarMenuButton asChild isActive={item.isActive} className="ml-2">
														<Link href={item.url}>{item.title}</Link>
													</SidebarMenuButton>
												</SidebarMenuItem>
											))}
									</SidebarMenu>
								</SidebarGroupContent>
							</CollapsibleContent>
						</SidebarGroup>
					</Collapsible>
				))}
			</SidebarContent>
			<SidebarRail />
		</Sidebar>
	);
}

interface NavItem {
	title: string;
	url: string;
	items?: Omit<NavItem, "items">[];
	isActive?: boolean;
}
