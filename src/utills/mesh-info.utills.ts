import {Box3, Color, Group, Material, Matrix4, Mesh, MeshBasicMaterial, Object3D, Sphere} from "three";
import {MeshPropsEntity} from "../clients/entities/exhibit-mesh.entity";
import {MaterialProps} from "@react-three/fiber";
import {MaterialPropsEntity} from "../clients/entities/exhibit-material.entity";
import PropertyMissingError from "../Exception/PropertyMissingError";
import {GeometryPropsEntity} from "../clients/entities/exhibit-geometry.entity";
import {Vector3} from "three/src/math/Vector3";
import { GroupEntity } from "../clients/entities/group.entity";
import {Object3DEntity} from "../clients/entities/object3D.entity";

export function getSingleMaterial(mesh: Mesh): Material
{
    if(Array.isArray(mesh.material)){
        if(mesh.material[0] instanceof Material){
            return mesh.material[0];
        }
    }else{
        if(mesh.material instanceof Material){
            return mesh.material;
        }
    }

    throw new Error('Mesh does not contain a valid material');
}
export function getJsonFromObject3D(group: Group): Object3DEntity
{
    const cloneObject = group.clone();
    cloneObject.rotation.set(0,0,0);
    cloneObject.quaternion.set(0,0,0,0);
    const boundingBox = new Box3();
    boundingBox.setFromObject(cloneObject);
    const {x: scaleX, y: scaleY, z: scaleZ} = boundingBox.getSize(new Vector3());
    console.log(        scaleX,
        scaleY,
        scaleZ);
    return {
        "positionX": group.position.x,
        "positionY": group.position.y,
        "positionZ": group.position.z,
        "rotationX": group.rotation.x,
        "rotationY": group.rotation.y,
        "rotationZ": group.rotation.z,
        "quaternionX": group.quaternion.x,
        "quaternionY": group.quaternion.y,
        "quaternionZ": group.quaternion.z,
        "quaternionW": group.quaternion.w,
        scaleX,
        scaleY,
        scaleZ
    }
}


export function getJsonFromMesh(mesh: Mesh): MeshPropsEntity
{
    return {
            "positionX": mesh.position.x,
            "positionY": mesh.position.y,
            "positionZ": mesh.position.z,
            "rotationX": mesh.rotation.x,
            "rotationY": mesh.rotation.y,
            "rotationZ": mesh.rotation.z,
            "quaternionX": mesh.quaternion.x,
            "quaternionY": mesh.quaternion.y,
            "quaternionZ": mesh.quaternion.z,
            "quaternionW": mesh.quaternion.w,
            "gltf": mesh.userData.gltf
    }
}

export function getMaterialId(mesh: Mesh): string
{
    const material = getSingleMaterial(mesh);
    return material.uuid;
}

export function getGeometryId(mesh: Mesh): string
{
    const geometry = mesh.geometry;
    return geometry.uuid;
}

export function getJsonFromMaterial(mesh: Mesh): MaterialPropsEntity
{
    const material = getSingleMaterial(mesh) as Material;
    if(!('color' in material)){
        throw new PropertyMissingError('color');
    }
    if(!('type' in material)){
        throw new PropertyMissingError('type');
    }
    if(!('opacity' in material)){
        throw new PropertyMissingError('opacity');
    }

    if(!(material?.color instanceof Color)){
        throw new Error('Material color is not of type Color');
    }




    return {
        "type": material.type,
        "color": `#${material.color.getHexString()}`,
        "opacity": material.opacity,
        "texture": material.userData.texture
    }
}

export function getJsonFromGeometry(mesh: Mesh): GeometryPropsEntity
{
    const cloneMesh = mesh.clone();
    cloneMesh.rotation.set(0,0,0)
    console.log('mesh.position, mesh.rotation',mesh.position, mesh.rotation);
    const geometry = mesh.geometry;
    const boundingBox = new Box3();
    boundingBox.setFromObject(cloneMesh);
    const size = new Vector3();
    const getSize = boundingBox.getSize(size);
    const {x: width , y: height, z: depth} = size;
    console.log(size, getSize);

    const sphereBoundingBox = new Box3();
    sphereBoundingBox.setFromObject(mesh)
    const center = new Vector3();
    sphereBoundingBox.getCenter(center);
    const sphere = sphereBoundingBox.getBoundingSphere(new Sphere(center));
    geometry.computeBoundingSphere();
    geometry.computeBoundingBox();

    return {
        width: width,
        height: height,
        depth: depth,
        radius: sphere.radius,
        type: geometry.type
    }
}

export function getMeshesByGroup(group: Group)
{
    return group.children.filter((object) => {
        return (object instanceof Mesh) ? true : false;
    }) as Mesh[] | []
}