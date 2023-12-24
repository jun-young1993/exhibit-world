import {Vector3} from "three/src/math/Vector3";
import {Quaternion} from "three/src/math/Quaternion";
import {Euler} from "three/src/math/Euler";

export interface Object3DEntity {
    positionX: Vector3['x']
    positionY:  Vector3['y']
    positionZ:  Vector3['z']
    quaternionX: Quaternion['x']
    quaternionY: Quaternion['y']
    quaternionZ: Quaternion['z']
    quaternionW: Quaternion['w']
    rotationX: Euler['x']
    rotationY: Euler['y']
    rotationZ: Euler['z'],
    scaleX: number,
    scaleY: number,
    scaleZ: number
}