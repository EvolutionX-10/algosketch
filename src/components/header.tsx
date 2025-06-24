"use client";

import { getLink, getName } from "@/lib/utils";
import {
	Breadcrumb,
	BreadcrumbEllipsis,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "./ui/breadcrumb";
import { Separator } from "./ui/separator";
import { SidebarTrigger } from "./ui/sidebar";
import { usePathname } from "next/navigation";
import { Fragment } from "react";
import Link from "next/link";
import { useIsMobile } from "@/hooks/use-mobile";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";

export function Header() {
	const pathname = usePathname();
	const crumbs = pathname.split("/").filter((crumb) => crumb !== "");
	const lastCrumb = crumbs[crumbs.length - 1];
	const isMobile = useIsMobile();

	const NormalCrumbs = crumbs.slice(0, -1).map((crumb, i) => {
		return (
			<Fragment key={crumb}>
				<BreadcrumbItem key={crumb}>
					<BreadcrumbLink asChild>
						<Link href={getLink(crumb)} className="flex items-center gap-1.5">
							{getName(crumb)}
						</Link>
					</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator />
			</Fragment>
		);
	});

	const LastCrumb = (
		<BreadcrumbItem key={lastCrumb}>
			<BreadcrumbPage>{getName(lastCrumb)}</BreadcrumbPage>
		</BreadcrumbItem>
	);

	NormalCrumbs.push(LastCrumb);

	const TooManyCrumbs = (
		<>
			<BreadcrumbItem key={crumbs[0]}>
				<BreadcrumbLink asChild>
					<Link href={getLink(crumbs[0])} className="flex items-center gap-1.5">
						{getName(crumbs[0])}
					</Link>
				</BreadcrumbLink>
			</BreadcrumbItem>
			<BreadcrumbSeparator />
			<BreadcrumbItem>
				<DropdownMenu>
					<DropdownMenuTrigger className="flex items-center gap-1">
						<BreadcrumbEllipsis className="h-4 w-4 cursor-pointer" />
						<span className="sr-only">Toggle menu</span>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="start">
						{crumbs.slice(1, -1).map((crumb) => (
							<DropdownMenuItem key={crumb} className="w-full">
								<BreadcrumbLink asChild>
									<Link href={getLink(crumb)} className="flex w-full items-center gap-1.5">
										{getName(crumb)}
									</Link>
								</BreadcrumbLink>
							</DropdownMenuItem>
						))}
					</DropdownMenuContent>
				</DropdownMenu>
			</BreadcrumbItem>
			<BreadcrumbSeparator />
			{LastCrumb}
		</>
	);

	return (
		<header className="bg-background/70 sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b px-4 backdrop-blur-lg">
			<SidebarTrigger className="-ml-2 size-8 cursor-pointer p-4" />
			<Separator orientation="vertical" className="mr-2 h-4" />
			<Breadcrumb>
				<BreadcrumbList>{crumbs.length >= 4 && isMobile ? TooManyCrumbs : NormalCrumbs}</BreadcrumbList>
			</Breadcrumb>
		</header>
	);
}
