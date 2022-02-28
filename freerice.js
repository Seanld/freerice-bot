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
        option[0].click();
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
    // Since the delay argument to `setTimeout` needs to change
    // every iteration, we can't use `setInterval`. Recursion is
    // used instead.
    const delay = Math.round((Math.random() * 2) * 1000) + 3000;
    setTimeout(() => {
        console.clear();
        console.log(`${delay} milliseconds of delay`);
        main();
        // This does not trigger a stack overflow as expected, because
        // since `setTimeout` is delegated to the browser to keep track
        // of, the previous call is destroyed.
        myLoop();
    }, delay)
}
      
mainLoop()


//random time intervals, rare time delays
//server idling with puppeteer to idle maximum efficiency
//legrange broswer
