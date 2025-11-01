import {GrObject} from "../../libs/CS559-Framework/GrObject.js";
import * as T from "../../libs/CS559-Three/build/three.module.js";

const textureLoader = new T.TextureLoader();

const leavesNormalMap = textureLoader.load("./external/tree/ScatteredLeaves001_1K-JPG_NormalGL.jpg");
const leavesColorMap = textureLoader.load("./external/tree/ScatteredLeaves001_1K-JPG_Opacity_Greyed.jpg");

let roundTreeCount = 0;
export class GrRoundTree extends GrObject {
    constructor(params = {}) {
        const tree = new T.Group();

        const height = params.height ? params.height : 2;
        const radius = params.radius ? params.radius : 0.2;
        const leafSize = params.leafSize ? params.leafSize : radius * 4;

        const trunkColor = params.trunkColor ? params.trunkColor : "brown";
        const leafColor = params.leafColor ? params.leafColor : "green";

        const treeTrunkGeometry = new T.CylinderGeometry(
            radius, radius, height, 10
        );
        // move up
        treeTrunkGeometry.translate(0, height / 2, 0);

        const treeTrunkMaterial = new T.MeshStandardMaterial({
            color: trunkColor
        });

        const treeTrunk = new T.Mesh(
            treeTrunkGeometry,
            treeTrunkMaterial
        );

        tree.add(treeTrunk);

        // add leaves
        const leafMaterial = new T.MeshStandardMaterial({
            color: leafColor,
            normalMap: leavesNormalMap,
            map: leavesColorMap,
        });
        const leafGeometry = new T.SphereGeometry(leafSize, 50, 50);

        const leaf = new T.Mesh(leafGeometry, leafMaterial);
        leaf.position.set(0, height, 0);

        tree.add(leaf);

        super(`round-tree-${++roundTreeCount}`, tree);

        tree.position.x = params.x ? params.x : 0;
        tree.position.y = params.y ? params.y : 0;
        tree.position.z = params.z ? params.z : 0;

        // this really doesn't do anything seeing as a sphere is symmetric
        tree.rotation.y = params.rotation ? params.rotation : 0;
    }
}

let roundTreeWithArmCount = 0;
export class GrRoundTreeWithArm extends GrObject {
    constructor(params = {}) {
        const tree = new T.Group();

        const height = params.height ? params.height : 2;
        const radius = params.radius ? params.radius : 0.2;
        const leafSize = params.leafSize ? params.leafSize : radius * 4;
        const armHeight = params.armHeight ? params.armHeight : height / 2;
        const armLength = params.armLength ? params.armLength : height / 2;
        const armRadius = params.armRadius ? params.armRadius : radius / 3;
        const armRotation = params.armRotation ? params.armRotation : Math.PI / 3;

        const trunkColor = params.trunkColor ? params.trunkColor : "brown";
        const leafColor = params.leafColor ? params.leafColor : "green";

        const treeTrunkGeometry = new T.CylinderGeometry(
            radius, radius, height, 10
        );
        // move up
        treeTrunkGeometry.translate(0, height / 2, 0);

        const treeTrunkMaterial = new T.MeshStandardMaterial({
            color: trunkColor
        });

        const treeTrunk = new T.Mesh(
            treeTrunkGeometry,
            treeTrunkMaterial
        );

        tree.add(treeTrunk);

        // add leaves
        const leafMaterial = new T.MeshStandardMaterial({
            color: leafColor,
            normalMap: leavesNormalMap,
            map: leavesColorMap,
        });
        const leafGeometry = new T.SphereGeometry(leafSize, 50, 50);

        const leaf = new T.Mesh(leafGeometry, leafMaterial);
        leaf.position.set(0, height, 0);

        tree.add(leaf);

        // add arm
        const armGeometry = new T.CylinderGeometry(
            armRadius, armRadius, armLength, 10
        );
        armGeometry.translate(0, armLength / 2, 0);

        const arm = new T.Mesh(armGeometry, treeTrunkMaterial);
        arm.position.set(0, armHeight, 0);
        arm.rotation.z = armRotation;

        tree.add(arm);

        super(`round-tree-with-arm-${++roundTreeWithArmCount}`, tree);

        tree.position.x = params.x ? params.x : 0;
        tree.position.y = params.y ? params.y : 0;
        tree.position.z = params.z ? params.z : 0;

        tree.rotation.y = params.rotation ? params.rotation : 0;
    }

}

