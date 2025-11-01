import {GrObject} from "../../libs/CS559-Framework/GrObject.js";
import * as T from "../../libs/CS559-Three/build/three.module.js";

const textureLoader = new T.TextureLoader();

// octagonal pagoda
// will be in the middle of the lake

let pagodaCount = 0;

let concreteColorMap = textureLoader.load("./external/pagoda/Concrete034_1K-JPG_Color.jpg", function (texture) {
    texture.wrapS = T.RepeatWrapping;
    texture.wrapT = T.RepeatWrapping;
    texture.repeat.set(1, 1);
});
let concreteNormalMap = textureLoader.load("./external/pagoda/Concrete034_1K-JPG_NormalGL.jpg", function (texture) {
    texture.wrapS = T.RepeatWrapping;
    texture.wrapT = T.RepeatWrapping;
    texture.repeat.set(1, 1);
});

let woodColorMap = textureLoader.load("./external/track/Wood060_1K-JPG_Color.jpg", function (texture) {
    texture.wrapS = T.RepeatWrapping;
    texture.wrapT = T.RepeatWrapping;
    // texture.repeat.set(6, 6);
});
let woodNormalMap = textureLoader.load("./external/track/Wood060_1K-JPG_NormalGL.jpg", function (texture) {
    texture.wrapS = T.RepeatWrapping;
    texture.wrapT = T.RepeatWrapping;
    // texture.repeat.set(6, 6);
});
let woodRoughnessMap = textureLoader.load("./external/track/Wood060_1K-JPG_Roughness.jpg", function (texture) {
    texture.wrapS = T.RepeatWrapping;
    texture.wrapT = T.RepeatWrapping;
    // texture.repeat.set(6, 6);
});

let roofRepeat = 6;
let roofColorMap = textureLoader.load("./external/train-station/RoofingTiles001_1K-JPG_Color.jpg", function (texture) {
    texture.wrapS = T.RepeatWrapping;
    texture.wrapT = T.RepeatWrapping;
    texture.repeat.set(roofRepeat, 1);
});
let roofNormalMap = textureLoader.load("./external/train-station/RoofingTiles001_1K-JPG_NormalGL.jpg", function (texture) {
    texture.wrapS = T.RepeatWrapping;
    texture.wrapT = T.RepeatWrapping;
    texture.repeat.set(roofRepeat, 1);
});
let roofRoughnessMap = textureLoader.load("./external/train-station/RoofingTiles001_1K-JPG_Roughness.jpg", function (texture) {
    texture.wrapS = T.RepeatWrapping;
    texture.wrapT = T.RepeatWrapping;
    texture.repeat.set(roofRepeat, 1);
});

