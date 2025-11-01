import {GrObject} from "../../libs/CS559-Framework/GrObject.js";
import * as T from "../../libs/CS559-Three/build/three.module.js";

const loader = new T.TextureLoader();

const stonePathColorMap = loader.load("./external/stone-path/PavingStones134_1K-JPG_Color.jpg");
const stonePathNormalMap = loader.load("./external/stone-path/PavingStones134_1K-JPG_NormalGL.jpg");
const stonePathRoughnessMap = loader.load("./external/stone-path/PavingStones134_1K-JPG_Roughness.jpg");

[stonePathColorMap, stonePathNormalMap, stonePathRoughnessMap].forEach((map) => {
    map.wrapS = T.RepeatWrapping;
    map.wrapT = T.RepeatWrapping;
    map.repeat.set(0.25, 0.25);
});

export class GrStonePath1 extends GrObject {
    constructor(params = {}) {
        let stonePath = new T.Group();

        let pathShape = new T.Shape();
        pathShape.moveTo(0.5, -12.5);
        pathShape.lineTo(-0.6, -12.45);
        pathShape.lineTo(-1.1, -12.7);
        pathShape.lineTo(-2.7, -20);
        pathShape.lineTo(-1.1, -20.2);
        // pathShape.quadraticCurveTo(-0.2, -12.7, -1.1, -12.6);
        // pathShape.bezierCurveTo(-1.1, -14, -1.6, -14.5, -1.6, -15.5);
        // pathShape.bezierCurveTo(-1.6, -16.5, -1.8, -17.6, -1.8, -19);

        // pathShape.lineTo(-13, 10);

        let pathGeom = new T.ShapeGeometry(pathShape);

        let pathMat = new T.MeshStandardMaterial({
            color: 0xA0A0A0,
            metalness: 0,
            roughness: 1,
            map: stonePathColorMap,
            normalMap: stonePathNormalMap,
            roughnessMap: stonePathRoughnessMap,
            side: T.DoubleSide,
        });

        let path = new T.Mesh(pathGeom, pathMat);
        stonePath.add(path);

        // path.position.y = -0.05;

        // path.position.z = -13;
        path.rotation.x = Math.PI / 2;
        path.position.y = 0.02;

        // path 2

        let pathShape2 = new T.Shape();
        pathShape2.moveTo(-12.2, -16.85);
        pathShape2.lineTo(-10.7, -15.5);

        // bezier curve time
        // pathShape2.bezierCurveTo(-12.5, -17.5, -11.5, -18.5, -11.5, -19);
        // pathShape2.lineTo(-7, -20);
        pathShape2.bezierCurveTo(-6, -20, 6, -24,16.0, -13.6);
        pathShape2.lineTo(17.3, -15);
        pathShape2.bezierCurveTo(6, -26, -6, -22, -12.2, -16.85);

        // pathShape2.lineTo(16.2, -13.6);

        let pathGeom2 = new T.ShapeGeometry(pathShape2);

        let path2 = new T.Mesh(pathGeom2, pathMat);
        stonePath.add(path2);

        path2.rotation.x = Math.PI / 2;
        path2.position.y = 0.02;

        // path 3
        // continuation of path 2

        let pathShape3 = new T.Shape();
        pathShape3.moveTo(17.3, -15);
        pathShape3.lineTo(16.0, -13.6);

        // curve to train station
        pathShape3.bezierCurveTo(18.3, -10, 19, -3, 19.3, 2.3);
        pathShape3.lineTo(20.5, 2.3);
        pathShape3.bezierCurveTo(20.5, -3, 20, -10, 17.3, -15);

        let pathGeom3 = new T.ShapeGeometry(pathShape3);

        let path3 = new T.Mesh(pathGeom3, pathMat);

        stonePath.add(path3);
        path3.rotation.x = Math.PI / 2;
        path3.position.y = 0.02;

        path.receiveShadow = true;
        path2.receiveShadow = true;
        path3.receiveShadow = true;

        super(`stone-path`, stonePath);
    }
}
