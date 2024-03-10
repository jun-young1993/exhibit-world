import { v4 as uuid } from "uuid";

export enum GeometryType {
    BoxGeometry = 'BoxGeometry',
    SphereGeometry = 'SphereGeometry',
    ConeGeometry = 'ConeGeometry',
    CylinderGeometry = 'CylinderGeometry',
    TorusGeometry = 'TorusGeometry'
}

export interface GeometryPropsEntity {
    depth: number
    height: number
    radius: number
    type: string
    width: number
}

export default interface ExhibitGeometryEntity extends GeometryPropsEntity{
    id: string
}

export class DefaultExhibitGeometryEntity<ExhibitGeometryEntity> {
    depth= 1;
    height= 1;
    id= uuid();
    radius= 1;
    type= GeometryType.BoxGeometry;
    width= 1;
    constructor(props?: Partial<ExhibitGeometryEntity>) {
        Object.assign(this,props);
    }
}