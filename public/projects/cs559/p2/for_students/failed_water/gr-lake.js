import {GrObject} from "../../libs/CS559-Framework/GrObject.js";
import * as T from "../../libs/CS559-Three/build/three.module.js";
import {shaderMaterial} from "../../libs/CS559-Framework/shaderHelper.js";

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

        const lakeGeometry = new T.ShapeGeometry(lakeShape);

        lakeGeometry.rotateX(Math.PI / 2);
        lakeGeometry.translate(0, 0.1, 0);

        // // add render target
        const renderTarget = new T.WebGLCubeRenderTarget(1024, {
            generateMipmaps: true,
            minFilter: T.LinearMipmapLinearFilter,
        });

        // add cube camera
        const cubeCamera = new T.CubeCamera(0.6, 1000, renderTarget);

        // use perspective camera instead
        // const renderTarget = new T.WebGLRenderTarget(1024, 1024, {
        //     generateMipmaps: true,
        //     minFilter: T.LinearMipmapLinearFilter,
        // });

        // const cam = new T.PerspectiveCamera(180, 1, 0.1, 1000);
        // cam.lookAt(cam.position.x, 5, cam.position.z);

        const waterNormals = new T.TextureLoader().load("./failed_water/waternormals.jpg");

        const lakeMaterial = shaderMaterial(
            "./failed_water/water.vs",
            "./failed_water/water.fs",
            {
                side: T.DoubleSide,
                uniforms: {
                    color: {value: new T.Color(0x0000ff)},
                    time: {value: 0},
                    cubemap: {value: cubeCamera.renderTarget.texture},
                    waterNormals: {value: waterNormals},
                    // reflectionMap: {value: renderTarget.texture},
                },
            }
        );

        const lakeMesh = new T.Mesh(lakeGeometry, lakeMaterial);

        lake.add(lakeMesh);

        // const testPlane = new T.Mesh(
        //     new T.PlaneGeometry(20, 20),
        //     new T.MeshBasicMaterial({color: 0xffffff, map: cubeCamera.renderTarget})
        // );

        // lake.add(testPlane);
        // testPlane.position.x = -50;

        super("Lake", lake);

        // this.cubecam = cubeCamera;
        this.world = params.world;
        this.cubecam = cubeCamera;
        // this.cam = cam;
        // this.renderTarget = renderTarget;
        this.material = lakeMaterial;
    }

    stepWorld(delta, timeOfDay) {
        // this.cubecam.position.x = -0.2 * this.world.camera.position.x;
        // this.cubecam.position.z = -0.2 * this.world.camera.position.z;

        this.cubecam.update(this.world.renderer, this.world.scene);

        // const curTexture = this.cubecam.renderTarget.texture;

        // curTexture.wrapS = curTexture.wrapT = T.RepeatWrapping;
        // curTexture.repeat.set(1/5, 1/5);

        // this.material.uniforms.cubemap.value = curTexture;

        // const currentRenderTarget = this.world.renderer.getRenderTarget();
        //
        // this.world.renderer.setRenderTarget(this.renderTarget);
        // this.world.renderer.render(this.world.scene, this.cam);
        // this.world.renderer.setRenderTarget(currentRenderTarget);
    }
}
