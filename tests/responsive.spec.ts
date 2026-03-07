import { expect, test } from "@playwright/test";

const viewports = [
  { name: "mobile", width: 390, height: 844 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1440, height: 900 },
] as const;

for (const viewport of viewports) {
  test.describe(`${viewport.name} layout`, () => {
    test.use({ viewport: { width: viewport.width, height: viewport.height } });

    test("keeps the card visible without page overflow", async ({ page }) => {
      await page.goto("/");

      const card = page.getByRole("button");
      const hint = page.getByText("Click or press Space to flip");

      await expect(card).toBeVisible();
      await expect(hint).toBeVisible();

      const cardBox = await card.boundingBox();
      const hintBox = await hint.boundingBox();

      expect(cardBox).not.toBeNull();
      expect(hintBox).not.toBeNull();

      const viewportSize = page.viewportSize();
      expect(viewportSize).not.toBeNull();

      if (!cardBox || !hintBox || !viewportSize) {
        return;
      }

      expect(cardBox.x).toBeGreaterThanOrEqual(0);
      expect(cardBox.y).toBeGreaterThanOrEqual(0);
      expect(cardBox.x + cardBox.width).toBeLessThanOrEqual(viewportSize.width);
      expect(cardBox.y + cardBox.height).toBeLessThanOrEqual(
        viewportSize.height,
      );
      expect(hintBox.x + hintBox.width).toBeLessThanOrEqual(viewportSize.width);
      expect(hintBox.y + hintBox.height).toBeLessThanOrEqual(
        viewportSize.height,
      );

      const pageMetrics = await page.evaluate(() => ({
        documentClientWidth: document.documentElement.clientWidth,
        documentClientHeight: document.documentElement.clientHeight,
        documentScrollWidth: document.documentElement.scrollWidth,
        documentScrollHeight: document.documentElement.scrollHeight,
        bodyClientWidth: document.body.clientWidth,
        bodyClientHeight: document.body.clientHeight,
        bodyScrollWidth: document.body.scrollWidth,
        bodyScrollHeight: document.body.scrollHeight,
      }));

      expect(pageMetrics.documentScrollWidth).toBeLessThanOrEqual(
        pageMetrics.documentClientWidth + 1,
      );
      expect(pageMetrics.documentScrollHeight).toBeLessThanOrEqual(
        pageMetrics.documentClientHeight + 1,
      );
      expect(pageMetrics.bodyScrollWidth).toBeLessThanOrEqual(
        pageMetrics.bodyClientWidth + 1,
      );
      expect(pageMetrics.bodyScrollHeight).toBeLessThanOrEqual(
        pageMetrics.bodyClientHeight + 1,
      );
    });

    test("keeps flip interaction working after resize-sensitive layout calculations", async ({
      page,
    }) => {
      await page.goto("/");

      const card = page.getByRole("button");

      await expect(card).toHaveAttribute("aria-label", "Flip card to back");
      await card.click();
      await expect(card).toHaveAttribute("aria-label", "Flip card to front");
      await card.press("Space");
      await expect(card).toHaveAttribute("aria-label", "Flip card to back");
    });
  });
}
