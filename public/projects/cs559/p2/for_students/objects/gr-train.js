// Code adapted from Project 1!
// (Yes, my Project 1. So it's my own code.)

import {GrObject} from "../../libs/CS559-Framework/GrObject.js";
import * as T from "../../libs/CS559-Three/build/three.module.js";

const textureLoader = new T.TextureLoader();

const woodColorMap = textureLoader.load("./external/track/Wood060_1K-JPG_Color.jpg");

// export class GrTrainTrack extends GrObject {
//     constructor(params = {}) {
//
//     }
// }

export class GrTrain extends GrObject {
    constructor(params = {}) {
        const world = params.world;

        const numCars = params.numCars ? params.numCars : 3;
        const thePoints = params.points ? params.points : [
            [10, 10],
            [10, -10],
            [-10, -10],
            [-10, 10]
        ];

        let whole_ob = new T.Group();
        let trainCars = new T.Group();
        let trainCarConnectors = new T.Group();

        let train = new T.Group();
        let trainCar = new T.Group();
        let track = new T.Group();

        let ridePoint = new T.Object3D();

        whole_ob.add(track);

        let body = new T.BoxGeometry(1, 1, 2, 16);
        let bodyMaterial = new T.MeshStandardMaterial({
            color: 0x444444,
            metalness: 0.5,
            roughness: 0,
            emissive: 0x708090,
            emissiveIntensity: 0.5
        });
        let bodyMesh = new T.Mesh(body, bodyMaterial);
        bodyMesh.position.y = 1;
        trainCar.add(bodyMesh);

        let wheel = new T.Group();
        let wheelOutsideMaterial = new T.MeshStandardMaterial({
            color: "black",
            metalness: 0.9,
            roughness: 0.1
        });
        let wheelOutsideGeometry = new T.TorusGeometry(0.3, 0.1, 16, 100);
        wheelOutsideGeometry.rotateY(Math.PI / 2);

        wheel.add(new T.Mesh(wheelOutsideGeometry, wheelOutsideMaterial));

        // add spokes
        let spokeMaterial = new T.MeshStandardMaterial({
            color: 0x444444,
            metalness: 0,
            roughness: 1
        });

        let spokeGeometry = new T.CylinderGeometry(0.05, 0.05, 0.6, 16);

        for(let i = 0; i < 3; i++) {
            let spoke = new T.Mesh(spokeGeometry, spokeMaterial);
            spoke.position.set(0, 0, 0);
            spoke.rotateY(Math.PI / 2);
            spoke.rotateZ(Math.PI / 3 * i);
            wheel.add(spoke);
        }

        wheel.position.set(0.5, 0.5, 0.6);
        trainCar.add(wheel);

        let wheel2 = wheel.clone();
        wheel2.position.set(-0.5, 0.5, 0.6);
        trainCar.add(wheel2);

        let wheel3 = wheel.clone();
        wheel3.position.set(0.5, 0.5, -0.6);
        trainCar.add(wheel3);

        let wheel4 = wheel.clone();
        wheel4.position.set(-0.5, 0.5, -0.6);
        trainCar.add(wheel4);

        trainCars.add(trainCar);

        for(let i = 1; i < numCars; i++) {
            let curTrainCar = trainCar.clone();
            // trainCar.position.set(-2 * i - 2, 0, 0);
            trainCars.add(curTrainCar);
        }

        let connector = new T.BoxGeometry(0.8, 0.8, 0.5);
        connector.translate(0, 1, 0);
        let connectorMaterial = new T.MeshStandardMaterial({
            color: 0x222222,
            metalness: 0.5,
            roughness: 1
        });
        let connectorMesh = new T.Mesh(connector, connectorMaterial);
        trainCarConnectors.add(connectorMesh);

        for(let i = 1; i < numCars - 1; i++) {
            let connector = connectorMesh.clone();
            trainCarConnectors.add(connector);
        }

        train.add(trainCarConnectors);
        train.add(trainCars);

        train.add(ridePoint);

        super("train", train);
        this.track = new GrObject("train-track", track);
        world.add(this.track);

        this.thePoints = thePoints;
        this.current_t = 0;
        this.whole_ob = whole_ob;
        this.trainCars = trainCars;
        this.trainCarConnectors = trainCarConnectors;
        // this.track = track;
        this.rideable = ridePoint;

        // set up parameters and current position
        const derivs = thePoints.map((pt, i) => {
            return getCardinalSplineDeriv(
                thePoints[i === 0 ? (thePoints.length - 1) : (i - 1)],
                thePoints[(i + 1) % thePoints.length],
                0 // set tension to 0 for now
            );
        });

        const spline = (t) => fullCardinalSpline(t, thePoints, derivs);
        this.spline = spline;
        const approximations = generateApproximations(spline, thePoints.length, 0.005, thePoints);
        this.approximations = approximations;

        const points = [];
        const offset = 0;

        for(let i = 0; i < approximations.length; i++) {
            let curApprox = approximations[i];
            let pt = spline(curApprox[0]);
            let next = spline(approximations[(i + 1) % approximations.length][0]);

            let angle = Math.atan2(next[1] - pt[1], next[0] - pt[0]);
            // move 5px parallel to the angle
            let dx = Math.cos(angle + Math.PI / 2) * offset;
            let dy = Math.sin(angle + Math.PI / 2) * offset;
            points.push(new T.Vector3(pt[0] + dx, 0, pt[1] + dy));
        }

        const shape = new T.Shape();
        shape.moveTo(-0.5, -0.5);
        shape.lineTo(-0.5, -0.5);
        shape.lineTo(-0.5, 0.5);
        shape.lineTo(-0.5, 0.5);
        shape.lineTo(-0.5, -0.5);

        const leftTrackShape = new T.Shape();
        leftTrackShape.moveTo(0, -0.5);
        leftTrackShape.lineTo(0, -0.5);
        leftTrackShape.lineTo(0, -0.4);
        leftTrackShape.lineTo(-0.2, -0.4);
        leftTrackShape.lineTo(-0.2, -0.5);

        const rightTrackShape = new T.Shape();
        rightTrackShape.moveTo(0, 0.5);
        rightTrackShape.lineTo(0, 0.5);
        rightTrackShape.lineTo(0, 0.4);
        rightTrackShape.lineTo(-0.2, 0.4);
        rightTrackShape.lineTo(-0.2, 0.5);

        const curve = new T.CatmullRomCurve3(points);

        const leftTrackGeometry = new T.ExtrudeGeometry(leftTrackShape, {
            depth: 0.5,
            bevelEnabled: false,
            steps: 100,
            extrudePath: curve
        });

        const rightTrackGeometry = new T.ExtrudeGeometry(rightTrackShape, {
            depth: 0.5,
            bevelEnabled: false,
            steps: 100,
            extrudePath: curve
        });

        const material = new T.MeshStandardMaterial({
            color: "gray",
            metalness: 0.8,
            roughness: 0
        });
        const leftTrack = new T.Mesh(leftTrackGeometry, material);
        const rightTrack = new T.Mesh(rightTrackGeometry, material);

        track.add(leftTrack);
        track.add(rightTrack);

        // draw rail ties
        let trackLength = approximations[approximations.length - 1][2];
        this.trackLength = trackLength;

        // let's draw one every 1 units or so
        let tieSpacing = params.tieSpacing ? params.tieSpacing : 1;
        let numTies = Math.floor(trackLength / tieSpacing);

        const railTieMaterial = new T.MeshStandardMaterial({
            map: woodColorMap,
            metalness: 0,
            roughness: 1,
            color: 0x888888
        });

        for(let i = 0; i <= numTies; i++) {
            let t = i * tieSpacing * thePoints.length / trackLength;

            let pos = reparametrize(spline, approximations, t, thePoints.length);
            let prevPos = reparametrize(spline, approximations, wrapT(t - 0.01, thePoints.length), thePoints.length);
            let futurePos = reparametrize(spline, approximations, wrapT(t + 0.01, thePoints.length), thePoints.length);

            let angle = -Math.atan2(futurePos[1] - prevPos[1], futurePos[0] - prevPos[0]);

            let tie = new T.BoxGeometry(0.2, 0.1, 1.2);
            let tieMesh = new T.Mesh(tie, railTieMaterial);
            tieMesh.position.set(pos[0], 0, pos[1]);
            tieMesh.rotation.y = angle;
            track.add(tieMesh);
        }

        this.t_func = params.t_func ? (delta, t) => {
            return wrapT(params.t_func(delta, t), thePoints.length);
        } : (delta, t) => {
            return wrapT(t + delta / 3000, thePoints.length);
        };
    }

