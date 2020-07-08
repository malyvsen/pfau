import { vectorMean, sum } from './utils/math.js';

export const gestures = {
    open: 'open',
    fist: 'fist'
}


export async function getHand(points) {
    if (points == null) return null;
    return {gesture: getGesture(points), ...getCursor(points)};
}


export function checkGesture(cursor, gesture) {
    return cursor && cursor.gesture == gesture;
}


function getGesture(points) {
    const fourFingers = ['indexFinger', 'middleFinger', 'ringFinger', 'pinky']
    const fourTips = getFingerPoints(points, 3, fourFingers);
    const fourMids = getFingerPoints(points, 1, fourFingers);
    const palmBase = points.palmBase[0];
    const numBent = sum(fourFingers.map(
        (finger, idx) => getDistanceSquared(fourTips[idx], palmBase) < getDistanceSquared(fourMids[idx], palmBase)
    ));
    return numBent >= 3 ? gestures.fist : gestures.open;
}


function getCursor(points) {
    const controlPoints = getFingerPoints(points, 3, ['thumb', 'pinky']);
    const center = vectorMean(controlPoints).slice(0, 2);
    const radius = Math.sqrt(sum(controlPoints.map(
        point => getDistanceSquared(center, point.slice(0, 2))
    ))) * 0.75;
    return {center: center, radius: radius};
}


function getFingerPoints(points, pointIndex, fingers) {
    return fingers.map(finger => points[finger][pointIndex]);
}


function getDistanceSquared(a, b) {
    if (a.length != b.length) throw 'a and b must have equal length';
    return sum(a.map(
        (aVal, idx) => Math.pow(aVal - b[idx], 2)
    ));
}