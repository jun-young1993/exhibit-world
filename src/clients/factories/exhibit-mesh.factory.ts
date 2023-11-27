import ExhibitMeshEntity from "../entities/exhibit-mesh.entity";
import {Mesh} from "three";
import ExhibitGeometryFactory from "./exhibit-geometry.factory";
import ExhibitMaterialFactory from "./exhibit-material.factory";

export default class ExhibitMeshFactory {
    constructor(
        private entity: ExhibitMeshEntity
    ) {
    }

    create(){
        const geometryFactory = new ExhibitGeometryFactory(this.entity.geometry);
        const materialFactory = new ExhibitMaterialFactory(this.entity.material);
        const mesh = new Mesh(
            geometryFactory.create(),
            materialFactory.create()
        );
        mesh.position.set(this.entity.positionX, this.entity.positionY, this.entity.positionZ);
        mesh.quaternion.set(this.entity.quaternionX, this.entity.quaternionY, this.entity.quaternionZ, this.entity.quaternionW);
        mesh.rotation.set(this.entity.rotationX, this.entity.rotationY, this.entity.rotationZ);
        // mesh.scale.set(
        //     this.entity.geometry.width,
        //     this.entity.geometry.height,
        //     this.entity.geometry.depth,
        // );
        mesh.uuid = this.entity.id;
        console.log(mesh);
        // mesh.updateMatrix();
        return mesh;
    }

    get(){

        return this.create();
    }


}