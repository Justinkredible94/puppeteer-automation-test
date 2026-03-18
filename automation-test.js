const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // Go to Google
  await page.goto("https://google.com");

  // Search
  await page.type("textarea[name='q']", "puppeteer automation");
  await page.keyboard.press("Enter");

  // Wait for results to load
  await page.waitForSelector("h3");

  // Click the first result
  const results = await page.$$("h3");
  await results[0].click();

  // Wait for new page
  await page.waitForNavigation();

  // Check page title
  const title = await page.title();

  console.log("Page title is:", title);

  if (title.toLowerCase().includes("puppeteer")) {
    console.log("✅ TEST PASSED");
  } else {
    console.log("❌ TEST FAILED");
  }

  await new Promise(resolve => setTimeout(resolve, 3000));

  await browser.close();
})();