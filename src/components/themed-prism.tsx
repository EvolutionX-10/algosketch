"use client";

import { useTheme } from "next-themes";
import { Prism, type SyntaxHighlighterProps } from "react-syntax-highlighter";
import { coldarkDark, vs } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

function MorphingCopyIcon({ copied }: { copied: boolean }) {
	return (
		<svg
			width="16"
			height="16"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			className="text-muted-foreground"
		>
			<AnimatePresence mode="wait" initial={false}>
				{copied ? (
					<motion.g
						key="check"
						initial={{ pathLength: 0, opacity: 0 }}
						animate={{
							pathLength: 1,
							opacity: 1,
							scale: [0.8, 1.1, 1],
						}}
						exit={{ pathLength: 0, opacity: 0 }}
						transition={{
							duration: 0.2,
							ease: "easeInOut",
							scale: { duration: 0.2 },
						}}
					>
						<motion.path
							d="M3 12l6 6L21 6"
							initial={{ pathLength: 0 }}
							animate={{ pathLength: 1 }}
							transition={{ duration: 0.2, delay: 0.1 }}
						/>
					</motion.g>
				) : (
					<motion.g
						key="copy"
						initial={{ pathLength: 0, opacity: 0 }}
						animate={{ pathLength: 1, opacity: 1 }}
						exit={{ pathLength: 0, opacity: 0 }}
						transition={{ duration: 0.2, ease: "easeInOut" }}
					>
						<motion.rect
							width="14"
							height="14"
							x="8"
							y="8"
							rx="2"
							ry="2"
							initial={{ pathLength: 0 }}
							animate={{ pathLength: 1 }}
							transition={{ duration: 0.2 }}
						/>
						<motion.path
							d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"
							initial={{ pathLength: 0 }}
							animate={{ pathLength: 1 }}
							transition={{ duration: 0.2, delay: 0.1 }}
						/>
					</motion.g>
				)}
			</AnimatePresence>
		</svg>
	);
}

export function ThemedPrism(props: SyntaxHighlighterProps) {
	const { resolvedTheme: theme } = useTheme();
	const style = theme === "dark" ? coldarkDark : vs;
	const [copied, setCopied] = useState(false);

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(String(props.children));
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch (err) {
			console.error("Failed to copy text: ", err);
		}
	};

	return (
		<div className="group relative">
			<motion.button
				onClick={handleCopy}
				className="bg-background/80 hover:bg-background border-border absolute top-2 right-2 z-10 cursor-pointer rounded-md border p-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
				title={copied ? "Copied!" : "Copy code"}
			>
				<MorphingCopyIcon copied={copied} />
			</motion.button>
			<Prism
				language={props.language}
				style={style}
				codeTagProps={{
					style: {
						fontFamily: "var(--font-mono)",
					},
				}}
				wrapLines
				lineProps={() => {
					return {
						style: { padding: "0.05em 0.5em", display: "block" },
					};
				}}
				{...props}
			>
				{props.children}
			</Prism>
		</div>
	);
}
