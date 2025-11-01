// This is my car from WB08!
// I'm reusing it here.
// (With some added parameters.)

/*jshint esversion: 6 */
// @ts-nocheck

import * as T from "../../libs/CS559-Three/build/three.module.js";
import {GrObject} from "../../libs/CS559-Framework/GrObject.js";

let carCount = 0;

export class GrCar extends GrObject {
    constructor(params = {}) {
        let car = new T.Group();

        // create main bed / body

        const bodyGeom = new T.BoxGeometry(0.5, 0.2, 1);
        const bodyMat = new T.MeshStandardMaterial({
            color: 0xD3D3D3,
            metalness: 0.9,
            roughness: 0.2
        });

        let body = new T.Mesh(bodyGeom, bodyMat);
        car.add(body);
        body.position.y = 0.2;

        // create cab

        const cabShape = new T.Shape();
        cabShape.moveTo(-0.2, 0.3);
        cabShape.lineTo(-0.2, 0.5);
        cabShape.lineTo(0.1, 0.5);
        cabShape.bezierCurveTo(0.35, 0.5, 0.35, 0.2, 0.45, 0.3);
        cabShape.lineTo(-0.2, 0.3);

        const cabExtrudeSettings = {
            steps: 2,
            depth: 0.5,
            bevelEnabled: false
        };
        const cabGeom = new T.ExtrudeGeometry(cabShape, cabExtrudeSettings);
        cabGeom.rotateY(Math.PI / 2);
        const cab = new T.Mesh(cabGeom, bodyMat);
        car.add(cab);
        cab.position.x = -0.25;

        // create windows
        const windowGeom = new T.BoxGeometry(0.01, 0.15, 0.2);
        const windowMat = new T.MeshStandardMaterial({
            color: 0x000000,
            metalness: 1,
            roughness: 0.1
        });

        let window = new T.Mesh(windowGeom, windowMat);
        car.add(window);
        window.position.set(-0.25, 0.4, 0.08);

        let window2 = new T.Mesh(windowGeom, windowMat);
        car.add(window2);
        window2.position.set(0.25, 0.4, 0.08);

        const window2Shape = new T.Shape();
        window2Shape.moveTo(-0.2, 0.325);
        window2Shape.lineTo(-0.2, 0.475);
        window2Shape.bezierCurveTo(-0.05, 0.475, 0, 0.4, 0.05, 0.325);
        window2Shape.lineTo(-0.2, 0.325);

        const window2ExtrudeSettings = {
            steps: 2,
            depth: 0.01,
            bevelEnabled: false
        }

        const window2Geom = new T.ExtrudeGeometry(window2Shape, window2ExtrudeSettings);
        window2Geom.rotateY(Math.PI / 2);

        let window3 = new T.Mesh(window2Geom, windowMat);
        car.add(window3);
        window3.position.set(-0.255, 0, -0.26);

        let window4 = new T.Mesh(window2Geom, windowMat);
        car.add(window4);
        window4.position.set(0.255, 0, -0.26);

        const wheelMaterial = new T.MeshStandardMaterial({
            color: "black"
        });

        const spokeMaterial = new T.MeshStandardMaterial({
            color: 0xD3D3D3,
            metalness: 0.9,
            roughness: 0.1
        });

        // create the wheel "donut"
        const wheelHousingGeometry = new T.TorusGeometry(
            0.08,
            0.02,
            16,
            100
        );

        // create the wheel "spokes"
        const spokeGeometry = new T.BoxGeometry(0.18, 0.02, 0.02);

        const wheel = (x, z) => {
            let curWheel = new T.Mesh(wheelHousingGeometry, wheelMaterial);
            // curWheel.rotation.z = Math.PI / 2;
            curWheel.rotation.y = Math.PI / 2;
            curWheel.position.set(x, 0.1, z);

            // create the spokes
            [
                0,
                Math.PI / 3,
                (2 * Math.PI) / 3
            ].forEach(
                (rotation) => {
                    let curSpoke = new T.Mesh(spokeGeometry, spokeMaterial);
                    curSpoke.rotation.z = rotation;
                    curWheel.add(curSpoke);
                }
            )

            return curWheel;
        }

        const wheels = [];

        [
            [0.27, 0.32],
            [-0.27, 0.32],
            [0.27, -0.32],
            [-0.27, -0.32]
        ].forEach((pos) => {
            const curWheel = wheel(pos[0], pos[1]);
            wheels.push(curWheel);
            car.add(curWheel);
        });

        const handleGeom = new T.BoxGeometry(0.01, 0.01, 0.05);
        const handleMat = new T.MeshStandardMaterial({
            color: 0x000000,
            metalness: 0.9,
            roughness: 0.1
        });

        [
            [0.27, -0.1],
            [-0.27, -0.1],
            [0.27, 0.15],
            [-0.27, 0.15]
        ].forEach(
            (pos) => {
                const curHandle = new T.Mesh(handleGeom, handleMat);
                car.add(curHandle);
                curHandle.position.set(pos[0], 0.28, pos[1]);
            }
        )

        super(`car-${++carCount}`, car);

        this.whole_ob = car;
        this.wheels = wheels;

        this.whole_ob.position.x = params.x ? params.x : 0;
        this.whole_ob.position.y = params.y ? params.y : 0;
        this.whole_ob.position.z = params.z ? params.z : 0;

        this.whole_ob.rotation.y = params.rotation ? params.rotation : 0;

        let scale = params.scale ? params.scale : 1;
        this.whole_ob.scale.set(scale, scale, scale);
    }
}
