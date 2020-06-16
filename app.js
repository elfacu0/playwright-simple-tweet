const playwright = require('playwright');

(async () => {
    const browserType = 'firefox';
    const browser = await playwright[browserType].launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('http://fast.com/');
    //Si no funciona es porque el objeto se crea despues y no lo detecta
    //por ejemplo ssr y similares
    await page.click('#speed-progress-indicator');
    await page.screenshot({ path: `example-${browserType}.png` });
    await browser.close();
})();
