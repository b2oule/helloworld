const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto('https://gopages.segment.com/manage-preferences.html?mkt_unsubscribe=1', { waitUntil: 'networkidle0' });

  // Extract data from the page
  const data = await page.evaluate(() => {
    const buttons = [...document.querySelectorAll('button')].map(button => ({
      text: button.innerText,
      id: button.id
    }));

    const checkboxes = [...document.querySelectorAll('input[type="checkbox"]')].map(checkbox => ({
      id: checkbox.id,
      checked: checkbox.checked
    }));

    const inputs = [...document.querySelectorAll('input:not([type="checkbox"])')].map(input => ({
      type: input.type,
      id: input.id,
      placeholder: input.placeholder
    }));

    return {
      buttons,
      checkboxes,
      inputs
    };
  });

  // Log extracted data
  console.log(data);

  await browser.close();
})();