let coneTreeCount = 0;
export class GrConeTree extends GrObject {
    constructor(params = {}) {
        const tree = new T.Group();

        const height = params.height ? params.height : 2;
        const radius = params.radius ? params.radius : 0.2;
        const leafSize = params.leafSize ? params.leafSize : radius * 4;
        const leafHeight = params.leafHeight ? params.leafHeight : height;

        const trunkColor = params.trunkColor ? params.trunkColor : "brown";
        const leafColor = params.leafColor ? params.leafColor : "green";

        const treeTrunkGeometry = new T.CylinderGeometry(
            radius, radius, height, 10
        );
        // move up
        treeTrunkGeometry.translate(0, height / 2, 0);

        const treeTrunkMaterial = new T.MeshStandardMaterial({
            color: trunkColor
        });

        const treeTrunk = new T.Mesh(
            treeTrunkGeometry,
            treeTrunkMaterial
        );

        tree.add(treeTrunk);

        // add leaves
        const leafMaterial = new T.MeshStandardMaterial({
            color: leafColor,
            normalMap: leavesNormalMap,
            map: leavesColorMap,
        });
        const leafGeometry = new T.ConeGeometry(leafSize, leafHeight, 20);

        const leaf = new T.Mesh(leafGeometry, leafMaterial);
        leaf.position.set(0, height, 0);

        tree.add(leaf);

        super(`cone-tree-${++coneTreeCount}`, tree);

        tree.position.x = params.x ? params.x : 0;
        tree.position.y = params.y ? params.y : 0;
        tree.position.z = params.z ? params.z : 0;

        // this really doesn't do anything seeing as a cone is symmetric
        tree.rotation.y = params.rotation ? params.rotation : 0;
    }
}

let torusTreeCount = 0;
export class GrTorusTree extends GrObject {
    constructor(params = {}) {
        const tree = new T.Group();

        const height = params.height ? params.height : 2;
        const radius = params.radius ? params.radius : 0.2;
        const leafSize = params.leafSize ? params.leafSize : radius * 2;

        const trunkColor = params.trunkColor ? params.trunkColor : "brown";
        const leafColor = params.leafColor ? params.leafColor : "green";

        const treeTrunkGeometry = new T.CylinderGeometry(
            radius, radius, height, 10
        );
        // move up
        treeTrunkGeometry.translate(0, height / 2, 0);

        const treeTrunkMaterial = new T.MeshStandardMaterial({
            color: trunkColor
        });

        const treeTrunk = new T.Mesh(
            treeTrunkGeometry,
            treeTrunkMaterial
        );

        tree.add(treeTrunk);

        // add leaves
        const leafMaterial = new T.MeshStandardMaterial({
            color: leafColor,
            normalMap: leavesNormalMap,
            map: leavesColorMap,
        });
        const leafGeometry = new T.TorusKnotGeometry(leafSize, 0.5, 50, 20);

        const leaf = new T.Mesh(leafGeometry, leafMaterial);
        leaf.position.set(0, height, 0);

        tree.add(leaf);

        super(`torus-tree-${++torusTreeCount}`, tree);

        tree.position.x = params.x ? params.x : 0;
        tree.position.y = params.y ? params.y : 0;
        tree.position.z = params.z ? params.z : 0;

        tree.rotation.y = params.rotation ? params.rotation : 0;
    }
}

