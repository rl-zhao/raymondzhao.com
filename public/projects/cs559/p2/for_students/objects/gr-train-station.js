import {GrObject} from "../../libs/CS559-Framework/GrObject.js";
import * as T from "../../libs/CS559-Three/build/three.module.js";

// ----------------------------
//  Textures
// ----------------------------

const textureLoader = new T.TextureLoader();

const repeat = 0.2;

const stonesColorMap = textureLoader.load("./external/train-station/PavingStones128_1K-JPG_Color.jpg", function (texture) {
    texture.wrapS = texture.wrapT = T.RepeatWrapping;
    texture.repeat.set(repeat, repeat);
});
const stonesNormalMap = textureLoader.load("./external/train-station/PavingStones128_1K-JPG_NormalGL.jpg", function (texture) {
    texture.wrapS = texture.wrapT = T.RepeatWrapping;
    texture.repeat.set(repeat, repeat);
});
const stonesRoughnessMap = textureLoader.load("./external/train-station/PavingStones128_1K-JPG_Roughness.jpg", function(texture) {
    texture.wrapS = texture.wrapT = T.RepeatWrapping;
    texture.repeat.set(repeat, repeat);
});

const roofingRepeat = 0.3;

const roofingColorMap = textureLoader.load("./external/train-station/RoofingTiles001_1K-JPG_Color.jpg", function (texture) {
    texture.wrapS = texture.wrapT = T.RepeatWrapping;
    texture.repeat.set(roofingRepeat, roofingRepeat);
    texture.rotation = Math.PI / 2;
});
const roofingNormalMap = textureLoader.load("./external/train-station/RoofingTiles001_1K-JPG_NormalGL.jpg", function (texture) {
    texture.wrapS = texture.wrapT = T.RepeatWrapping;
    texture.repeat.set(roofingRepeat, roofingRepeat);
    texture.rotation = Math.PI / 2;
});
const roofingRoughnessMap = textureLoader.load("./external/train-station/RoofingTiles001_1K-JPG_Roughness.jpg", function(texture) {
    texture.wrapS = texture.wrapT = T.RepeatWrapping;
    texture.repeat.set(roofingRepeat, roofingRepeat);
    texture.rotation = Math.PI / 2;
});

// used for bench
const woodColorMap = textureLoader.load("./external/track/Wood060_1K-JPG_Color.jpg");

// sign textures
const sign1ColorMap = textureLoader.load("./textures/train-station/Green_Line_1.png");
const sign2ColorMap = textureLoader.load("./textures/train-station/Green_Line_2.png");

// emissive map
const signEmissiveMap = textureLoader.load("./textures/train-station/Green_Line_Emissive_Map.png");

// ----------------------------
//  Materials
// ----------------------------

const floorMaterial = new T.MeshStandardMaterial({
    color: 0xFFFFFF,
    map: stonesColorMap,
    normalMap: stonesNormalMap,
    roughnessMap: stonesRoughnessMap,
});

const roofMaterial = new T.MeshStandardMaterial({
    side: T.DoubleSide,
    color: 0xFFFFFF,
    map: roofingColorMap,
    normalMap: roofingNormalMap,
    roughnessMap: roofingRoughnessMap,
});

// ----------------------------
//  Common Objects
// ----------------------------

const makeStairs = (width) => {
    const stairs = new T.Group();

    const stair1Geometry = new T.BoxGeometry(width, 0.25 / 2, 0.3);
    const stair2Geometry = new T.BoxGeometry(width, 0.5 / 2, 0.3);
    const stair3Geometry = new T.BoxGeometry(width, 0.75 / 2, 0.3);

    stair1Geometry.translate(0, 0.25 / 4, 0);
    stair2Geometry.translate(0, 0.5 / 4, 0);
    stair3Geometry.translate(0, 0.75 / 4, 0);

    const stair1 = new T.Mesh(stair1Geometry, floorMaterial);
    stair1.position.set(0, 0, 0.75);

    const stair2 = new T.Mesh(stair2Geometry, floorMaterial);
    stair2.position.set(0, 0, 0.45);

    const stair3 = new T.Mesh(stair3Geometry, floorMaterial);
    stair3.position.set(0, 0, 0.15);

    stairs.add(stair1);
    stairs.add(stair2);
    stairs.add(stair3);

    return stairs;
}

