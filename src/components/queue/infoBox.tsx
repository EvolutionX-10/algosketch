"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRightIcon, PlusIcon, MinusIcon, EyeIcon } from "lucide-react";

interface InfoBoxProps {
	currentStep: number;
	totalSteps: number;
	queueSize: number;
	operations: {
		enqueues: number;
		dequeues: number;
		peeks: number;
	};
	isEmpty: boolean;
}

export default function InfoBox({ currentStep, totalSteps, queueSize, operations, isEmpty }: InfoBoxProps) {
	return (
		<Card className="bg-card/50 backdrop-blur-sm">
			<CardHeader>
				<CardTitle className="flex items-center gap-2 text-lg">
					<ArrowRightIcon className="text-primary h-5 w-5" />
					Queue Information
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				{/* Current State */}
				<div className="space-y-2">
					<h4 className="text-sm font-medium">Current State</h4>
					<div className="grid grid-cols-2 gap-2 text-sm">
						<div className="flex justify-between">
							<span className="text-muted-foreground">Size:</span>
							<Badge variant={isEmpty ? "destructive" : "default"}>{queueSize}</Badge>
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
								<span className="text-muted-foreground">Enqueues:</span>
							</div>
							<Badge variant="outline" className="text-green-600">
								{operations.enqueues}
							</Badge>
						</div>
						<div className="flex items-center justify-between text-sm">
							<div className="flex items-center gap-2">
								<MinusIcon className="h-4 w-4 text-red-600" />
								<span className="text-muted-foreground">Dequeues:</span>
							</div>
							<Badge variant="outline" className="text-red-600">
								{operations.dequeues}
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

				{/* Queue Properties */}
				<div className="space-y-2">
					<h4 className="text-sm font-medium">Queue Properties</h4>
					<div className="text-muted-foreground space-y-1 text-xs">
						<p>
							• <strong>FIFO:</strong> First In, First Out
						</p>
						<p>
							• <strong>Enqueue:</strong> Add element to rear
						</p>
						<p>
							• <strong>Dequeue:</strong> Remove element from front
						</p>
						<p>
							• <strong>Peek:</strong> View front/rear elements
						</p>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
