import {Box3, Color, Material, Matrix4, Mesh, MeshBasicMaterial, Sphere} from "three";
import {MeshPropsEntity} from "../clients/entities/exhibit-mesh.entity";
import {MaterialProps} from "@react-three/fiber";
import {MaterialPropsEntity} from "../clients/entities/exhibit-material.entity";
import PropertyMissingError from "../Exception/PropertyMissingError";
import {GeometryPropsEntity} from "../clients/entities/exhibit-geometry.entity";
import {Vector3} from "three/src/math/Vector3";

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

export function getJsonFromMesh(mesh: Mesh): MeshPropsEntity
{console.log({
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
});
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
    const geometry = mesh.geometry;

    const boundingBox = new Box3();
    boundingBox.setFromObject(mesh);
    const size = new Vector3();
    const {x: width , y: height, z: depth} = boundingBox.getSize(size);

    const sphereBoundingBox = new Box3();
    sphereBoundingBox.setFromObject(mesh)
    const center = new Vector3();
    sphereBoundingBox.getCenter(center);
    const sphere = sphereBoundingBox.getBoundingSphere(new Sphere(center));

    console.log('sphere.radius',sphere.radius);

    return {
        width: width,
        height: height,
        depth: depth,
        radius: sphere.radius,
        type: geometry.type
    }
}