export class GrPagoda extends GrObject {
    constructor(params = {}) {
        let pagoda = new T.Group();

        // support pillars
        let pillarGeometry = new T.CylinderGeometry(0.1, 0.1, 2.5, 8);
        pillarGeometry.translate(0, 1.25, 0);

        let pillars = new T.Group();

        let incircleRadius = 2.414;
        let pillarLocations = [
            [1, incircleRadius],
            [-1, incircleRadius],
            [-incircleRadius, 1],
            [-incircleRadius, -1],
            [-1, -incircleRadius],
            [1, -incircleRadius],
            [incircleRadius, -1],
            [incircleRadius, 1]
        ];

        let pillarMaterial = new T.MeshStandardMaterial({
            map: woodColorMap,
            color: 0xFFA0A0,
        })

        pillarLocations.forEach((location) => {
            let pillar = new T.Mesh(pillarGeometry, pillarMaterial);
            pillar.position.set(location[0] * 0.8, 0, location[1] * 0.8);
            pillars.add(pillar);
        });

        pagoda.add(pillars);

        // floor
        let floorShape = new T.Shape();
        floorShape.moveTo(incircleRadius, 1);
        for (let i = 0; i < 8; i++) {
            floorShape.lineTo(pillarLocations[i][0], pillarLocations[i][1]);
        }

        let floorGeometry = new T.ExtrudeGeometry(floorShape, {
            depth: 0.2,
            bevelEnabled: true,
        });
        floorGeometry.rotateX(-Math.PI / 2);
        let floorMaterial = new T.MeshStandardMaterial({
            map: concreteColorMap,
            color: 0xCCCCCC,
            normalMap: concreteNormalMap,
        });

        let floor = new T.Mesh(floorGeometry, floorMaterial);

        pagoda.add(floor);

        // add middle segment and walls
        let middleMaterial = new T.MeshStandardMaterial({
            map: concreteColorMap,
            color: 0x999999,
            normalMap: concreteNormalMap,
        });

        let middleShape1 = new T.Shape();
        let innerMult = 0.6;
        let outerMult = 0.8;

        const move = (shape, pointOrder) => {
            shape.moveTo(pillarLocations[pointOrder[0]][0] * innerMult, pillarLocations[pointOrder[0]][1] * innerMult);

            for (let i = 1; i < pointOrder.length; i++) {
                shape.lineTo(pillarLocations[pointOrder[i]][0] * innerMult, pillarLocations[pointOrder[i]][1] * innerMult);
            }
            for (let i = pointOrder.length - 1; i >= 0; i--) {
                shape.lineTo(pillarLocations[pointOrder[i]][0] * outerMult, pillarLocations[pointOrder[i]][1] * outerMult);
            }
        }

        move(middleShape1, [6, 7, 0]);

        let middleGeometry1 = new T.ExtrudeGeometry(middleShape1, {
            depth: 0.5,
            bevelEnabled: false,
        });
        middleGeometry1.rotateX(-Math.PI / 2);
        middleGeometry1.translate(0, 0.25, 0);

        let middle1 = new T.Mesh(middleGeometry1, middleMaterial);
        pagoda.add(middle1);

        let middleShape2 = new T.Shape();
        move(middleShape2, [1, 2, 3, 4, 5]);

        let middleGeometry2 = new T.ExtrudeGeometry(middleShape2, {
            depth: 0.5,
            bevelEnabled: false,
        });
        middleGeometry2.rotateX(-Math.PI / 2);
        middleGeometry2.translate(0, 0.25, 0);

        let middle2 = new T.Mesh(middleGeometry2, middleMaterial);
        pagoda.add(middle2);

        // bench back (wooden)
        let backs = new T.Group();

        let back = new T.Group();

        let point1 = [outerMult * pillarLocations[0][0], outerMult * pillarLocations[0][1]];
        let point2 = [outerMult * pillarLocations[1][0], outerMult * pillarLocations[1][1]];

        let backGeometry = new T.BoxGeometry(0.05, 0.3, 0.05, 8);
        backGeometry.translate(0, 0.85, 0);

        let numRods = 12;
        for(let i = 0; i < numRods; i++) {
            // linearly interpolate between point1 and point2
            let x = (i + 1) / (numRods + 1) * point1[0] + (numRods - i) / (numRods + 1) * point2[0];
            let y = (i + 1) / (numRods + 1) * point1[1] + (numRods - i) / (numRods + 1) * point2[1];

            let box = new T.Mesh(backGeometry, pillarMaterial);
            box.position.set(x, 0, y);
            back.add(box);
        }

        // add top
        let backTopGeometry = new T.BoxGeometry(incircleRadius * outerMult * 0.9, 0.05, 0.05, 8);
        let backTop = new T.Mesh(backTopGeometry, pillarMaterial);
        backTop.position.set(point1[0] / 2 + point2[0] / 2, 1, point1[1] / 2 + point2[1] / 2);
        back.add(backTop);

        let backBottom = backTop.clone();
        backBottom.position.y = 0.7;
        back.add(backBottom);

        backs.add(back);

        [2, 3, 5, 6, 7].forEach(
            (i) => {
                let newback = back.clone();
                newback.rotateY(i * Math.PI / 4);
                backs.add(newback);
            }
        )

        pagoda.add(backs);

        let roofGeometry = new T.ConeGeometry(incircleRadius + 0.4, 2, 8);

        let roofMaterial = new T.MeshStandardMaterial({
            color: 0x888888,
            map: roofColorMap,
            normalMap: roofNormalMap,
            roughnessMap: roofRoughnessMap,
        });
        let roof = new T.Mesh(roofGeometry, roofMaterial);

        roof.position.y = 3.5;
        roof.rotation.y = Math.PI / 8;

        pagoda.add(roof);

        super(`pagoda-${++pagodaCount}`, pagoda);
        this.whole_ob = pagoda;

        this.whole_ob.position.x = params.x ? params.x : 0;
        this.whole_ob.position.y = params.y ? params.y : 0;
        this.whole_ob.position.z = params.z ? params.z : 0;
    }
}

// Walkways

export class GrWalkway1 extends GrObject {
    constructor(params = {}) {
        let walkway = new T.Group();

        let walkwayMaterial = new T.MeshStandardMaterial({
            map: woodColorMap,
            normalMap: woodNormalMap,
            roughnessMap: woodRoughnessMap,
            color: 0xAA9966,
        });

        let walkwayGeometry = new T.BoxGeometry(1.5, 0.2, 0.5);
        walkwayGeometry.translate(0, 0.1, 0);
        let walkwayMesh = new T.Mesh(walkwayGeometry, walkwayMaterial);

        walkway.add(walkwayMesh);

        for(let i = 0; i < 7; i++) {
            let newWalkway = walkwayMesh.clone();
            newWalkway.position.z = 0.7 * (i + 1);
            walkway.add(newWalkway);
        }

        walkway.position.x = 2.1;
        walkway.position.z = 2.1;

        walkway.rotation.y = Math.PI / 4;

        super("walkway-1", walkway);
        this.whole_ob = walkway;
    }
}

export class GrWalkway2 extends GrObject {
constructor(params = {}) {
        let walkway = new T.Group();

        let walkwayMaterial = new T.MeshStandardMaterial({
            map: woodColorMap,
            normalMap: woodNormalMap,
            roughnessMap: woodRoughnessMap,
            color: 0xAA9966,
        });

        let walkwayGeometry = new T.BoxGeometry(1.5, 0.2, 0.5);
        walkwayGeometry.translate(0, 0.1, 0);
        let walkwayMesh = new T.Mesh(walkwayGeometry, walkwayMaterial);

        walkway.add(walkwayMesh);

        for(let i = 0; i < 13; i++) {
            let newWalkway = walkwayMesh.clone();
            newWalkway.position.z = -0.7 * (i + 1);
            walkway.add(newWalkway);
        }

        walkway.position.x = 0;
        walkway.position.z = -2.9;

        super("walkway-2", walkway);
        this.whole_ob = walkway;
    }
}
