/*jshint esversion: 6 */
// @ts-nocheck

/**
 * Graphics Town Framework - "Main" File
 *
 * This is the main file - it creates the world, populates it with
 * objects and behaviors, and starts things running
 *
 * The initial distributed version has a pretty empty world.
 * There are a few simple objects thrown in as examples.
 *
 * It is the students job to extend this by defining new object types
 * (in other files), then loading those files as modules, and using this
 * file to instantiate those objects in the world.
 */

import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { WorldUI } from "../libs/CS559-Framework/WorldUI.js";

// import {main} from "../examples/main.js";

// ----------------------------------------------------------
// Object Imports
// ----------------------------------------------------------

import { GrWorldbox } from "./objects/gr-worldbox.js";
import { GrTrain } from "./objects/gr-train.js";
import {
    GrRoundTree,
    GrConeTree,
    GrTorusTree,
    GrIcosahedronTree,
    GrRoundTreeWithArm,
    GrLatheTree
} from "./objects/gr-tree.js";
import { GrTrainStation1, GrTrainStation2 } from "./objects/gr-train-station.js";
import { GrPerson } from "./objects/gr-person.js";
import { GrPagoda, GrWalkway1, GrWalkway2 } from "./objects/gr-pagoda.js";
import { GrSmallHouse } from "./objects/gr-small-house.js";
import { GrCar } from "./objects/gr-car.js";
import { GrTrainBarrier } from "./objects/gr-train-barrier.js";
import { GrStonePath1 } from "./objects/gr-stone-path.js";
import { GrFlag } from "./objects/gr-flag.js";

import { VolumetricSpotLight } from "./lights/volumetric-spot-light.js";

// Comment out the first line, and uncomment the second line to gaze at my failed attempt at making water myself.
// I am sad. Water was too hard.

import {GrLake} from "./objects/gr-lake-2.js";
// import {GrLake} from "./failed_water/gr-lake.js";

import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import * as T from "../libs/CS559-Three/build/three.module.js";

/**
 * The Graphics Town Main -
 * This builds up the world and makes it go...
 */

const generateColor = () => {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);

    return new T.Color(`rgb(${r}, ${g}, ${b})`);
}

const generateAutumnColor = () => {
    const r = Math.floor(Math.random() * 50) + 205;
    const g = Math.floor(Math.random() * 205) + 50; // + 125;
    const b = Math.floor(Math.random() * 50) + 50;

    return new T.Color(`rgb(${r}, ${g}, ${b})`);
}
const generateGreenColor = () => {
    const r = Math.floor(Math.random() * 50);
    const g = Math.floor(Math.random() * 100) + 155;
    const b = Math.floor(Math.random() * 50);

    return new T.Color(`rgb(${r}, ${g}, ${b})`);
}

// make the world

let world = new GrWorld({
    width: 800,
    height: 600,
    groundplane: new GrWorldbox(),
    // groundplanesize: 23, // make the ground plane big enough for a world of stuff
    ambient: 0,
    lookfrom: new T.Vector3(23 * 2, 23, -23 / 2),
    // lights: [dirLight],
});

// put stuff into the world
// this calls the example code (that puts a lot of objects into the world)
// you can look at it for reference, but do not use it in your assignment
// main(world);

// ----------------------------------------------------------
//  Skybox
// ----------------------------------------------------------

const loader = new T.CubeTextureLoader();
loader.setPath('./external/sky-cubemap/');

const textureCube = loader.load([
    'px.png', 'nx.png',
    'py.png', 'ny.png',
    'pz.png', 'nz.png'
]);

world.scene.background = textureCube;

// ----------------------------------------------------------
//  Scenery
// ----------------------------------------------------------

// Flag
world.add(new GrFlag({
    x: 15.5, y: 0, z: 1,
    rotation: Math.PI / 2 + 0.8
}));

