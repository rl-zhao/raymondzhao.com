import {GrObject} from "../../libs/CS559-Framework/GrObject.js";
import * as T from "../../libs/CS559-Three/build/three.module.js";
import {shaderMaterial} from "../../libs/CS559-Framework/shaderHelper.js";

const textureLoader = new T.TextureLoader();

const repeat = 6;

const groundBoxColorMap = textureLoader.load("./external/grass/Grass001_1K-JPG_Color.jpg", function (texture) {
    texture.wrapS = texture.wrapT = T.RepeatWrapping;
    texture.repeat.set(repeat, repeat);
});
const groundBoxNormalMap = textureLoader.load("./external/grass/Grass001_1K-JPG_NormalGL.jpg", function (texture) {
    texture.wrapS = texture.wrapT = T.RepeatWrapping;
    texture.repeat.set(repeat, repeat);
});
const groundBoxRoughnessMap = textureLoader.load("./external/grass/Grass001_1K-JPG_Roughness.jpg", function(texture) {
    texture.wrapS = texture.wrapT = T.RepeatWrapping;
    texture.repeat.set(repeat, repeat);
});

export class GrWorldbox extends GrObject {
    constructor(params = {}) {
        // make our own ground plane
        const groundBox = new T.BoxGeometry(46, 0.4, 46);
        groundBox.translate(0, -0.2, 0);

        const groundBoxMaterial = new T.MeshStandardMaterial({
            color: "green",
            map: groundBoxColorMap,
            normalMap: groundBoxNormalMap,
            roughnessMap: groundBoxRoughnessMap,
        });

        const groundPlane = new T.Mesh(
            groundBox,
            groundBoxMaterial
        );

        groundPlane.receiveShadow = true;

        super("world", groundPlane);
    }
}
