import {GrObject} from "../../libs/CS559-Framework/GrObject.js";
import * as T from "../../libs/CS559-Three/build/three.module.js";

const loader = new T.TextureLoader();

const barrierColorMap = loader.load("./textures/train-barrier/red_stripe.png", function (texture) {
    texture.wrapS = T.RepeatWrapping;
    // texture.wrapT = T.RepeatWrapping;
    texture.repeat.set(10, 1);
});

let barrierCount = 0;
export class GrTrainBarrier extends GrObject {
    constructor(params = {}) {
        let trainBarrier = new T.Group();

        let barrierBaseShape = new T.Shape();
        barrierBaseShape.moveTo(0, 0);
        barrierBaseShape.lineTo(0.5, 0);
        barrierBaseShape.lineTo(0.4, 0.5);
        barrierBaseShape.lineTo(0.3, 0.4);
        barrierBaseShape.lineTo(0.2, 0.4);
        barrierBaseShape.lineTo(0.1, 0.5);
        barrierBaseShape.lineTo(0, 0);

        let barrierBaseGeom = new T.ExtrudeGeometry(barrierBaseShape, {
            steps: 2,
            depth: 0.5,
            bevelEnabled: false,
        });
        barrierBaseGeom.translate(-0.25, 0, -0.1);
        let barrierBaseMat = new T.MeshStandardMaterial({
            color: 0x000000,
        });

        let barrierBase = new T.Mesh(barrierBaseGeom, barrierBaseMat);
        trainBarrier.add(barrierBase);

        let barrierBase2 = barrierBase.clone();
        barrierBase2.position.z = -2;
        barrierBase2.rotation.y = Math.PI;
        trainBarrier.add(barrierBase2);

        const barrierGeom = new T.BoxGeometry(2, 0.1, 0.1);
        barrierGeom.rotateY(Math.PI / 2);
        barrierGeom.translate(0, 0, -1);

        // barrierGeom.translate(1, 0, 0);
        const barrierMat = new T.MeshStandardMaterial({
            color: 0xFFFFFF,
            map: barrierColorMap,
        });

        let barrier = new T.Mesh(barrierGeom, barrierMat);
        barrierBase.add(barrier);

        barrier.position.y = 0.45;

        // add lights
        const light1 = new T.PointLight(0xff0000, 0, 5);
        light1.position.set(0, 0.1, -1);
        barrier.add(light1);

        // add object where light is
        let lightObj = new T.Mesh(
            new T.SphereGeometry(0.05, 32, 32),
            new T.MeshStandardMaterial({
                transparent: true,
                side: T.DoubleSide,
                opacity: 0.5,
                color: 0xff0000
            })
        );
        lightObj.position.set(0, 0.1, -1);
        barrier.add(lightObj);

        super(`train-barrier-${++barrierCount}`, trainBarrier);

        this.whole_ob = trainBarrier;
        this.barrier = barrier;
        this.light1 = light1;

        trainBarrier.position.x = params.x ? params.x : 0;
        trainBarrier.position.y = params.y ? params.y : 0;
        trainBarrier.position.z = params.z ? params.z : 0;

        trainBarrier.rotation.y = params.rotation ? params.rotation : 0;

        this.step_t = params.step_t ? params.step_t : null;
    }

    stepWorld(delta, timeOfDay) {
        if(this.step_t) {
            this.step_t(delta, timeOfDay, this);
        }
    }
}
