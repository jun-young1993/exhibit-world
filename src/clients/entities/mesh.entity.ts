import {Vector3} from "three/src/math/Vector3";
import {Quaternion} from "three/src/math/Quaternion";
import {Euler} from "three/src/math/Euler";
import ExhibitMaterialEntity, {DefaultExhibitMaterialEntity} from "./exhibit-material.entity";
import ExhibitGeometryEntity, {DefaultExhibitGeometryEntity} from "./exhibit-geometry.entity";
import { v4 as uuid } from 'uuid';
import {GltfEntity} from "./gltf.entity";
import {GroupEntity} from "./group.entity";
import AssociationEntity from "./association.entity";
import GeometryEntity from "./geometry.entity";
import {Object3DEntity} from "./object3D.entity";


export interface MeshPropsEntity extends Object3DEntity{
    gltf?: GltfEntity
}
export default interface MeshEntity extends MeshPropsEntity{
    id: string
    type: string | 'Object3D'
    association: AssociationEntity
    geometry: GeometryEntity
}



