"use client";

import { usePathname } from "next/navigation";

export default function MdxLayout({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();

	if (pathname === "/dashboard/algorithms/sorting") return children;
	return (
		<div className="prose prose-headings:mt-8 prose-headings:font-semibold prose-h1:text-5xl prose-h2:text-4xl prose-h3:text-3xl prose-h4:text-2xl prose-h5:text-xl prose-h6:text-lg dark:prose-invert">
			{children}
		</div>
	);
}
