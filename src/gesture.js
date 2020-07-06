export const none = 'none';
export const open = 'open';
export const fist = 'fist';


export async function getGesture(points) {
    if (points == null) return none;
    const fourFingers = ['indexFinger', 'middleFinger', 'ringFinger', 'pinky']
    const fourTips = getFingerPoints(points, 3, fourFingers);
    const fourMids = getFingerPoints(points, 1, fourFingers);
    const palmBase = points.palmBase[0];
    const numBent = fourFingers.map(
        (finger, idx) => getDistanceSquared(fourTips[idx], palmBase) < getDistanceSquared(fourMids[idx], palmBase)
    ).reduce((cum, curr) => cum + curr, 0);
    if (numBent >= 3) return fist;
    return open;
}


export function getFingerPoints(points, pointIndex, fingers) {
    return fingers.map(finger => points[finger][pointIndex]);
}


export function getDistanceSquared(a, b) {
    if (a.length != b.length) throw 'a and b must have equal length';
    return a.map(
        (aVal, idx) => Math.pow(aVal - b[idx], 2)
    ).reduce(
        (cum, curr) => cum + curr,
        0
    );
}