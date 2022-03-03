# Freerice Bot

Automatically answers simple math questions on [Freerice](https://freerice.com/), via NodeJS
and Puppeteer, which means it can run in the background without needing a graphical display.

Handles the following edge cases:
* Age verification screen

Requires:
* [NPM & NodeJS runtime](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

To get it running, download the latest release, extract it, go into the root directory of
the extracted repository with your terminal of choice.

To install needed dependencies, run:

```
npm install
```

And then to run the script:

```
node freerice.js
```

To kill the script, simply `Ctrl+C` it (or whatever your system's equivalent is) from whatever
terminal you started it from, and left it running in.
