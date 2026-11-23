import { expect, test, type Page } from "@playwright/test";

const values = (page: Page) =>
	page
		.locator('[aria-label^="Value: "]')
		.evaluateAll((nodes) => nodes.map((node) => Number(node.getAttribute("aria-label")!.slice(7))));
const metric = (page: Page, label: string) =>
	page
		.getByText(new RegExp(`^${label}:?$`))
		.locator("..")
		.locator("span")
		.last();

async function apply(page: Page, input: string) {
	await page.getByRole("textbox", { name: "Custom array", exact: true }).fill(input);
	await page.getByRole("button", { name: "Apply array", exact: true }).click();
}

test("bubble custom input, validation, timeline, and same-input restart", async ({ page }) => {
	await page.goto("/dashboard/algorithms/sorting/bubble");
	await apply(page, "3, 1 2");
	await expect.poll(() => values(page)).toEqual([3, 1, 2]);
	await page.getByRole("button", { name: "Next", exact: true }).click();
	await expect(metric(page, "Comparisons")).toHaveText("1");
	await apply(page, "1.5, 2");
	await expect(page.getByRole("alert").filter({ hasText: "whole numbers" })).toBeVisible();
	expect(await values(page)).toEqual([3, 1, 2]);
	await expect(metric(page, "Comparisons")).toHaveText("1");
	const timeline = page.getByRole("slider", { name: "Algorithm timeline", exact: true });
	await timeline.focus();
	await page.keyboard.press("End");
	await expect.poll(() => values(page)).toEqual([1, 2, 3]);
	await expect(metric(page, "Comparisons")).toHaveText("3");
	await expect(metric(page, "Swaps")).toHaveText("2");
	await page.keyboard.press("Home");
	await expect(metric(page, "Step")).toHaveText("0");
	await expect.poll(() => values(page)).toEqual([3, 1, 2]);
	await page.keyboard.press("ArrowRight");
	await expect(metric(page, "Comparisons")).toHaveText("1");
	await page.getByRole("button", { name: "Last", exact: true }).click();
	await page.getByRole("button", { name: "Restart", exact: true }).click();
	await expect(metric(page, "Step")).toHaveText("0");
	await expect(metric(page, "Comparisons")).toHaveText("0");
	await expect.poll(() => values(page)).toEqual([3, 1, 2]);
	await page.getByRole("button", { name: "Start", exact: true }).click();
	await expect(page.getByRole("textbox", { name: "Custom array", exact: true })).toBeDisabled();
	await page.getByRole("button", { name: "Restart", exact: true }).click();
	await expect(page.getByRole("textbox", { name: "Custom array", exact: true })).toBeEnabled();
});

test("presets preserve size and seeded random inputs are reproducible", async ({ page }) => {
	await page.goto("/dashboard/algorithms/sorting/bubble");
	await apply(page, "3, 1, 2, 5, 4");
	for (const [name, expected] of [
		["Sorted", [17, 33, 50, 66, 83]],
		["Reversed", [83, 66, 50, 33, 17]],
		["Nearly sorted", [17, 50, 33, 66, 83]],
		["Duplicates", [25, 50, 25, 75, 25]],
	] as const) {
		await page.getByRole("button", { name, exact: true }).click();
		await expect.poll(() => values(page)).toEqual([...expected]);
	}
	const seed = page.getByRole("textbox", { name: "Random seed", exact: true });
	await seed.fill("7");
	await page.getByRole("button", { name: "Seeded random", exact: true }).click();
	await expect(page.locator('[aria-label^="Value: "]')).toHaveCount(5);
	const first = await values(page);
	await page.getByRole("button", { name: "Reversed", exact: true }).click();
	await expect(seed).toHaveValue("7");
	await page.getByRole("textbox", { name: "Custom array", exact: true }).fill("invalid draft");
	await page.getByRole("button", { name: "Seeded random", exact: true }).click();
	await expect.poll(() => values(page)).toEqual(first);
	await expect(page.getByRole("textbox", { name: "Custom array", exact: true })).toHaveValue(first.join(", "));
	await seed.fill("1.5");
	await page.getByRole("button", { name: "Seeded random", exact: true }).click();
	await expect(page.getByRole("alert").filter({ hasText: "whole-number seed" })).toBeVisible();
	expect(await values(page)).toEqual(first);
});

test("linear custom inputs and target validation keep search results accurate", async ({ page }) => {
	await page.goto("/dashboard/algorithms/searching/linear");
	await expect(page.getByRole("button", { name: "Next", exact: true })).toBeEnabled();
	await expect(page.getByRole("spinbutton", { name: "Search Target", exact: true })).toHaveValue(
		await metric(page, "Target").innerText(),
	);
	await apply(page, "8, 4, 8");
	const target = page.getByRole("spinbutton", { name: "Search Target", exact: true });
	await target.fill("8");
	await target.press("Enter");
	await page.getByRole("button", { name: "Last", exact: true }).click();
	await expect(metric(page, "Comparisons")).toHaveText("1");
	await expect(metric(page, "Status")).toHaveText("Target Found!");
	await target.fill("99");
	await target.press("Enter");
	await page.getByRole("button", { name: "Last", exact: true }).click();
	await expect(metric(page, "Comparisons")).toHaveText("3");
	await expect(metric(page, "Status")).toHaveText("Target Not Found");
	await target.fill("1.5");
	await target.press("Enter");
	await expect(page.getByRole("alert").filter({ hasText: "whole-number target" })).toBeVisible();
	await expect(metric(page, "Target")).toHaveText("99");
	await expect(metric(page, "Comparisons")).toHaveText("3");
	await apply(page, "7");
	await target.fill("7");
	await target.press("Enter");
	await page.getByRole("button", { name: "Last", exact: true }).click();
	await expect(metric(page, "Status")).toHaveText("Target Found!");
});

test("sliders support keyboard input and controls fit narrow screens", async ({ page }) => {
	await page.goto("/dashboard/algorithms/sorting/bubble");
	const speed = page.getByRole("slider", { name: "Animation speed", exact: true });
	await speed.focus();
	await page.keyboard.press("End");
	await expect(speed).toHaveAttribute("aria-valuenow", "10");
	await page.keyboard.press("Home");
	await page.keyboard.press("ArrowRight");
	await expect(speed).toHaveAttribute("aria-valuenow", "2");
	await expect(page.getByText("Animation Speed: 2", { exact: true })).toBeVisible();
	await page.setViewportSize({ width: 320, height: 844 });
	for (const name of ["Nodes", "Apply array", "Last", "Restart"]) {
		const button = page.getByRole("button", { name, exact: true });
		await button.scrollIntoViewIfNeeded();
		const box = (await button.boundingBox())!;
		expect(box.x).toBeGreaterThanOrEqual(0);
		expect(box.x + box.width).toBeLessThanOrEqual(320);
	}
});

test("Next proxy preserves development-cookie redirects", async ({ context }) => {
	const password = await context.request.get("/password");
	expect(password.ok()).toBe(true);
	expect((await context.cookies()).some((cookie) => cookie.name === "dev")).toBe(true);
	await context.request.get("/clear");
	expect((await context.cookies()).some((cookie) => cookie.name === "dev")).toBe(false);
});
