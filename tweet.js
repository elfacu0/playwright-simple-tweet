require('dotenv').config();
const { webkit, devices } = require('playwright');
const iPhone11 = devices['iPhone 11 Pro'];
// const playwright = require('playwright');

async function sendTweet(message) {
    const browser = await webkit.launch();
    const context = await browser.newContext({
        ...iPhone11,
    });

    // const browserType = 'firefox';
    // const browser = await playwright[browserType].launch();
    // const context = await browser.newContext();

    const page = await context.newPage();

    await login(page);
    await page.goto('https://twitter.com/compose/tweet');
    await page.fill('data-testid=tweetTextarea_0', message);

    //publish
    await page.click('data-testid=tweetButton');
    await page.waitForSelector('data-testid=toast', { state: 'attached' });
    await browser.close();
}

async function login(page) {
    const user = process.env.USER;
    const password = process.env.PASSWORD;
    await page.goto('https://twitter.com/login');

    const userInput = 'input[name="session[username_or_email]"]';
    await page.fill(userInput, user);
    const passwordInput = 'input[name="session[password]"]';
    await page.fill(passwordInput, password);

    await page.click('data-testid=LoginForm_Login_Button');
}

const args = process.argv[2];
sendTweet(args);