// House
world.add(new GrSmallHouse({
    x: 12, y: 0, z: 10,
    rotation: 3 * Math.PI / 4
}));
world.add(new GrSmallHouse({
    x: 18, y: 0, z: -18,
    rotation: -3 * Math.PI / 4
}));

// Trees
world.add(new GrRoundTree({
    x: 10, z: -10,
    height: 1.5,
    leafColor: generateAutumnColor(),
}));
world.add(new GrConeTree({
    x: 8.5, z: -10.5,
    leafColor: generateAutumnColor(), // 0xFFFF00
}));
world.add(new GrTorusTree({
    x: 9.5, z: -11.5,
    leafColor: generateAutumnColor(), // 0xFF8C00,
    radius: 0.24, leafSize: 0.4
}));
world.add(new GrIcosahedronTree({
    x: 11.5, y: 0, z: -11,
    leafColor: generateAutumnColor(), // 0xFF4040
}));
world.add(new GrRoundTree({
    x: 7.2, z: -11,
    radius: 0.24,
    height: 2.5,
    leafColor: generateAutumnColor(), // 0xDA9825
}));
world.add(new GrIcosahedronTree({
    x: 5.5, z: -11.5,
    leafColor: generateAutumnColor(), // 0xFFFF00,
    rotation: 0.4
}));
world.add(new GrTorusTree({
    x: 6.5, z: -12.5,
    leafColor: generateAutumnColor(), // 0xEF4C40,
    radius: 0.24, leafSize: 0.4, rotation: 2
}));
world.add(new GrConeTree({
    x: 8.1, z: -12,
    leafColor: generateAutumnColor(), // 0xEF8429,
    leafSize: 0.6,
    height: 2.5
}));
world.add(new GrRoundTree({
    x: 11, z: -13.5,
    leafColor: generateAutumnColor()
}));
world.add(new GrConeTree({
    x: 9.5, z: -13,
    leafColor: generateAutumnColor()
}));
world.add(new GrIcosahedronTree({
    x: 8.4, z: -14,
    leafColor: generateAutumnColor(),
    leafSize: 0.8,
    rotation: 3.45
}));
world.add(new GrRoundTreeWithArm({
    x: 7, z: -14.5,
    leafColor: generateAutumnColor(),
    rotation: Math.PI / 2,
}));

// taller random trees
world.add(new GrRoundTree({
    x: 2, z: -13,
    height: 2.5,
    leafSize: 1.0,
    leafColor: generateAutumnColor(),
}));
world.add(new GrConeTree({
    x: 3, z: -15.2,
    height: 2.5,
    leafSize: 1.2,
    leafColor: generateAutumnColor(),
}));
world.add(new GrTorusTree({
    x: 4.5, z: -13.8,
    height: 2.5,
    leafSize: 0.8,
    rotation: Math.PI / 2 - 0.5,
    leafColor: generateAutumnColor(),
}));

world.add(new GrRoundTreeWithArm({
    x: -10, z: -12.5,
    leafColor: 0x00FF00,
    rotation: Math.PI / 2,
    armHeight: 0.8
}));

// Evergreens
const makeEvergreenTree = (x, z, height, leafHeight, leafWidth) => {
    return new GrLatheTree({
        x: x, z: z,
        height: height,
        leafSize: leafHeight,
        leafWidth: leafWidth,
        leafColor: generateGreenColor(),
    });
}

const evergreenTrees = [
    [-9.5, -10],
    [-10.5, -9],
    // forest
    [-11.5, 6.4],
    [-12.5, 4.8],
    [-13.8, 3.5],
    [-12.4, 2.5],
    [-10.7, 7.8],
    [-9.1, 10.2],
    [-7.6, 12.5],

    // by house
    [7, 10],
    [15.5, 4.5],
    [14.5, 3],
    [16.2, 2.5]
].map((coords) => makeEvergreenTree(coords[0], coords[1],
    1.75 + 0.5 * Math.random(),
    2 + 0.5 * Math.random(),
    1
));

evergreenTrees.forEach((tree) => world.add(tree));