let icosahedronTreeCount = 0;
export class GrIcosahedronTree extends GrObject {
    constructor(params = {}) {
        const tree = new T.Group();

        const height = params.height ? params.height : 2;
        const radius = params.radius ? params.radius : 0.2;
        const leafSize = params.leafSize ? params.leafSize : radius * 5;

        const trunkColor = params.trunkColor ? params.trunkColor : "brown";
        const leafColor = params.leafColor ? params.leafColor : "green";

        const treeTrunkGeometry = new T.CylinderGeometry(
            radius, radius, height, 10
        );
        // move up
        treeTrunkGeometry.translate(0, height / 2, 0);

        const treeTrunkMaterial = new T.MeshStandardMaterial({
            color: trunkColor
        });

        const treeTrunk = new T.Mesh(
            treeTrunkGeometry,
            treeTrunkMaterial
        );

        tree.add(treeTrunk);

        // add leaves
        const leafMaterial = new T.MeshStandardMaterial({
            color: leafColor,
            normalMap: leavesNormalMap,
            map: leavesColorMap,
        });
        const leafGeometry = new T.IcosahedronGeometry(leafSize, 0);
        leafGeometry.rotateZ(Math.PI / 6);

        const leaf = new T.Mesh(leafGeometry, leafMaterial);
        leaf.position.set(0, height, 0);

        tree.add(leaf);

        super(`icosahedron-tree-${++icosahedronTreeCount}`, tree);

        tree.position.x = params.x ? params.x : 0;
        tree.position.y = params.y ? params.y : 0;
        tree.position.z = params.z ? params.z : 0;

        tree.rotation.y = params.rotation ? params.rotation : 0;
    }
}

let latheTreeCount = 0;
export class GrLatheTree extends GrObject {
    constructor(params = {}) {
        const tree = new T.Group();

        const height = params.height ? params.height : 2;
        const radius = params.radius ? params.radius : 0.2;
        const leafHeight = params.leafSize ? params.leafSize : radius * 10;
        const leafWidth = params.leafWidth ? params.leafWidth : radius * 4;

        const trunkColor = params.trunkColor ? params.trunkColor : "brown";
        const leafColor = params.leafColor ? params.leafColor : "green";

        const treeTrunkGeometry = new T.CylinderGeometry(
            radius, radius, height, 10
        );
        // move up
        treeTrunkGeometry.translate(0, height / 2, 0);

        const treeTrunkMaterial = new T.MeshStandardMaterial({
            color: trunkColor
        });

        const treeTrunk = new T.Mesh(
            treeTrunkGeometry,
            treeTrunkMaterial
        );

        tree.add(treeTrunk);

        // add leaves
        const leafMaterial = new T.MeshStandardMaterial({
            color: leafColor,
            normalMap: leavesNormalMap,
            map: leavesColorMap,
        });

        let bottom = -leafHeight / 2;
        let middle1 = -leafHeight / 6;
        let middle2 = leafHeight / 6;
        let top = leafHeight / 2;
        const leafGeometry = new T.LatheGeometry([
            new T.Vector2(0, bottom - 0.2),
            new T.Vector2(leafWidth, bottom),
            new T.Vector2(leafWidth * 1/2, middle1 - 0.1),
            new T.Vector2(leafWidth * 3/4, middle1),
            new T.Vector2(leafWidth * 1/4, middle2 - 0.1),
            new T.Vector2(leafWidth * 1/2, middle2),
            new T.Vector2(0, top),
        ], 50);

        const leaf = new T.Mesh(leafGeometry, leafMaterial);
        leaf.position.set(0, height, 0);

        tree.add(leaf);

        super(`lathe-tree-${++latheTreeCount}`, tree);

        tree.position.x = params.x ? params.x : 0;
        tree.position.y = params.y ? params.y : 0;
        tree.position.z = params.z ? params.z : 0;

        tree.rotation.y = params.rotation ? params.rotation : 0;
    }
}
