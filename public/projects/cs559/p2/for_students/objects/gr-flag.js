import {GrObject} from "../../libs/CS559-Framework/GrObject.js";
import * as T from "../../libs/CS559-Three/build/three.module.js";
import {shaderMaterial} from "../../libs/CS559-Framework/shaderHelper.js";

const loader = new T.TextureLoader();

const flagColorMap = loader.load("./textures/flag/thinking_flag.png");

let flagCount = 0;
export class GrFlag extends GrObject {
    constructor(params = {}) {
        let flag = new T.Group();

        let flagpoleGeom = new T.CylinderGeometry(0.05, 0.05, 3.1, 32);
        let flagpoleMat = new T.MeshStandardMaterial({
            color: 0x222222,
            metalness: 1,
            roughness: 0,
            emissive: 0x222222
        });
        flagpoleGeom.translate(0, 1.55, 0);

        let flagpole = new T.Mesh(flagpoleGeom, flagpoleMat);

        flag.add(flagpole);

        let flagpoleCapGeom = new T.SphereGeometry(0.1, 32, 32);
        let flagpoleCap = new T.Mesh(flagpoleCapGeom, flagpoleMat);
        flagpoleCap.position.y = 3.1;

        flag.add(flagpoleCap);

        let flagGeom = new T.PlaneGeometry(1.5, 1, 100, 100);
        flagGeom.translate(0.75, 0, 0);
        // let flagMat = new T.MeshStandardMaterial({
        //     color: 0xFFFFFF,
        //     map: flagColorMap,
        //     side: T.DoubleSide,
        // });

        let flagMat = shaderMaterial("./shaders/flag.vs", "./shaders/flag.fs", {
            side: T.DoubleSide,
            uniforms: {
                tex: {value: flagColorMap},
                time: {value: 0}
            }
        })

        let flagMesh = new T.Mesh(flagGeom, flagMat);
        flag.add(flagMesh);

        flagMesh.position.y = 2.5;

        super(`flag-${++flagCount}`, flag);

        flagMesh.castShadow = true;
        flagpole.castShadow = true;
        flagpoleCap.castShadow = true;

        flag.receiveShadow = true;

        flag.position.x = params.x ? params.x : 0;
        flag.position.y = params.y ? params.y : 0;
        flag.position.z = params.z ? params.z : 0;

        flag.rotateY(params.rotation ? params.rotation : 0);

        this.flagMat = flagMat;
        this.t = 0;
    }

    stepWorld(delta, timeOfDay) {
        this.t += delta / 1000;
        // this.t = this.t % 1;
        this.flagMat.uniforms.time.value = this.t;
    }
}