const tallerEvergreenTrees = [
    [-13.8, 6.5],
    [-12.7, 8.8],
    [-11.1, 10.7],
    [-9.7, 12],

    // add even more
    [-15, 15],
    [-13.5, 17.2],
    [-12, 19.5],
    [-17.2, 12]
].map((coords) => makeEvergreenTree(coords[0], coords[1],
    2.7 + 0.8 * Math.random(),
    3 + 0.5 * Math.random(),
    1.3
));

tallerEvergreenTrees.forEach((tree) => world.add(tree));

// even taller evergreen trees
const evenTallerEvergreenTrees = [
    [-18, 15],
    [-19.5, 12.6],
    [-20.8, 10.3],
    [-21, 21],
    [-19, 18.6],
    [-20.3, 16.2],
    [-17.4, 21]

].map((coords) => makeEvergreenTree(coords[0], coords[1],
    3 + 1.0 * Math.random(),
    4 + 0.5 * Math.random(),
    1.5
));

evenTallerEvergreenTrees.forEach((tree) => world.add(tree));

// make some more colorful trees

const generateRandomTree = (x, y, z) => {
    const color = generateAutumnColor();

    let treeType = Math.floor(Math.random() * 6);

    switch(treeType) {
        case 0:
            return new GrRoundTree({
                x: x, y: y, z: z,
                height: 1.5 + Math.random(),
                leafColor: color
            });
        case 1:
            return new GrRoundTreeWithArm({
                x: x, y: y, z: z,
                height: 1.5 + Math.random(),
                leafColor: color
            });
        case 2:
            return new GrConeTree({
                x: x, y: y, z: z,
                leafColor: color
            });
        case 3:
            return new GrTorusTree({
                x: x, y: y, z: z,
                leafColor: color,
            });
        case 4:
            return new GrIcosahedronTree({
                x: x, y: y, z: z,
                leafColor: color,
            });
        case 5:
            return new GrLatheTree({
                x: x, y: y, z: z,
                leafColor: color,
            });
    }
    return null; // should never happen
}

const randomTrees = [
    // let's make a grid
    [16, 16],
    [16, 18],
    [16, 20],
    [16, 22],
    [18, 16],
    [18, 18],
    [18, 20],
    [18, 22],
    [20, 16],
    [20, 18],
    [20, 20],
    [20, 22],
    [22, 16],
    [22, 18],
    [22, 20],
    [22, 22],

    // add a few more
    [14, 18],
    [14, 20],
    [14, 22],
    [18, 14],
    [20, 14],
    [22, 14],
].map((coords) => generateRandomTree(coords[0], 0, coords[1]));

randomTrees.forEach((tree) => world.add(tree));

// ----------------------------------------------------------
//  Buildings
// ----------------------------------------------------------

const pagoda = new GrPagoda({
    x: 0, y: 0, z: 0
});
world.add(pagoda);

const walkway = new GrWalkway1({});
world.add(walkway);

const walkway2 = new GrWalkway2({});
world.add(walkway2);

// add people in the pagoda
const peopleInPagoda = [
    [0.5, 0.5],
    [-0.3, 0.7]
].map((coords) => new GrPerson({
    x: coords[0], y: 0.5, z: coords[1],
    color: generateColor()
}));

peopleInPagoda.forEach((person) => world.add(person));

// add car
const car = new GrCar({
    x: 12.5, y: 0, z: 5,
    rotation: Math.PI / 3,
    scale: 2
});
world.add(car);

const stonePath1 = new GrStonePath1({
    x: 0, y: 0, z: 0
});

world.add(stonePath1);

// ----------------------------------------------------------
//  Train
// ----------------------------------------------------------

const linearInterpolate = (a, b, tStart, tEnd, t) => {
    if(t < tStart) {
        return a;
    }
    if(t > tEnd) {
        return b;
    }
    return a + (b - a) * (t - tStart) / (tEnd - tStart);
}

let train_t = 0;

// Train stations
world.add(new GrTrainStation1({

}));

