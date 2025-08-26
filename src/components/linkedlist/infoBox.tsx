"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusIcon, MinusIcon, SearchIcon } from "lucide-react";

interface InfoBoxProps {
	currentStep: number;
	totalSteps: number;
	listSize: number;
	operations: {
		insertions: number;
		deletions: number;
		searches: number;
	};
	isEmpty: boolean;
}

export default function InfoBox({ currentStep, totalSteps, listSize, operations, isEmpty }: InfoBoxProps) {
	return (
		<Card className="bg-card/50 backdrop-blur-sm">
			<CardHeader className="pb-3">
				<CardTitle className="text-lg">Linked List Info</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				{/* List Status */}
				<div className="space-y-2">
					<h4 className="text-sm font-medium">List Status</h4>
					<div className="space-y-2">
						<div className="flex items-center justify-between text-sm">
							<span className="text-muted-foreground">Size:</span>
							<Badge variant="outline">{listSize}</Badge>
						</div>
						<div className="flex items-center justify-between text-sm">
							<span className="text-muted-foreground">State:</span>
							<Badge variant={isEmpty ? "destructive" : "default"}>{isEmpty ? "Empty" : "Contains Data"}</Badge>
						</div>
					</div>
				</div>

				{/* Operations Counter */}
				<div className="space-y-2">
					<h4 className="text-sm font-medium">Operations</h4>
					<div className="space-y-2">
						<div className="flex items-center justify-between text-sm">
							<div className="flex items-center gap-2">
								<PlusIcon className="h-4 w-4 text-green-600" />
								<span className="text-muted-foreground">Insertions:</span>
							</div>
							<Badge variant="outline" className="text-green-600">
								{operations.insertions}
							</Badge>
						</div>
						<div className="flex items-center justify-between text-sm">
							<div className="flex items-center gap-2">
								<MinusIcon className="h-4 w-4 text-red-600" />
								<span className="text-muted-foreground">Deletions:</span>
							</div>
							<Badge variant="outline" className="text-red-600">
								{operations.deletions}
							</Badge>
						</div>
						<div className="flex items-center justify-between text-sm">
							<div className="flex items-center gap-2">
								<SearchIcon className="h-4 w-4 text-blue-600" />
								<span className="text-muted-foreground">Searches:</span>
							</div>
							<Badge variant="outline" className="text-blue-600">
								{operations.searches}
							</Badge>
						</div>
					</div>
				</div>

				{/* Linked List Properties */}
				<div className="space-y-2">
					<h4 className="text-sm font-medium">Linked List Properties</h4>
					<div className="text-muted-foreground space-y-1 text-xs">
						<p>
							• <strong>Dynamic:</strong> Size can change at runtime
						</p>
						<p>
							• <strong>Pointer-based:</strong> Nodes connected via pointers
						</p>
						<p>
							• <strong>Insert/Delete:</strong> O(1) at head, O(n) at arbitrary position
						</p>
						<p>
							• <strong>Search:</strong> O(n) linear search required
						</p>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
