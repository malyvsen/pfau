export const gestures = {
    open: 'open',
    fist: 'fist'
}


export async function getHand(points) {
    if (points == null) return {gesture: undefined, center: undefined, radius: undefined};
    return {gesture: getGesture(points), ...getCursor(points)};
}


function getGesture(points) {
    const fourFingers = ['indexFinger', 'middleFinger', 'ringFinger', 'pinky']
    const fourTips = getFingerPoints(points, 3, fourFingers);
    const fourMids = getFingerPoints(points, 1, fourFingers);
    const palmBase = points.palmBase[0];
    const numBent = fourFingers.map(
        (finger, idx) => getDistanceSquared(fourTips[idx], palmBase) < getDistanceSquared(fourMids[idx], palmBase)
    ).reduce((cum, curr) => cum + curr, 0);
    return numBent >= 3 ? gestures.fist : gestures.open;
}


function getCursor(points) {
    const controlPoints = getFingerPoints(points, 3, ['thumb', 'pinky']);
    const center = controlPoints.reduce(
        (cum, curr) => [cum[0] + curr[0], cum[1] + curr[1]],
        [0, 0]
    ).map(val => val / controlPoints.length);
    const radius = Math.sqrt(controlPoints.map(
        point => getDistanceSquared(center, point.slice(0, 2))
    ).reduce((cum, curr) => cum + curr, 0)) * 0.75;
    return {center: center, radius: radius};
}


function getFingerPoints(points, pointIndex, fingers) {
    return fingers.map(finger => points[finger][pointIndex]);
}


function getDistanceSquared(a, b) {
    if (a.length != b.length) throw 'a and b must have equal length';
    return a.map(
        (aVal, idx) => Math.pow(aVal - b[idx], 2)
    ).reduce(
        (cum, curr) => cum + curr,
        0
    );
}