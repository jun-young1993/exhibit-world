import {Vector3} from "three/src/math/Vector3";
import {Quaternion} from "three/src/math/Quaternion";
import {Euler} from "three/src/math/Euler";
import ExhibitMaterialEntity, {DefaultExhibitMaterialEntity} from "./exhibit-material.entity";
import ExhibitGeometryEntity, {DefaultExhibitGeometryEntity} from "./exhibit-geometry.entity";
import { v4 as uuid } from 'uuid';
import {GltfEntity} from "./gltf.entity";
export interface MeshPropsEntity {
    positionX: Vector3['x']
    positionY:  Vector3['y']
    positionZ:  Vector3['z']
    quaternionX: Quaternion['x']
    quaternionY: Quaternion['y']
    quaternionZ: Quaternion['z']
    quaternionW: Quaternion['w']
    rotationX: Euler['x']
    rotationY: Euler['y']
    rotationZ: Euler['z']
    gltf?: GltfEntity
}
export default interface ExhibitMeshEntity extends MeshPropsEntity{
    id: string
    type: string | 'Object3D'
    material: ExhibitMaterialEntity | DefaultExhibitMaterialEntity<ExhibitMaterialEntity>
    geometry: ExhibitGeometryEntity | DefaultExhibitGeometryEntity<ExhibitGeometryEntity>
}

export type ExhibitMeshEntities = ExhibitMeshEntity[] | [];

export class DefaultExhibitMeshEntity <ExhibitMeshEntity> {
    id= uuid();
    positionX= 0;
    positionY=  0;
    positionZ=  0;
    quaternionX= 0;
    quaternionY= 0;
    quaternionZ= 0;
    quaternionW= 0;
    rotationX= 0;
    rotationY= 0;
    rotationZ= 0;
    type= "";
    material= new DefaultExhibitMaterialEntity();
    geometry= new DefaultExhibitGeometryEntity();
}

