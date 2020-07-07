import * as ai from './ai.js';
import * as hand from './hand.js';
import * as webcam from './webcam.js';
import * as paint from './paint.js';
import * as ui from './ui.js';


const states = {
    painting: 'painting',
    preMenu: 'preMenu',
    menu: 'menu',
    postMenu: 'postMenu'
};


let state = states.preMenu;
let brush = paint.brushes.brush;


export async function update() {
    const frame = await webcam.getFrame();
    const points = await ai.getPoints(frame);
    const cursor = await hand.getHand(points);
    switch (state) {
        case states.painting:
            if (points != null) await paint.paint(cursor, brush);
            await ui.drawPainting(frame, paint.painting);
            if (cursor.gesture == hand.gestures.fist) state = states.preMenu;
            break;
        case states.preMenu:
            await ui.drawMenu(frame, cursor);
            if (cursor.gesture == hand.gestures.open) state = states.menu;
            break;
        case states.menu:
            const choice = await ui.drawMenu(frame, cursor);
            switch (choice) {
                case ui.choices.brush:
                    brush = paint.brushes.brush;
                    state = states.postMenu;
                    break;
                case ui.choices.eraser:
                    brush = paint.brushes.eraser;
                    state = states.postMenu;
                    break;
            }
            break;
        case states.postMenu:
            await ui.drawPainting(frame, paint.painting);
            if (cursor.gesture == hand.gestures.open) state = states.painting;
            break;
    }
}