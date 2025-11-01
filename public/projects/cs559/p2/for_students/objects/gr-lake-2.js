import {GrObject} from "../../libs/CS559-Framework/GrObject.js";
import * as T from "../../libs/CS559-Three/build/three.module.js";
import {Water} from "../external/water/Water.js";

export class GrLake extends GrObject {
    constructor(params = {}) {
        const lake = new T.Group();

        const lakeShape = new T.Shape();
        lakeShape.moveTo(-11, 3);
        lakeShape.bezierCurveTo(-11, -12, -5, -14, 0, -14);
        lakeShape.bezierCurveTo(5, -14, 5, -10, 5, -7);
        lakeShape.bezierCurveTo(5, -4, 9, -3, 11, -1);
        lakeShape.bezierCurveTo(13, 1, 13, 2, 13, 5);
        lakeShape.bezierCurveTo(13, 8, 5, 12, 0, 12);
        lakeShape.bezierCurveTo(-5, 12, -11, 8, -11, 3);

        const lakeGeometry = new T.ShapeGeometry(
            lakeShape,

        );

        // lakeGeometry.rotateX(-Math.PI / 2);

        const lakeMesh = new Water(lakeGeometry, {
            color: 0x80aaff,
            scale: 0.3,
            reflectivity: 0.5,
            flowDirection: new T.Vector2(1, 1),
            flowSpeed: 0.1,
            textureWidth: 1024,
            textureHeight: 1024
        });
        lakeMesh.position.y = 0.05;
        lakeMesh.rotation.x = -Math.PI / 2;

        lake.add(lakeMesh);

        super("lake", lake);
    }

    // stepWorld(delta, timeOfDay) {
    //
    // }
}
