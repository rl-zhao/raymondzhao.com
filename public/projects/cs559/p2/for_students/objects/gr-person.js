import {GrObject} from "../../libs/CS559-Framework/GrObject.js";
import * as T from "../../libs/CS559-Three/build/three.module.js";


// person model
// I decided to use a floating cone and sphere

let personCount = 0;
export class GrPerson extends GrObject {
    constructor(params = {}) {
        let person = new T.Group();

        let geometry = new T.ConeGeometry(0.1, 0.4, 32);
        geometry.rotateX(Math.PI);
        geometry.translate(0, 0.2, 0);

        let material = new T.MeshStandardMaterial({
            color: params.color ? params.color : "#0000ff",
        });
        let cone = new T.Mesh(geometry, material);
        person.add(cone);

        let sphere = new T.Mesh(new T.SphereGeometry(0.1, 32, 32), material);
        sphere.position.set(0, 0.55, 0);
        person.add(sphere);

        let name = params.name ? params.name : `person-${++personCount}`;
        super(name, person);
        this.cone = cone;
        this.sphere = sphere;
        this.t = Math.random() * 2 * Math.PI;
        this.whole_ob = person;

        this.other_t = params.t ? params.t : 0;
        this.step_t = params.step_t ? params.step_t : null;

        this.whole_ob.position.x = params.x ? params.x : 0;
        this.y_pos = params.y ? params.y : 0;
        this.whole_ob.position.z = params.z ? params.z : 0;
    }

    stepWorld(delta, timeOfDay) {
        this.t += delta / 1000;
        this.t = this.t % (2 * Math.PI);

        this.whole_ob.position.y = this.y_pos + 0.05 * Math.sin(this.t);

        if (this.step_t) {
            this.other_t = this.step_t(delta, timeOfDay, this);
        }
    }

    aDisappearingAct() {
        this.whole_ob.visible = false;
    }

    materialize() {
        this.whole_ob.visible = true;
    }

    setY(y) {
        this.y_pos = y;
    }
}