const bench = new T.Group();

const benchSeatPartGeometry = new T.BoxGeometry(1.5, 0.06, 0.12);
const benchSeatPartMaterial = new T.MeshStandardMaterial({
    color: 0xFFFFFF,
    map: woodColorMap
});

const benchSeat = new T.Group();

const benchSeatPart1 = new T.Mesh(benchSeatPartGeometry, benchSeatPartMaterial);
benchSeatPart1.position.set(0, 0, 0.16);
benchSeat.add(benchSeatPart1);

const benchSeatPart2 = new T.Mesh(benchSeatPartGeometry, benchSeatPartMaterial);
benchSeatPart2.position.set(0, 0, 0.32);
benchSeat.add(benchSeatPart2);

const benchSeatPart3 = new T.Mesh(benchSeatPartGeometry, benchSeatPartMaterial);
benchSeatPart3.position.set(0, 0, 0);
benchSeat.add(benchSeatPart3);

benchSeat.position.y = 0.3;
bench.add(benchSeat);

// legs

const benchLegCurve = new T.CatmullRomCurve3(
    [
        new T.Vector3(0, 0, 0),
        new T.Vector3(0, 0.20, 0),
        new T.Vector3(0, 0.23, 0),
        new T.Vector3(0, 0.26, 0.03),
        new T.Vector3(0, 0.26, 0.29),
        new T.Vector3(0, 0.23, 0.32),
        new T.Vector3(0, 0.20, 0.32),
        new T.Vector3(0, 0, 0.32),
    ],
    false
)

const benchLegGeometry = new T.TubeGeometry(
    benchLegCurve, 64, 0.02, 8, false
);
const benchLegMaterial = new T.MeshStandardMaterial({
    color: 0x888888,
    metalness: 1,
    roughness: 0
});

const benchLeg1 = new T.Mesh(benchLegGeometry, benchLegMaterial);
benchLeg1.position.x = -0.7;
bench.add(benchLeg1);

const benchLeg2 = new T.Mesh(benchLegGeometry, benchLegMaterial);
benchLeg2.position.x = 0.7;
bench.add(benchLeg2);


// ----------------------------
//  Actual Objects
// ----------------------------

