import { expect, test, type Page } from "@playwright/test";

const sorting = ["bubble", "insertion", "selection", "merge", "quick", "heap"];
const algorithms = [
	...sorting.map((name) => ({ name, category: "sorting" })),
	...["linear", "binary"].map((name) => ({ name, category: "searching" })),
];

function metric(page: Page, label: string) {
	return page
		.getByText(new RegExp(`^${label}:?$`))
		.locator("..")
		.locator("span")
		.last();
}

test.beforeEach(async ({ page }) => {
	// Reproducible datasets, independent of the current clock or the test worker.
	await page.addInitScript(() => {
		let seed = 12345;
		Math.random = () => {
			seed = (1664525 * seed + 1013904223) >>> 0;
			return seed / 4294967296;
		};
	});
});

for (const { name, category } of algorithms) {
	test(`${name}: forward/backward restores statistics and supports regeneration`, async ({ page }) => {
		const errors: string[] = [];
		page.on("pageerror", (error) => errors.push(error.message));
		await page.goto(`/dashboard/algorithms/${category}/${name}`);
		const next = page.getByRole("button", { name: "Next", exact: true });
		const previous = page.getByRole("button", { name: "Previous", exact: true });
		await expect(next).toBeEnabled();
		await expect(metric(page, "Comparisons")).toHaveText("0");
		for (let i = 0; i < 10 && (await metric(page, "Comparisons").innerText()) === "0"; i++) await next.click();
		await expect(metric(page, "Comparisons")).toHaveText("1");
		const before = await metric(page, "Comparisons").innerText();
		const stats = category === "sorting" ? page.getByText("Algorithm Stats", { exact: true }).locator("..") : null;
		const beforeStats = stats ? await stats.innerText() : null;
		await previous.click();
		await expect(metric(page, "Comparisons")).toHaveText("0");
		await next.click();
		await expect(metric(page, "Comparisons")).toHaveText(before);
		if (stats) await expect(stats).toHaveText(beforeStats!, { useInnerText: true });
		if (category === "sorting") {
			await page.getByRole("button", { name: "Nodes", exact: true }).click();
			await expect(metric(page, "Comparisons")).toHaveText(before);
			await page.getByRole("button", { name: "Bars", exact: true }).click();
		}
		const regenerate = page.getByRole("button", { name: /^Generate/ });
		await regenerate.click();
		await expect(previous).toBeDisabled();
		await expect(metric(page, "Comparisons")).toHaveText("0");
		if (category === "searching") {
			// A random target can finish on the first probe before a pointer click
			// reaches Pause. Use an absent target for the playback-control check.
			await page.getByRole("spinbutton", { name: "Search Target", exact: true }).fill("99");
			await page.getByRole("button", { name: "Set", exact: true }).click();
		}
		await page.getByRole("button", { name: "Start", exact: true }).click();
		await expect(next).toBeDisabled();
		await page.getByRole("button", { name: "Pause", exact: true }).click();
		const paused = await metric(page, "Comparisons").innerText();
		await page.waitForTimeout(700);
		await expect(metric(page, "Comparisons")).toHaveText(paused);
		expect(errors).toEqual([]);
	});
}

test("playback completes, rewinds without resuming, and resets without stale timers", async ({ page }) => {
	await page.goto("/dashboard/algorithms/sorting/bubble");
	await expect(page.getByRole("button", { name: "Next", exact: true })).toBeEnabled();
	const sliders = page.locator(".slider-root");
	// Smallest dataset and fastest supported playback; exercise a live speed change.
	await sliders.nth(0).click({ position: { x: 1, y: 3 } });
	await page.getByRole("button", { name: "Generate", exact: true }).click();
	await page.getByRole("button", { name: "Start", exact: true }).click();
	const box = await sliders.nth(1).boundingBox();
	await sliders.nth(1).click({ position: { x: box!.width - 1, y: 3 } });
	await expect(page.getByText("Sorted", { exact: true })).toBeVisible({ timeout: 12000 });
	await expect(page.getByRole("button", { name: "Next", exact: true })).toBeDisabled();
	await page.getByRole("button", { name: "Previous", exact: true }).click();
	const step = await metric(page, "Step").innerText();
	await page.waitForTimeout(400);
	await expect(metric(page, "Step")).toHaveText(step);
	await page.getByRole("button", { name: "Generate", exact: true }).click();
	await expect(metric(page, "Step")).toHaveText("0");
	await expect(metric(page, "Swaps")).toHaveText("0");
});

test("changing lessons while playing stops the previous timeline", async ({ page }) => {
	const errors: string[] = [];
	page.on("pageerror", (error) => errors.push(error.message));
	await page.goto("/dashboard/algorithms/sorting/bubble");
	await page.getByRole("button", { name: "Start", exact: true }).click();
	const binaryLink = page.getByRole("link", { name: "Binary Search", exact: true });
	if (!(await binaryLink.isVisible())) await page.getByRole("button", { name: "Toggle Sidebar", exact: true }).click();
	await binaryLink.click();
	await expect(page.getByRole("heading", { name: "Binary Search Visualizer", exact: true })).toBeVisible();
	await expect(metric(page, "Comparisons")).toHaveText("0");
	await page.waitForTimeout(700);
	await expect(metric(page, "Comparisons")).toHaveText("0");
	expect(errors).toEqual([]);
});

for (const name of ["stack", "queue", "linkedlist"]) {
	test(`${name}: operations and reset work in the rendered controls`, async ({ page }) => {
		await page.goto(`/dashboard/structures/${name}`);
		const input = page.locator("input:visible").first();
		const add = name === "stack" ? "Push" : name === "queue" ? "Enqueue" : "Insert";
		const remove = name === "stack" ? "Pop" : name === "queue" ? "Dequeue" : "Delete";
		for (const value of [17, 29]) {
			await input.fill(String(value));
			await page.getByRole("button", { name: add, exact: true }).filter({ visible: true }).click();
		}
		if (name === "linkedlist") await input.fill("29");
		await page.getByRole("button", { name: remove, exact: true }).filter({ visible: true }).click();
		await page.getByRole("button", { name: "Reset", exact: true }).filter({ visible: true }).click();
		await expect(page.getByRole("button", { name: remove, exact: true }).filter({ visible: true })).toBeDisabled();
	});
}

test("production manifest and offline cached/fallback navigation work", async ({ page, context }) => {
	await page.goto("/dashboard/algorithms/sorting/bubble");
	await expect(page.getByRole("button", { name: "Next", exact: true })).toBeEnabled();
	const manifestURL = await page.locator('link[rel="manifest"]').getAttribute("href");
	const manifest = await context.request.get(manifestURL!);
	expect(manifest.ok()).toBe(true);
	expect((await manifest.json()).short_name).toBe("AlgoSketch");
	await page.waitForFunction(() => !!navigator.serviceWorker.controller);
	// The first response arrived before the worker controlled the page. Prime
	// the runtime cache with a controlled online navigation before going offline.
	await page.reload({ waitUntil: "networkidle" });
	await page.waitForFunction(async () => !!(await caches.match(location.href)));
	await context.setOffline(true);
	await page.reload({ waitUntil: "domcontentloaded" });
	await expect(page.getByRole("heading", { name: "Bubble Sort Visualizer", exact: true })).toBeVisible();
	await page.goto("/not-cached-offline-example", { waitUntil: "domcontentloaded" });
	await expect(page.getByRole("heading", { name: "You're Offline", exact: true })).toBeVisible();
});
