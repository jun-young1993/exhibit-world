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


        group.uuid = this.entity.id;

        return group;
    }

    get(){
        return this.create();
    }
}