world.add(new GrTrainStation2({

}));

let barrierStepT = (delta, timeOfDay, ob) => {
    let t = train_t;

    if(t > 3.5 && t < 4) {
        // flash red lights
        ob.light1.intensity = 4 * Math.sin(t * 20) + 4;
    }
    else if(t > 4 && t < 5) {
        // closing
        ob.light1.intensity = 4 * Math.sin(t * 20) + 4;
        ob.barrier.rotation.x = linearInterpolate(Math.PI / 2, 0, 4, 5, t);
    }
    else if(t > 5 && t < 6) {
        // still closed
        // don't change anything
        ob.light1.intensity = 8;
    }
    else if(t > 6 && t < 6.5) {
        // opening
        ob.barrier.rotation.x = linearInterpolate(0, Math.PI / 2, 6, 6.5, t);
        ob.light1.intensity = 0;
    }
    else {
        ob.barrier.rotation.x = Math.PI / 2;
        ob.light1.intensity = 0;
    }

    return t;
};

world.add(new GrTrainBarrier({
    x: 0, y: 0, z: -15.5,
    rotation: Math.PI / 2 + 0.18,
    step_t: barrierStepT
}));

world.add(new GrTrainBarrier({
    x: -2.55, y: 0, z: -18.2,
    rotation: 3 * Math.PI / 2 + 0.18,
    step_t: barrierStepT
}));

// people who just stand at train station 1
const createStandingPerson = (x, z) => {
    return new GrPerson({
        x: x, y: 0.55, z: z,
        color: generateColor()
    });
}

const createPersonBoardingTrain = (x, z, targetX, targetZ, stops) => {
    return new GrPerson({
        x: x, y: -0.2, z: z,
        color: generateColor(),
        t: train_t,
        step_t: (delta, timeOfDay, ob) => {
            let t = train_t;

            if(t > stops[0] && t < stops[1]) {
                if(ob.whole_ob.visible === false) {
                    ob.setY(-0.2);
                    ob.whole_ob.position.x = x;
                    ob.whole_ob.position.z = z;

                    ob.materialize();
                }

                ob.setY(linearInterpolate(-0.2, 0.55, stops[0], stops[1], t));
            }
            if(t > stops[1] && t < stops[2]) {
                ob.whole_ob.position.x = linearInterpolate(x, targetX, stops[1], stops[2], t);
                ob.whole_ob.position.z = linearInterpolate(z, targetZ, stops[1], stops[2], t);
            }
            if(t > stops[2] && t < stops[3]) {
                if(ob.whole_ob.visible === true) {
                    ob.aDisappearingAct();
                }
            }

            // whole_ob.position.x = linearInterpolate(x, x + 1, 0, 1, t);

            return t;
        }
    });
}

const createPersonLeavingTrain = (x, z, targetX, targetZ, stops) => {
    return new GrPerson({
        x: x, y: -0.2, z: z,
        color: generateColor(),
        t: train_t,
        step_t: (delta, timeOfDay, ob) => {
            let t = train_t;

            if(t > stops[0] && t < stops[1]) {
                if(ob.whole_ob.visible === false) {
                    ob.setY(0.55);
                    ob.whole_ob.position.x = x;
                    ob.whole_ob.position.z = z;

                    ob.materialize();
                }
                ob.whole_ob.position.x = linearInterpolate(x, targetX, stops[0], stops[1], t);
                ob.whole_ob.position.z = linearInterpolate(z, targetZ, stops[0], stops[1], t);
            }
            if(t > stops[1] && t < stops[2]) {
                ob.setY(linearInterpolate(0.55, -0.2, stops[1], stops[2], t));
            }
            if(t > stops[2] && t < stops[3]) {
                if(ob.whole_ob.visible === true) {
                    ob.aDisappearingAct();
                }
            }

            return t;
        }
    });
}

// Train Station 1 people

