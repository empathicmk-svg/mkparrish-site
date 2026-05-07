import { chromium } from "playwright";
import fs from "node:fs/promises";
import path from "node:path";

const CONFIG = {
  creatorBrand: {
    displayName: "MK Parrish",
    headline: "The Margins",
    subheadline: "Writing, strategy notes, and the private side of the work.",
    about: `
The Margins is the private side of my work at MK Parrish: essays, strategy notes, frameworks, and marked-up drafts for people trying to make their work easier to understand and easier to sell.

This is where I write about ghostwriting, website copy, positioning, learning enough code to build your own corner of the internet, and the quiet business of becoming legible to the right people.

Not content for content's sake. Not thought leadership theatre. The useful thinking before it gets cleaned up for the public feed.

Come in for the essays. Stay for the frameworks, edits, and sharper language around work, money, voice, websites, and reinvention.
    `.trim(),
  },

  tiers: [
    {
      existingName: "Soft Cover",
      newName: "Soft Cover",
      price: "5",
      description: `
For readers who want the work before it gets polished for the public feed.

Includes:
- weekly private essays
- strategy notes that do not go to the public feed
- archive access
- early excerpts from longer projects
- occasional reading lists and source notes
      `.trim(),
    },
    {
      existingName: "Marked Up",
      newName: "Marked Up",
      price: "12",
      description: `
For people who want to see how the work gets made.

Includes everything in Soft Cover, plus:
- positioning and messaging frameworks
- annotated drafts and before-after breakdowns
- monthly voice, offer, or page teardown
- copy prompts and practical exercises
- early access to templates, guides, and paid products
      `.trim(),
    },
    {
      existingName: "First Edition",
      newName: "First Edition",
      price: "28",
      description: `
For people who want the closest version of working with me inside The Margins.

Includes everything above, plus:
- monthly live Q and A
- priority feedback on one copy sample per month
- direct message access for focused questions
- first look at new paid offers
- occasional behind-the-scenes notes on client-style strategy work
      `.trim(),
    },
  ],

  run: {
    headless: false,
    slowMo: 200,
    screenshotsDir: path.resolve("./patreon-agent-output"),
    userDataDir: path.resolve("./patreon-user-data"),
    baseUrl: "https://www.patreon.com",
  },
};

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function screenshot(page, name) {
  await ensureDir(CONFIG.run.screenshotsDir);
  const file = path.join(CONFIG.run.screenshotsDir, `${Date.now()}-${name}.png`);
  await page.screenshot({ path: file, fullPage: true });
  console.log(`Saved screenshot: ${file}`);
}