    stepWorld(delta, timeOfDay) {
        this.current_t = this.t_func(delta, this.current_t);

        const drawTrain = (train, t) => {
            let pos = reparametrize(this.spline, this.approximations, t, this.thePoints.length);
            let prevPos = reparametrize(this.spline, this.approximations, wrapT(t - 0.01, this.thePoints.length), this.thePoints.length);
            let futurePos = reparametrize(this.spline, this.approximations, wrapT(t + 0.01, this.thePoints.length), this.thePoints.length);

            train.rotation.y = -Math.atan2(futurePos[1] - prevPos[1], futurePos[0] - prevPos[0]) + Math.PI / 2;
            train.position.set(pos[0], 0, pos[1]);
        }

        // rideable management
        drawTrain(this.rideable, wrapT(this.current_t, this.thePoints.length));
        this.rideable.rotation.y += Math.PI / 2;
        this.rideable.position.y = 1;

        this.trainCars.children.forEach((train, i) => {
            drawTrain(train, wrapT(this.current_t - i * 2.3 / this.trackLength * this.thePoints.length, this.thePoints.length));

            // rotate wheels
            for(let i = 1; i < train.children.length; i++) {
                train.children[i].rotation.x = this.current_t * Math.PI * 6;
            }
        });

        this.trainCarConnectors.children.forEach((connector, i) => {
            drawTrain(connector, wrapT(this.current_t - (1.15 + (i * 2.3)) / this.trackLength * this.thePoints.length, this.thePoints.length));
        });
    }
}

