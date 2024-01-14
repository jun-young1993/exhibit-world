import {GroupEntity} from "../entities/group.entity";
import {Group} from "three";
import MeshFactory from "./mesh.factory";

export default class GroupFactory {
    constructor(
        private entity: GroupEntity
    ) {
    }

    create() {

        const group = new Group();
        group .position.set(this.entity.positionX, this.entity.positionY, this.entity.positionZ);
        group .quaternion.set(this.entity.quaternionX, this.entity.quaternionY, this.entity.quaternionZ, this.entity.quaternionW);
        group .rotation.set(this.entity.rotationX, this.entity.rotationY, this.entity.rotationZ);
        // group.scale.set(this.entity.scaleX/2, this.entity.scaleY/2, this.entity.scaleZ/2);

        group.uuid = this.entity.id;

        return group;
    }

    get(){
        return this.create();
    }
}