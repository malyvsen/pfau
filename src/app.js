import * as ai from './ai.js';
import * as gesture from './gesture.js';
import * as webcam from './webcam.js';
import * as paint from './paint.js';
import * as ui from './ui.js';


const states = {
    painting: 'painting',
    menu: 'menu'
};


let state = states.painting;


export async function update() {
    const frame = await webcam.getFrame();
    const points = await ai.getPoints(frame);
    const currentGesture = await gesture.getGesture(points);
    const cursor = await gesture.getCursor(points);
    if (currentGesture == gesture.fist) state = states.menu;
    switch (state) {
        case states.painting:
            if (cursor != null) await paint.paint(cursor);
            await ui.drawPainting(frame, paint.painting);
            break;
        case states.menu:
            const choice = await ui.drawMenu(frame, cursor);
            switch (choice) {
                case ui.choices.brush:
                    state = states.painting;
                    break;
            }
            break;
    }
}