function wrapT(t, maxT) {
    if(t < 0) return maxT + t;
    return t % maxT;
}

// Catmull-Rom Cardinal Spline derivative
function getCatmullRomDeriv(lastPt, nextPt) {
    return getCardinalSplineDeriv(lastPt, nextPt, 0);
}

function getCardinalSplineDeriv(lastPt, nextPt, tension) {
    let s = (1 - tension) / 2;
    return [(nextPt[0] - lastPt[0]) * s / 3, (nextPt[1] - lastPt[1]) * s / 3];
}

// parametric equation for a cubic bezier curve
function bezierParametric(t, start, cp1, cp2, end) {
    return [
        ((1 - t) ** 3) * start[0]
        + 3 * ((1 - t) ** 2) * t * cp1[0]
        + 3 * (1 - t) * (t ** 2) * cp2[0]
        + (t ** 3) * end[0],
        ((1 - t) ** 3) * start[1]
        + 3 * ((1 - t) ** 2) * t * cp1[1]
        + 3 * (1 - t) * (t ** 2) * cp2[1]
        + (t ** 3) * end[1]
    ];
}

// parametric equation for the full cardinal spline
// runs from t=0 to t=(num points)
function fullCardinalSpline(t, points, derivs) {
    for(let i = 0; i < points.length; i++) {
        if(t < i + 1) {
            return bezierParametric(
                t - i,
                points[i],
                [points[i][0] + derivs[i][0], points[i][1] + derivs[i][1]],
                [points[(i + 1) % points.length][0] - derivs[(i + 1) % points.length][0], points[(i + 1) % points.length][1] - derivs[(i + 1) % points.length][1]],
                points[(i + 1) % points.length]
            );
        }
    }
}

function generateApproximations(fullSpline, numPoints, step, thePoints) {
    let approximations = [];

    let lastX = thePoints[0][0];
    let lastY = thePoints[0][1];
    let totalDist = 0;

    for(let t = 0; t < numPoints; t += step) {
        let [x, y] = fullSpline(t);
        let dist = Math.sqrt((lastX - x) ** 2 + (lastY - y) ** 2);
        totalDist += dist;
        approximations.push([t, dist, totalDist]);
        [lastX, lastY] = [x, y];
    }

    return approximations;
}

function reparametrize(fullSpline, approximations, t, numPoints) {
    // target distance
    let target = approximations[approximations.length - 1][2] * t / numPoints;

    let i = 0;
    while(approximations[i][2] < target) {
        i++;
    }
    // if i = 0 (first point) interpolate between point 0 and 1 instead in approximations
    // to avoid out of bounds error
    // this will just give back the first point (t=0)
    if(i === 0) i = 1;

    // linearly interpolate
    let dist = (target - approximations[i - 1][2]) / (approximations[i][2] - approximations[i - 1][2]);
    let reparametrized_t = (1 - dist) * approximations[i - 1][0] + dist * approximations[i][0];
    return fullSpline(reparametrized_t);
}

function reverseReparametrize(approximations, t, numPoints) {
    // t = target time
    let i = 0;
    while(approximations[i][0] < t) {
        i++;
    }

    if(i === 0) i = 1;

    // linearly interpolate
    let betweenage = (t - approximations[i - 1][0]) / (approximations[i][0] - approximations[i - 1][0]);
    let total_dist = (1 - betweenage) * approximations[i - 1][2] + betweenage * approximations[i][2];

    return total_dist * numPoints / approximations[approximations.length - 1][2];
}
