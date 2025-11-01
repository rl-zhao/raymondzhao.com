import {GrObject} from "../../libs/CS559-Framework/GrObject.js";
import * as T from "../../libs/CS559-Three/build/three.module.js";
import {OBJLoader} from "../../libs/CS559-Three/examples/jsm/loaders/OBJLoader.js";

// This is the external model loaded for this project.

let objLoader = new OBJLoader();
objLoader.setResourcePath('./external/small-house/');
objLoader.setPath('./external/small-house/');

let textureLoader = new T.TextureLoader();
let diffuse = textureLoader.load('./external/small-house/Diffuse.png');
let normal = textureLoader.load('./external/small-house/normal.png');

let houseMaterial = new T.MeshStandardMaterial({
    map: diffuse,
    normalMap: normal,
    color: 0xffffff,
    side: T.DoubleSide
})

objLoader.load('WoodHouse.obj', function (obj) {
    const object = new T.Mesh(obj.children[0].geometry, houseMaterial);
    object.castShadow = true;
    object.scale.set(1.5, 1.5, 1.5);
    houses.forEach((house) => {
        house.add(object.clone());
    });
});

let houses = [];

let houseCount = 0;
export class GrSmallHouse extends GrObject {
    constructor(params = {}) {
        let house = new T.Group();
        super(`small-house-${++houseCount}`, house);

        this.house = house;
        houses.push(house);

        house.castShadow = true;

        house.position.x = params.x ? params.x : 0;
        house.position.y = params.y ? params.y : 0;
        house.position.z = params.z ? params.z : 0;

        house.rotation.y = params.rotation ? params.rotation : 0;
    }
}