const people = [
    [20.1, 8],
    [19.3, 8.5],
    [20.32, 4.5],
    [19.6, 7],
    [19.77, 7.3],
    [20.1, 6]
].map((coords) => createStandingPerson(coords[0], coords[1]));

people.forEach((person) => world.add(person));

const peopleBoardingTrain = [
    [18.8, 9.5, 17.6, 9],
    [19.1, 6, 18.2, 6.5],
    [19.2, 6.5, 18.2, 6.7],
].map((coords) => createPersonBoardingTrain(coords[0], coords[1], coords[2], coords[3],
    [2, 3, 3.003, 3.1]
));

peopleBoardingTrain.forEach((person) => world.add(person));

const peopleLeavingTrain = [
    [18.2, 4, 19.4, 5.6],
    [18.2, 4.5, 19.8, 4.2],
    [18.2, 4.2, 19.4, 3.6],
].map((coords) => createPersonLeavingTrain(coords[0], coords[1], coords[2], coords[3],
    [3, 3.003, 4, 4.1]
));

peopleLeavingTrain.forEach((person) => {
    person.aDisappearingAct();
    world.add(person);
});

// Train Station 2 people

const people2 = [
    [-12.5, -14.5],
    [-14.3, -14.3],
    [-14, -15],
    [-15.5, -11.5],
    [-16, -12.5],
].map((coords) => createStandingPerson(coords[0], coords[1]));

people2.forEach((person) => world.add(person));

const peopleBoardingTrain2 = [
    [-15.5, -11, -15, -10],
    [-13.1, -13.4, -13.3, -11.7],
    [-13.2, -13.5, -13.7, -11.3],
].map((coords) => createPersonBoardingTrain(coords[0], coords[1], coords[2], coords[3],
    [5.5, 6.5, 6.503, 6.6]
));

peopleBoardingTrain2.forEach((person) => world.add(person));

const peopleLeavingTrain2 = [
    [-11.3, -13, -14.2, -13.1],
    [-11.1, -13.3, -12.9, -14.1],
    [-10.9, -13.6, -12, -14.5],
].map((coords) => createPersonLeavingTrain(coords[0], coords[1], coords[2], coords[3],
    [6.5, 6.503, 7.5, 7.6]
));

peopleLeavingTrain2.forEach((person) => {
    person.aDisappearingAct();
    world.add(person);
});

// More complex moving people
// Let's make a bunch of points they can move between

const walkingPoints = [
    [10, 0.5, 10],
    [8, 0, 8],
    [0, 0.4, 0],
    [0, 0.2, -10],
    [-0.75, 0, -14.5],
    [-1.75, 0, -19.1],
    [-2.3, 0, -21],
]

// debug to show all points walking between

// walkingPoints.forEach((point, i) => {
//     let curPt = new T.Mesh(
//         new T.SphereGeometry(0.1, 32, 32),
//         new T.MeshStandardMaterial({
//             color: 0x00FF00
//         })
//     );
//     curPt.position.y = point[1] + 0.1;
//     curPt.position.x = point[0];
//     curPt.position.z = point[2];
//     world.add(new GrObject(`point-${i}`, curPt));
// });

let curPoint = 2;
let direction = 1;

const calculateDist = (a, b) => {
    return Math.sqrt((walkingPoints[a][0] - walkingPoints[b][0]) ** 2
        + (walkingPoints[a][1] - walkingPoints[b][1]) ** 2
        + (walkingPoints[a][2] - walkingPoints[b][2]) ** 2);
}

let curDist = calculateDist(curPoint, curPoint + direction);
let curT = 0;

