import type { MDXComponents } from "mdx/types";
import { Prism } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { GeistMono } from "geist/font/mono";

export function useMDXComponents(components: MDXComponents): MDXComponents {
	return {
		code: ({ children, className, ...props }) => {
			const language = className?.replace(/language-/, "") || "text";
			if (language === "text") {
				return (
					<span
						className={"rounded-md bg-gray-900 p-1 text-sm text-gray-500 dark:text-gray-300 " + GeistMono.className}
						{...props}
					>
						{children}
					</span>
				);
			}
			return (
				<Prism
					language={language}
					style={coldarkDark}
					codeTagProps={{
						style: {
							fontFamily: GeistMono.style.fontFamily,
						},
					}}
					{...props}
				>
					{children}
				</Prism>
			);
		},
		pre: ({ children }) => {
			return children;
		},
		...components,
	};
}
