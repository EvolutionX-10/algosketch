import type { MDXComponents } from "mdx/types";
import { GeistMono } from "geist/font/mono";
import { ThemedPrism } from "@/components/themed-prism";

export function useMDXComponents(components: MDXComponents): MDXComponents {
	return {
		code: ({ children, className, ...props }) => {
			const language = className?.replace(/language-/, "") || "text";
			if (language === "text") {
				return (
					<span
						className={
							"rounded-md bg-gray-200 p-1 text-sm text-gray-600 dark:bg-gray-900 dark:text-gray-300 " +
							GeistMono.className
						}
						{...props}
					>
						{children}
					</span>
				);
			}
			return <ThemedPrism language={language}>{children}</ThemedPrism>;
		},
		pre: ({ children }) => {
			return children;
		},
		...components,
	};
}
