import type { Metadata } from "next";
import { Patrick_Hand_SC, Short_Stack, Gloria_Hallelujah } from "next/font/google";
import "./globals.css";
import Hydrate from "@/components/hydrate";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { Geist_Mono } from "next/font/google";

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

const geistMono = Geist_Mono({
	subsets: ["latin"],
	variable: "--font-mono",
	display: "swap",
	weight: ["400", "500", "600", "700"],
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
			<body
				className={`${heading.variable} ${body.variable} ${fancy.variable} ${geistMono.variable} font-body antialiased`}
			>
				<Hydrate>
					<ThemeProvider attribute={"class"} defaultTheme={"system"} enableSystem>
						<main className="flex min-h-screen min-w-screen flex-col items-center justify-center">{children}</main>
						<Toaster />
					</ThemeProvider>
				</Hydrate>
			</body>
		</html>
	);
}
