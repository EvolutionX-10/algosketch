"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Layers3Icon, PlusIcon, MinusIcon, EyeIcon } from "lucide-react";

interface InfoBoxProps {
	currentStep: number;
	totalSteps: number;
	stackSize: number;
	operations: {
		pushes: number;
		pops: number;
		peeks: number;
	};
	isEmpty: boolean;
}

export default function InfoBox({ currentStep, totalSteps, stackSize, operations, isEmpty }: InfoBoxProps) {
	return (
		<Card className="bg-card/50 backdrop-blur-sm">
			<CardHeader>
				<CardTitle className="flex items-center gap-2 text-lg">
					<Layers3Icon className="text-primary h-5 w-5" />
					Stack Information
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				{/* Current State */}
				<div className="space-y-2">
					<h4 className="text-sm font-medium">Current State</h4>
					<div className="grid grid-cols-2 gap-2 text-sm">
						<div className="flex justify-between">
							<span className="text-muted-foreground">Size:</span>
							<Badge variant={isEmpty ? "destructive" : "default"}>{stackSize}</Badge>
						</div>
						<div className="flex justify-between">
							<span className="text-muted-foreground">Status:</span>
							<Badge variant={isEmpty ? "outline" : "secondary"}>{isEmpty ? "Empty" : "Active"}</Badge>
						</div>
					</div>
				</div>

				{/* Operations Count */}
				<div className="space-y-2">
					<h4 className="text-sm font-medium">Operations Performed</h4>
					<div className="space-y-2">
						<div className="flex items-center justify-between text-sm">
							<div className="flex items-center gap-2">
								<PlusIcon className="h-4 w-4 text-green-600" />
								<span className="text-muted-foreground">Pushes:</span>
							</div>
							<Badge variant="outline" className="text-green-600">
								{operations.pushes}
							</Badge>
						</div>
						<div className="flex items-center justify-between text-sm">
							<div className="flex items-center gap-2">
								<MinusIcon className="h-4 w-4 text-red-600" />
								<span className="text-muted-foreground">Pops:</span>
							</div>
							<Badge variant="outline" className="text-red-600">
								{operations.pops}
							</Badge>
						</div>
						<div className="flex items-center justify-between text-sm">
							<div className="flex items-center gap-2">
								<EyeIcon className="h-4 w-4 text-yellow-600" />
								<span className="text-muted-foreground">Peeks:</span>
							</div>
							<Badge variant="outline" className="text-yellow-600">
								{operations.peeks}
							</Badge>
						</div>
					</div>
				</div>

				{/* Stack Properties */}
				<div className="space-y-2">
					<h4 className="text-sm font-medium">Stack Properties</h4>
					<div className="text-muted-foreground space-y-1 text-xs">
						<p>
							• <strong>LIFO:</strong> Last In, First Out
						</p>
						<p>
							• <strong>Push:</strong> Add element to top
						</p>
						<p>
							• <strong>Pop:</strong> Remove element from top
						</p>
						<p>
							• <strong>Peek:</strong> View top element
						</p>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