// walk between all points
const walkingPerson = new GrPerson({
    x: 0, y: 0.4, z: 0,
    color: generateColor(),
    name: "walking-person",

    // here comes the complicated part
    step_t: (delta, timeOfDay, ob) => {
        // don't move if the barriers are coming down or are down
        if(train_t > 3.5 && train_t < 6.4) {
            // stops 5 and 6 (indices 4 and 5) are the barriers
            if(curPoint === 4 && curT < 0.2 && direction === 1) {
                ob.whole_ob.position.y = 0;
                return curT;
            } else if(curPoint === 5 && curT < 0.2 && direction === -1) {
                ob.whole_ob.position.y = 0;
                return curT;
            }
        }

        curT += delta / 1000;

        ob.whole_ob.position.x = linearInterpolate(walkingPoints[curPoint][0], walkingPoints[curPoint + direction][0], 0, curDist, curT);
        ob.whole_ob.position.y = linearInterpolate(walkingPoints[curPoint][1], walkingPoints[curPoint + direction][1], 0, curDist, curT);
        ob.whole_ob.position.z = linearInterpolate(walkingPoints[curPoint][2], walkingPoints[curPoint + direction][2], 0, curDist, curT);

        // set rotation
        ob.whole_ob.lookAt(walkingPoints[curPoint + direction][0], walkingPoints[curPoint + direction][1], walkingPoints[curPoint + direction][2]);

        // walking speed: 1 unit per second
        if(curT >= curDist) {
            // if last point: switch direction
            let newPoint = curPoint + direction;
            // if newpoint is last point flip direction
            if(newPoint === walkingPoints.length - 1 || newPoint === 0) {
                direction *= -1;
            }
            curPoint = newPoint;
            curDist = calculateDist(curPoint, curPoint + direction);
            curT = 0;
        }

        return curT;
    }
});
world.add(walkingPerson);
walkingPerson.rideable = walkingPerson.objects[0].children[1];

// Train helper functions

const between = (t, a, b) => {
    return t > a && t <= b;
}

// this is a terrible stepwise function to get the train to slow down
const stepwiseStop = (times, t, delta) => {
    if(between(t, times[0],  times[1])) {
        return t + delta / linearInterpolate(2000, 5000, times[0], times[1], t);
    }
    if(between(t, times[1], times[2])) {
        return t + delta / linearInterpolate(5000, 20000, times[1], times[2], t);
    }
    if(between(t, times[2], times[3])) {
        return t + delta / 1000000;
    }
    if(between(t, times[3], times[4])) {
        return t + delta / linearInterpolate(20000, 5000, times[3], times[4], t);
    }
    if(between(t, times[4], times[5])) {
        return t + delta / linearInterpolate(5000, 2000, times[4], times[5], t);
    }
    return null;
}

let train = new GrTrain({
    numCars: 3,
    points: [
        [-15, 10],
        [-5, 16],
        [14, 14],
        [18, 0],
        [10, -16],
        [-5, -16],
        [-15, -10],
        [-17, 0]
    ],
    tieSpacing: 0.5,
    t_func: (delta, t) => {
        // stop 1
        const new_t = stepwiseStop([2.5, 2.9, 3, 3.003, 3.1, 3.5], t, delta);
        if (new_t) {
            train_t = new_t;
            return train_t;
        }

        // stop 2
        const new_t2 = stepwiseStop([6, 6.4, 6.5, 6.503, 6.6, 7], t, delta);
        if (new_t2) {
            train_t = new_t2;
            return train_t;
        }

        train_t = t + delta / 2000;
        return train_t;
    },
    world: world
});
world.add(train);

// ----------------------------------------------------------
//  Lake
// ----------------------------------------------------------

const lake = new GrLake({
    world: world
});
world.add(lake);

// ----------------------------------------------------------
//  Volumetric lights
// ----------------------------------------------------------

let ap = 6;
let attn = 100;
let rotation = new T.Euler(Math.PI / 4, 0, 0, "XYZ");

const volumetricLight = new VolumetricSpotLight({
    x: -1,
    y: -2,
    z: 1,
    topRadius: 2,
    bottomRadius: 3,
    height: 100,
    attenuation: attn,
    anglePower: ap,
    rotation: rotation
});
world.add(volumetricLight);

