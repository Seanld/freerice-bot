const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

const TARGET_URL = 'https://freerice.com/categories/basic-math-pre-algebra';

// async function parse(problem) {
//     return problem.slice(0, -1).replaceAll(' x ', ' * ');
// }

// async function submit(answer) {
//     const options = document.querySelectorAll('.card-button');
//     let flag = false;
//     for (let i of options) {
//         if (i.innerHTML == answer) {
//             i.click();
//             flag = true;
//         }
//     }
//     if (flag == false) {
//         option[0].click();
//     }
// }

// let counter = 0;

// async function main() {
//     try {
//         const problem = document.querySelector('.card-title').textContent;
//         const parsedProblem = parse(problem);
//         const answer = eval(parsedProblem);
//         submit(answer);
//         counter++;
//         console.log(`You've gotten ${counter} right answers!`);
//     } catch {
//         document.querySelector('.card-button').click();
//         console.log('Too hard of a question ;_;');
//     }
// }

// async function mainLoop() {
//     // Since the delay argument to `setTimeout` needs to change
//     // every iteration, we can't use `setInterval`. Recursion is
//     // used instead.
//     const delay = Math.round((Math.random() * 2) * 1000) + 3000;
//     setTimeout(() => {
//         console.clear();
//         console.log(`${delay} milliseconds of delay`);
//         main();
//         // This does not trigger a stack overflow as expected, because
//         // since `setTimeout` is delegated to the browser to keep track
//         // of, the previous call is destroyed.
//         mainLoop();
//     }, delay)
// }

// Handles the age prompt upon first visit to page.
// birthDateStr must be formatted like 'February 28, 2022'.
async function doAgePrompt(page, birthDateStr) {
    const inputFieldClass = '.react-datepicker-ignore-onclickoutside'
    // await page.waitForSelector(inputFieldClass);
    const inputField = await page.$$(inputFieldClass);
    console.log(inputField);
    inputField.value = birthDateStr;
}

puppeteer.use(StealthPlugin());

(async () => {
    const browser = await puppeteer.launch({
        headless: false
    });
    const page = (await browser.pages())[0];
    await page.goto(TARGET_URL);
    await page.waitFor(10000);
    await page.screenshot({ path: 'screenshot.png', fullPage: true });

    let url = await page.url();
    if (url == 'https://freerice.com/age-screen') {
        await doAgePrompt(page, 'June 12, 2001');
    }

    await page.screenshot({ path: 'screenshot2.png', fullPage: true });

    await browser.close();
})();
// mainLoop()


//random time intervals, rare time delays
//server idling with puppeteer to idle maximum efficiency
//legrange broswer
