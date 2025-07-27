"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

import {
	ChevronRightIcon,
	BugIcon,
	SparklesIcon,
	TrendingUpIcon,
	AlertTriangleIcon,
	ShieldCheckIcon,
	CalendarIcon,
	TagIcon,
} from "lucide-react";
import { changelog, type ChangelogEntry } from "@/data/changelog";

const changeTypeConfig = {
	feature: {
		icon: SparklesIcon,
		label: "New Feature",
		variant: "default" as const,
		color: "text-blue-600 dark:text-blue-400",
	},
	improvement: {
		icon: TrendingUpIcon,
		label: "Improvement",
		variant: "secondary" as const,
		color: "text-green-600 dark:text-green-400",
	},
	bugfix: {
		icon: BugIcon,
		label: "Bug Fix",
		variant: "outline" as const,
		color: "text-orange-600 dark:text-orange-400",
	},
	breaking: {
		icon: AlertTriangleIcon,
		label: "Breaking Change",
		variant: "destructive" as const,
		color: "text-red-600 dark:text-red-400",
	},
	security: {
		icon: ShieldCheckIcon,
		label: "Security",
		variant: "secondary" as const,
		color: "text-purple-600 dark:text-purple-400",
	},
};

interface ChangelogModalProps {
	children: React.ReactNode;
	currentVersion?: string;
}

interface ChangelogItemProps {
	entry: ChangelogEntry;
	isLatest?: boolean;
	defaultExpanded?: boolean;
}

function ChangelogItem({ entry, isLatest = false, defaultExpanded = false }: ChangelogItemProps) {
	const [isOpen, setIsOpen] = useState(defaultExpanded);

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3, ease: "easeOut" }}
		>
			<Card className="overflow-hidden transition-shadow duration-200">
				<CardHeader className="cursor-pointer pb-3 transition-colors" onClick={() => setIsOpen(!isOpen)}>
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-3">
							<div className="flex items-center gap-2">
								<TagIcon className="text-muted-foreground h-4 w-4" />
								<span className="font-mono text-sm font-medium">v{entry.version}</span>
								{isLatest && (
									<motion.div
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										transition={{ delay: 0.2, duration: 0.3 }}
									>
										<Badge variant="default" className="text-xs">
											Latest
										</Badge>
									</motion.div>
								)}
							</div>
							<Separator orientation="vertical" className="h-4" />
							<div className="text-muted-foreground flex items-center gap-2">
								<CalendarIcon className="h-4 w-4" />
								<span className="text-sm">
									{new Date(entry.date).toLocaleDateString("en-US", {
										year: "numeric",
										month: "long",
										day: "numeric",
									})}
								</span>
							</div>
						</div>
						<motion.div
							animate={{ rotate: isOpen ? 90 : 0 }}
							transition={{
								duration: 0.25,
								ease: [0.4, 0, 0.2, 1],
								type: "tween",
							}}
						>
							<ChevronRightIcon className="h-4 w-4" />
						</motion.div>
					</div>
					<div className="text-left">
						<CardTitle className="font-heading text-3xl">{entry.title}</CardTitle>
						{entry.description && <p className="text-muted-foreground mt-1 text-sm">{entry.description}</p>}
					</div>
				</CardHeader>
				<AnimatePresence initial={false}>
					{isOpen && (
						<motion.div
							key="content"
							initial={{ height: 0, opacity: 0 }}
							animate={{
								height: "auto",
								opacity: 1,
								transition: {
									height: { duration: 0.3, ease: "easeOut" },
									opacity: { duration: 0.2, delay: 0.1 },
								},
							}}
							exit={{
								height: 0,
								opacity: 0,
								transition: {
									height: { duration: 0.2, ease: "easeIn" },
									opacity: { duration: 0.1 },
								},
							}}
							style={{ overflow: "hidden" }}
						>
							<CardContent className="pt-0">
								<motion.div
									className="space-y-3"
									initial={{ y: -10 }}
									animate={{ y: 0 }}
									transition={{ duration: 0.2, delay: 0.1 }}
								>
									{entry.changes.map((change, index) => {
										const config = changeTypeConfig[change.type];
										const IconComponent = config.icon;

										return (
											<motion.div
												key={index}
												className="group flex gap-3"
												initial={{ opacity: 0, x: -20 }}
												animate={{ opacity: 1, x: 0 }}
												transition={{
													duration: 0.3,
													delay: 0.2 + index * 0.05,
													ease: "easeOut",
												}}
											>
												<div className={`mt-0.5 ${config.color}`}>
													<IconComponent className="h-4 w-4" />
												</div>
												<div className="flex-1 space-y-1">
													<p className="text-sm font-medium">{change.description}</p>
													{change.details && (
														<motion.p
															className="text-muted-foreground text-xs"
															initial={{ opacity: 0 }}
															animate={{ opacity: 1 }}
															transition={{ delay: 0.3 + index * 0.05 }}
														>
															{change.details}
														</motion.p>
													)}
												</div>
											</motion.div>
										);
									})}
								</motion.div>
							</CardContent>
						</motion.div>
					)}
				</AnimatePresence>
			</Card>
		</motion.div>
	);
}

export function ChangelogModal({ children, currentVersion }: ChangelogModalProps) {
	return (
		<Dialog>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent className="min-w-[60vw] overflow-hidden p-0 max-md:w-[95vw] md:max-h-[80vh] md:max-w-4xl">
				<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2, ease: "easeOut" }}>
					<DialogHeader className="p-6 pb-4">
						<DialogTitle className="flex items-center gap-2">
							<motion.div
								initial={{ rotate: -180, opacity: 0 }}
								animate={{ rotate: 0, opacity: 1 }}
								transition={{ duration: 0.3, ease: "easeOut" }}
							>
								<TagIcon className="h-5 w-5" />
							</motion.div>
							What&apos;s New
						</DialogTitle>
						<DialogDescription>See what&apos;s changed in AlgoSketch across all versions</DialogDescription>
					</DialogHeader>

					<ScrollArea className="h-[60vh] px-6">
						<motion.div
							className="space-y-4 pb-6"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.3, delay: 0.1 }}
						>
							{changelog.map((entry, index) => (
								<motion.div
									key={entry.version}
									initial={{ opacity: 0, y: 30 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{
										duration: 0.4,
										delay: 0.1 + index * 0.05,
										ease: "easeOut",
									}}
								>
									<ChangelogItem
										entry={entry}
										isLatest={index === 0}
										defaultExpanded={entry.version === currentVersion || index === 0}
									/>
								</motion.div>
							))}

							{changelog.length === 0 && (
								<motion.div
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ duration: 0.3, delay: 0.2 }}
								>
									<Card>
										<CardContent className="py-12 text-center">
											<motion.div
												initial={{ y: 20, opacity: 0 }}
												animate={{ y: 0, opacity: 1 }}
												transition={{ duration: 0.3, delay: 0.3 }}
											>
												<TagIcon className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
												<p className="text-muted-foreground">No changelog entries available</p>
											</motion.div>
										</CardContent>
									</Card>
								</motion.div>
							)}
						</motion.div>
					</ScrollArea>
				</motion.div>
			</DialogContent>
		</Dialog>
	);
}

export default ChangelogModal;
