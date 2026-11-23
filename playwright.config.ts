import { defineConfig } from "@playwright/test";

export default defineConfig({
	testDir: "./tests/e2e",
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 1 : 0,
	workers: 2,
	reporter: "list",
	use: {
		baseURL: "http://127.0.0.1:3100",
		trace: "retain-on-failure",
		screenshot: "only-on-failure",
		launchOptions: { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH },
	},
	projects: [
		{ name: "chromium", use: { browserName: "chromium", viewport: { width: 1440, height: 1000 } } },
		{
			name: "mobile-chromium",
			use: { browserName: "chromium", viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true },
		},
	],
	webServer: {
		// Build once before invoking this suite so the PWA is tested in production mode.
		command: "bun run start -- --hostname 0.0.0.0 --port 3100",
		url: "http://127.0.0.1:3100",
		reuseExistingServer: false,
		timeout: 30000,
	},
});
