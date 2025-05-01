import type { Metadata } from "next";
import { Patrick_Hand_SC, Short_Stack, Gloria_Hallelujah } from "next/font/google";
import "./globals.css";
import Hydrate from "@/components/hydrate";
import { ThemeProvider } from "@/components/theme-provider";

const heading = Patrick_Hand_SC({
	subsets: ["latin"],
	variable: "--font-heading",
	display: "swap",
	weight: ["400"],
});

const body = Short_Stack({
	subsets: ["latin"],
	variable: "--font-body",
	display: "swap",
	weight: ["400"],
});

const fancy = Gloria_Hallelujah({
	subsets: ["latin"],
	variable: "--font-fancy",
	display: "swap",
	weight: ["400"],
});

export const metadata: Metadata = {
	title: "AlgoSketch",
	description: "A sketchbook for algorithms",
	icons: {
		icon: [
			{
				media: "(prefers-color-scheme: light)",
				url: "/images/icon-light.png",
				href: "/images/icon-light.png",
			},
			{
				media: "(prefers-color-scheme: dark)",
				url: "/images/icon.png",
				href: "/images/icon-dark.png",
			},
		],
	},
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en">
			<body className={`${heading.variable} ${body.variable} ${fancy.variable} font-body antialiased`}>
				<Hydrate>
					<ThemeProvider attribute={"class"} defaultTheme={"system"} enableSystem>
						<main className="grid-lines flex min-h-screen flex-col items-center justify-center">{children}</main>
					</ThemeProvider>
				</Hydrate>
			</body>
		</html>
	);
}