export class GrTrainStation1 extends GrObject {
    constructor(params = {}) {
        const trainStation = new T.Group();

        const floorShape = new T.Shape();
        floorShape.moveTo(0, 0);
        floorShape.bezierCurveTo(0.7, 2, 1.1, 4,1.1, 6.9);
        floorShape.lineTo(3, 6.9);
        floorShape.lineTo(3, 0);
        floorShape.lineTo(0, 0);

        const floorGeometry = new T.ExtrudeGeometry(floorShape, {
            steps: 1,
            depth: 0.5,
            bevelEnabled: false
        });
        floorGeometry.rotateX(-Math.PI / 2);

        // floorGeometry.translate(0, 0.1, 0);

        const floor = new T.Mesh(floorGeometry, floorMaterial);
        // floor.position.z = 0.1;

        trainStation.add(floor);

        const roof = new T.Group();

        const roofShape = new T.Shape();
        roofShape.moveTo(0, 0);
        roofShape.bezierCurveTo(0.7, 2, 1.1, 4,1.1, 6.9);
        roofShape.lineTo(3.3, 6.9);
        roofShape.lineTo(3.3, 0);
        roofShape.lineTo(0, 0);

        const roofPlane = new T.ShapeGeometry(roofShape);
        roofPlane.rotateX(-Math.PI / 2);
        roofPlane.rotateZ(-0.3);

        const roofMesh = new T.Mesh(roofPlane, roofMaterial);
        roofMesh.position.y = 2.5;

        roof.add(roofMesh);

        // pillars
        const frontPillarGeometry = new T.CylinderGeometry(
            0.1, 0.1, 2.5, 10
        );
        frontPillarGeometry.translate(0, 1.25, 0);
        const rearPillarGeometry = new T.CylinderGeometry(
            0.1, 0.1, 1.65, 10
        );
        rearPillarGeometry.translate(0, 1, 0);

        const pillarMaterial = new T.MeshStandardMaterial({
            color: 0x444444
        });

        const pillar1 = new T.Mesh(frontPillarGeometry, pillarMaterial);
        pillar1.position.set(0.5, 0, -0.3);

        const pillar2 = new T.Mesh(frontPillarGeometry, pillarMaterial);
        pillar2.position.set(1.35, -0.25, -6.6);

        const pillar3 = new T.Mesh(rearPillarGeometry, pillarMaterial);
        pillar3.position.set(2.8, 0, -0.3);

        const pillar4 = new T.Mesh(rearPillarGeometry, pillarMaterial);
        pillar4.position.set(2.8, 0, -6.6);

        roof.add(pillar1);
        roof.add(pillar2);
        roof.add(pillar3);
        roof.add(pillar4);

        trainStation.add(roof);

        const stairs = makeStairs(2);
        stairs.position.x = 1.6;

        trainStation.add(stairs);

        const stairs2 = makeStairs(1.3);
        stairs2.position.z = -6.9;
        stairs2.position.x = 2.1;
        stairs2.rotation.y = Math.PI;
        trainStation.add(stairs2);

        // add benches
        const bench1 = bench.clone();
        bench1.position.set(1.8, 0.5, -1.5);
        bench1.rotation.y = Math.PI / 2;

        trainStation.add(bench1);

        const bench2 = bench.clone();
        bench2.position.set(1.8, 0.5, -5.4);
        bench2.rotation.y = Math.PI / 2;

        trainStation.add(bench2);

        const signpost = new T.Group();

        const signpostGeometry = new T.BoxGeometry(1.3, 0.5, 0.2);
        signpostGeometry.translate(0, 0, -0.1);
        const signpostMaterial = new T.MeshStandardMaterial({
            color: 0x222222
        });

        const signpostMesh = new T.Mesh(signpostGeometry, signpostMaterial);
        signpostMesh.position.set(0, 0, 0);
        signpost.add(signpostMesh);

        const sign1Geometry = new T.PlaneGeometry(1.2, 0.4);
        // turns out i just get the best results if i just use emissiveMap instead of map
        const sign1Material = new T.MeshStandardMaterial({
            // map: sign1ColorMap,
            // color: 0xFFFFFF,
            // emissive: 0x469a4f,
            color: 0x000000,
            emissive: 0xFFFFFF,
            emissiveIntensity: 1,
            emissiveMap: sign1ColorMap,
            side: T.DoubleSide
        });

        const sign1Mesh = new T.Mesh(sign1Geometry, sign1Material);
        sign1Mesh.position.set(0, 0, 0.01);
        signpost.add(sign1Mesh);

        signpost.rotateY(-Math.PI / 2);
        signpost.position.set(1.8, 1.62, -3.45);

        trainStation.add(signpost);

        super(`train-station-1` , trainStation);

        trainStation.position.x = 17.8;
        trainStation.position.z = 10;
    }
}

