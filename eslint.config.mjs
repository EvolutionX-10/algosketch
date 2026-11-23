import { fileURLToPath } from "node:url";
import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({ baseDirectory: fileURLToPath(new URL(".", import.meta.url)) });

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
	...compat.extends("next/core-web-vitals"),
	// Literal apostrophes and quotation marks in lesson prose are intentional.
	{ rules: { "react/no-unescaped-entities": "off" } },
];

export default config;
