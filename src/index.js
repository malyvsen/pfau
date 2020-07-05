import * as ai from './ai.js';
import * as ui from './ui.js';


async function main() {
    await ai.init();
    await ui.init();
    while (true) {
        await ui.update();
    }
}


main();