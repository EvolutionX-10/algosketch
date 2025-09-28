import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TreePineIcon, HeightIcon, DatabaseIcon, ActivityIcon } from "lucide-react";

interface InfoBoxProps {
	currentStep: number;
	totalSteps: number;
	treeSize: number;
	operations: {
		insertions: number;
		deletions: number;
		searches: number;
	};
	isEmpty: boolean;
	treeHeight: number;
}

export default function InfoBox({ 
	currentStep, 
	totalSteps, 
	treeSize, 
	operations, 
	isEmpty, 
	treeHeight 
}: InfoBoxProps) {
	return (
		<Card className="h-fit">
			<CardHeader className="pb-3">
				<CardTitle className="flex items-center text-lg">
					<TreePineIcon className="mr-2 h-5 w-5" />
					Binary Tree Info
				</CardTitle>
				<CardDescription>Real-time tree statistics and operation metrics</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				{/* Tree Statistics */}
				<div className="space-y-3">
					<h4 className="text-sm font-medium">Tree Statistics</h4>
					<div className="grid grid-cols-2 gap-3">
						<div className="flex items-center space-x-2">
							<DatabaseIcon className="h-4 w-4 text-muted-foreground" />
							<div>
								<p className="text-xl font-bold">{treeSize}</p>
								<p className="text-xs text-muted-foreground">Nodes</p>
							</div>
						</div>
						<div className="flex items-center space-x-2">
							<HeightIcon className="h-4 w-4 text-muted-foreground" />
							<div>
								<p className="text-xl font-bold">{treeHeight}</p>
								<p className="text-xs text-muted-foreground">Height</p>
							</div>
						</div>
					</div>
					
					<div className="flex items-center justify-between">
						<span className="text-sm text-muted-foreground">Status:</span>
						<Badge variant={isEmpty ? "secondary" : "default"}>
							{isEmpty ? "Empty Tree" : "Active Tree"}
						</Badge>
					</div>
				</div>

				{/* Operations Count */}
				<div className="space-y-3">
					<h4 className="text-sm font-medium">Operations Performed</h4>
					<div className="space-y-2">
						<div className="flex items-center justify-between">
							<span className="flex items-center text-sm">
								<ActivityIcon className="mr-1 h-3 w-3 text-green-500" />
								Insertions
							</span>
							<Badge variant="outline" className="text-green-600">
								{operations.insertions}
							</Badge>
						</div>
						<div className="flex items-center justify-between">
							<span className="flex items-center text-sm">
								<ActivityIcon className="mr-1 h-3 w-3 text-red-500" />
								Deletions
							</span>
							<Badge variant="outline" className="text-red-600">
								{operations.deletions}
							</Badge>
						</div>
						<div className="flex items-center justify-between">
							<span className="flex items-center text-sm">
								<ActivityIcon className="mr-1 h-3 w-3 text-blue-500" />
								Searches
							</span>
							<Badge variant="outline" className="text-blue-600">
								{operations.searches}
							</Badge>
						</div>
					</div>
				</div>

				{/* Tree Properties */}
				<div className="space-y-3">
					<h4 className="text-sm font-medium">Tree Properties</h4>
					<div className="text-xs text-muted-foreground space-y-1">
						<p>• Each node has at most two children</p>
						<p>• Left subtree ≤ parent ≤ right subtree</p>
						<p>• Height determines tree balance</p>
						<p>• In-order traversal gives sorted sequence</p>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}