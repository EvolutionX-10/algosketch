"use client";

import * as React from "react";
import { ChevronRight } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
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
import { usePathname, useRouter } from "next/navigation";
import { getLink } from "@/lib/utils";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const pathname = usePathname();
	const router = useRouter();
	const { toggleSidebar, isMobile } = useSidebar();
	const active = pathname
		.split("/")
		.filter((crumb) => crumb !== "")
		.pop()!;

	return (
		<Sidebar {...props}>
			<SidebarHeader
				className="font-heading flex cursor-pointer flex-row items-center gap-0 p-4 text-2xl select-none"
				onClick={() => {
					if (isMobile) {
						toggleSidebar();
					}
					router.push("/");
				}}
			>
				<ThemedImage
					srcLight="/images/icon-light.png"
					srcDark="/images/icon-dark.png"
					alt="AlgoSketch Logo"
					width={64}
					height={64}
					fetchPriority="high"
					className="h-6 w-6"
				/>
				<span className="ml-0.5 tracking-wider">lgoSketch</span>
			</SidebarHeader>
			<SidebarContent className="gap-0">
				{navData.map((root) => (
					<Collapsible key={root.title} title={root.title} className="group/collapsible">
						<SidebarGroup className="py-0.5">
							<div className="group/label text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground relative flex items-center rounded-md text-sm transition-all duration-200 ease-in-out">
								<Link
									href={getLink(root.url)}
									className="hover:bg-sidebar-accent/50 sidebar-item-hover flex h-8 flex-1 items-center rounded-md px-2 transition-all duration-150 ease-in-out"
									onClick={() => isMobile && toggleSidebar()}
								>
									{root.title}
								</Link>
								<CollapsibleTrigger asChild>
									<button className="hover:bg-sidebar-accent/70 flex h-8 w-8 items-center justify-center rounded-md transition-all duration-150 ease-in-out hover:cursor-pointer">
										<ChevronRight className="h-4 w-4 transition-transform duration-200 ease-in-out group-data-[state=open]/collapsible:rotate-90" />
									</button>
								</CollapsibleTrigger>
							</div>
							<CollapsibleContent className="border-l-sidebar-ring data-[state=closed]:animate-slide-up data-[state=open]:animate-slide-down overflow-hidden border-l-2">
								<SidebarGroupContent>
									<SidebarMenu>
										{root.items &&
											root.items.map((node) => {
												if (!node.items) {
													return (
														<SidebarMenuItem key={node.title} className="transition-all duration-150 ease-in-out">
															<SidebarMenuButton
																asChild
																onClick={() => isMobile && toggleSidebar()}
																isActive={matchActive(active, node.title)}
																className="sidebar-item-hover ml-2"
															>
																<Link href={getLink(node.url)}>{node.title}</Link>
															</SidebarMenuButton>
														</SidebarMenuItem>
													);
												} else {
													return (
														<Collapsible key={node.title} title={node.title} className="group/sub-collapsible">
															<SidebarGroup className="py-0.5">
																<div className="group/label text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground relative flex items-center text-sm transition-all duration-200 ease-in-out">
																	<Link
																		href={getLink(node.url)}
																		className="hover:bg-sidebar-accent/50 sidebar-item-hover flex h-8 flex-1 items-center px-2 transition-all duration-150 ease-in-out"
																		onClick={() => isMobile && toggleSidebar()}
																	>
																		{node.title}
																	</Link>
																	<CollapsibleTrigger asChild>
																		<button className="hover:bg-sidebar-accent/70 flex h-8 w-8 items-center justify-center rounded-md transition-all duration-150 ease-in-out hover:cursor-pointer">
																			<ChevronRight className="h-4 w-4 transition-transform duration-200 ease-in-out group-data-[state=open]/sub-collapsible:rotate-90" />
																		</button>
																	</CollapsibleTrigger>
																</div>
																<CollapsibleContent className="data-[state=closed]:animate-slide-up data-[state=open]:animate-slide-down overflow-hidden border-l-2">
																	<SidebarGroupContent>
																		<SidebarMenu>
																			{node.items.map((subNode) => (
																				<SidebarMenuItem
																					key={subNode.title}
																					className="transition-all duration-150 ease-in-out"
																				>
																					<SidebarMenuButton
																						asChild
																						onClick={() => isMobile && toggleSidebar()}
																						isActive={matchActive(active, subNode.title)}
																						className="sidebar-item-hover"
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
