import { v4 as uuid } from "uuid";

export enum GeometryType {
    BoxGeometry = 'BoxGeometry',
    SphereGeometry = 'SphereGeometry',
    ConeGeometry = 'ConeGeometry',
    CylinderGeometry = 'CylinderGeometry',
    TorusGeometry = 'TorusGeometry',
    BufferGeometry = 'BufferGeometry'
}

export interface GeometryPropsEntity {
    depth: number
    height: number
    radius: number
    type: string
    width: number
}

export default interface GeometryEntity extends GeometryPropsEntity{
    id: string
}

