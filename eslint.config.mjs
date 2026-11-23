import nextVitals from "eslint-config-next/core-web-vitals";

const config = [
	{
		ignores: [
			".next/**",
			"node_modules/**",
			"public/sw*",
			"public/swe-worker*",
			"playwright-report/**",
			"test-results/**",
		],
	},
	...nextVitals,
	// Literal apostrophes and quotation marks in lesson prose are intentional.
	{ rules: { "react/no-unescaped-entities": "off" } },
	{
		// Existing browser-only initialization is retained during the Next 16
		// migration. Remove these scoped exceptions with the R7 hydration refactor.
		files: [
			"src/components/binary/visualizer.tsx",
			"src/components/bubble/visualizer.tsx",
			"src/components/insertion/visualizer.tsx",
			"src/components/linear/visualizer.tsx",
			"src/components/merge/visualizer.tsx",
			"src/components/selection/visualizer.tsx",
			"src/components/hydrate.tsx",
			"src/components/offline-indicator.tsx",
			"src/components/ui/animated-counter.tsx",
			"src/hooks/use-mobile.ts",
			"src/hooks/use-offline.ts",
		],
		rules: { "react-hooks/set-state-in-effect": "off" },
	},
];

export default config;