function rx(text) {
  return new RegExp(text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
}

async function visible(locator, timeout = 1500) {
  try {
    await locator.first().waitFor({ state: "visible", timeout });
    return true;
  } catch {
    return false;
  }
}

async function clickFirstVisible(page, candidates, opts = {}) {
  const timeout = opts.timeout ?? 1500;

  for (const name of candidates) {
    const roleLocators = [
      page.getByRole("button", { name: rx(name) }),
      page.getByRole("link", { name: rx(name) }),
      page.getByRole("menuitem", { name: rx(name) }),
      page.getByRole("tab", { name: rx(name) }),
      page.getByText(rx(name), { exact: false }),
    ];

    for (const locator of roleLocators) {
      if (await visible(locator, timeout)) {
        await locator.first().click();
        console.log(`Clicked: ${name}`);
        return true;
      }
    }
  }

  return false;
}

async function fillFirstVisible(page, labels, value, opts = {}) {
  const timeout = opts.timeout ?? 1500;

  for (const label of labels) {
    const locators = [
      page.getByLabel(rx(label)),
      page.getByPlaceholder(rx(label)),
      page.locator(`input[aria-label*="${label}"], textarea[aria-label*="${label}"]`),
      page.locator(`input[name*="${label}"], textarea[name*="${label}"]`),
    ];

    for (const locator of locators) {
      if (await visible(locator, timeout)) {
        await locator.first().fill("");
        await locator.first().fill(value);
        console.log(`Filled field matching: ${label}`);
        return true;
      }
    }
  }

  return false;
}

async function fillEditableText(page, value) {
  const editableCandidates = [
    page.locator('[contenteditable="true"]'),
    page.locator("textarea"),
  ];

  for (const locator of editableCandidates) {
    if (await visible(locator, 1200)) {
      await locator.first().click();
      try {
        await locator.first().fill("");
      } catch {
        // contenteditable may not support fill
      }
      await page.keyboard.press(process.platform === "darwin" ? "Meta+A" : "Control+A");
      await page.keyboard.press("Backspace");
      await page.keyboard.type(value, { delay: 10 });
      return true;
    }
  }

  return false;
}

async function maybeDismissPopups(page) {
  await clickFirstVisible(page, [
    "Got it",
    "Close",
    "Dismiss",
    "Not now",
    "Maybe later",
    "Skip",
  ], { timeout: 800 });
}

async function waitForSignedIn(page) {
  await page.goto(CONFIG.run.baseUrl, { waitUntil: "domcontentloaded" });
  await maybeDismissPopups(page);

  const signedInSignals = [
    page.getByText(/creator/i),
    page.getByRole("link", { name: /my page/i }),
    page.getByRole("button", { name: /page controls/i }),
  ];

  for (const locator of signedInSignals) {
    if (await visible(locator, 2000)) {
      console.log("Looks signed in already.");
      return;
    }
  }

  console.log("\nYou may need to sign in manually in the opened browser window.");
  console.log("After you are signed in, leave the browser open and press Enter here.\n");

  process.stdin.resume();
  await new Promise((resolve) => process.stdin.once("data", resolve));
}

async function switchToCreatorProfile(page) {
  await maybeDismissPopups(page);

  const switched = await clickFirstVisible(page, [
    "Creator profile",
    "Switch to creator profile",
    "My creator profile",
  ]);

  if (switched) {
    await page.waitForLoadState("domcontentloaded");
    return;
  }

  const openedMenu = await clickFirstVisible(page, [
    "Account",
    "Profile",
    "Open user menu",
    "User menu",
    "Avatar",
  ], { timeout: 1000 });

  if (openedMenu) {
    await clickFirstVisible(page, [
      "Creator profile",
      "Switch to creator profile",
      "My creator profile",
    ], { timeout: 1500 });
  }
}

async function openMyPage(page) {
  const ok = await clickFirstVisible(page, [
    "My Page",
    "Home",
  ], { timeout: 2000 });

  if (!ok) {
    console.warn("Could not confidently click My Page. Continuing.");
  }

  await page.waitForLoadState("domcontentloaded");
  await maybeDismissPopups(page);
}

async function openPageCustomization(page) {
  await openMyPage(page);

  let opened = await clickFirstVisible(page, [
    "Page controls",
    "More",
    "•••",
    "...",
  ], { timeout: 1800 });

  if (opened) {
    const clicked = await clickFirstVisible(page, [
      "Edit page",
      "Customize page",
      "Page settings",
      "Customize your page",
    ], { timeout: 1800 });

    if (clicked) {
      await page.waitForLoadState("domcontentloaded");
      return true;
    }
  }

  return true;
}

async function updateCreatorPage(page) {
  console.log("\nUpdating creator page copy...");
  const opened = await openPageCustomization(page);
  if (!opened) {
    throw new Error("Could not open creator page customization.");
  }

  await maybeDismissPopups(page);

  await fillFirstVisible(page, [
    "Page title",
    "Title",
    "Headline",
    "Page name",
    "Creator name",
  ], CONFIG.creatorBrand.headline).catch(() => {});

  await fillFirstVisible(page, [
    "Tagline",
    "Subtitle",
    "Subheadline",
    "Summary",
    "Short description",
  ], CONFIG.creatorBrand.subheadline).catch(() => {});

  const aboutFilled =
    await fillFirstVisible(page, [
      "About",
      "Description",
      "Page description",
      "About your page",
      "Bio",
    ], CONFIG.creatorBrand.about);

  if (!aboutFilled) {
    console.warn("Could not find a labeled About field. Trying generic editable text.");
    await fillEditableText(page, CONFIG.creatorBrand.about).catch(() => {});
  }

  await fillFirstVisible(page, [
    "Display name",
    "Name",
    "Creator name",
  ], CONFIG.creatorBrand.displayName).catch(() => {});

  await maybeDismissPopups(page);

  const saved = await clickFirstVisible(page, [
    "Save",
    "Save changes",
    "Publish changes",
    "Done",
  ], { timeout: 2000 });

  if (!saved) {
    console.warn("Could not find Save button automatically. Please save manually if needed.");
  }

  await screenshot(page, "creator-page-updated");
}

async function openTierEditor(page) {
  await openMyPage(page);
  await maybeDismissPopups(page);

  const pageControlsOpened = await clickFirstVisible(page, [
    "Page controls",
    "More",
    "•••",
    "...",
  ], { timeout: 1800 });

  if (pageControlsOpened) {
    const opened = await clickFirstVisible(page, [
      "Edit Tiers",
      "Membership",
      "Membership tab",
      "Manage tiers",
    ], { timeout: 1800 });

    if (opened) {
      await page.waitForLoadState("domcontentloaded");
      return true;
    }
  }

  const openedMembership = await clickFirstVisible(page, [
    "Membership",
    "Tiers",
    "Benefits",
  ], { timeout: 1800 });

  if (openedMembership) {
    await page.waitForLoadState("domcontentloaded");
    return true;
  }

  return false;
}

async function clickEditForTier(page, tierName) {
  const tierCard = page.locator(`text=${tierName}`).first();

  if (await visible(tierCard, 2500)) {
    const container = tierCard.locator("xpath=ancestor::*[self::div or self::section][1]");
    const editBtn = container.getByRole("button", { name: /edit/i });

    if (await visible(editBtn, 1200)) {
      await editBtn.click();
      return true;
    }

    const fallbackEdit = container.getByText(/edit/i).first();
    if (await visible(fallbackEdit, 1200)) {
      await fallbackEdit.click();
      return true;
    }

    await tierCard.click();
    const globalEdit = page.getByRole("button", { name: /edit/i });
    if (await visible(globalEdit, 1200)) {
      await globalEdit.first().click();
      return true;
    }
  }

  return false;
}

async function updateSingleTier(page, tier) {
  console.log(`\nUpdating tier: ${tier.existingName}`);

  const opened = await clickEditForTier(page, tier.existingName);
  if (!opened) {
    console.warn(`Could not open tier editor for "${tier.existingName}". Skipping.`);
    await screenshot(page, `tier-not-found-${tier.existingName.replace(/\s+/g, "-")}`);
    return;
  }

  await page.waitForLoadState("domcontentloaded");
  await maybeDismissPopups(page);

  await fillFirstVisible(page, [
    "Tier name",
    "Name",
    "Title",
  ], tier.newName);

  await fillFirstVisible(page, [
    "Price",
    "Monthly price",
    "Tier price",
  ], tier.price).catch(() => {});

  const descFilled =
    await fillFirstVisible(page, [
      "Description",
      "Tier description",
      "About this tier",
      "Summary",
    ], tier.description);

  if (!descFilled) {
    await fillEditableText(page, tier.description).catch(() => {});
  }

  const saved = await clickFirstVisible(page, [
    "Save",
    "Save changes",
    "Publish",
    "Done",
  ], { timeout: 2000 });

  if (!saved) {
    console.warn(`Could not find Save for tier "${tier.newName}". Save manually if needed.`);
  }

  await screenshot(page, `tier-updated-${tier.newName.replace(/\s+/g, "-")}`);

  await clickFirstVisible(page, [
    "Back",
    "Done",
    "Close",
    "Membership",
    "Tiers",
  ], { timeout: 1200 }).catch(() => {});
}

async function updateTiers(page) {
  console.log("\nOpening tier editor...");
  const opened = await openTierEditor(page);
  if (!opened) {
    throw new Error("Could not open Patreon tier management.");
  }

  for (const tier of CONFIG.tiers) {
    await updateSingleTier(page, tier);
  }
}

async function main() {
  await ensureDir(CONFIG.run.screenshotsDir);

  const context = await chromium.launchPersistentContext(CONFIG.run.userDataDir, {
    headless: CONFIG.run.headless,
    slowMo: CONFIG.run.slowMo,
    viewport: { width: 1440, height: 1000 },
  });

  const page = context.pages()[0] ?? await context.newPage();

  try {
    await waitForSignedIn(page);
    await switchToCreatorProfile(page);
    await updateCreatorPage(page);
    await updateTiers(page);

    console.log("\nDone. Review the Patreon UI carefully before closing the browser.");
    await screenshot(page, "final-state");
  } catch (error) {
    console.error("\nAgent failed:", error.message);
    await screenshot(page, "error-state");
    console.error("\nThe most common reason is Patreon changed a button label or field label.");
    console.error("Tweak the candidate labels in the helper arrays and rerun.");
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