export class GrTrainStation2 extends GrObject {
    constructor(params = {}) {
        const trainStation = new T.Group();

        const floorShape = new T.Shape();
        floorShape.moveTo(-0.05, 0);
        floorShape.bezierCurveTo(0.6, 2, 1, 4,0.64, 6.9);
        floorShape.lineTo(3, 6.9);
        floorShape.lineTo(3, 0);
        floorShape.lineTo(-0.05, 0);

        const floorGeometry = new T.ExtrudeGeometry(floorShape, {
            steps: 1,
            depth: 0.5,
            bevelEnabled: false
        });

        floorGeometry.rotateX(-Math.PI / 2);

        const floor = new T.Mesh(floorGeometry, floorMaterial);

        trainStation.add(floor);

        const roof = new T.Group();

        const roofShape = new T.Shape();
        roofShape.moveTo(-0.05, 0);
        roofShape.bezierCurveTo(0.6, 2, 1, 4,0.64, 6.9);
        roofShape.lineTo(3.3, 6.9);
        roofShape.lineTo(3.3, 0);
        roofShape.lineTo(-0.05, 0);

        const roofPlane = new T.ShapeGeometry(roofShape);
        roofPlane.rotateX(-Math.PI / 2);
        roofPlane.rotateZ(-0.3);

        const roofMesh = new T.Mesh(roofPlane, roofMaterial);
        roofMesh.position.y = 2.5;

        roof.add(roofMesh);

        // pillars
        const frontPillarGeometry = new T.CylinderGeometry(
            0.1, 0.1, 2.6, 10
        );
        frontPillarGeometry.translate(0, 1.3, 0);
        const rearPillarGeometry = new T.CylinderGeometry(
            0.1, 0.1, 1.8, 10
        );
        rearPillarGeometry.translate(0, 0.9, 0);

        const pillarMaterial = new T.MeshStandardMaterial({
            color: 0x444444
        });

        const pillar1 = new T.Mesh(frontPillarGeometry, pillarMaterial);
        pillar1.position.set(0.3, 0, -0.3);

        const pillar2 = new T.Mesh(frontPillarGeometry, pillarMaterial);
        pillar2.position.set(0.9, -0.18, -6.6);

        const pillar3 = new T.Mesh(rearPillarGeometry, pillarMaterial);
        pillar3.position.set(2.8, 0, -0.3);

        const pillar4 = new T.Mesh(rearPillarGeometry, pillarMaterial);
        pillar4.position.set(2.8, 0, -6.6);

        roof.add(pillar1);
        roof.add(pillar2);
        roof.add(pillar3);
        roof.add(pillar4);

        trainStation.add(roof);

        // stairs on either side

        const stairs = makeStairs(2);
        stairs.position.x = 1.6;

        trainStation.add(stairs);

        const stairs2 = makeStairs(1.6);
        stairs2.position.z = -6.9;
        stairs2.position.x = 1.8;
        stairs2.rotation.y = Math.PI;
        trainStation.add(stairs2);

        // add benches
        const bench1 = bench.clone();
        bench1.position.set(1.8, 0.5, -1.5);
        bench1.rotation.y = Math.PI / 2;

        trainStation.add(bench1);

        const bench2 = bench.clone();
        bench2.position.set(1.8, 0.5, -5.4);
        bench2.rotation.y = Math.PI / 2;

        trainStation.add(bench2);

        const signpost = new T.Group();

        const signpostGeometry = new T.BoxGeometry(1.3, 0.5, 0.2);
        signpostGeometry.translate(0, 0, -0.1);
        const signpostMaterial = new T.MeshStandardMaterial({
            color: 0x222222
        });

        const signpostMesh = new T.Mesh(signpostGeometry, signpostMaterial);
        signpostMesh.position.set(0, 0, 0);
        signpost.add(signpostMesh);

        const sign2Geometry = new T.PlaneGeometry(1.2, 0.4);
        // turns out i just get the best results if i just use emissiveMap instead of map
        const sign2Material = new T.MeshStandardMaterial({
            // map: sign1ColorMap,
            // color: 0xFFFFFF,
            // emissive: 0x469a4f,
            color: 0x000000,
            emissive: 0xFFFFFF,
            emissiveIntensity: 1,
            emissiveMap: sign2ColorMap,
            side: T.DoubleSide
        });

        const sign2Mesh = new T.Mesh(sign2Geometry, sign2Material);
        sign2Mesh.position.set(0, 0, 0.01);
        signpost.add(sign2Mesh);

        signpost.rotateY(-Math.PI / 2);
        signpost.position.set(1.8, 1.62, -3.45);

        trainStation.add(signpost);

        super(`train-station-2` , trainStation);

        trainStation.position.x = -10.85;
        trainStation.position.z = -14.45;

        trainStation.rotation.y = 2.4;
    }
}
