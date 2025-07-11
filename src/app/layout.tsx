import type { Metadata } from "next";
import { Patrick_Hand_SC, Short_Stack, Gloria_Hallelujah } from "next/font/google";
import "./globals.css";
import Hydrate from "@/components/hydrate";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { Geist_Mono } from "next/font/google";
import { baseUrl } from "@/lib/constants";
import ServiceWorkerRegistration from "@/components/service-worker-registration";
import OfflineIndicator from "@/components/offline-indicator";

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
	title: {
		default: "AlgoSketch - Algorithm Visualization & Learning Tool",
		template: "%s | AlgoSketch",
	},
	description:
		"Learn algorithms and data structures with interactive visualizations, animations, and easy explanations for sorting, searching, and more.",
	keywords: [
		"algorithm visualization",
		"data structures",
		"sorting algorithms",
		"search algorithms",
		"computer science",
		"programming education",
		"interactive learning",
		"algorithm animation",
		"binary search",
		"bubble sort",
		"merge sort",
		"quick sort",
		"heap sort",
		"insertion sort",
		"selection sort",
		"linear search",
	],
	authors: [{ name: "AlgoSketch" }],
	creator: "AlgoSketch",
	publisher: "AlgoSketch",
	formatDetection: {
		email: false,
		address: false,
		telephone: false,
	},
	metadataBase: new URL(baseUrl),
	alternates: {
		canonical: "/",
	},
	openGraph: {
		title: "AlgoSketch - Algorithm Visualization & Learning Tool",
		description:
			"Visualize algorithms and data structures in action. AlgoSketch makes learning easy with step-by-step animations and interactive coding tools.",
		url: baseUrl,
		siteName: "AlgoSketch",
		images: [
			{
				url: "/images/og-image.png",
				width: 1200,
				height: 630,
				alt: "AlgoSketch - Algorithm Visualization Platform",
			},
		],
		locale: "en_US",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "AlgoSketch - Algorithm Visualization & Learning Tool",
		description:
			"Master algorithms and data structures through interactive visualizations and step-by-step animations.",
		images: ["/images/twitter-image.png"],
		creator: "@algosketch",
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	icons: {
		icon: [
			{
				media: "(prefers-color-scheme: light)",
				url: "/images/icon-light.png",
				href: "/images/icon-light.png",
			},
			{
				media: "(prefers-color-scheme: dark)",
				url: "/images/icon-dark.png",
				href: "/images/icon-dark.png",
			},
		],
		apple: [{ url: "/images/apple-touch-icon.png" }],
	},
	manifest: "/manifest.json",
	category: "education",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	const structuredData = {
		"@context": "https://schema.org",
		"@type": "WebSite",
		name: "AlgoSketch",
		description: "Interactive algorithm visualizations and data structure learning platform",
		url: baseUrl,
		applicationCategory: "EducationalApplication",
		operatingSystem: "Web Browser",
		audience: {
			"@type": "Audience",
			audienceType: "Students, Developers, Computer Science Learners",
		},
		educationalUse: "skill development",
		educationalLevel: "beginner to advanced",
		learningResourceType: "interactive tutorial",
		teaches: [
			"sorting algorithms",
			"search algorithms",
			"data structures",
			"algorithm complexity",
			"computer science fundamentals",
		],
	};

	return (
		<html lang="en">
			<head>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(structuredData),
					}}
				/>
				<meta name="google-site-verification" content="HprHd3OhKfBwfT2t2G_AspoTcKtCzdsMV3ktRQ9jckQ" />
			</head>
			<body
				className={`${heading.variable} ${body.variable} ${fancy.variable} ${geistMono.variable} font-body overflow-x-hidden antialiased`}
			>
				<ServiceWorkerRegistration />
				<Hydrate>
					<ThemeProvider attribute={"class"} defaultTheme={"system"} enableSystem>
						<div className="flex min-h-screen flex-col">{children}</div>
						<OfflineIndicator />
						<Toaster />
					</ThemeProvider>
				</Hydrate>
			</body>
		</html>
	);
}