const volumetricLight2 = new VolumetricSpotLight({
    x: 1,
    y: -2,
    z: 3,
    topRadius: 2,
    bottomRadius: 3,
    height: 100,
    attenuation: attn,
    anglePower: ap,
    rotation: rotation
});
world.add(volumetricLight2);

const volumetricLight3 = new VolumetricSpotLight({
    x: 3,
    y: -2,
    z: 2,
    topRadius: 2,
    bottomRadius: 3,
    height: 100,
    attenuation: attn,
    anglePower: ap,
    rotation: rotation
});
world.add(volumetricLight3);

const volumetricLight4 = new VolumetricSpotLight({
    x: 1,
    y: -2,
    z: 6,
    topRadius: 2,
    bottomRadius: 3,
    height: 100,
    attenuation: attn,
    anglePower: ap,
    rotation: rotation
});
world.add(volumetricLight4);

// add a directional light from the source of the volumetric lights
const dirLight = new T.DirectionalLight(0xffffff, 1);
dirLight.position.set(0, 20, 20);
dirLight.target = train.whole_ob;
// dirLight.lookAt(0, 0, 0);
dirLight.castShadow = true;
dirLight.shadowDarkness = 0.5;

dirLight.shadow.camera = new T.OrthographicCamera(-30, 30, 30, -30, 1, 100);

world.add(new GrObject("dir-light", dirLight));

// Enable shadows

world.renderer.shadowMap.enabled = true;

// Procedurally add shadows to all objects
// I don't want shadows on the volumetric lights, the worldbox, or the lake

// This is a little inefficient, but I think it's easier than manually adding shadows to every object when I make them

world.objects.forEach((ob) => {
    ob.objects.forEach((ob2) => {
        let name = ob.name.toLowerCase();
        if(
            name.includes("volumetric") ||
            name.includes("world") ||
            name.includes("lake") ||
            name.includes("stone-path") ||
            name.includes("flag")
        ) {
            return;
        }

        ob2.traverse(
            function (child) {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            }
        )
    });
});

// ----------------------------------------------------------
//  Testing
// ----------------------------------------------------------

// There probably isn't much here after I finish the assignment. Hopefully.

// const cube = new T.Mesh(
//     new T.BoxGeometry(6, 4, 6),
//     new T.MeshStandardMaterial({color: 0x888888})
// );
//
// cube.position.set(0, 3.5, 0);
//
// world.add(new GrObject("cube", cube));
//
// const cube2 = new T.Mesh(
//     new T.BoxGeometry(1, 1, 1),
//     new T.MeshStandardMaterial({color: 0x888888})
// );
//
// cube2.position.set(0, 7, 0);
//
// world.add(new GrObject("cube2", cube2));

// world.add(new GrObject("cam-helper", new T.CameraHelper(dirLight.shadow.camera)));

///////////////////////////////////////////////////////////////
// because I did not store the objects I want to highlight in variables, I need to look them up by name
// This code is included since it might be useful if you want to highlight your objects here
function highlight(obName) {
    const toHighlight = world.objects.find(ob => ob.name === obName);
    if (toHighlight) {
        toHighlight.highlighted = true;
    } else {
        throw `no object named ${obName} for highlighting!`;
    }
}

// of course, the student should highlight their own objects, not these

// big train
highlight("train");

// objects created for this assignment
highlight("train-station-1");
highlight("pagoda-1");

// other 5 objects
highlight("car-1");
highlight("lathe-tree-1");
highlight("walkway-1");
highlight("lake");
highlight("stone-path");

// loaded model
highlight("small-house-1");

// shader
highlight("flag-1");

// behaviors
// train already highlighted
highlight("walking-person");
highlight("train-barrier-1");

// complex behavior
// train already highlighted

// articulated figure animated
// train barrier already highlighted

// complex objects
highlight("volumetric-spot-light-1");

///////////////////////////////////////////////////////////////
// build and run the UI
// only after all the objects exist can we build the UI
// @ts-ignore       // we're sticking a new thing into the world
world.ui = new WorldUI(world);

// now make it go!
world.go();
