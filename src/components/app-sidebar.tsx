"use client";

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
	useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";
import ThemedImage from "./themed-image";
import { navData } from "@/lib/constants";
import { usePathname } from "next/navigation";
import { getLink } from "@/lib/utils";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const pathname = usePathname();
	const { setOpenMobile } = useSidebar();
	const active = pathname
		.split("/")
		.filter((crumb) => crumb !== "")
		.pop()!;

	return (
		<Sidebar {...props}>
			<SidebarHeader className="font-heading flex flex-row items-center gap-0 text-2xl">
				<ThemedImage
					srcLight="/images/icon-light.png"
					srcDark="/images/icon-dark.png"
					alt="AlgoSketch Logo"
					width={64}
					height={64}
					fetchPriority="high"
					className="h-6 w-6"
				/>
				<span className="ml-0.5 tracking-wide">lgoSketch</span>
			</SidebarHeader>
			<SidebarContent className="gap-0">
				{navData.map((root) => (
					<Collapsible key={root.title} title={root.title} defaultOpen className="group/collapsible">
						<SidebarGroup>
							<SidebarGroupLabel
								asChild
								className="group/label text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sm"
							>
								<CollapsibleTrigger>
									{root.title}{" "}
									<ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
								</CollapsibleTrigger>
							</SidebarGroupLabel>
							<CollapsibleContent className="border-l-sidebar-ring border-l-2">
								<SidebarGroupContent>
									<SidebarMenu>
										{root.items &&
											root.items.map((node) => {
												if (!node.items) {
													return (
														<SidebarMenuItem key={node.title}>
															<SidebarMenuButton
																asChild
																onClick={() => setOpenMobile(false)}
																isActive={matchActive(active, node.title)}
																className="ml-2"
															>
																<Link href={getLink(node.url)}>{node.title}</Link>
															</SidebarMenuButton>
														</SidebarMenuItem>
													);
												} else {
													return (
														<Collapsible key={node.title} title={node.title} className="group/sub-collapsible">
															<SidebarGroup>
																<SidebarGroupLabel
																	asChild
																	className="group/label text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sm"
																>
																	<CollapsibleTrigger>
																		{node.title}{" "}
																		<ChevronRight className="ml-auto transition-transform group-data-[state=open]/sub-collapsible:rotate-90" />
																	</CollapsibleTrigger>
																</SidebarGroupLabel>
																<CollapsibleContent className="border-l-2">
																	<SidebarGroupContent>
																		<SidebarMenu>
																			{node.items.map((subNode) => (
																				<SidebarMenuItem key={subNode.title}>
																					<SidebarMenuButton
																						asChild
																						onClick={() => setOpenMobile(false)}
																						isActive={matchActive(active, subNode.title)}
																						className="ml-2"
																					>
																						<Link href={getLink(subNode.url)}>{subNode.title}</Link>
																					</SidebarMenuButton>
																				</SidebarMenuItem>
																			))}
																		</SidebarMenu>
																	</SidebarGroupContent>
																</CollapsibleContent>
															</SidebarGroup>
														</Collapsible>
													);
												}
											})}
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

function matchActive(active: string, title: string) {
	return active === title.toLowerCase().split(" ")[0];
}
