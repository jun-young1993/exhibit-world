import ExhibitMeshEntity from "../entities/exhibit-mesh.entity";
import {Mesh} from "three";
import ExhibitGeometryFactory from "./exhibit-geometry.factory";
import ExhibitMaterialFactory from "./exhibit-material.factory";
import {useGLTF} from "@react-three/drei";
import GltfClient from "../gltf.client";
import MeshEntity from "../entities/mesh.entity";
import GeometryFactory from "./geometry.factory";
import MaterialFactory from "./material.factory";

export default class MeshFactory {
    constructor(
        private entity: MeshEntity
    ) {
    }

    create(){
        const geometry = new GeometryFactory(this.entity.geometry).get();
        const materials = new MaterialFactory(this.entity.association.material).get();


        const mesh = new Mesh(
            geometry,
            materials
        );

        mesh.position.set(this.entity.positionX, this.entity.positionY, this.entity.positionZ);
        mesh.quaternion.set(this.entity.quaternionX, this.entity.quaternionY, this.entity.quaternionZ, this.entity.quaternionW);
        mesh.rotation.set(this.entity.rotationX, this.entity.rotationY, this.entity.rotationZ);
        mesh.uuid = this.entity.id;
        mesh.userData.gltf = this.entity.gltf;



        return mesh;
    }
    
    getEntity(){
        return this.entity;
    }

    
    get(){

        return this.create();
    }


}