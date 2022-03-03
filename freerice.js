const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

const TARGET_URL = 'https://freerice.com/categories/basic-math-pre-algebra';

function puppeteerScript() {
    function parse(problem) {
        return problem.slice(0, -1).replaceAll(' x ', ' * ');
    }

    function submit(answer) {
        const options = document.querySelectorAll('.card-button');
        let flag = false;
        for (let i of options) {
            if (i.innerHTML == answer) {
                i.click();
                flag = true;
            }
        }
        if (flag == false) {
            options[0].click();
        }
    }

    let counter = 0;

    function main() {
        try {
            const problem = document.querySelector('.card-title').textContent;
            const parsedProblem = parse(problem);
            const answer = eval(parsedProblem);
            submit(answer);
            counter++;
            console.log(`You've gotten ${counter} right answers!`);
        } catch {
            document.querySelector('.card-button').click();
            console.log('Too hard of a question ;_;');
        }
    }

    function mainLoop() {
        // Since the delay argument to setTimeout needs to change
        // every iteration, we can't use setInterval. Recursion is
        // used instead.
        const delay = Math.round((Math.random() * 2) * 1000) + 3000;
        setTimeout(() => {
            console.clear();
            console.log(`${delay} milliseconds of delay`);
            main();
            // This does not trigger a stack overflow as expected, because
            // since setTimeout is delegated to the browser to keep track
            // of, the previous call is destroyed.
            mainLoop();
        }, delay)
    }

    mainLoop();
}

// Handles the age prompt upon first visit to page.
async function doAgePrompt(page) {
    await page.evaluate(() => {
        let inputBox = document.getElementsByTagName('input')[0];

        // Clone the input box, and set values. This removes the event handlers
        // that override the date we insert, so it can't be changed back once we set it.
        let inputBoxClone = inputBox.cloneNode(true);
        inputBoxClone.className = inputBox.className;
        inputBoxClone.value = 'June 5, 1995';

        // Swap the original input box with the stunted one, that
        // has our new date inserted into it.
        let inputBoxParent = inputBox.parentNode;
        inputBoxParent.replaceChild(inputBoxClone, inputBox);

        // Submit the input.
        let ageSaveBtn = document.getElementsByClassName('age-screen-save-button')[0];
        ageSaveBtn.click();
    });
}

puppeteer.use(StealthPlugin());

(async () => {
    // `headless: false` will open a Chrome window and show the operation live.
    // `headless: true` will run it in the background with a Chrome window. Saves resources.
    const browser = await puppeteer.launch({
        headless: true
    });
    const page = (await browser.pages())[0];
    await page.goto(TARGET_URL);
    await page.waitFor(4000);
    // await page.screenshot({ path: 'screenshot.png', fullPage: true });

    // If visiting for the first time, an age prompt screen will appear.
    // This gives it a random value, and clicks through the prompt.
    let url = await page.url();
    if (url == 'https://freerice.com/age-screen') {
        await doAgePrompt(page);
    }

    await page.waitFor(3000);

    // Now run the actual answer automation code.
    await page.evaluate(puppeteerScript);

    // This will immediately close the browser before actually answering questions.
    // In order to stop the script, simply kill it from the terminal (Ctrl+C) it was
    // launched from.
    // await browser.close();
})();
