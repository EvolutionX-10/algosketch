"use client";

import { useTheme } from "next-themes";
import { Prism } from "react-syntax-highlighter";
import { coldarkDark, vs } from "react-syntax-highlighter/dist/esm/styles/prism";
import { GeistMono } from "geist/font/mono";

export function ThemedPrism(props: any) {
	const { resolvedTheme: theme } = useTheme();
	const style = theme === "dark" ? coldarkDark : vs;

	return (
		<Prism
			language={props.language}
			style={style}
			codeTagProps={{
				style: {
					fontFamily: GeistMono.style.fontFamily,
				},
			}}
			{...props}
		>
			{props.children}
		</Prism>
	);
}
