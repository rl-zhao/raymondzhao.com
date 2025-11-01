// Simulates a volumetric spot light using a shader material and a cone.

// The shaders are taken from
// https://github.com/jeromeetienne/threex.volumetricspotlight
// and modified to work with the CS559 framework.

// This class is also a modified version of the material, but a lot of it is my original work + adapting it to the CS559
// framework.

import {GrObject} from "../../libs/CS559-Framework/GrObject.js";
import * as T from "../../libs/CS559-Three/build/three.module.js";
import {shaderMaterial} from "../../libs/CS559-Framework/shaderHelper.js";

let spotlightCount = 0;
export class VolumetricSpotLight extends GrObject {
    constructor(params = {}) {
        const geometry = new T.CylinderGeometry(
            params.topRadius ? params.topRadius : 0.01,
            params.bottomRadius ? params.bottomRadius : 3,
            params.height ? params.height : 50,
            32*2,
            50,
            true
        );

        geometry.translate(0, params.height ? params.height / 2 : 25, 0);

        const material = shaderMaterial(
            "./shaders/volumetric.vs",
            "./shaders/volumetric.fs",
            {
                transparent: true,
                depthWrite: false,
                uniforms: {
                    attenuation: {value: params.attenuation ? params.attenuation : 20},
                    anglePower: {value: params.anglePower ? params.anglePower : 6},
                    spotlightPosition: {
                        type: "v3",
                        value: new T.Vector3(
                            params.x ? params.x : 0,
                            params.y ? params.y : 0,
                            params.z ? params.z : 0
                        )
                    },
                    lightColor: {
                        type: "c",
                        value: new T.Color(params.color ? params.color : 0xffffff)
                    }
                }
            }
        );

        const spotLight = new T.Mesh(geometry, material);

        spotLight.position.x = params.x ? params.x : 0;
        spotLight.position.y = params.y ? params.y : 0;
        spotLight.position.z = params.z ? params.z : 0;

        spotLight.setRotationFromEuler(params.rotation ? params.rotation : new T.Euler(0, 0, 0, "XYZ"));

        super(`volumetric-spot-light-${spotlightCount++}`, spotLight);

        this.whole_ob = spotLight;
        this.material = material;

        // this.t = Math.random();
    }

    // stepWorld(delta, timeOfDay) {
    //     this.t += delta / 3000;
    //     this.t = this.t % 1;
    //
    //     this.material.uniforms.attenuation.value = Math.sin(this.t * Math.PI * 2) * 40 + 100;
    // }
}
